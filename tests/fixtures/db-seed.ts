import { test as base } from '@playwright/test';
import { PrismaClient } from '@prisma/client';
import { testBlogs } from '../../src/constants/testBlogs';
import * as fs from 'fs';
import * as path from 'path';

type DbFixtures = {
  seedDB: void;
};

// Simple file-based lock to prevent concurrent database seeding
const lockFilePath = path.resolve(__dirname, '../../.db-seed.lock');

async function acquireLock(): Promise<void> {
  let attempts = 0;
  const maxAttempts = 50; // 5 seconds max wait

  while (attempts < maxAttempts) {
    try {
      // Try to create lock file (fails if exists)
      fs.writeFileSync(lockFilePath, process.pid.toString(), { flag: 'wx' });
      return; // Lock acquired
    } catch {
      // Lock file exists, wait and retry
      await new Promise((resolve) => setTimeout(resolve, 100));
      attempts++;
    }
  }

  throw new Error('Failed to acquire database seed lock after 5 seconds');
}

function releaseLock(): void {
  try {
    fs.unlinkSync(lockFilePath);
  } catch {
    // Ignore errors when releasing lock
  }
}

export const test = base.extend<DbFixtures>({
  /**
   * Test-scoped fixture that seeds the database before each test
   * Uses file-based locking to prevent concurrent seeding
   */
  seedDB: [
    async ({}, use) => {
      const prisma = new PrismaClient();

      try {
        // Acquire lock before seeding
        await acquireLock();

        // Delete all blogs
        await prisma.blog.deleteMany({});

        // Seed with test data
        await prisma.blog.createMany({
          data: testBlogs,
        });

        // Delay to ensure database changes are fully committed and propagated
        // Especially important when multiple workers are accessing the database
        await new Promise((resolve) => setTimeout(resolve, 200));

        console.log('✓ Database seeded for test');
      } catch (error) {
        console.error('✗ Failed to seed database:', error);
        throw error;
      } finally {
        await prisma.$disconnect();
        // Release lock after seeding
        releaseLock();
      }

      // Run the test
      await use();

      // No cleanup needed - next test will seed anyway
    },
    { auto: true }, // Automatically run before each test
  ],
});

export { expect } from '@playwright/test';

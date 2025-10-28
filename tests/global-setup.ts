import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

/**
 * Global setup for Playwright tests
 * Loads environment variables from .env file and seeds the database
 */
export default async function globalSetup() {
  const envPath = path.resolve(__dirname, '../.env');

  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    const lines = envContent.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      // Skip comments and empty lines
      if (!trimmed || trimmed.startsWith('#')) continue;

      const match = trimmed.match(/^([^=]+)=(.*)$/);
      if (match) {
        const key = match[1].trim();
        const value = match[2].trim();
        // Only set if not already set
        if (!process.env[key]) {
          process.env[key] = value;
        }
      }
    }

    console.log('✓ Loaded environment variables from .env file');
  } else {
    console.warn(
      '⚠ Warning: .env file not found. Some tests may fail without proper credentials.'
    );
  }

  // Seed the database before running tests
  try {
    console.log('🌱 Seeding database...');
    const seedPath = path.resolve(__dirname, '../prisma/seed_blogs.ts');
    execSync(`npx tsx ${seedPath}`, {
      stdio: 'inherit',
      cwd: path.resolve(__dirname, '..'),
    });
    console.log('✓ Database seeded successfully');
  } catch (error) {
    console.error('✗ Failed to seed database:', error);
    throw error;
  }
}

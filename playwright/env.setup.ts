import { spawn } from 'child_process';
import { test as setup } from '@playwright/test';
import config from '../playwright.config';

const baseURL = config.use?.baseURL;

setup.use({ baseURL: baseURL });

setup('Seed database', () => {
  console.log(baseURL);
  if (baseURL === 'https://theqaguy.co.nz') {
    console.log('Skipping seeding on production environment');
    return;
  }

  return new Promise<void>((resolve, reject) => {
    const child = spawn('npx', ['tsx', './prisma/seed_blogs.ts']);

    let errorOutput = '';

    child.stdout.on('data', (data) => {
      console.log(data.toString());
    });

    child.stderr.on('data', (data) => {
      const error = data.toString();
      console.error(error);
      errorOutput += error;
    });

    child.on('close', (code) => {
      if (code === 0) {
        resolve();
      } else {
        reject(
          new Error(
            `Seeding blogs process exited with code ${code}\n${errorOutput}`
          )
        );
      }
    });
  });
});

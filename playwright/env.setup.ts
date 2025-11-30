import { test as setup } from '@playwright/test';
import config from '../playwright.config';
import { seedDatabase } from './utils/seedDatabase';

const baseURL = config.use?.baseURL;

setup.use({ baseURL: baseURL });

setup('Seed database', async () => {
  if (baseURL === 'https://theqaguy.co.nz') {
    console.log('Skipping seeding on production environment');
    return;
  }

  await seedDatabase();
});

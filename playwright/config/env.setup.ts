import { test as setup } from '@playwright/test';
import config from '../../playwright.config';
import { seedDatabase } from './seedDatabase';

const baseURL = config.use?.baseURL;
const isProduction =
  baseURL === 'https://theqaguy.co.nz' || process.env.NODE_ENV === 'production';

setup.use({ baseURL: baseURL });

setup('Seed database', async () => {
  if (isProduction) {
    console.log('Skipping seeding on production environment');
    return;
  }

  await seedDatabase();
});

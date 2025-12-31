import { test as setup } from '@playwright/test';
import config from '../../playwright.config';
import { seedDatabase } from './seedDatabase';

const baseURL = config.use?.baseURL;

setup.use({ baseURL: baseURL });

setup('Seed database', async () => {
  await seedDatabase();
});

/**
 * Test Credentials Helper
 *
 * IMPORTANT: To run these tests, you need to provide admin credentials.
 *
 * Option 1 (Recommended): Set environment variables when running tests:
 *   ADMIN_EMAIL=your@email.com ADMIN_PASSWORD=yourpassword npx playwright test
 *
 * Option 2: Update the fallback values below to match your .env file
 *
 * The credentials should match what you have in your .env file for
 * ADMIN_EMAIL and ADMIN_PASSWORD
 */

export const getAdminCredentials = () => {
  // Read from environment variables
  let email = process.env.ADMIN_EMAIL;
  let password = process.env.ADMIN_PASSWORD;

  // FALLBACK: If not set via environment, use these hardcoded values
  // UPDATE THESE to match your actual .env file!
  if (!email) email = 'your-admin-email@example.com'; // <-- UPDATE THIS
  if (!password) password = 'your-admin-password'; // <-- UPDATE THIS

  return { email, password };
};

# theqaguy.co.nz

Project Description

- **Purpose:** Personal website and portfolio for myself showcasing projects, blog posts, and technical writing.
- **Stack:** Next.js (App Router), TypeScript, BetterAuth, ShadCN, Tailwind CSS, Prisma (Postgres), Playwright tests, Tiptap editor for rich content, Open-Telemetry integration for APM, and Docker for local development.
- **Structure:** Static content in `public/`, server code in `src/`, database schema in `prisma/`, and Playwright tests in `playwright/`.

Features

- Clean, responsive portfolio and blog site with accessible components.
- Ability to run full suite of playwright tests from the home page (jobs created and queued through Redis)
- WYSIWYG rich text editor with custom Tiptap extensions (tables, code blocks, etc.).
- Server-side rendering with optimized assets and image handling.
- End-to-end tests with Playwright and automated accessibility reports.
- Database-backed content using Prisma and a Postgres database.
- Docker configuration for reproducible local development and CI.

Setup

1. Prerequisites

   - Node.js 22 (or current LTS)
   - npm
   - Postgres
   - Redis/Valkey
   - Docker - required for running the playwright tests
   - Add local.theqaguy.co.nz to your hostfile for localhost as this hostname is used for generating a local https certificate automatically when you start the development server

2. Install dependencies

```bash
npm install
```

3. Environment

- Copy the example env file and adapt values:

```bash
cp .env.example .env
```

4. Database

```bash
# run migrations and seed (if using Prisma)
npx prisma migrate dev --name init
npx prisma db seed
```

5. Run the app

```bash
npm run dev
# open https://local.theqaguy.co.nz:3000
```

6. Create admin user

- Ensure you have set an admin username, password and better auth secret in your env file

```bash
curl --location 'https://local.theqaguy.co.nz/api/initialize?secret=<YOUR_BETTER_AUTH_SECRET>'
```

7. Running tests

```bash
# Start playwright docker server
npm run playwright:server

# Start playwright UI with websocket to docker server
npm run playwright:dev
```

Notes

- Content is authored in the custom editor under `src/components/customEditor/`.
- If you run into styling or layout differences between the editor and the static renderer, check the Tiptap NodeViews and table extensions in `src/components/customEditor/extensions/`.

Contributing

- Fork the repo, create a branch, make changes, and open a pull request.
- Run tests locally before submitting.

License

- Licensed under the terms in the `LICENSE` file.

# Contact Book (Next.js)

A simple Contact Book app built with Next.js, TypeScript, Tailwind CSS, and Prisma (SQLite).

## Quick Start

1. Install dependencies:

   npm install

2. Generate Prisma client and apply migrations:

   npx prisma generate
   npx prisma migrate dev --name init

3. Seed the database:

   npm run prisma:seed

4. Run the dev server:

   npm run dev

5. Run tests:

   npm run test

## Scripts

- `npm run dev` — start development server
- `npm run build` — create production build
- `npm run start` — start production server
- `npm run prisma:generate` — generate Prisma Client
- `npm run prisma:migrate` — apply migrations
- `npm run prisma:seed` — seed database
- `npm run test` — run tests

## Features

- List contacts
- Add, edit, delete contacts (stored in browser localStorage by default)
- API routes were scaffolded for Prisma/SQLite but are disabled by default to avoid runtime DB errors

---

## Using the database (optional)

If you prefer to use Prisma + SQLite instead of localStorage:

1. Create a `.env` with `DATABASE_URL="file:./prisma/dev.db"` (or copy `.env.example`).
2. Run:

   npx prisma generate
   npx prisma migrate dev --name init
   npm run prisma:seed

3. Restart the dev server.

Note: the app defaults to localStorage for quick local development and avoids DB setup unless you opt-in.

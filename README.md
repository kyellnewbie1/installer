# Hutao Cloud V1

Starter multi-user workspace for planning Pterodactyl deployments.

## Included
- Email/password registration and login
- Password hashing with bcrypt
- Signed, HTTP-only session cookie
- PostgreSQL + Prisma data model
- Per-user installation records and ownership-scoped API
- Responsive dashboard UI

## Not included yet
This V1 starter **does not connect over SSH, run remote commands, install Pterodactyl, configure Wings, or import Eggs**. The New Installation form only stores target metadata. This is deliberate: the remote installer must be added with strict host validation, explicit authorization, a background job worker, audited allow-listed operations, and secure short-lived credential handling before it can change a VPS.

## Requirements
- Node.js 20+
- PostgreSQL

## Setup
1. Copy `.env.example` to `.env`.
2. Set `DATABASE_URL` to your PostgreSQL connection string.
3. Set `SESSION_SECRET` to a random secret of at least 32 characters.
4. Install dependencies: `npm install`
5. Generate Prisma client and create tables: `npx prisma generate && npx prisma db push`
6. Start development: `npm run dev`
7. Open `http://localhost:3000`

## Deployment notes
- Use HTTPS in production.
- Keep `.env` out of Git.
- Set a strong unique `SESSION_SECRET`.
- Add rate limiting and email verification before public launch.
- Use a dedicated, least-privilege deployment agent rather than accepting arbitrary shell commands.
- Restrict outbound SSH targets to verified, user-authorized hosts; block private metadata endpoints and validate DNS/IP at connection time.

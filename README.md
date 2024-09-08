# Expense Tracker

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `Tech Stack`
Front-end using Next.js\
Styling with Tailwind CSS\
Powered by Clerck Authentication\
Backend using Typescript\
Database used: Postgres\

## `References`
Follow this tutorial on [How_to_setup_&_use_Vercel_Postgres](https://www.youtube.com/watch?v=_ad99LhxBeQ).

## `Steps`
Setup your Next.js project "npx create-next-app@latest 'Your project name' "\
Set up vercel databse by following this [Video](https://www.youtube.com/watch?v=_ad99LhxBeQ).\
Set up Drizzle ORM connecting to your Vercel Postgres Database by following this [Documentation](https://www.fullstackbook.com/blog/nextjs-drizzle-orm-postgresql-vercel-tutorial).\
Changes on the migration part would be in this [Documentation](https://orm.drizzle.team/kit-docs/upgrade-21#how-to-migrate-to-0210).\
Important: Refere to my drizzle.config.ts file for updated reference.\
Commands to Remember:\
__npx vercel__ - Deploys your project to Vercel\\
_vercel env pull .env.local_ - Pulls environment variables from Vercel and stores them in a local .env.local file.
\
_npm i drizzle-orm_ - Installs the Drizzle ORM library    \
_npm i @vercel/postgres_ - Installs Vercel’s PostgreSQL client to manage and connect to PostgreSQL databases in serverless environments.\
_npm i -D drizzle-kit_ - Installs Drizzle Kit as a development dependency, a tool used for database migrations and schema generation\
_npx drizzle-kit generate_ -.Automatically generates database schema and migration files using Drizzle Kit.\
_npx tsx scripts/migrate.ts_ - Executes the TypeScript script for running database migrations.\
_npx tsx scripts/seed.ts_ - Executes the TypeScript script for seeding the database with initial data.
\
_npx drizzle-kit push_ - Pushes your database migrations to the remote database, applying any new changes to the schema.\
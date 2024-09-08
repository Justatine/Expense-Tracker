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
You can start editing your own database columns.
Set up clerk auth by following this [Video](https://www.youtube.com/watch?v=QstMsE_HbgM&t=78s)
On the Clerk Dashboard, Go to Sessions, Customize session token by clicking Edit. Add this code on the claims:\
{
	"metadata": "{{user.public_metadata}}"
}\


## `Commands to Remember`

__npx vercel__ - Deploys your project to Vercel\

__vercel env pull .env.local__ - Pulls environment variables from Vercel and stores them in a local .env.local file.
\
__npm i drizzle-orm__ - Installs the Drizzle ORM library\

__npm i @vercel/postgres__ - Installs Vercel’s PostgreSQL client to manage and connect to PostgreSQL databases in serverless environments.\

__npm i -D drizzle-__ - Installs Drizzle Kit as a development dependency, a tool used for database migrations and schema generation\

__npx drizzle-kit generate__ -.Automatically generates database schema and migration files using Drizzle Kit.\

__npx tsx scripts/migrate.ts__ - Executes the TypeScript script for running database migrations.\

__npx tsx scripts/seed.ts__ - Executes the TypeScript script for seeding the database with initial data.\

__npx drizzle-kit push__ - Pushes your database migrations to the remote database, applying any new changes to the schema.\
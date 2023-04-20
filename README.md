# Next.js Weather App

<img src="src/assets/homepage.png" width="640"  />

## Description

**Next.js Weather App** provides live weather conditions for any city in the world. It is a full-stack demo based on the TypeScript-friendly [T3 web development stack](https://create.t3.gg/), which utilizes the [Next.js](https://nextjs.org/) web framework and [tRPC](https://trpc.io/docs/), a typesafe alternative to traditional REST or GraphQL APIs.

It has additional elements in place (e.g. NextAuth, Prisma ORM, Zod schema validation) to help developers easily scale up its functionality. Feel free to use or modify the codebase for your own project!

## File structure

- `src`
  - `assets` - This folder holds assets such as images
  - `backend` - This folder holds files used by the backend
    - `routers` - This folder holds router files used by tRPC
    - `context.ts` - This file provides the tRPC context object
    - `trpc.ts` - This file initializes the tRPC backend
  - `components` - This folder holds different components that make up our frontend views
  - `db` - This folder holds files used to communicate with the database
  - `hooks` - This folder holds React hooks for use in functional components
  - `models` - This folder holds data models used by the backend
  - `pages` - This folder holds components organized by page level view
    - `api` - This folder holds files used by Next.js to handle api calls
      - `auth` - This folder holds files used to handle NextAuth calls
      - `trpc` - This folder holds files used to handle tRPC calls
    - `_app.tsx` - Entrypoint for Next.js app
  - `styles` - This folder holds stylesheets and fonts used by the frontend
  - `utils` - This folder holds files containing utility functions
  - `viewModels` - This folder holds view models used by the frontend
- `public` - This folder holds static content used by the app
- `prisma` - This folder holds files used by Prisma ORM
- `.husky` - This folder holds files used by Husky.js
- `.env.sample` - Sample file containing environment variables used by the app
- `.eslintignore` - Directories to exclude from linting
- `.eslintrc.json` - Defines linting behaviors
- `.gitignore` - Directories to exclude from git tracking
- `.prettierignore` - Directories to exclude from Prettier.js formatting
- `.prettierrc.json` - Configuration file for Prettier
- `auth.d.ts` - Type definitions used by NextAuth
- `next.config.js` - Configuration file for Next.js
- `next.d.ts` - Type definitions used by Next.js
- `package.json` - Defines npm behaviors and packages
- `package-lock.json` - Tracks dependency tree
- `tsconfig.json` - Configuration file for TypeScript
- `README.md` - This file!

## Initial Setup

This demo was built using Node.js version 16. Please install a long-term support (LTS) version for compatibility with other libraries.

- Node.js <https://nodejs.org/en/download/>

To verify that you have Node.js installed on your system, type the following command in your command line terminal (Terminal for Mac/Linux, CMD for Windows).

```console
node -v
```

Once your Node environment has been verified, install the app dependencies using `npm install`. Once the dependencies have finished installing, please complete the steps in the "Environment Variables" and "Initialize Database" sections before you run the app.

### Environment Variables

Before you build or run the app, create a new file called `.env` at the project root. This file will be used by Next.js to expose environment variables to your app at runtime.

You will need to enter values for the following environment variables (refer to `.env.sample` for example values):

`DATABASE_URL`: The URL of the database that Prisma ORM connects to. See the [documentation](https://www.prisma.io/docs/reference/database-reference/connection-urls) for info about supported database options.

`PORT`: The port where the app will run

`NEXTAUTH_URL`: The canonical URL of your production site. This variable does not need to be set when deploying on certain web platforms such as [Vercel](https://vercel.com/docs/concepts/projects/environment-variables#system-environment-variables).

`NEXTAUTH_SECRET`: The key used to encrypt JWTs with NextAuth. This is the default value for the `secret` option in NextAuth.

`NEXT_PUBLIC_GEO_API_URL`: The base URL for the [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities) host. You need to create a Rapid API key to access this host's endpoints.

`NEXT_PUBLIC_RAPID_API_KEY`: The API key required to access a Rapid API host

`NEXT_PUBLIC_RAPID_API_HOST`: The base URL for calls to any Rapid API host

`NEXT_PUBLIC_APP_DEFAULT_LOCATION`: The default city location used by the app. This must be formtted as "[city.name], [city.countryCode]" based on response data of type `city` from the GeoDB Cities API (e.g. "San Francisco, US").

### Prisma

Prisma is an [open source](https://github.com/prisma/prisma) next-generation ORM. It consists of the following parts:

- Prisma Client: Auto-generated and type-safe query builder for Node.js & TypeScript

- Prisma Migrate: Migration system

- Prisma Studio: GUI to view and edit data in your database.

These tools aim to increase an application developer’s productivity in their database workflows. One of the top benefits of Prisma is the level of abstraction it provides: Instead of figuring out complex SQL queries or schema migrations, application developers can reason about their data in a more intuitive way when using Prisma.

#### Schema File

The Prisma schema file (located at `prisma/schema.prisma`) provides an intuitive way to model data.

Models in the Prisma schema have two main purposes:

- Represent the tables in the underlying database
- Serve as foundation for the generated Prisma Client API

For futher details on how to build a schema file, [view the docs](https://www.prisma.io/docs/concepts/components/prisma-schema).

#### Database Connection

A data source determines how Prisma connects your database, and is represented by the `datasource` block in the Prisma schema. The following data source uses the postgresql provider and includes a connection URL:

```
datasource db {
  provider = "postgresql"
  url      = "postgresql://johndoe:mypassword@localhost:5432/mydb?schema=public"
}
```

Next.js Weather App uses a postgresql database hosted on the cloud via [Supabase](https://supabase.com/), but Prisma supports a wide variety of local and external database implementations. View the docs on [how to connect Prisma to an existing database](https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases/connect-your-database-typescript-postgres) for more details.

#### Initialize Database

To allow Prisma to generate the required assets to query your database and update your database tables according to the Prisma schema file, run the command `npm run prisma-sync` from your terminal. This command will do the following:

- Generate assets like Prisma Client based on the `generator` and `data model` blocks defined in your prisma/schema.prisma file. [See docs](https://www.prisma.io/docs/reference/api-reference/command-reference#generate)

- Push the state of your Prisma schema file to the database without using migrations. It creates the database if the database does not exist. [See docs](https://www.prisma.io/docs/reference/api-reference/command-reference#db-push)

**Note**: To update your database state using migrations (in dev or production), please refer to the [docs](https://www.prisma.io/docs/guides/migrate/developing-with-prisma-migrate).

Once `npm run prisma-sync` has finished, you need to seed your database with the command `npm run seed-db`. This will create the basic data required to start the app. The seed file is stored in the prisma folder at `prisma/seed.ts` and can be modified according to your project's particular requirements, but please note that the `NEXT_PUBLIC_APP_DEFAULT_LOCATION` environemnt variable may need to be updated accordingly.

## Run the app

**Note**: Make sure you've created a `.env` file with the required environment variables before starting the app. (see "Environment Variables" section)

To run the app in **dev mode**, run the command `npm run dev`. This triggers a workflow which lints the source code, applies formatting changes according to your Prettier.js settings, checks all type definitions using the TypeScript compiler, and starts the Next.js app in dev mode.

Once the workflow is complete, you should see the Next.js server running in your terminal. Then try visiting `http://localhost:3000` in your browser to verify that you can access the frontend.

To build a production-ready bundle for your app, run the command `npm run build`. Next.js will build the application for production usage and emit the output files into the `.next` folder.

## Authentication

The app uses JSON Web Tokens (JWT) signed by NextAuth for managing sessions and authentication. This is a convenient strategy that utilizes browser cookies and does not store any session data in the database, but NextAuth does provide a variety of [database adapters](https://authjs.dev/reference/adapters) that you can use to implement more robust authentication solutions if necessary.

Make sure to update the `NEXTAUTH_SECRET` environment variable with a secure key before running the app.

**Important**: Never share sensitive data such as keys or passwords! Make sure to apply appropriate security settings to prevent exposing such information.

### Authorization

Each user in the database has a `role` field which can take on one of two values: `USER` or `ADMIN`. These values aren't currently used for authorization purposes, but can be used to build out an authorization layer on top of the NextAuth workflow if desired.

## External APIs

- Weather data is provided by the [Open-Meteo Free Weather API](https://open-meteo.com/en/docs) which uses weather models from multiple national weather providers and supports a wide variety of weather variables. This API is free to use and does not require an API key to access.

- City search data is provided by the [GeoDB Cities API](https://rapidapi.com/wirefreethought/api/geodb-cities) hosted on Rapid API. Rapid API requires you to create an account (free accounts are available) and a corresponding API key to access their hosted APIs.

## Data Visualization

The app uses the open-source [Chart.js](https://www.chartjs.org/docs/latest/) library to create web-friendly visualizations for a variety of weather variables. Among many charting libraries for JavaScript application developers, Chart.js is currently the most popular one according to GitHub stars (~60,000) and npm downloads (~2,400,000 weekly).

Chart.js provides a set of frequently used chart types, plugins, and customization options. It includes a reasonable set of built-in chart types and additional community-maintained chart types.

## Weather Icons

Weather icons are provided in a variety of web-friendly formats via [Erik Flowers Weather Icons](http://erikflowers.github.io/weather-icons/). The app currently utilizes a basic set of icons only, but you can find a wide range of high quality weather, maritime, and meteorological based icons for further customization of your project via the Github link.

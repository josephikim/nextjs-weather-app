# Next.js Weather App

<img src="src/assets/homepage.png" width="500"  />

## Description

**Next.js Weather App** provides live weather conditions for any city in the world. It is a full-stack demo based on the TypeScript-focused [T3 web development stack](https://create.t3.gg/), which consists of the [Next.js](https://nextjs.org/) web framework and [tRPC](https://trpc.io/docs/), a typesafe alternative to traditional REST or GraphQL APIs. It has architectural elements in place (e.g. NextAuth.js, Prisma ORM, Zod schema validation) to help developers easily scale up its functionality. It provides hourly forecast data from the [Open-Meteo Free Weather API](https://open-meteo.com/en/docs) which uses weather models from multiple national weather providers and supports a wide variety of weather variables. Feel free to use or modify the codebase for your own project!

## File structure

- `src`
  - `assets` - This folder holds assets such as images
  - `backend` - This folder holds files used by the backend
    - `routers` - This folder holds router files used by the tRPC backend
    - `context.ts` - This file provides the tRPC context object
    - `trpc.ts` - This file initializes the tRPC backend
  - `components` - This folder holds different components that make up our frontend views
  - `db` - This folder holds files used to communicate with the database
  - `hooks` - This folder holds React hooks for use in functional components
  - `models` - This folder holds data models used by the backend
  - `pages` - This folder holds components organized by page level view
    - `api` - This folder holds files used by Next.js to handle api calls
      - `auth` - This folder holds files used to handle NextAuth api calls
      - `trpc` - This folder holds files used to handle tRPC api calls
    - `_app.tsx` - Entrypoint for Next.js app
  - `styles` - This folder holds stylesheets and fonts used by the frontend
  - `utils` - This folder holds files for utility functions
  - `viewModels` - This folder holds view models used by the frontend
- `public` - This folder holds static content used by the app
- `prisma` - This folder holds files used by Prisma ORM
- `.husky` - This folder holds files used by Husky.js
- `.env.sample` - Sample file containing environment variables used by the app
- `.eslintignore` - Directories to exclude from linting
- `.eslintrc.json` - Defines linting behaviors
- `.gitignore` - Directories to exclude from git tracking
- `.prettierignore` - Directories to exclude from Prettier.js formatting
- `.prettierrc.json` - Configuration file for Prettier.js
- `.auth.d.ts` - Type definitions used by NextAuth.js
- `.next.config.js` - Configuration file for Next.js
- `.next.d.ts` - Type definitions used by Next.js
- `package.json` - Defines npm behaviors and packages
- `package-lock.json` - Tracks dependency tree
- `.tsconfig.json` - Configuration file for TypeScript
- `README.md` - This file!

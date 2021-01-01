# Noted API 

## Configuration

- install dependencies `yarn install` | `npm install`
- generate .env `cp .env.example .env`
- to start dev server `yarn dev` | `npm run dev`

## Seed Data

To seed data for local development: `npm run seed` | `yarn seed`. The password for all of the seeded users is `password`.

Each time this command is run, it will generate 10 users and 25 notes. Can be customized,
just check `src/utils/seed/index.js`.
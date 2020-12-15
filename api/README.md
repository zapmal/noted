<img src="cover.png" width="200" align="right" />

# JavaScript Everywhere API

This repository contains code examples for the API chapters of [_JavaScript Everywhere_](https://www.jseverywhere.io/) by Adam D. Scott, published by O'Reilly Media

## Configuration

- clone the repository `git clone <link to this repo>`
- to install dependencies `yarn install` | `npm install`
- generate .env `cp .env.example .env`
- to start dev server (nodemon) `yarn dev` | `npm run dev`

## Getting Help

[spectrum.chat/jseverywhere](https://spectrum.chat/jseverywhere).

## Directory Structure

- `/src` If you are following along with the book, this is the directory where you should perform your development.
- `/solutions` This directory contains the solutions for each chapter. If you get stuck, these are available for you to consult.
- `/final` This directory contains the final working project

## To Use the Final Project Files

If you're developing a UI and would like to use the completed project, copy the files to the completed files to the `src` as follows: 

```
cp -rf ./final/* ./src/
```

## Seed Data

To seed data for local development: `npm run seed`. The password for all of the seeded users is `password`.

Each time this command is run, it will generate 10 users and 25 notes.

## Related Repositories

- [Web 💻 ](https://github.com/javascripteverywhere/web)
- [Mobile 🤳](https://github.com/javascripteverywhere/mobile)
- [Desktop 🖥️](https://github.com/javascripteverywhere/desktop)
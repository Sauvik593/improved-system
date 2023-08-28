# Turborepo starter

This is an official npm starter turborepo.

## What's inside?

This turborepo uses [npm](https://www.npmjs.com/) as a package manager. It includes the following packages/apps:

### Apps and Packages

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

Apps:

- account
- docs
- frontend
- join

Packages:

- eslint-config-kyero
- kyero-config
- kyero-icons
- kyero-tsconfig
- kyero-ui

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting

### Local Setup

All of the apps are dockerized. In order to run them in a docker first you need to have a [dev](https://github.com/Kyero/dev) project from github. Also setup the correct entries in your `/etc/hosts' that should include entries like

```
127.0.0.1 account.kyero.test
127.0.0.1 new-frontend.kyero.test
```

### Build

To build all apps and packages you need to be inside of the container. In order to get inside of the container run

```
cd clients # If you're not in the project
docker-compose run `name_of_the_app` bash
```

Then you can run commands that are needed

```
npm run build:account // for building account and needed packages
npm run build:join // for join project
npm run build:docs // for styleguide
npm run build:frontend // for building frontend

```

### Develop

This package is a monorepo there are different scenarios for running develop procedures. Project is dockerized, except the `join` project which is currently developed by a 3rd party company that doesn't have access to all of the other apps like `dev` containing main `docker-compose.yml` file.

Apps in this monorepo doesn't require you to use `docker-sync` which is taking a lot of space. With a new M1 setup and vite building up most of the apps it's relatevely fast to refresh the content in volumes.

In order to run the `frontend` app

```
cd clients/
docker-compose up new-frontend
```

and it's going too boot up the docker image for this project and run dev process. For more config data look at the `Dockerfile.frontend.dev`.

Potential issues:

If you run docker-compose up `name_of_the_app` and have problems with not starring up. Go inside of the container and run `turbo run dev`. It will recreate the cache for everything. Actually this one will fail but probably will do the job. We had this issue when migrating from the older implementation. Should not happen for new devs.

#### Frontend

The Frontend app is a new frontend for kyero.com. It's based on Remix and uses

### E2E tests

We've added an "E2E" pipeline which is not eniterly E2E :) We need to mock api's from a ruby projects and check if the page is rendering correctly, if behaviour is correct etc.

For this purpose we created another docker image for e2e tests only. This file will help you out with writing specs and mocking the API. The api mocks live in `mocks` folder in a root file. It's shared across the project and run on a CI with `e2e.sh` file.

#### E2E development process

For local development on the OSX, you should prepare your local env. Because e2e part is dockerized and we want to be able to see a browser in a development mode, we need to make some adjustments to our system config.

We need to install XQuartz to help us open up browser from within docker. To do it follow those steps

- Install XQuartz: brew install --cask xquartz
- Open XQuartz, go to Preferences -> Security, and check “Allow connections from network clients”
- Restart your computer (restarting XQuartz might not be enough)
- Start XQuartz with `xhost +localhost`. You can type it in your terminal when xquartz starts.

[Further reading](https://www.oddbird.net/2022/11/30/headed-playwright-in-docker/#macos)

When we have everything setup we need to bash into the docker in order to run a specific project in a dev mode. In order to do it you need to run docker with ports exposed by running:

- `docker-compose run -p 3000:3000 -p 3110:3110 -p 3100:3100 clients-e2e bash`

When inside of the container open a new window and run

- `docker-compose exec clients-e2e bash`

In order to be in the same project. Now in the first window let's start a mocking server by running

- `npm run mocks` - it will fire a server with an interactive mode on

In another window run a desired project by running one of the commands

- `turbo run e2e --filter=@kyero/account` run full tests for project without watch mode nor visual
- `turbo run e2e:dev --filter=@kyero/account` for watch mode. It's a little quirky but works
- `turbo run e2e:dev:debug --filter=@kyero/account` - to open up xQuartz with specs

If you encounter and error like this

```
Looks like you launched a headed browser without having a XServer running.
```

Please open up a new terminal window and start add this line `xhost +localhost`. You need to do it as a first thing before running specs on a newly booted OSX.

### Translations - WTI

All of the translations for projects live in a WTI service. We've created a very small package that can download the latest translations from the WTI server. For now only `frontend` project have it set up.

In order to run WTI for any project, you need to have an `.env` file with a correct value. Look at `apps/frontend/.env.example` and will up the `WTI_KEY` var to grab the correct project.

Once the .env is there, in order to grab the translations you need to bash into the container like `docker-compose run new-frontend bash` and then `cd` into the app folder like `cd apps/frontend`. From there just run `npm run wti:pull` to grab the latest translations.

Use git to check the keys that you need and commit them. All of the translations should go through github PR.

## Useful Links

Learn more about the power of Turborepo:

- [Pipelines](https://turbo.build/repo/docs/core-concepts/monorepos/running-tasks)
- [Caching](https://turbo.build/repo/docs/core-concepts/caching)
- [Remote Caching](https://turbo.build/repo/docs/core-concepts/remote-caching)
- [Filtering](https://turbo.build/repo/docs/core-concepts/monorepos/filtering)
- [Configuration Options](https://turbo.build/repo/docs/reference/configuration)
- [CLI Usage](https://turbo.build/repo/docs/reference/command-line-reference)

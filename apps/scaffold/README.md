# Scaffolding app!

This is a scaffolding app of the new frontend app. It's here to develop quick ideas and POCs. 

## Development

Please work with this app on a separate branch, something like `scaffold`. Never merge it to master, nor OPEN a PR. It's purpose there is to live somewhere and play with ideas. 

Always stay up to date with `main` branch.

In order to run it, add `.env` file in this dir and populate with data needed, take a look at `.env.example` file.

It's not ment to be run in docker, but if you want, there is a `Dockerfile.scaffold.dev` file that can help you out.

## How to run it?

When you run it first, or switch from dockerbased app, please remove `node_modules` folder from the root. Then just run. Please have a node version o `16.16.0` before running any `npm install`.

`npm run dev:scaffold` - should run the app in a dev mode
`npm run build:scaffold` - should build the app
`npm run start:scaffold` - should start the app from the built dir


Have fun!

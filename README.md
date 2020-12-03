# Starter to use imported react-imported-component with rollup

> WIP

## Architecture

- Use esm in both client side & server side
- Use preact via `--experimental-loader=./loader.js`

## Entrypoints

- `entries/client.tsx` bundle app for the browser
- `entries/server.ts` bundle the app that can be used in server
- `server.js` to start the app in server

## Getting starter

`npm run build` to build dist

`npm run dev:server` to start the app in server

# Presentation for Grand Rapids JavaScript Meetup, 25 July 2017 Edit

To run this locally, you must have node.js 4+ and (optionally) yarn installed.

## Setup
* Clone this repo and `cd` into the directory
* Run `npm install` or `yarn install`

## Develop
* Run `npm run watch` or `yarn watch` from the project root.
* To automatically open your default browser to the dev server, run `npm run watch -- -o` or `yarn watch -- -o` instead.

## Build
* Run `npm run build` or `yarn build`. Everything for the site will be in `public/`

## Serve

If you want to run a static server locally, start it with `public/` as the doc root. (I use the `[http-server](https://www.npmjs.com/package/http-server)` node module for that, because it's easy.)

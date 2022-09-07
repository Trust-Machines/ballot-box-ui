# BallotBox UI

The UI app of [BallotBox](https://www.ballotbox.xyz/), an off-chain voting platform for Stacks Blockchain.

## Installation

This application is dockerized so the easiest way to make it run is to follow the steps below and install it with Docker.

``` docker build -t bbox-ui . ```

``` docker run -p 3000:3000 bbox-ui ```

Once the installation ends the app should be accessible on [http://localhost:3000](http://localhost:3000)

## Development

If you like to run the app in development mode;

Install node dependencies with `yarn` or `npm install`

And run `yarn start` or `npm start` to start the app

## Testing

`yarn test` or `npm test` command runs test scripts.

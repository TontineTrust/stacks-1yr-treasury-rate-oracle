# Stacks Oracle

## Setup
Make sure to have Node.js installed (or use the version from [[../shell.nix]]),
then run `npm ci` to do a clean install of the dependencies.

In case that does not work, do `npm i` to install the dependencies.

## Important Development Notes

For compatibility with the tool node2nix which is used for deployment keep the
lock file version at version 2, do not use version 3.

Make sure to import local files WITH a `.js` file extension, for whatever reason
imports lacking the file extension fail in the build Docker image.

## Usage
 To run the app, do:
`./app.js`
which will run a server on localhost:3000

The API has 2 endpoints: 
`'/'` which returns the rate from the smart contract
`'/fetch-rate'` which scrapes the rate from the source site and returns the rate

See `consts.js` for the configurable parameters.

## Docker image
Use `./gen-nix.sh && ./test-build.sh` to check that building the Docker image works.

See the comment in `docker.nix` for how to jump into a shell inside a Stacks
Oracle Docker container. This can be useful if a deployed image is failing, so
you can download the image and investigate.
"# stacks-1yr-treasury-rate-oracle" 

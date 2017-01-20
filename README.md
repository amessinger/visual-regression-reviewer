# visual-regression-reviewer

This web app spots failed builds from CircleCI and if it is due to a visual regression, displays the diff image.

## Requirements

`npm`

## Installation

`npm install`

## Setup

You'll need a valid CircleCI API token stored as the `CIRCLECI_TOKEN` environment variable.

## Usage

`node server.js`

this will start a server listening on port 3000. So http://localhost:3000 is where you'll start having some fun ;)

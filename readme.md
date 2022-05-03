# Prerequisite

- Node (v16 recommended)
- yarn
  - run `npm install --global yarn`

# Setup Instructions

- Install node (V16 recommended)
- `cd` into the project directory
- Run `yarn` to install dependencies
- copy `.example.db.env` to `.db.env`
- copy `.example.env` to `.env`
- add appropriate values in both `env` files (Make sure you have database with same name).
  - you can run database by running `docker-compose up` if you have it installed.
- run `yarn run migrate-reset` to apply changes to database.

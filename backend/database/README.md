# Database

### Setup:
1. Run `yarn install` to download the dependencies.
2. Make a `.env.local` file in the `backend` directory of the project.
3. Set the following environment variables in the `.env.local` file:
   - `DB_URL`: The URL linking to the database
   - `DB`: The name of the database that will be connected
   - NOTE: Connecting as a test user (with the credentials in slack) can only interact with the associated test database.

### To Test
1. Follow the steps in [setup](#setup)
2. Run `yarn test` to test the database
   - Runs all the tests in the `backend` directory.

### To Use
1. Follow the steps in [setup](#setup)
2. Import the `interact.ts` file in the `backend` directory. (This file has all the functions that interact with the database.)

### Structure:
1. `interact.ts`: 
    - Contains exports of all the functions that interact with the database. **USE THIS FILE TO IMPORT**
2. `/interact`: 
    - Contains all the code that will interact with the collections in the database.
3. `/models`: 
    - Contains models of the data that will be stored in the database (for typescript).
4. `/setup`: 
    - Contains the code that will setup the database.
5. `/tests`: 
    - Contains the code that will test the database.

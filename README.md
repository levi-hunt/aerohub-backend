# Aerohub API Backend

## Installation
1. Run
   ```bash
   npm install
   ```
2. Follow the instructions at [Postgresq](https://www.postgresql.org/docs/16/index.html) to setup a database called `aerohubdb`.
3. Uncomment the database URL in your `.env.defaults` file, and replace it with a link to your local database.
4. Generate the PostgreSQL database tables and Prisma client by running the following:
   ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```
5. Rename `.env.defaults` to `.env`
6. Run the server via `npm run dev`
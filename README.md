# Aerohub API Backend

## Installation
1. Run
   ```bash
   npm install
   ```
2. Follow the instructions at [Postgresq](https://www.postgresql.org/docs/16/index.html) to setup a database called `aerohubdb`.
3. Copy the `.env.defaults` file and rename the copy `.env`.
4. Replace the database URL variable with the connection details to your database
5. Generate the PostgreSQL database tables and Prisma client by running the following:
   ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```
6. Rename `.env.defaults` to `.env`
7. Run the server via `npm run dev`

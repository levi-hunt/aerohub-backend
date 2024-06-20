# Aerohub API Backend

## Installation
1. Run
   ```bash
   npm install
   ```
2. Follow the instructions at [Postgresql](https://www.postgresql.org/docs/16/index.html) to setup a database called `aerohubdb`.
3. Copy the `.env.defaults` file and rename the copy, `.env`.
4. Replace the database URL variable with the connection details to your database
5. Replace the JWT_SECRET variable with your own secret key.
   You can generate your own with the following command:
   ```bash
   openssl rand -base64 32
   ```
6. Generate the PostgreSQL database tables and Prisma client by running the following:
   ```bash
    npx prisma migrate dev --name init
    npx prisma generate
    ```
7. Run the server via `npm run dev`

## Usage
Run the following to start up the development server:
```bash
nodemon server.js
```
When you navigate to `/`, you'll be shown the SwaggerDocs that cover each API route.
When developing, please try to follow OpenAPI conventions found [here](https://swagger.io/specification/)

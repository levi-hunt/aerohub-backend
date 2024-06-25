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

## Usage
Run the following to start up the development server:
```bash
npm run dev
```
When you navigate to `/`, you'll be shown the SwaggerDocs that cover each API route.
When developing, please try to follow OpenAPI conventions found [here](https://swagger.io/specification/)

Navigate to `http://localhost:3000/api-docs` to be greeted with the SwaggerUI.
From here, login with the user account below through the `/login` endpoint:
   ```json
   {
      "primary_email": "test@aerohub.com.au",
      "password": "Aerohub123!"
   }
   ```
Copy the JWT token that's returned (without the quotes " ")
Scroll to the top of the SwaggerUI and paste the JWT into the Authorization modal.

This will enable you to interact with all available endpoints *until I implement permissions

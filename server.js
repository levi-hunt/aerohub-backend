/** @type {import("express").RequestHandler} */

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

// Import Routing
const userRoutes = require('./routes/users.js');
const orgRoutes = require('./routes/orgs.js');

const app = express();
const port = 3000;

app.use(express.json());
app.use('/user', userRoutes);
app.use('/org', orgRoutes);

app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get('/', (req, res) => {
    res.redirect('/api');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

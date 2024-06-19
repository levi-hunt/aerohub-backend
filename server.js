/** @type {import("express").RequestHandler} */

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json');

// Import Routing
const userRoutes = require('./routes/users.js');
const orgRoutes = require('./routes/orgs.js')

const app = express();
const port = 3000;

app.use(express.json());
app.use('/user', userRoutes);
app.use('/org', orgRoutes);

const swaggerOptions = {
    swaggerDefinition: swaggerDocument,
    apis: ['./server.js', 'routes/users.js', 'routes/orgs.js'],
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


/**
 * @swagger
 * /:
 *   get:
 *     summary: Returns the homepage
 *     responses:
 *       200:
 *         description: Successfully returned SwaggerDocs HTML
 */
app.get('/', (req, res) => {
    res.redirect('/api');
});

app.listen(port, () => {

});

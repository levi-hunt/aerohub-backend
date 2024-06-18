const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = 3000;

const swaggerOptions = {
    swaggerDefinition: swaggerDocument,
    apis: ['./server.js'],
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

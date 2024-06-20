// server.js

require('dotenv').config(); // Load environment variables

const express = require('express');
const compression = require('compression');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const userRoutes = require('./routes/users');
const orgRoutes = require('./routes/organisations')

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression
app.use(morgan('combined')); // Logging

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Swagger setup for API documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Health check endpoint
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

// API routes
app.use('/user', userRoutes);
app.use('/org', orgRoutes);

app.get('/hello', (req, res) => {
    res.status(200).send('Hello, world!');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(async () => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

const server = app.listen(port, () => {
    console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`);
});

module.exports = app;

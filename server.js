import express, { json, urlencoded } from 'express';
import compression from 'compression';
import helmet from 'helmet';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import { serve, setup } from 'swagger-ui-express';
import auth from './middlewares/auth.js'
import userRoutes from './routes/users.js';
import orgRoutes from './routes/organisations.js';
import authRoutes from './routes/auth.js'
import fs from 'fs';
import YAML from 'yaml';

import dotenv from 'dotenv';
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware setup
app.use(json());
app.use(urlencoded({ extended: true }));
app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers
app.use(compression()); // Gzip compression
// app.use(morgan('combined')); // Logging

// Rate limiting to prevent abuse
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Swagger setup for API documentation
if (process.env.NODE_ENV === 'development') {
    const file = fs.readFileSync('./swagger.yaml', 'utf8')
    const swaggerDocument = YAML.parse(file)

    app.use('/api-docs', serve, setup(swaggerDocument));
}

// app.get('/hello', (req, res) => {
//     res.status(200).send('Hello, world!');
// });

// Authentication Route
// app.use('/', authRoutes)

// // Auth Middleware
// app.use('/', auth)

// API routes
app.use('/users', userRoutes);
app.use('/organisations', orgRoutes);

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(async () => {
        console.log('HTTP server closed');
        process.exit(0);
    });
});

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message,
        error: process.env.NODE_ENV === 'development' ? err : {}
    });
});

const server = app.listen(port, () => {
    console.log(`Server running on port ${port} in ${process.env.NODE_ENV} mode`);
});

export default app;

require('colors');
const express = require('express');
const app = express();
const cors = require('cors');
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'LockedInServer API',
            version: '1.0.0',
            description: 'API documentation for LockedInServer',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['./routes/*.js'], // Path to your route files for Swagger to scan
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Middleware
app.use(express.json());
app.use(cors());

// Swagger route
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
const employeeRoutes = require('./routes/patients');
app.use('/api/v1/employee', employeeRoutes);

// Start server
const PORT = 3000;
app.listen(PORT, console.log(`Server running on port ${PORT}`.bgBlue));
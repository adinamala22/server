const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Title',
      version: '1.0.0',
      description: 'API Documentation',
    },
    servers: [
      {
        url: 'http://localhost:8000', // Update with your server URL
        description: 'Development server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Update with your route file path
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };

// const express = require('express');

// const app = express();

// module.exports = app;

// app.js

const express = require('express');
const cors = require('cors');
const { swaggerUi, specs } = require('./swaggerConfig');
const { connectDB } = require('./db'); // Import the connectDB function from db.js
const donationRoutes = require('./routes/donationController'); // Import your donation controller
const notificationRoutes = require('./routes/notificationController'); // Import your notification controller
const ratingsRoutes = require('./routes/ratingsController'); // Import your ratings controller
const userLoginRoutes = require('./routes/userLoginController'); // Import your user login controller

const app = express();

// Initialize database connection
connectDB();

// Middleware and other setup
app.use(cors());
app.use(express.json()); // Body parser middleware
// Add other middleware and routes as needed
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
// Routes
app.use('/api/v1', donationRoutes);
app.use('/api/v2', notificationRoutes);
app.use('/api/v3', ratingsRoutes);
app.use('/api/v4', userLoginRoutes);
// Add more routes as needed

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`App running on port ${PORT}`);
});

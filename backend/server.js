const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const contactRoutes = require('./routes/contactRoutes');
const subscriptionRoutes = require('./routes/subscriptionRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (assuming your index.html is in a 'public' folder)
app.use(express.static(path.join(__dirname, '../')));

// Session middleware
app.use(session({
  secret: 'your_session_secret', // Replace with your session secret
  resave: false,
  saveUninitialized: true,
}));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB');
})
.catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

// Define Swagger options
const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Your API Documentation',
      version: '1.0.0',
      description: 'API documentation for your application',
    },
    servers: [{ url: 'http://localhost:5000' }],
    components: {
      schemas: {
        Contact: {
          type: 'object',
          properties: {
            name: { type: 'string' },
            email: { type: 'string' },
            subject: { type: 'string' },
            message: { type: 'string' },
          },
          required: ['name', 'email', 'subject', 'message'],
        },
        Subscription: {
          type: 'object',
          properties: {
            email: { type: 'string', format: 'email' },
          },
          required: ['email'],
        },
      },
    },
  },
  apis: ['./routes/*.js'], // Path to your route files
};
const swaggerSpec = swaggerJsdoc(swaggerOptions);

// Use Swagger UI middleware
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api', contactRoutes); // Your existing contact routes
app.use('/api', subscriptionRoutes); // New subscription routes

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

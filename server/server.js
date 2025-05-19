const express = require('express');
const cors = require('cors');
require('dotenv').config();
const connectDB = require('./config/db');

// Import routes
const signupRoutes = require('./routes/signupRoutes');
const adminRoutes = require('./routes/adminRoutes');

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

// Enhanced CORS configuration for deployment
app.use(cors({
  origin: function(origin, callback) {
    const allowedOrigins = ['http://localhost:3000', 'https://linilog.vercel.app'];
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'x-auth-token'],
  exposedHeaders: ['x-auth-token']
}));

// Middleware
app.use(express.json());

// Routes
app.use('/api/signup', signupRoutes);
app.use('/api/admin', adminRoutes);

// Health check route
app.get('/', (req, res) => {
  res.send('LinIlog API is running...');
});

// For Vercel serverless functions
if (process.env.NODE_ENV === 'production') {
  // Export the Express API for serverless use
  module.exports = app;
} else {
  // Start the server when running locally
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
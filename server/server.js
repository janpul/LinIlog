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

// Serve static files
app.use(express.static('public'));

// Health check route with enhanced status page
app.get('/', (req, res) => {
  const statusHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>LinIlog API Status</title>
      <style>
        body {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          margin: 0;
          padding: 0;
          background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
          color: #333;
          line-height: 1.6;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        .container {
          max-width: 800px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
          padding: 2rem;
          margin: 2rem;
          width: 100%;
        }
        header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        h1 {
          color: #4CAF50;
          margin-bottom: 0.5rem;
        }
        .status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          margin: 1rem 0;
        }
        .status-indicator {
          width: 15px;
          height: 15px;
          background-color: #4CAF50;
          border-radius: 50%;
          display: inline-block;
        }
        .status-text {
          font-weight: bold;
          color: #4CAF50;
        }

        footer {
          text-align: center;
          margin-top: 2rem;
          font-size: 0.9rem;
          color: #777;
        }
          
        @media (max-width: 768px) {
          .container {
            margin: 1rem;
            padding: 1rem;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <header>
          <h1>LinIlog API</h1>
          <p>Backend service status for LinIlog application</p>
        </header>
        
        <div class="status">
          <span class="status-indicator"></span>
          <span class="status-text">API is operational</span>
        </div>
        
        <footer>
          <p>Server time: ${new Date().toLocaleString()}</p>
          <p>© ${new Date().getFullYear()} LinIlog System</p>
        </footer>
      </div>
    </body>
    </html>
  `;
  
  res.setHeader('Content-Type', 'text/html');
  res.send(statusHtml);
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
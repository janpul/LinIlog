// Configuration for API endpoints
const API_URL = process.env.NODE_ENV === 'production'
  ? 'https://linilog-server.vercel.app' // Update this with your actual deployed backend URL after deployment
  : 'http://localhost:5000';

export default API_URL;

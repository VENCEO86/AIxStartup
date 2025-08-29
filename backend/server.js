const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3002',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AIxStartup API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// Simple test endpoint
app.get('/api/test', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Backend is working!',
    data: {
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    }
  });
});

// Mock data endpoints
app.get('/api/dashboard', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      totalRevenue: 1250000,
      totalExpense: 850000,
      netProfit: 400000,
      monthlyData: [
        { month: '1월', revenue: 100000, expense: 80000, profit: 20000 },
        { month: '2월', revenue: 120000, expense: 90000, profit: 30000 },
        { month: '3월', revenue: 150000, expense: 110000, profit: 40000 }
      ]
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);
  
  res.status(error.status || 500).json({
    success: false,
    error: error.message || 'Internal server error'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 AIxStartup API server is running on port ${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/health`);
  console.log(`🔗 Test endpoint: http://localhost:${PORT}/api/test`);
  console.log(`📈 Dashboard: http://localhost:${PORT}/api/dashboard`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  process.exit(0);
});

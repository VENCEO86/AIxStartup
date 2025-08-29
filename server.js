const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

/**
 * CORS
 * - 지금은 누구나 접근 가능하게 열어둠(초기 운영 편의용)
 * - 운영 안정화 후 'origin'을 프런트 도메인만 허용하도록 좁히자.
 */
app.use(cors({
  origin: (origin, cb) => cb(null, true), // 모두 허용(임시)
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Root 안내(선택)
app.get('/', (req, res) => {
  res.status(200).json({
    ok: true,
    message: 'AIxStartup API root',
    health: '/health or /healthz',
    test: '/api/test',
    dashboard: '/api/dashboard'
  });
});

// Health check (두 엔드포인트 제공)
app.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'AIxStartup API is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});
app.get('/healthz', (req, res) => res.send('ok'));

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

// Dashboard endpoint
app.get('/api/dashboard', (req, res) => {
  res.status(200).json({
    success: true,
    data: {
      revenue: 1250000,
      growth: 15.5,
      customers: 45,
      transactions: 156
    }
  });
});

/**
 * 404 handler
 * - '*'' 사용 금지! -> 경로 없이 app.use(...)로 전체 처리
 */
app.use((req, res) => {
  res.status(404).json({
    success: false,
    error: 'Route not found',
    path: req.originalUrl
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

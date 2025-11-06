/**
 * Mahaguru AI - Backend Server
 *
 * Main entry point for the Mahaguru AI backend API.
 * Provides emotionally intelligent mentorship services.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const morgan = require('morgan');

// Import configuration
const { AI_CONFIG } = require('./config/openai.config');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3001',
  credentials: true,
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000, // 15 minutes
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
  message: 'Too many requests from this IP, please try again later.',
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
app.use(morgan('combined'));

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'Mahaguru AI Backend',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    message: 'Mahaguru AI - Emotion Meets Intelligence',
    version: 'v1.0.0',
    endpoints: {
      health: '/health',
      mentor: '/api/mentor/*',
      students: '/api/students/*',
      institutions: '/api/institutions/*',
    },
  });
});

// Mentor API routes (placeholder for now)
app.post('/api/mentor/chat', async (req, res) => {
  try {
    const mentorService = require('./services/mentor.service');
    const { message, conversationHistory, studentProfile } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    const response = await mentorService.generateResponse({
      message,
      conversationHistory: conversationHistory || [],
      studentProfile: studentProfile || {},
    });

    res.json(response);
  } catch (error) {
    console.error('Error in mentor chat:', error);
    res.status(500).json({ error: 'Failed to process mentor request' });
  }
});

app.post('/api/mentor/options', async (req, res) => {
  try {
    const mentorService = require('./services/mentor.service');
    const { context } = req.body;

    const options = await mentorService.generateResponseOptions(context);

    res.json({ options });
  } catch (error) {
    console.error('Error generating options:', error);
    res.status(500).json({ error: 'Failed to generate response options' });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : undefined,
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    path: req.path,
  });
});

// Start server
app.listen(PORT, () => {
  console.log('╔════════════════════════════════════════════╗');
  console.log('║     MAHAGURU AI - Backend Server          ║');
  console.log('║     Emotion Meets Intelligence            ║');
  console.log('╚════════════════════════════════════════════╝');
  console.log('');
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🤖 AI Model: ${AI_CONFIG.model}`);
  console.log(`⚡ OpenAI API: ${process.env.OPENAI_API_KEY ? 'Configured ✓' : 'Missing ✗'}`);
  console.log('');
  console.log(`📍 Health check: http://localhost:${PORT}/health`);
  console.log(`📍 API info: http://localhost:${PORT}/api`);
  console.log('');
});

module.exports = app;

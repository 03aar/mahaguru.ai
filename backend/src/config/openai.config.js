/**
 * Mahaguru AI - OpenAI Configuration
 *
 * This module configures the OpenAI client for the AI Mentor functionality.
 * It handles API key validation and client initialization.
 */

require('dotenv').config();
const OpenAI = require('openai');

// Validate API key exists
if (!process.env.OPENAI_API_KEY) {
  throw new Error('OPENAI_API_KEY is not defined in environment variables');
}

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// AI Mentor Configuration
const AI_CONFIG = {
  model: 'gpt-4-turbo-preview', // Can be adjusted based on needs
  temperature: 0.7, // Balanced creativity and consistency
  maxTokens: 150, // Keep responses concise (1-2 sentences as per spec)
  systemPrompt: `You are Mahaguru AI, an emotionally intelligent mentor for students aged 16-25.

Your core principles:
- Tone: Calm, neutral, and encouraging
- Response length: 1-2 sentences maximum
- Never judge, always support
- Focus on understanding emotions before providing guidance
- Ask thoughtful questions that help students reflect
- Provide micro-actions, not lectures
- Acknowledge struggles with empathy

Your purpose is to help students gain clarity, confidence, and emotional balance. You understand that academic pressure, confusion, and stress are real challenges. Your role is to listen, understand emotional patterns, and gently guide students toward focus and purpose.

Always respond in a way that feels like breathing—slow, intentional, and grounding.`,
};

// Emotion vectors mapping (e1-e9 as per documentation)
const EMOTION_VECTORS = {
  MOTIVATED: { id: 'e1', weight: 1.0 },
  LOST: { id: 'e2', weight: -0.5 },
  STRESSED: { id: 'e3', weight: -0.7 },
  CALM: { id: 'e4', weight: 0.8 },
  BALANCED: { id: 'e5', weight: 0.9 },
  DISTRACTED: { id: 'e6', weight: -0.4 },
  ANXIOUS: { id: 'e7', weight: -0.6 },
  FOCUSED: { id: 'e8', weight: 0.9 },
  CONFUSED: { id: 'e9', weight: -0.5 },
};

module.exports = {
  openai,
  AI_CONFIG,
  EMOTION_VECTORS,
};

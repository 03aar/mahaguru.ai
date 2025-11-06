# Mahaguru AI Backend

Backend API service for the Mahaguru AI emotionally intelligent mentorship platform.

## Features

- **AI Mentor Service**: OpenAI-powered conversational AI with emotional intelligence
- **Emotion Tracking**: Analyzes and tracks student emotional patterns
- **Secure API**: Rate limiting, CORS, and security headers
- **RESTful Endpoints**: Clean API design for frontend integration

## Setup

### Prerequisites
- Node.js 18+
- npm 9+
- OpenAI API key

### Installation

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**

   Make sure the `.env` file in the root directory contains:
   ```env
   OPENAI_API_KEY=your_key_here
   PORT=3000
   NODE_ENV=development
   ```

4. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev

   # Production mode
   npm start
   ```

## API Endpoints

### Health Check
```http
GET /health
```

**Response**:
```json
{
  "status": "healthy",
  "service": "Mahaguru AI Backend",
  "version": "1.0.0",
  "timestamp": "2025-11-06T12:00:00.000Z"
}
```

### Mentor Chat
```http
POST /api/mentor/chat
Content-Type: application/json

{
  "message": "I'm feeling stressed about my exams",
  "conversationHistory": [
    {
      "role": "user",
      "content": "Previous message"
    },
    {
      "role": "assistant",
      "content": "Previous response"
    }
  ],
  "studentProfile": {
    "currentEmotion": "stressed",
    "learningStyle": "visual",
    "mainGoal": "exam preparation",
    "energyLevel": 6
  }
}
```

**Response**:
```json
{
  "response": "I understand exam stress can feel overwhelming. What specific part worries you most?",
  "emotionUpdate": {
    "STRESSED": -0.7,
    "ANXIOUS": -0.6
  },
  "timestamp": "2025-11-06T12:00:00.000Z",
  "tokens": {
    "prompt_tokens": 120,
    "completion_tokens": 25,
    "total_tokens": 145
  }
}
```

### Generate Response Options
```http
POST /api/mentor/options
Content-Type: application/json

{
  "context": {
    "lastMentorMessage": "What gives you energy to study?"
  }
}
```

**Response**:
```json
{
  "options": [
    "Morning quiet time",
    "Study with friends",
    "Music playing",
    "Clear deadlines"
  ]
}
```

## Project Structure

```
backend/
├── src/
│   ├── config/
│   │   └── openai.config.js    # OpenAI client configuration
│   ├── services/
│   │   └── mentor.service.js   # AI mentor business logic
│   ├── routes/                 # API route handlers (coming soon)
│   ├── middleware/             # Custom middleware (coming soon)
│   └── index.js                # Main server file
├── tests/                      # Test files (coming soon)
├── package.json
└── README.md
```

## Configuration

### OpenAI Configuration

The AI mentor is configured in `src/config/openai.config.js`:

- **Model**: GPT-4 Turbo Preview (can be adjusted)
- **Temperature**: 0.7 (balanced creativity and consistency)
- **Max Tokens**: 150 (keeps responses concise)
- **System Prompt**: Defines AI personality and behavior

### Emotion Vectors

The system tracks 9 emotion vectors (e1-e9):

| Vector | Emotion | Weight Range |
|--------|---------|--------------|
| e1 | Motivated | +1.0 |
| e2 | Lost | -0.5 |
| e3 | Stressed | -0.7 |
| e4 | Calm | +0.8 |
| e5 | Balanced | +0.9 |
| e6 | Distracted | -0.4 |
| e7 | Anxious | -0.6 |
| e8 | Focused | +0.9 |
| e9 | Confused | -0.5 |

## Development

### Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests
npm test

# Lint code
npm run lint

# Format code
npm run format
```

### Adding New Features

1. **New Service**: Add to `src/services/`
2. **New Route**: Add to `src/routes/`
3. **New Middleware**: Add to `src/middleware/`
4. **Configuration**: Update `src/config/`

## Security

- **Rate Limiting**: 100 requests per 15 minutes
- **CORS**: Configured for frontend origin
- **Helmet**: Security headers enabled
- **Input Validation**: All inputs validated
- **Environment Variables**: Sensitive data in .env

## Error Handling

All errors are caught and returned in a consistent format:

```json
{
  "error": "Error message",
  "message": "Detailed message (development only)"
}
```

## Testing

Coming soon: Jest test suite for all services and endpoints.

## Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=3000
OPENAI_API_KEY=your_production_key
DATABASE_URL=your_database_url
JWT_SECRET=your_secure_secret
ENCRYPTION_KEY=your_encryption_key
FRONTEND_URL=https://your-frontend-domain.com
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100
```

### Deployment Platforms

Recommended platforms:
- **AWS Elastic Beanstalk**
- **Heroku**
- **Vercel**
- **Railway**

## Monitoring

Consider adding:
- Application performance monitoring (APM)
- Error tracking (Sentry)
- Logging service (Winston + CloudWatch)
- Analytics (usage patterns)

## License

Proprietary - All rights reserved

---

**Mahaguru AI Backend** — Powering emotionally intelligent mentorship

# Mahaguru AI - Quick Start Guide

Get your Mahaguru AI backend running in 5 minutes!

## Prerequisites

- Node.js 18+ installed ([Download](https://nodejs.org/))
- OpenAI API key (already configured in `.env`)

## Setup Steps

### 1. Install Backend Dependencies

```bash
cd backend
npm install
```

This will install all required packages including:
- Express (web framework)
- OpenAI SDK (AI integration)
- Security middleware (helmet, cors, rate-limiting)
- Development tools (nodemon)

### 2. Verify Environment Configuration

The `.env` file in the root directory should already contain your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key_here
```

**Note**: Your actual API key is already configured in the `.env` file (not committed to git for security).

### 3. Start the Development Server

```bash
npm run dev
```

You should see:

```
╔════════════════════════════════════════════╗
║     MAHAGURU AI - Backend Server          ║
║     Emotion Meets Intelligence            ║
╚════════════════════════════════════════════╝

🚀 Server running on port 3000
🌍 Environment: development
🤖 AI Model: gpt-4-turbo-preview
⚡ OpenAI API: Configured ✓

📍 Health check: http://localhost:3000/health
📍 API info: http://localhost:3000/api
```

### 4. Test the API

#### Health Check

```bash
curl http://localhost:3000/health
```

Expected response:
```json
{
  "status": "healthy",
  "service": "Mahaguru AI Backend",
  "version": "1.0.0",
  "timestamp": "2025-11-06T12:00:00.000Z"
}
```

#### Test AI Mentor Chat

```bash
curl -X POST http://localhost:3000/api/mentor/chat \
  -H "Content-Type: application/json" \
  -d '{
    "message": "I am feeling stressed about my exams",
    "studentProfile": {
      "currentEmotion": "stressed",
      "mainGoal": "exam preparation"
    }
  }'
```

Expected response:
```json
{
  "response": "I understand exam stress can feel overwhelming. What specific part worries you most?",
  "emotionUpdate": {
    "STRESSED": -0.7
  },
  "timestamp": "2025-11-06T12:00:00.000Z"
}
```

## What's Next?

### Backend Development
- Add database integration (Firebase/Supabase)
- Implement authentication (JWT)
- Create additional API endpoints
- Add comprehensive error handling
- Write unit tests

### Frontend Development
- Set up React Native project
- Implement UI screens (see `docs/PRODUCT_SPEC.md`)
- Integrate with backend API
- Implement emotion tracking
- Add offline support

### Documentation
- Review `README.md` for full project overview
- Check `docs/PRODUCT_SPEC.md` for product specifications
- Read `backend/README.md` for backend API details

## Troubleshooting

### Port Already in Use

If port 3000 is already in use:

```bash
# Change PORT in .env file
PORT=3001

# Or kill the process using port 3000
lsof -ti:3000 | xargs kill -9
```

### OpenAI API Errors

If you get OpenAI API errors:

1. Verify your API key in `.env`
2. Check your OpenAI account has credits
3. Verify the API key has proper permissions
4. Check OpenAI API status: https://status.openai.com/

### Module Not Found

If you see "Cannot find module" errors:

```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

## Development Workflow

1. **Make changes** to files in `backend/src/`
2. **Server auto-reloads** (thanks to nodemon)
3. **Test API** using curl or Postman
4. **Commit changes** when satisfied
5. **Push to repository**

## Useful Commands

```bash
# Install dependencies
npm install

# Start development server (auto-reload)
npm run dev

# Start production server
npm start

# Run tests (when available)
npm test

# Lint code
npm run lint

# Format code
npm run format
```

## API Testing Tools

### Using cURL (Command Line)
```bash
curl -X POST http://localhost:3000/api/mentor/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "Hello"}'
```

### Using Postman
1. Download Postman: https://www.postman.com/downloads/
2. Create new request
3. Set method to POST
4. URL: `http://localhost:3000/api/mentor/chat`
5. Headers: `Content-Type: application/json`
6. Body: raw JSON

### Using JavaScript (fetch)
```javascript
fetch('http://localhost:3000/api/mentor/chat', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    message: 'I need help with focus',
    studentProfile: {
      currentEmotion: 'distracted',
      energyLevel: 5
    }
  })
})
.then(res => res.json())
.then(data => console.log(data));
```

## Project Structure Overview

```
mahaguru.ai/
├── backend/              # Node.js API server
│   ├── src/
│   │   ├── config/       # Configuration (OpenAI, etc.)
│   │   ├── services/     # Business logic (AI mentor)
│   │   └── index.js      # Main server file
│   └── package.json
├── frontend/             # React Native app (coming soon)
├── docs/                 # Documentation
│   └── PRODUCT_SPEC.md   # Product specifications
├── .env                  # Environment variables (DO NOT COMMIT)
├── .env.example          # Example environment file
├── .gitignore           # Git ignore rules
├── README.md            # Project overview
└── QUICKSTART.md        # This file
```

## Support

For issues or questions:
1. Check the documentation in `docs/`
2. Review the README files
3. Contact the development team

---

**You're all set!** 🚀

Start building the future of emotionally intelligent education with Mahaguru AI.

**Emotion Meets Intelligence** ✨

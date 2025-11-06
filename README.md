# Mahaguru AI

**Emotion Meets Intelligence**

## Overview

Mahaguru AI is an emotionally intelligent mentorship platform for students aged 16 to 25. It bridges the gap between academic pressure and mental well-being by providing:

- **AI Mentor**: Understands emotions, motivation, and learning patterns
- **Institution Dashboard**: Tracks engagement, mood trends, and retention metrics

**Mission**: Revive the Gurukul spirit of mentorship using modern AI — blending empathy, clarity, and purpose.

## Core Objectives

- Reduce student burnout and confusion
- Improve motivation, focus, and emotional balance
- Enable institutions to monitor and support well-being
- Align with NEP 2020's vision of holistic, personalized education

## Technology Stack

| Layer | Technology |
|-------|-----------|
| Frontend | React Native / Flutter (Black UI Kit) |
| Backend | Node.js + Express |
| Database | Firebase / Supabase |
| AI Engine | OpenAI API (GPT-4) |
| Analytics | TensorFlow Lite / PyTorch |
| Hosting | AWS Amplify / Vercel |
| Security | AES-256 encryption + GDPR compliance |

## Project Structure

```
mahaguru.ai/
├── backend/           # Node.js backend API
│   ├── src/
│   │   ├── config/    # Configuration files
│   │   ├── services/  # Business logic services
│   │   ├── routes/    # API routes
│   │   └── index.js   # Main entry point
│   └── package.json
├── frontend/          # React Native mobile app
├── docs/              # Documentation
├── .env               # Environment variables (not in git)
├── .env.example       # Example environment variables
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm 9+
- OpenAI API key
- Firebase/Supabase account (for production)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mahaguru.ai
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env and add your OpenAI API key
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

   The server will start on `http://localhost:3000`

### Environment Variables

The `.env` file should contain:

```env
# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key_here

# Application Configuration
NODE_ENV=development
PORT=3000

# Security
JWT_SECRET=your_jwt_secret_here
ENCRYPTION_KEY=your_encryption_key_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3001
```

**⚠️ IMPORTANT**: Never commit the `.env` file to version control!

## API Endpoints

### Health Check
```
GET /health
```
Returns server health status.

### Mentor Chat
```
POST /api/mentor/chat
```
Send a message to the AI mentor and receive a personalized response.

**Request Body**:
```json
{
  "message": "I'm feeling stressed about my exams",
  "conversationHistory": [],
  "studentProfile": {
    "currentEmotion": "stressed",
    "mainGoal": "exam preparation"
  }
}
```

**Response**:
```json
{
  "response": "I understand exam stress can feel overwhelming. What specific part worries you most?",
  "emotionUpdate": {
    "STRESSED": -0.7
  },
  "timestamp": "2025-11-06T12:00:00.000Z"
}
```

### Generate Response Options
```
POST /api/mentor/options
```
Get contextual response options for the student.

## Design Principles

1. **Minimalism**: Black & white interface, zero clutter
2. **Calm Aesthetic**: Monochrome visuals → emotional neutrality
3. **No Typing**: Only tap / choose — keeps students focused
4. **Emotion First**: Every flow adapts to mood context
5. **Accessibility**: Works seamlessly across phones, tablets, web

## Color System

- **Deep Charcoal Black** (#0B0C0C): Backgrounds, text-heavy areas
- **Pure White** (#FFFFFF): Text, logos, icons
- **Emerald Green** (#00A870): Accent for buttons, active states (use sparingly)
- **Mist Gray Light** (#F2F4F3): Light backgrounds
- **Graphite Gray Medium** (#6B7171): Secondary text

**Usage Ratio**: 70% Black, 20% White, 5% Green, 5% Gray

## AI Behavior Specification

- **Tone**: Calm, neutral, encouraging
- **Response Length**: 1-2 sentences maximum
- **Logic**: Every answer updates emotion vector (e1 → e9)
- **Adaptive Loop**: After 5 interactions, AI updates student mood model + suggests micro-action

## Development

### Running in Development Mode
```bash
cd backend
npm run dev
```

### Running Tests
```bash
npm test
```

### Code Formatting
```bash
npm run format
```

## Security & Privacy

- All emotional data is anonymized and aggregated
- AES-256 encryption for sensitive information
- GDPR compliant data handling
- Students have full control over their personal data
- Transparent about how data is used

## Roadmap

| Phase | Duration | Deliverable |
|-------|----------|-------------|
| Alpha Build | 2 months | Prototype + Demo Chat Flow |
| Pilot | 3 months | Data Collection + Feedback |
| MVP Launch | 6 months | Full Chat + Dashboard |
| Board Partnership | 9 months | CBSE/AICTE integration |
| Scale Phase | 12 months | 100 institutions deployment |

## Success Metrics

| Metric | Target |
|--------|--------|
| Student Engagement Rate | > 70% weekly active |
| Reported Stress Reduction | ≥ 25% within 3 months |
| Retention Improvement | ≥ 15% |
| Faculty Adoption | > 60% participation |
| Institutional Renewal | > 80% after pilot |

## Contributing

This is a private project currently in development. Contributions are managed by the core team.

## License

Proprietary - All rights reserved

## Contact

For more information about Mahaguru AI, please contact the project team.

---

**Mahaguru AI** — Making intelligence human again.

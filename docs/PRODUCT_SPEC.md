# Mahaguru AI — Product Specification

## Vision

Mahaguru AI is built on one simple belief: every student deserves clarity, confidence, and emotional balance while pursuing education. In an age of constant digital noise, competition, and uncertainty, students face an invisible crisis—stress, confusion, and loss of purpose.

Mahaguru AI was created to bridge this emotional gap using the power of artificial intelligence that understands, guides, and uplifts. The product aims to revive the ancient Gurukul principle of mentorship, reimagined through modern technology that listens, learns, and cares.

## The Problem

Students today face pressure on multiple fronts:
- Academic performance expectations
- Social pressures and comparisons
- Career anxiety and uncertainty
- Mental health challenges

Traditional counseling is limited by:
- Availability constraints
- Time limitations
- Social stigma
- Lack of scalability

Most students do not actively seek help until they reach a breaking point, and most institutions cannot track emotional health at scale.

## The Solution

Mahaguru AI delivers continuous mentorship through emotionally intelligent interaction:

1. **Personal AI Mentor**: Calm, minimal interface that reflects stillness rather than stimulation
2. **Emotional Understanding**: Understands mood, motivation, and learning style through simple questions
3. **Personalized Journey**: Creates adaptive mentorship that evolves daily
4. **Touch-Based Interaction**: Quick reflections through choices, not typing
5. **Pattern Learning**: Interprets signals, learns emotional patterns, suggests micro-actions
6. **Institutional Insights**: Anonymized, aggregated data for early intervention

## User Experience

### Onboarding Flow (9 Screens)

#### Screen 1 – Splash Screen
- Full black background
- White Mahaguru AI logo (interlocked M + A neural motif)
- Tagline: "Emotion Meets Intelligence"
- 2-second whoosh fade → next screen

#### Screen 2 – Welcome Screen
- Header: "Welcome to Mahaguru AI"
- Sub-text: "Your personal mentor for clarity, confidence & calm"
- Buttons: Get Started | Learn More

#### Screen 3 – Account Setup
- Tabs: Login | Sign Up | Guest Mode
- Fields: Name, Email, Password, Role (Student/Teacher/Parent)
- Checkbox: "I agree to Mahaguru Ethical AI Policy"

#### Screen 4 – Emotional Check-in
- "How do you feel today?"
- Options: Motivated / Lost / Stressed / Calm
- Micro-animation: gentle pulse ripple

#### Screen 5 – Purpose Finder
- "What is your main goal right now?"
- Study for exams / Find career direction / Improve self / Stay consistent

#### Screen 6 – Learning Style
- "How do you learn best?"
- Visual / Auditory / Practice-based / Group projects

#### Screen 7 – Motivation Barrier
- "What holds you back most?"
- Distraction / Overthinking / Lack of clarity / Low energy

#### Screen 8 – Energy Level Slider
- "Rate your energy today"
- Slider 1-10 with soft white glow feedback

#### Screen 9 – Personalized Intro Result
- "Hi [Name], I'm your Mahaguru Mentor"
- Shows emotion summary
- CTA: Start My Journey →

### Main Application Structure

#### Home (Chat View)
- Two panels:
  - AI Mentor Bubble: empathetic text, left-aligned white fill
  - Response Cards: selectable options (b&w chips)

Example flow:
```
Mentor: "What gives you energy to study?"
(a) Music
(b) Friends
(c) Quiet
(d) Deadlines
```

#### Mood Pulse (Insights)
- Icon: Pulse Wave
- Metrics: Mood Index / Focus Trend / Challenge Heatmap
- Button: Reflect Now → Mini Journal

#### Growth Journal
- Auto-generated daily summaries
- "Your consistency rose by 12% this week"
- Export PDF or Share with Mentor

#### Mentor Actions Menu
- My Goals
- Daily Check-In
- Progress Graph
- Settings

## Data Model

### Student Profile
- Name, Age, Role
- Emotional Baseline
- Learning Style
- Current Goals
- Main Barriers

### Session Logs
- Timestamp
- Emotion State
- Choice Path
- AI Response
- Emotion Vector Updates

### Insights
- Focus Score
- Mood Index
- Retention Risk
- Engagement Trends

### Institution Data
- Name
- Student Count
- Well-being Average
- Risk Alerts

## AI Behavior Specification

### Core Principles
1. **Tone**: Calm, neutral, encouraging
2. **Response Length**: 1-2 sentences maximum
3. **Emotion Tracking**: Every answer updates emotion vector (e1 → e9)
4. **Adaptive Learning**: After 5 interactions, AI updates student mood model
5. **Micro-Actions**: Suggests small, actionable steps rather than lectures

### Emotion Vectors

| Vector | Emotion | Weight |
|--------|---------|--------|
| e1 | Motivated | +1.0 |
| e2 | Lost | -0.5 |
| e3 | Stressed | -0.7 |
| e4 | Calm | +0.8 |
| e5 | Balanced | +0.9 |
| e6 | Distracted | -0.4 |
| e7 | Anxious | -0.6 |
| e8 | Focused | +0.9 |
| e9 | Confused | -0.5 |

### System Prompt
The AI mentor operates under this guiding prompt:

"You are Mahaguru AI, an emotionally intelligent mentor for students aged 16-25. Your tone is calm, neutral, and encouraging. Your responses are 1-2 sentences maximum. You never judge, always support. You focus on understanding emotions before providing guidance. You ask thoughtful questions that help students reflect. You provide micro-actions, not lectures. You acknowledge struggles with empathy. Your purpose is to help students gain clarity, confidence, and emotional balance."

## Institution Dashboard

### Overview Panel
- Active Students count
- Mood Distribution (pie chart)
- Risk Heatmap (color-coded by class)

### Filters
- By class
- By gender
- By time period

### Reports
- Exportable Weekly PDF
- Alerts: "10 students show decline in focus > 15%"
- Trend Analysis
- Early Warning System

### Privacy
- All data anonymized
- Aggregated insights only
- No individual identification
- GDPR compliant

## Design Language

### Typography
- Typeface: SF Pro Display / Inter
- Weights: Medium to Bold only
- No italics, no gradients, no shadows

### Icons
- Geometric line icons
- 1.5px stroke weight
- White on black
- Grey glow on hover/focus

### Motion & Micro-Interactions
- All transitions: fade + slide (0.4s)
- Tap feedback: soft white glow
- Sound design: low-frequency "bloom" for entry, soft ping on interaction

### Logo
- Monoline "M" and "A" interlocked into neural knot
- White on black
- Animated glow on boot
- Always centered, never boxed
- Can pulse subtly during AI responses

## Ethical Framework

1. **Privacy First**: Emotional data is sensitive human information, never commercial asset
2. **Transparency**: Clear about how data is used
3. **Student Control**: Full control over personal record
4. **Neutrality**: AI trained for non-judgment and empathy
5. **Human-Augmented**: Complements, not replaces, human counseling
6. **Psychologist-Guided**: Experts part of design process

## Success Metrics

### Student Metrics
- Engagement Rate: > 70% weekly active
- Stress Reduction: ≥ 25% within 3 months
- Focus Improvement: Measurable via daily check-ins
- Goal Clarity: Self-reported improvement

### Institutional Metrics
- Retention Improvement: ≥ 15%
- Faculty Adoption: > 60% participation
- Early Intervention: Reduction in crisis situations
- Institutional Renewal: > 80% after pilot

## Technical Requirements

### Performance
- Response time: < 2 seconds for AI responses
- Uptime: 99.9% availability
- Scalability: Support 10,000+ concurrent users

### Security
- AES-256 encryption
- JWT authentication
- Rate limiting
- Input validation
- XSS protection

### Compliance
- GDPR compliant
- NEP 2020 aligned
- Education data privacy standards
- Ethical AI guidelines

## Future Enhancements

### Phase 2
- Voice interaction mode
- Parent portal
- Multilingual support (Hindi, regional languages)
- Integration with LMS platforms

### Phase 3
- Predictive analytics for dropout prevention
- Career guidance integration
- Peer mentorship matching
- Community features

### Phase 4
- Corporate learning extension
- Youth development programs
- National emotional-intelligence network
- Research partnerships with universities

---

**Mahaguru AI** — Making intelligence human again.

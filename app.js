/**
 * Mahaguru AI - Interactive Application
 * Emotion Meets Intelligence
 */

// === STATE MANAGEMENT ===
const state = {
    currentScreen: 'splash-screen',
    userData: {
        name: '',
        email: '',
        role: '',
        emotion: '',
        purpose: '',
        learningStyle: '',
        barrier: '',
        energyLevel: 5
    },
    conversationHistory: []
};

// === MOCK AI RESPONSES ===
const aiResponses = {
    'help with focus': [
        "Let's work on your focus together. What time of day do you feel most alert?",
        "Focus is a skill we can build. What usually pulls your attention away?",
        "I understand focus can be challenging. Small steps help—shall we create a 20-minute focus block?"
    ],
    'feeling overwhelmed': [
        "It's okay to feel overwhelmed. Let's break things down into smaller pieces.",
        "Overwhelm often comes from trying to do too much at once. What's the one thing that matters most right now?",
        "I hear you. Sometimes we need to pause and breathe. What would help you feel lighter?"
    ],
    'need motivation': [
        "Motivation comes and goes—consistency is what matters. What's one small thing you can do today?",
        "What gave you energy when you last felt motivated? Let's reconnect with that feeling.",
        "Motivation follows action. What's the smallest step you could take right now?"
    ],
    'career guidance': [
        "Career paths can feel uncertain. What subjects or activities make you lose track of time?",
        "Let's explore your strengths first. What do people often ask you for help with?",
        "Your career will unfold naturally. For now, what skills are you curious to develop?"
    ],
    'default': [
        "Tell me more about that. What's making you feel this way?",
        "I'm here to listen. What would help you most right now?",
        "That's important. How long have you been feeling this way?",
        "I understand. What's one thing that might make this easier?"
    ]
};

// Mock response options based on context
const contextualOptions = {
    'focus': ['Morning routine', 'Evening study', 'Short breaks', 'Music helps'],
    'overwhelmed': ['List priorities', 'Take a break', 'Talk to someone', 'One task at a time'],
    'motivation': ['Set small goals', 'Remember my why', 'Reward myself', 'Get support'],
    'career': ['My interests', 'My strengths', 'Explore options', 'Talk to mentors'],
    'default': ['Tell me more', 'I understand', 'What helps?', 'Next steps?']
};

// === INITIALIZATION ===
document.addEventListener('DOMContentLoaded', () => {
    console.log('Mahaguru AI - Emotion Meets Intelligence');

    // Show splash screen, then welcome screen (faster timing)
    setTimeout(() => {
        showScreen('welcome-screen');
    }, 1200);

    // Initialize energy slider
    const energySlider = document.getElementById('energy-slider');
    if (energySlider) {
        energySlider.addEventListener('input', (e) => {
            document.getElementById('energy-value').textContent = e.target.value;
        });
    }
});

// === SCREEN NAVIGATION ===
function showScreen(screenId) {
    // Remove active class from all screens
    document.querySelectorAll('.screen').forEach(screen => {
        screen.classList.remove('active');
    });

    // Add active class to target screen
    const targetScreen = document.getElementById(screenId);
    if (targetScreen) {
        targetScreen.classList.add('active');
        state.currentScreen = screenId;

        // Scroll to top
        if (targetScreen.querySelector('.content-wrapper')) {
            targetScreen.querySelector('.content-wrapper').scrollTop = 0;
        }
    }

    // Close menu if open
    if (document.getElementById('side-menu').classList.contains('open')) {
        toggleMenu();
    }
}

// === FORM HANDLING ===
function handleSignup(event) {
    event.preventDefault();

    // Get form values
    state.userData.name = document.getElementById('name').value;
    state.userData.email = document.getElementById('email').value;
    state.userData.role = document.getElementById('role').value;

    // Move to emotion check-in
    showScreen('emotion-screen');
}

function skipToOnboarding() {
    state.userData.name = 'Guest';
    showScreen('emotion-screen');
}

// === OPTION SELECTION ===
function selectOption(category, value) {
    // Store selection
    state.userData[category] = value;

    // Navigate to next screen based on category
    const screenFlow = {
        'emotion': 'purpose-screen',
        'purpose': 'learning-screen',
        'learning': 'barrier-screen',
        'barrier': 'energy-screen',
        'energy': 'intro-screen'
    };

    const nextScreen = screenFlow[category];

    if (nextScreen === 'intro-screen') {
        generatePersonalizedIntro();
    }

    if (nextScreen) {
        setTimeout(() => {
            showScreen(nextScreen);
        }, 150);
    }
}

// === PERSONALIZED INTRO ===
function generatePersonalizedIntro() {
    const userName = state.userData.name || 'there';
    const emotion = state.userData.emotion || 'balanced';
    const purpose = state.userData.purpose || 'growth';
    const barrier = state.userData.barrier || 'challenges';

    // Update name
    document.getElementById('user-name').textContent = userName;

    // Generate summary based on selections
    const summaries = {
        'motivated': 'You seem energized and ready to take on challenges.',
        'lost': 'You're feeling uncertain, but that's okay—clarity comes with time.',
        'stressed': 'You're carrying some stress, but you're here seeking balance.',
        'calm': 'You seem centered and at peace with where you are.'
    };

    const purposes = {
        'exams': 'focusing on your exams',
        'career': 'exploring your career path',
        'growth': 'working on personal growth',
        'consistency': 'building consistency'
    };

    const barriers = {
        'distraction': 'managing distractions',
        'overthinking': 'quieting your mind',
        'clarity': 'finding clarity',
        'energy': 'building energy'
    };

    const summary = `
        ${summaries[emotion] || 'You're on a journey of self-discovery.'}
        You're ${purposes[purpose] || 'seeking growth'}, and I'll help you with ${barriers[barrier] || 'your challenges'}.
        <br><br>
        Together, we'll work through this one step at a time.
    `;

    document.getElementById('emotion-summary').innerHTML = summary;
}

// === CHAT FUNCTIONALITY ===
function sendMessage(message) {
    const chatContainer = document.getElementById('chat-container');

    // Add user message
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user-message';
    userMessage.innerHTML = `<div class="message-bubble">${message}</div>`;
    chatContainer.appendChild(userMessage);

    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Store in history
    state.conversationHistory.push({
        role: 'user',
        content: message
    });

    // Simulate typing delay (faster response)
    setTimeout(() => {
        const response = getAIResponse(message);
        addMentorMessage(response);
        updateChatOptions(message);
    }, 600);
}

function addMentorMessage(message) {
    const chatContainer = document.getElementById('chat-container');

    const mentorMessage = document.createElement('div');
    mentorMessage.className = 'chat-message mentor-message';
    mentorMessage.innerHTML = `<div class="message-bubble">${message}</div>`;
    chatContainer.appendChild(mentorMessage);

    // Scroll to bottom
    chatContainer.scrollTop = chatContainer.scrollHeight;

    // Store in history
    state.conversationHistory.push({
        role: 'assistant',
        content: message
    });
}

function getAIResponse(message) {
    const lowerMessage = message.toLowerCase();

    // Find matching response category
    for (const [key, responses] of Object.entries(aiResponses)) {
        if (lowerMessage.includes(key)) {
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }

    // Default response
    const defaultResponses = aiResponses.default;
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function updateChatOptions(lastMessage) {
    const lowerMessage = lastMessage.toLowerCase();
    const optionsContainer = document.getElementById('chat-options');

    // Determine context
    let context = 'default';
    if (lowerMessage.includes('focus')) context = 'focus';
    else if (lowerMessage.includes('overwhelm')) context = 'overwhelmed';
    else if (lowerMessage.includes('motivat')) context = 'motivation';
    else if (lowerMessage.includes('career')) context = 'career';

    // Get contextual options
    const options = contextualOptions[context] || contextualOptions.default;

    // Update options
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const chip = document.createElement('button');
        chip.className = 'option-chip';
        chip.textContent = option;
        chip.onclick = () => sendMessage(option);
        optionsContainer.appendChild(chip);
    });
}

// === MENU TOGGLE ===
function toggleMenu() {
    const menu = document.getElementById('side-menu');
    menu.classList.toggle('open');
}

// === INSIGHTS ===
function showReflection() {
    const reflections = [
        "Today you showed consistency in your learning journey. What helped you stay focused?",
        "You've been here 3 days in a row. That's real commitment. How does that feel?",
        "Your mood has been steady this week. What's been supporting your balance?",
        "You identified 'distraction' as a challenge. What strategies have you tried?"
    ];

    const reflection = reflections[Math.floor(Math.random() * reflections.length)];

    // Show as alert for demo (in real app, would be a proper modal)
    alert('Daily Reflection:\n\n' + reflection);
}

// === DEMO HELPERS ===
function resetDemo() {
    state.userData = {
        name: '',
        email: '',
        role: '',
        emotion: '',
        purpose: '',
        learningStyle: '',
        barrier: '',
        energyLevel: 5
    };
    state.conversationHistory = [];

    // Clear chat
    const chatContainer = document.getElementById('chat-container');
    chatContainer.innerHTML = `
        <div class="chat-message mentor-message">
            <div class="message-bubble">
                Hello! I'm here to support you on your journey. What's on your mind today?
            </div>
        </div>
    `;

    // Reset options
    const optionsContainer = document.getElementById('chat-options');
    optionsContainer.innerHTML = `
        <button class="option-chip" onclick="sendMessage('I need help with focus')">Help with focus</button>
        <button class="option-chip" onclick="sendMessage('Feeling overwhelmed')">Feeling overwhelmed</button>
        <button class="option-chip" onclick="sendMessage('Need motivation')">Need motivation</button>
        <button class="option-chip" onclick="sendMessage('Career guidance')">Career guidance</button>
    `;

    showScreen('welcome-screen');
}

// === KEYBOARD SHORTCUTS (for demo) ===
document.addEventListener('keydown', (e) => {
    // ESC to close menu
    if (e.key === 'Escape') {
        const menu = document.getElementById('side-menu');
        if (menu.classList.contains('open')) {
            toggleMenu();
        }
    }

    // R to reset demo (for testing)
    if (e.key === 'r' && e.ctrlKey) {
        e.preventDefault();
        if (confirm('Reset demo?')) {
            resetDemo();
        }
    }
});

// === ANALYTICS (Mock) ===
function trackEvent(eventName, properties = {}) {
    console.log('Analytics Event:', eventName, properties);
    // In production, this would send to analytics service
}

// Track screen views
const originalShowScreen = showScreen;
showScreen = function(screenId) {
    trackEvent('screen_view', { screen: screenId });
    return originalShowScreen(screenId);
};

// === EXPORT FOR DEBUGGING ===
if (typeof window !== 'undefined') {
    window.MahaguruAI = {
        state,
        showScreen,
        sendMessage,
        resetDemo,
        version: '1.0.0'
    };

    console.log('%cMahaguru AI v1.0.0', 'color: #00A870; font-size: 16px; font-weight: bold;');
    console.log('%cEmotion Meets Intelligence', 'color: #6B7171; font-size: 12px;');
    console.log('Access state via: window.MahaguruAI.state');
    console.log('Reset demo: Ctrl+R or window.MahaguruAI.resetDemo()');
}

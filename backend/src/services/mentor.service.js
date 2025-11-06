/**
 * Mahaguru AI - Mentor Service
 *
 * Core service that handles AI mentor interactions with students.
 * Manages conversation flow, emotion tracking, and personalized guidance.
 */

const { openai, AI_CONFIG, EMOTION_VECTORS } = require('../config/openai.config');

class MentorService {
  /**
   * Generate AI mentor response based on student input
   * @param {Object} params - Request parameters
   * @param {string} params.message - Student's message or selected option
   * @param {Array} params.conversationHistory - Previous conversation context
   * @param {Object} params.studentProfile - Student's emotional profile
   * @returns {Promise<Object>} AI response with emotion analysis
   */
  async generateResponse({ message, conversationHistory = [], studentProfile = {} }) {
    try {
      // Build conversation context
      const messages = [
        {
          role: 'system',
          content: AI_CONFIG.systemPrompt,
        },
        // Add student profile context if available
        ...(Object.keys(studentProfile).length > 0
          ? [
              {
                role: 'system',
                content: `Student context: ${this._buildProfileContext(studentProfile)}`,
              },
            ]
          : []),
        // Add conversation history
        ...conversationHistory.map((msg) => ({
          role: msg.role,
          content: msg.content,
        })),
        // Add current message
        {
          role: 'user',
          content: message,
        },
      ];

      // Call OpenAI API
      const completion = await openai.chat.completions.create({
        model: AI_CONFIG.model,
        messages: messages,
        temperature: AI_CONFIG.temperature,
        max_tokens: AI_CONFIG.maxTokens,
      });

      const aiResponse = completion.choices[0].message.content;

      // Analyze emotional indicators in the message
      const emotionUpdate = this._analyzeEmotion(message);

      return {
        response: aiResponse,
        emotionUpdate,
        timestamp: new Date().toISOString(),
        tokens: completion.usage,
      };
    } catch (error) {
      console.error('Error generating mentor response:', error);
      throw new Error('Failed to generate mentor response');
    }
  }

  /**
   * Generate contextual response options for student
   * @param {Object} context - Current conversation context
   * @returns {Promise<Array>} Array of response options
   */
  async generateResponseOptions(context) {
    try {
      const prompt = `Based on the conversation context, suggest 4 thoughtful, emotionally aware response options for the student. Each should be brief (2-5 words) and help the student reflect or progress.

Context: ${context.lastMentorMessage}

Return only the 4 options as a JSON array of strings.`;

      const completion = await openai.chat.completions.create({
        model: AI_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: 'You generate brief, emotionally intelligent response options.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 100,
      });

      const optionsText = completion.choices[0].message.content;
      const options = JSON.parse(optionsText);

      return options.slice(0, 4); // Ensure max 4 options
    } catch (error) {
      console.error('Error generating response options:', error);
      // Fallback options
      return ['Tell me more', 'I understand', 'What should I do?', 'Let me think'];
    }
  }

  /**
   * Build student profile context string
   * @private
   */
  _buildProfileContext(profile) {
    const parts = [];
    if (profile.currentEmotion) parts.push(`Current emotion: ${profile.currentEmotion}`);
    if (profile.learningStyle) parts.push(`Learning style: ${profile.learningStyle}`);
    if (profile.mainGoal) parts.push(`Main goal: ${profile.mainGoal}`);
    if (profile.mainBarrier) parts.push(`Main barrier: ${profile.mainBarrier}`);
    if (profile.energyLevel) parts.push(`Energy level: ${profile.energyLevel}/10`);

    return parts.join(', ');
  }

  /**
   * Analyze emotional content of student message
   * @private
   */
  _analyzeEmotion(message) {
    const lowerMessage = message.toLowerCase();
    const emotionUpdates = {};

    // Simple keyword-based emotion detection
    // In production, this would use more sophisticated NLP
    const emotionKeywords = {
      MOTIVATED: ['motivated', 'excited', 'ready', 'confident'],
      STRESSED: ['stressed', 'overwhelmed', 'pressure', 'anxious'],
      LOST: ['lost', 'confused', 'unsure', 'don\'t know'],
      CALM: ['calm', 'peaceful', 'relaxed', 'balanced'],
      FOCUSED: ['focused', 'clear', 'determined', 'productive'],
    };

    for (const [emotion, keywords] of Object.entries(emotionKeywords)) {
      if (keywords.some((keyword) => lowerMessage.includes(keyword))) {
        emotionUpdates[emotion] = EMOTION_VECTORS[emotion].weight;
      }
    }

    return emotionUpdates;
  }

  /**
   * Generate daily reflection summary
   * @param {Array} todaysSessions - All sessions from today
   * @returns {Promise<string>} Reflection summary
   */
  async generateDailyReflection(todaysSessions) {
    try {
      const sessionSummary = todaysSessions
        .map((s, i) => `Session ${i + 1}: ${s.mainTopic}`)
        .join('; ');

      const prompt = `Based on these student interactions today, generate a brief, encouraging daily reflection (2-3 sentences):

${sessionSummary}

The reflection should acknowledge their efforts and provide gentle motivation.`;

      const completion = await openai.chat.completions.create({
        model: AI_CONFIG.model,
        messages: [
          {
            role: 'system',
            content: AI_CONFIG.systemPrompt,
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 100,
      });

      return completion.choices[0].message.content;
    } catch (error) {
      console.error('Error generating daily reflection:', error);
      return 'Today you showed consistency in your learning journey. Keep moving forward with clarity and purpose.';
    }
  }
}

module.exports = new MentorService();

# Integration Guide

## Connecting the UI to Your LiveKit Agent

This UI is designed to work with your existing LiveKit agent backend. Here's how to integrate them:

### 1. Agent Backend Setup

Your agent is already configured and running. Make sure it's accessible at:
```
wss://empower-ai-role-play-tgm3k38l.livekit.cloud
```

### 2. UI Configuration

Update your `.env.local` file with the correct LiveKit credentials:

```env
# LiveKit Configuration
NEXT_PUBLIC_LIVEKIT_URL=wss://empower-ai-role-play-tgm3k38l.livekit.cloud
NEXT_PUBLIC_LIVEKIT_TOKEN=your_generated_token

# LiveKit Server Configuration (for token generation)
LIVEKIT_API_KEY=your_livekit_api_key
LIVEKIT_API_SECRET=your_livekit_api_secret
LIVEKIT_URL=wss://empower-ai-role-play-tgm3k38l.livekit.cloud

# OpenAI Configuration (for advanced analysis)
OPENAI_API_KEY=your_openai_api_key
```

### 3. Token Generation

The UI includes an API route (`/api/token`) that generates LiveKit tokens for connecting to your agent. This uses your LiveKit API credentials to create secure tokens.

### 4. Voice Connection Flow

1. User selects a scenario and client type
2. UI generates a LiveKit token using your credentials
3. UI connects to your agent using the token
4. Voice conversation begins with real-time transcription
5. UI analyzes the conversation and provides live scoring
6. Post-session analysis provides detailed feedback

### 5. Agent Customization

Your agent is already configured as a roleplay client. The UI will work with any LiveKit agent that:

- Accepts voice input
- Provides voice output
- Supports real-time transcription
- Can handle different conversation scenarios

### 6. Scoring Integration

The UI provides its own scoring system that analyzes:
- **Upselling**: Detects when you mention additional opportunities
- **Mirroring**: Analyzes communication style matching
- **Tonality**: Tracks emotional intelligence and voice modulation
- **VAK Language**: Monitors visual, auditory, kinesthetic language usage
- **Personality Adaptation**: Assesses adaptation to client personality

### 7. Real-time Features

- **Live Transcription**: Real-time conversation display
- **Live Scoring**: Performance metrics update during conversation
- **Live Tips**: Instant suggestions for improvement
- **Speaking Indicators**: Visual feedback when someone is speaking

### 8. Post-Session Analysis

After each session, the UI provides:
- Detailed scoring breakdown
- Conversation transcript with timestamps
- "What you said vs. What you should have said" comparisons
- Constructive improvement suggestions
- Performance trends over time

### 9. Data Flow

```
User Speech → LiveKit → Your Agent → AI Response → LiveKit → UI
     ↓
UI Transcription & Analysis → Real-time Scoring → Live Feedback
     ↓
Post-Session Analysis → Detailed Report → Improvement Suggestions
```

### 10. Customization Options

You can customize the UI by:
- Adding new scenario types in `SessionSetup.tsx`
- Modifying scoring criteria in `RealTimeScoring.tsx`
- Adjusting analysis prompts in `/api/analyze/route.ts`
- Adding new client personality types
- Customizing the feedback system

### 11. Deployment

For production deployment:
1. Build the UI: `npm run build`
2. Deploy to your hosting platform
3. Update environment variables
4. Ensure your LiveKit agent is accessible
5. Configure domain and SSL certificates

### 12. Troubleshooting

Common issues:
- **Connection failed**: Check LiveKit URL and credentials
- **No audio**: Verify microphone permissions
- **Scoring not working**: Check OpenAI API key
- **Transcription issues**: Verify LiveKit transcription is enabled

### 13. Advanced Features

The UI supports:
- Multiple concurrent sessions
- Session history and analytics
- Performance tracking over time
- Export/import of session data
- Custom scoring algorithms
- Integration with CRM systems

This integration provides a complete roleplay training solution that leverages your existing LiveKit agent while adding comprehensive analysis and feedback capabilities.

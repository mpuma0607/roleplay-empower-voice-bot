# Real Estate Roleplay Training UI

A comprehensive web interface for real estate agents to practice their skills through AI-powered roleplay sessions with real-time scoring and feedback.

## Features

### 🎯 **Real-time Roleplay Sessions**
- Voice-to-voice conversations with AI clients
- Multiple scenario types (first-time buyer, seller consultation, difficult client, etc.)
- Various client personality types (nervous, aggressive, sophisticated, etc.)
- Live audio controls and connection management

### 📝 **Live Transcription**
- Real-time conversation transcription
- Speaker identification (Agent vs Client)
- Confidence scoring for transcription accuracy
- Visual speaking indicators

### 📊 **Real-time Scoring System**
- **Upselling**: Identifying and presenting additional opportunities
- **Mirroring**: Matching client communication style
- **Tonality**: Voice modulation and emotional intelligence
- **VAK Language**: Visual, Auditory, Kinesthetic language usage
- **Personality Adaptation**: Adapting to client personality type
- Live performance tips and suggestions

### 📈 **Comprehensive Analysis**
- Post-session detailed scoring breakdown
- Conversation flow analysis
- Language analysis and professional tone assessment
- Strengths and improvement areas identification

### 💡 **Constructive Feedback**
- "What you said vs. What you should have said" comparisons
- Timestamped conversation highlights
- Specific improvement suggestions
- Performance trends over time

## Setup Instructions

### 1. Install Dependencies

```bash
cd roleplay-ui
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the `roleplay-ui` directory:

```env
# LiveKit Configuration
NEXT_PUBLIC_LIVEKIT_URL=wss://your-livekit-url.livekit.cloud
NEXT_PUBLIC_LIVEKIT_TOKEN=your-livekit-token

# OpenAI Configuration (for advanced analysis)
OPENAI_API_KEY=your-openai-api-key

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 3. Start the Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3000`

## Usage

### Starting a Session

1. **Choose a Scenario**: Select from predefined scenarios or create a custom one
2. **Select Client Type**: Pick the personality type you want to practice with
3. **Connect**: Click "Connect" to establish voice connection with the AI client
4. **Practice**: Have a natural conversation with the AI client

### During the Session

- **Real-time Scoring**: Watch your performance metrics update live
- **Live Tips**: Get instant suggestions for improvement
- **Transcript**: See the conversation transcribed in real-time
- **Audio Controls**: Mute/unmute yourself or the client as needed

### After the Session

- **Detailed Analysis**: Review comprehensive scoring and feedback
- **Transcript Review**: Read through the full conversation
- **Improvement Suggestions**: See specific recommendations with examples
- **Download/Share**: Save or share your session results

## Scoring System

### Upselling (0-100%)
- Identifies when you mention additional value opportunities
- Tracks investment property suggestions
- Monitors premium service offerings

### Mirroring (0-100%)
- Analyzes communication pace matching
- Tracks response length adaptation
- Monitors tone and style consistency

### Tonality (0-100%)
- Detects emotional language usage
- Tracks confidence indicators
- Monitors empathy and understanding

### VAK Language (0-100%)
- Visual words: "see", "look", "picture", "imagine"
- Auditory words: "hear", "listen", "sound", "tell"
- Kinesthetic words: "feel", "touch", "grasp", "experience"

### Personality Adaptation (0-100%)
- Analyzes approach adaptation to client type
- Tracks communication style matching
- Monitors response appropriateness

## Technology Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS
- **Voice**: LiveKit for real-time audio
- **AI**: OpenAI GPT-4 for conversation analysis
- **Icons**: Lucide React
- **Animations**: Framer Motion

## Development

### Project Structure

```
roleplay-ui/
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page
├── components/            # React components
│   ├── Header.tsx         # Application header
│   ├── SessionSetup.tsx   # Session configuration
│   ├── RoleplaySession.tsx # Main session interface
│   ├── RealTimeScoring.tsx # Live scoring system
│   ├── TranscriptDisplay.tsx # Live transcription
│   ├── SessionControls.tsx # Session controls
│   └── SessionResults.tsx # Post-session analysis
├── public/                # Static assets
└── package.json          # Dependencies
```

### Key Components

- **SessionSetup**: Scenario and client type selection
- **RoleplaySession**: Main session interface with LiveKit integration
- **RealTimeScoring**: Live performance analysis and scoring
- **TranscriptDisplay**: Real-time conversation transcription
- **SessionResults**: Comprehensive post-session analysis

## Integration with LiveKit Agent

This UI connects to your existing LiveKit agent backend. Make sure your agent is running and accessible at the configured LiveKit URL.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

MIT License - see LICENSE file for details

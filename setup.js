#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🏠 Real Estate Roleplay Training UI Setup');
console.log('==========================================\n');

// Check if .env.local exists
const envPath = path.join(__dirname, '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('📝 Creating .env.local file...');
  
  const envContent = `# LiveKit Configuration
NEXT_PUBLIC_LIVEKIT_URL=wss://empower-ai-role-play-tgm3k38l.livekit.cloud
NEXT_PUBLIC_LIVEKIT_TOKEN=

# OpenAI Configuration (for advanced analysis)
OPENAI_API_KEY=

# Application Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000

# LiveKit Server Configuration (for token generation)
LIVEKIT_API_KEY=your_livekit_api_key_here
LIVEKIT_API_SECRET=your_livekit_api_secret_here
LIVEKIT_URL=wss://empower-ai-role-play-tgm3k38l.livekit.cloud
`;

  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env.local file created');
} else {
  console.log('✅ .env.local file already exists');
}

console.log('\n📋 Next Steps:');
console.log('1. Update .env.local with your LiveKit credentials');
console.log('2. Add your OpenAI API key for advanced analysis');
console.log('3. Run: npm install');
console.log('4. Run: npm run dev');
console.log('5. Open http://localhost:3000');

console.log('\n🔗 Integration with your LiveKit agent:');
console.log('- Make sure your agent is running on the configured LiveKit URL');
console.log('- The UI will connect to your existing agent for voice conversations');
console.log('- All scoring and analysis happens in the UI');

console.log('\n✨ Features included:');
console.log('- Real-time voice conversations');
console.log('- Live transcription and scoring');
console.log('- Comprehensive post-session analysis');
console.log('- "What you said vs. What you should have said" feedback');
console.log('- Performance tracking over time');

console.log('\n🎯 Ready to start practicing!');

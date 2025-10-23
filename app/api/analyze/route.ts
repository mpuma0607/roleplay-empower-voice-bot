import { NextRequest, NextResponse } from 'next/server'
import OpenAI from 'openai'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export async function POST(request: NextRequest) {
  try {
    const { transcript, scenario, clientType } = await request.json()

    if (!transcript || !Array.isArray(transcript)) {
      return NextResponse.json(
        { error: 'Transcript is required and must be an array' },
        { status: 400 }
      )
    }

    const conversationText = transcript
      .map(entry => `${entry.speaker}: ${entry.text}`)
      .join('\n')

    const prompt = `
Analyze this real estate roleplay conversation and provide detailed feedback.

Scenario: ${scenario}
Client Type: ${clientType}

Conversation:
${conversationText}

Please provide analysis in the following JSON format:
{
  "scores": {
    "upselling": 0-100,
    "mirroring": 0-100,
    "tonality": 0-100,
    "vakUsage": 0-100,
    "personalityAdaptation": 0-100
  },
  "strengths": ["strength1", "strength2", "strength3"],
  "improvements": ["improvement1", "improvement2", "improvement3"],
  "suggestions": [
    {
      "timestamp": 1234567890,
      "original": "What the agent said",
      "suggested": "What they should have said",
      "reason": "Why this would be better"
    }
  ],
  "analysis": {
    "conversationFlow": "Analysis of conversation flow",
    "languageQuality": "Analysis of language usage",
    "emotionalIntelligence": "Analysis of emotional intelligence",
    "professionalTone": "Analysis of professional tone"
  }
}

Focus on:
1. Upselling opportunities missed or taken
2. Communication style matching with client
3. Emotional intelligence and tonality
4. Use of visual, auditory, and kinesthetic language
5. Adaptation to client personality type
6. Specific examples of what could be improved
7. Recognition of what was done well

Be constructive and specific in your feedback.
`

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'You are an expert real estate coach analyzing roleplay conversations. Provide detailed, constructive feedback in the exact JSON format requested.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 2000,
    })

    const response = completion.choices[0]?.message?.content
    if (!response) {
      throw new Error('No response from OpenAI')
    }

    try {
      const analysis = JSON.parse(response)
      return NextResponse.json(analysis)
    } catch (parseError) {
      console.error('Error parsing OpenAI response:', parseError)
      return NextResponse.json(
        { error: 'Failed to parse analysis response' },
        { status: 500 }
      )
    }
  } catch (error) {
    console.error('Error analyzing conversation:', error)
    return NextResponse.json(
      { error: 'Failed to analyze conversation' },
      { status: 500 }
    )
  }
}

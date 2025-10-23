'use client'

import { useState, useEffect } from 'react'
import { TrendingUp, Target, Users, Volume2, Eye, Brain, Star } from 'lucide-react'
import { SessionData } from '@/app/page'

interface RealTimeScoringProps {
  session: SessionData
  transcript: SessionData['transcript']
  onUpdateScores: (scores: SessionData['scores']) => void
}

interface ScoreMetric {
  id: keyof SessionData['scores']
  name: string
  description: string
  icon: React.ReactNode
  color: string
  maxScore: number
}

const scoreMetrics: ScoreMetric[] = [
  {
    id: 'upselling',
    name: 'Upselling',
    description: 'Identifying and presenting additional opportunities',
    icon: <TrendingUp className="h-4 w-4" />,
    color: 'text-green-600',
    maxScore: 100
  },
  {
    id: 'mirroring',
    name: 'Mirroring',
    description: 'Matching client communication style',
    icon: <Users className="h-4 w-4" />,
    color: 'text-blue-600',
    maxScore: 100
  },
  {
    id: 'tonality',
    name: 'Tonality',
    description: 'Voice modulation and emotional intelligence',
    icon: <Volume2 className="h-4 w-4" />,
    color: 'text-purple-600',
    maxScore: 100
  },
  {
    id: 'vakUsage',
    name: 'VAK Language',
    description: 'Visual, Auditory, Kinesthetic language usage',
    icon: <Eye className="h-4 w-4" />,
    color: 'text-orange-600',
    maxScore: 100
  },
  {
    id: 'personalityAdaptation',
    name: 'Personality Match',
    description: 'Adapting to client personality type',
    icon: <Brain className="h-4 w-4" />,
    color: 'text-pink-600',
    maxScore: 100
  }
]

export function RealTimeScoring({ session, transcript, onUpdateScores }: RealTimeScoringProps) {
  const [scores, setScores] = useState(session.scores)
  const [recentImprovements, setRecentImprovements] = useState<string[]>([])

  // Simulate real-time scoring based on transcript analysis
  useEffect(() => {
    if (transcript.length === 0) return

    const analyzeTranscript = () => {
      const newScores = { ...scores }
      const improvements: string[] = []

      // Analyze upselling opportunities
      const upsellingKeywords = ['upgrade', 'premium', 'additional', 'investment', 'value', 'equity']
      const upsellingMentions = transcript.filter(entry => 
        entry.speaker === 'agent' && 
        upsellingKeywords.some(keyword => 
          entry.text.toLowerCase().includes(keyword)
        )
      ).length

      if (upsellingMentions > 0) {
        newScores.upselling = Math.min(100, newScores.upselling + 5)
        improvements.push('Great upselling attempt!')
      } else if (transcript.length > 5) {
        newScores.upselling = Math.max(0, newScores.upselling - 2)
        improvements.push('Consider mentioning additional value opportunities')
      }

      // Analyze mirroring (simplified)
      const agentEntries = transcript.filter(entry => entry.speaker === 'agent')
      const clientEntries = transcript.filter(entry => entry.speaker === 'client')
      
      if (agentEntries.length > 0 && clientEntries.length > 0) {
        // Simple mirroring analysis based on response patterns
        const avgAgentLength = agentEntries.reduce((sum, entry) => sum + entry.text.length, 0) / agentEntries.length
        const avgClientLength = clientEntries.reduce((sum, entry) => sum + entry.text.length, 0) / clientEntries.length
        
        if (Math.abs(avgAgentLength - avgClientLength) < 20) {
          newScores.mirroring = Math.min(100, newScores.mirroring + 3)
          improvements.push('Good communication style matching!')
        }
      }

      // Analyze tonality (simplified - in real app, this would use audio analysis)
      const emotionalKeywords = ['excited', 'thrilled', 'concerned', 'worried', 'confident', 'sure']
      const emotionalMentions = transcript.filter(entry => 
        entry.speaker === 'agent' && 
        emotionalKeywords.some(keyword => 
          entry.text.toLowerCase().includes(keyword)
        )
      ).length

      if (emotionalMentions > 0) {
        newScores.tonality = Math.min(100, newScores.tonality + 4)
        improvements.push('Excellent emotional intelligence!')
      }

      // Analyze VAK language usage
      const visualWords = ['see', 'look', 'picture', 'imagine', 'visualize', 'show']
      const auditoryWords = ['hear', 'listen', 'sound', 'tell', 'speak', 'say']
      const kinestheticWords = ['feel', 'touch', 'grasp', 'hold', 'experience', 'sense']

      const agentText = agentEntries.map(entry => entry.text.toLowerCase()).join(' ')
      const visualCount = visualWords.filter(word => agentText.includes(word)).length
      const auditoryCount = auditoryWords.filter(word => agentText.includes(word)).length
      const kinestheticCount = kinestheticWords.filter(word => agentText.includes(word)).length

      const totalVAK = visualCount + auditoryCount + kinestheticCount
      if (totalVAK > 0) {
        newScores.vakUsage = Math.min(100, newScores.vakUsage + 3)
        improvements.push('Good use of sensory language!')
      }

      // Calculate overall score
      const scoreValues = Object.values(newScores).filter((_, index) => index !== 0) // Exclude overall
      newScores.overall = Math.round(scoreValues.reduce((sum, score) => sum + score, 0) / scoreValues.length)

      setScores(newScores)
      onUpdateScores(newScores)

      if (improvements.length > 0) {
        setRecentImprovements(improvements)
        setTimeout(() => setRecentImprovements([]), 5000)
      }
    }

    analyzeTranscript()
  }, [transcript, scores, onUpdateScores])

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600'
    if (score >= 60) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100'
    if (score >= 60) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold flex items-center">
            <Star className="h-5 w-5 mr-2 text-primary-600" />
            Overall Performance
          </h3>
          <div className={`text-3xl font-bold ${getScoreColor(scores.overall)}`}>
            {scores.overall}%
          </div>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              scores.overall >= 80 ? 'bg-green-500' : 
              scores.overall >= 60 ? 'bg-yellow-500' : 'bg-red-500'
            }`}
            style={{ width: `${scores.overall}%` }}
          />
        </div>
      </div>

      {/* Individual Metrics */}
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h3 className="text-lg font-semibold mb-4">Performance Metrics</h3>
        <div className="space-y-4">
          {scoreMetrics.map((metric) => (
            <div key={metric.id} className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${getScoreBgColor(scores[metric.id])}`}>
                  <div className={metric.color}>
                    {metric.icon}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">{metric.name}</p>
                  <p className="text-xs text-gray-500">{metric.description}</p>
                </div>
              </div>
              <div className="text-right">
                <div className={`text-lg font-bold ${getScoreColor(scores[metric.id])}`}>
                  {scores[metric.id]}%
                </div>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all duration-500 ${
                      scores[metric.id] >= 80 ? 'bg-green-500' : 
                      scores[metric.id] >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                    }`}
                    style={{ width: `${scores[metric.id]}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Improvements */}
      {recentImprovements.length > 0 && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <h4 className="text-sm font-medium text-green-800 mb-2">Recent Improvements</h4>
          <div className="space-y-1">
            {recentImprovements.map((improvement, index) => (
              <p key={index} className="text-sm text-green-700">✓ {improvement}</p>
            ))}
          </div>
        </div>
      )}

      {/* Live Tips */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">Live Tips</h4>
        <div className="space-y-2 text-sm text-blue-700">
          {scores.upselling < 60 && (
            <p>💡 Try mentioning additional value or investment opportunities</p>
          )}
          {scores.mirroring < 60 && (
            <p>💡 Match your client's communication pace and style</p>
          )}
          {scores.tonality < 60 && (
            <p>💡 Use more emotional language to connect with your client</p>
          )}
          {scores.vakUsage < 60 && (
            <p>💡 Incorporate more sensory language (visual, auditory, kinesthetic)</p>
          )}
          {scores.personalityAdaptation < 60 && (
            <p>💡 Adapt your approach to match your client's personality</p>
          )}
        </div>
      </div>
    </div>
  )
}

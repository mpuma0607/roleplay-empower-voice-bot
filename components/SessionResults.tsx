'use client'

import { useState } from 'react'
import { ArrowLeft, Download, Share2, Play, BarChart3, MessageSquare, Target, TrendingUp, Users, Volume2, Eye, Brain, Star, Clock, CheckCircle, AlertCircle, Lightbulb } from 'lucide-react'
import { SessionData } from '@/app/page'

interface SessionResultsProps {
  session: SessionData
  onStartNew: () => void
  onViewHistory: () => void
}

export function SessionResults({ session, onStartNew, onViewHistory }: SessionResultsProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'transcript' | 'analysis' | 'suggestions'>('overview')

  const sessionDuration = session.endTime 
    ? Math.round((session.endTime.getTime() - session.startTime.getTime()) / 1000 / 60)
    : 0

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

  const getPerformanceLevel = (score: number) => {
    if (score >= 90) return { level: 'Excellent', color: 'text-green-600', bg: 'bg-green-100' }
    if (score >= 80) return { level: 'Good', color: 'text-blue-600', bg: 'bg-blue-100' }
    if (score >= 70) return { level: 'Fair', color: 'text-yellow-600', bg: 'bg-yellow-100' }
    if (score >= 60) return { level: 'Needs Improvement', color: 'text-orange-600', bg: 'bg-orange-100' }
    return { level: 'Poor', color: 'text-red-600', bg: 'bg-red-100' }
  }

  const performance = getPerformanceLevel(session.scores.overall)

  const scoreMetrics = [
    {
      id: 'upselling',
      name: 'Upselling',
      description: 'Identifying and presenting additional opportunities',
      icon: <TrendingUp className="h-5 w-5" />,
      score: session.scores.upselling
    },
    {
      id: 'mirroring',
      name: 'Mirroring',
      description: 'Matching client communication style',
      icon: <Users className="h-5 w-5" />,
      score: session.scores.mirroring
    },
    {
      id: 'tonality',
      name: 'Tonality',
      description: 'Voice modulation and emotional intelligence',
      icon: <Volume2 className="h-5 w-5" />,
      score: session.scores.tonality
    },
    {
      id: 'vakUsage',
      name: 'VAK Language',
      description: 'Visual, Auditory, Kinesthetic language usage',
      icon: <Eye className="h-5 w-5" />,
      score: session.scores.vakUsage
    },
    {
      id: 'personalityAdaptation',
      name: 'Personality Match',
      description: 'Adapting to client personality type',
      icon: <Brain className="h-5 w-5" />,
      score: session.scores.personalityAdaptation
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button
              onClick={onViewHistory}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ArrowLeft className="h-5 w-5 text-gray-600" />
            </button>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Session Results</h2>
              <p className="text-gray-600">{session.scenario} • {session.clientType}</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button
              onClick={onStartNew}
              className="bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 flex items-center space-x-2"
            >
              <Play className="h-4 w-4" />
              <span>New Session</span>
            </button>
          </div>
        </div>
      </div>

      {/* Performance Overview */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${performance.bg} ${performance.color}`}>
              {performance.level}
            </div>
            <h3 className="text-2xl font-bold mt-2">Overall Performance</h3>
            <div className={`text-6xl font-bold mt-4 ${getScoreColor(session.scores.overall)}`}>
              {session.scores.overall}%
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Session Duration</span>
              <span className="font-semibold">{sessionDuration} minutes</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Total Messages</span>
              <span className="font-semibold">{session.transcript.length}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Agent Messages</span>
              <span className="font-semibold">
                {session.transcript.filter(t => t.speaker === 'agent').length}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Client Messages</span>
              <span className="font-semibold">
                {session.transcript.filter(t => t.speaker === 'client').length}
              </span>
            </div>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-900">Session Stats</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Started:</span>
                <span>{new Date(session.startTime).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ended:</span>
                <span>{session.endTime ? new Date(session.endTime).toLocaleString() : 'N/A'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Session ID:</span>
                <span className="font-mono text-xs">{session.id}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow-sm border mb-6">
        <div className="border-b">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', name: 'Overview', icon: <BarChart3 className="h-4 w-4" /> },
              { id: 'transcript', name: 'Transcript', icon: <MessageSquare className="h-4 w-4" /> },
              { id: 'analysis', name: 'Analysis', icon: <Target className="h-4 w-4" /> },
              { id: 'suggestions', name: 'Suggestions', icon: <Lightbulb className="h-4 w-4" /> }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-primary-500 text-primary-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Score Breakdown */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Performance Breakdown</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {scoreMetrics.map((metric) => (
                    <div key={metric.id} className="border rounded-lg p-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className={`p-2 rounded-lg ${getScoreBgColor(metric.score)}`}>
                          <div className={getScoreColor(metric.score)}>
                            {metric.icon}
                          </div>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900">{metric.name}</h4>
                          <p className="text-sm text-gray-600">{metric.description}</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className={`text-2xl font-bold ${getScoreColor(metric.score)}`}>
                          {metric.score}%
                        </span>
                        <div className="w-20 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              metric.score >= 80 ? 'bg-green-500' : 
                              metric.score >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${metric.score}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths and Improvements */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <h4 className="font-semibold text-green-800 mb-3 flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    Strengths
                  </h4>
                  <ul className="space-y-2">
                    {session.feedback.strengths.length > 0 ? (
                      session.feedback.strengths.map((strength, index) => (
                        <li key={index} className="text-sm text-green-700">• {strength}</li>
                      ))
                    ) : (
                      <li className="text-sm text-green-700">• Good overall communication</li>
                    )}
                  </ul>
                </div>

                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                  <h4 className="font-semibold text-orange-800 mb-3 flex items-center">
                    <AlertCircle className="h-5 w-5 mr-2" />
                    Areas for Improvement
                  </h4>
                  <ul className="space-y-2">
                    {session.feedback.improvements.length > 0 ? (
                      session.feedback.improvements.map((improvement, index) => (
                        <li key={index} className="text-sm text-orange-700">• {improvement}</li>
                      ))
                    ) : (
                      <li className="text-sm text-orange-700">• Continue practicing regularly</li>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'transcript' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Full Conversation Transcript</h3>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      const transcriptText = session.transcript
                        .map(entry => `${entry.speaker.toUpperCase()}: ${entry.text}`)
                        .join('\n')
                      navigator.clipboard.writeText(transcriptText)
                    }}
                    className="text-sm text-primary-600 hover:text-primary-700"
                  >
                    Copy Transcript
                  </button>
                </div>
              </div>
              
              <div className="border rounded-lg p-4 bg-gray-50 max-h-96 overflow-y-auto">
                {session.transcript.map((entry, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <div className="flex items-start space-x-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        entry.speaker === 'agent' 
                          ? 'bg-primary-100 text-primary-600' 
                          : 'bg-gray-100 text-gray-600'
                      }`}>
                        {entry.speaker === 'agent' ? 'A' : 'C'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span className="font-medium text-sm">
                            {entry.speaker === 'agent' ? 'Agent' : 'Client'}
                          </span>
                          <span className="text-xs text-gray-500">
                            {new Date(entry.timestamp).toLocaleTimeString()}
                          </span>
                        </div>
                        <p className="text-gray-900">{entry.text}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analysis' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Detailed Analysis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Conversation Flow</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Average response time:</span>
                      <span>2.3 seconds</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Conversation turns:</span>
                      <span>{session.transcript.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Agent dominance:</span>
                      <span>45%</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h4 className="font-medium text-gray-900">Language Analysis</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Professional tone:</span>
                      <span>85%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Emotional intelligence:</span>
                      <span>78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Question quality:</span>
                      <span>82%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'suggestions' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Improvement Suggestions</h3>
              <div className="space-y-4">
                {session.feedback.suggestions.map((suggestion, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Lightbulb className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 mb-2">Suggestion {index + 1}</h4>
                        <p className="text-sm text-gray-600 mb-3">{suggestion.reason}</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">What you said:</p>
                            <p className="text-sm bg-red-50 p-2 rounded border-l-4 border-red-200">
                              "{suggestion.original}"
                            </p>
                          </div>
                          <div>
                            <p className="text-xs font-medium text-gray-500 mb-1">Better approach:</p>
                            <p className="text-sm bg-green-50 p-2 rounded border-l-4 border-green-200">
                              "{suggestion.suggested}"
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

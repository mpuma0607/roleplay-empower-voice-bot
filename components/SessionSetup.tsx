'use client'

import { useState } from 'react'
import { Play, Clock, Users, Target, TrendingUp } from 'lucide-react'
import { SessionData } from '@/app/page'

interface SessionSetupProps {
  onStartSession: (scenario: string, clientType: string) => void
  sessionHistory: SessionData[]
}

const scenarios = [
  {
    id: 'first-time-buyer',
    name: 'First-Time Home Buyer',
    description: 'Practice guiding a nervous first-time buyer through the process',
    difficulty: 'Easy',
    duration: '10-15 min',
    icon: '🏠'
  },
  {
    id: 'seller-consultation',
    name: 'Seller Consultation',
    description: 'Conduct a listing presentation and market analysis',
    difficulty: 'Medium',
    duration: '15-20 min',
    icon: '📊'
  },
  {
    id: 'difficult-client',
    name: 'Difficult Client',
    description: 'Handle objections and challenging client behavior',
    difficulty: 'Hard',
    duration: '20-25 min',
    icon: '😤'
  },
  {
    id: 'luxury-client',
    name: 'Luxury Client',
    description: 'Work with high-end clients and luxury properties',
    difficulty: 'Medium',
    duration: '15-20 min',
    icon: '💎'
  },
  {
    id: 'fsbo-client',
    name: 'FSBO Client',
    description: 'Convince a For Sale By Owner to list with you',
    difficulty: 'Hard',
    duration: '20-25 min',
    icon: '🤝'
  },
  {
    id: 'investor-client',
    name: 'Real Estate Investor',
    description: 'Work with investment property buyers',
    difficulty: 'Medium',
    duration: '15-20 min',
    icon: '📈'
  }
]

const clientTypes = [
  { id: 'nervous', name: 'Nervous & Anxious', description: 'Needs reassurance and hand-holding' },
  { id: 'aggressive', name: 'Aggressive & Demanding', description: 'Knows what they want, very direct' },
  { id: 'indecisive', name: 'Indecisive & Uncertain', description: 'Struggles with decision making' },
  { id: 'sophisticated', name: 'Sophisticated & Analytical', description: 'Wants data and market analysis' },
  { id: 'budget-conscious', name: 'Budget-Conscious', description: 'Price-sensitive, looking for deals' },
  { id: 'time-pressed', name: 'Time-Pressed', description: 'Busy professional, wants efficiency' }
]

export function SessionSetup({ onStartSession, sessionHistory }: SessionSetupProps) {
  const [selectedScenario, setSelectedScenario] = useState<string>('')
  const [selectedClientType, setSelectedClientType] = useState<string>('')
  const [customScenario, setCustomScenario] = useState<string>('')

  const handleStartSession = () => {
    const scenario = customScenario || scenarios.find(s => s.id === selectedScenario)?.name || 'Custom Scenario'
    const clientType = clientTypes.find(c => c.id === selectedClientType)?.name || 'General Client'
    onStartSession(scenario, clientType)
  }

  const recentSessions = sessionHistory.slice(0, 3)
  const averageScore = sessionHistory.length > 0 
    ? Math.round(sessionHistory.reduce((sum, session) => sum + session.scores.overall, 0) / sessionHistory.length)
    : 0

  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Start a New Practice Session</h2>
        <p className="text-gray-600">Choose a scenario and client type to practice your real estate skills</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Scenario Selection */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Target className="h-5 w-5 mr-2 text-primary-600" />
              Choose Practice Scenario
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {scenarios.map((scenario) => (
                <div
                  key={scenario.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedScenario === scenario.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedScenario(scenario.id)}
                >
                  <div className="flex items-start space-x-3">
                    <span className="text-2xl">{scenario.icon}</span>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{scenario.name}</h4>
                      <p className="text-sm text-gray-600 mt-1">{scenario.description}</p>
                      <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                        <span className={`px-2 py-1 rounded ${
                          scenario.difficulty === 'Easy' ? 'bg-green-100 text-green-700' :
                          scenario.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {scenario.difficulty}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {scenario.duration}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t pt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Or create a custom scenario:
              </label>
              <input
                type="text"
                value={customScenario}
                onChange={(e) => setCustomScenario(e.target.value)}
                placeholder="Describe your custom practice scenario..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          {/* Client Type Selection */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mt-6">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              <Users className="h-5 w-5 mr-2 text-primary-600" />
              Choose Client Type
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {clientTypes.map((client) => (
                <div
                  key={client.id}
                  className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                    selectedClientType === client.id
                      ? 'border-primary-500 bg-primary-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedClientType(client.id)}
                >
                  <h4 className="font-medium text-gray-900">{client.name}</h4>
                  <p className="text-sm text-gray-600 mt-1">{client.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Start Session Button */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4">Ready to Practice?</h3>
            <button
              onClick={handleStartSession}
              disabled={!selectedScenario && !customScenario}
              className="w-full bg-primary-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              <Play className="h-5 w-5" />
              <span>Start Session</span>
            </button>
            <p className="text-xs text-gray-500 mt-2 text-center">
              Session will be recorded and analyzed
            </p>
          </div>

          {/* Recent Sessions */}
          {recentSessions.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary-600" />
                Recent Sessions
              </h3>
              <div className="space-y-3">
                {recentSessions.map((session) => (
                  <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="text-sm font-medium text-gray-900">{session.scenario}</p>
                      <p className="text-xs text-gray-500">{session.clientType}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">{session.scores.overall}%</p>
                      <p className="text-xs text-gray-500">
                        {new Date(session.startTime).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Performance Stats */}
          {sessionHistory.length > 0 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h3 className="text-lg font-semibold mb-4">Your Performance</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Average Score</span>
                  <span className="text-sm font-medium">{averageScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Total Sessions</span>
                  <span className="text-sm font-medium">{sessionHistory.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-gray-600">Best Score</span>
                  <span className="text-sm font-medium">
                    {Math.max(...sessionHistory.map(s => s.scores.overall))}%
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

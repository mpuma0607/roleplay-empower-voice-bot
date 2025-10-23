'use client'

import { useState } from 'react'
import { RoleplaySession } from '@/components/RoleplaySession'
import { SessionSetup } from '@/components/SessionSetup'
import { SessionResults } from '@/components/SessionResults'
import { Header } from '@/components/Header'

export type SessionData = {
  id: string
  scenario: string
  clientType: string
  startTime: Date
  endTime?: Date
  transcript: Array<{
    speaker: 'agent' | 'client'
    text: string
    timestamp: number
    confidence?: number
  }>
  scores: {
    overall: number
    upselling: number
    mirroring: number
    tonality: number
    vakUsage: number
    personalityAdaptation: number
  }
  feedback: {
    strengths: string[]
    improvements: string[]
    suggestions: Array<{
      timestamp: number
      original: string
      suggested: string
      reason: string
    }>
  }
}

export default function Home() {
  const [currentSession, setCurrentSession] = useState<SessionData | null>(null)
  const [sessionHistory, setSessionHistory] = useState<SessionData[]>([])
  const [view, setView] = useState<'setup' | 'session' | 'results'>('setup')

  const startSession = (scenario: string, clientType: string) => {
    const newSession: SessionData = {
      id: Date.now().toString(),
      scenario,
      clientType,
      startTime: new Date(),
      transcript: [],
      scores: {
        overall: 0,
        upselling: 0,
        mirroring: 0,
        tonality: 0,
        vakUsage: 0,
        personalityAdaptation: 0
      },
      feedback: {
        strengths: [],
        improvements: [],
        suggestions: []
      }
    }
    setCurrentSession(newSession)
    setView('session')
  }

  const endSession = (finalSession: SessionData) => {
    const completedSession = {
      ...finalSession,
      endTime: new Date()
    }
    setCurrentSession(completedSession)
    setSessionHistory(prev => [completedSession, ...prev])
    setView('results')
  }

  const startNewSession = () => {
    setCurrentSession(null)
    setView('setup')
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {view === 'setup' && (
          <SessionSetup 
            onStartSession={startSession}
            sessionHistory={sessionHistory}
          />
        )}
        
        {view === 'session' && currentSession && (
          <RoleplaySession 
            session={currentSession}
            onEndSession={endSession}
            onUpdateSession={setCurrentSession}
          />
        )}
        
        {view === 'results' && currentSession && (
          <SessionResults 
            session={currentSession}
            onStartNew={startNewSession}
            onViewHistory={() => setView('setup')}
          />
        )}
      </main>
    </div>
  )
}

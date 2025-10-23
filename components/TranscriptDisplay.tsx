'use client'

import { useEffect, useRef } from 'react'
import { User, Bot, Clock } from 'lucide-react'
import { SessionData } from '@/app/page'

interface TranscriptDisplayProps {
  transcript: SessionData['transcript']
  isSpeaking: boolean
  isClientSpeaking: boolean
}

export function TranscriptDisplay({ transcript, isSpeaking, isClientSpeaking }: TranscriptDisplayProps) {
  const transcriptEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [transcript])

  const formatTimestamp = (timestamp: number) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  }

  const getConfidenceColor = (confidence?: number) => {
    if (!confidence) return 'text-gray-400'
    if (confidence >= 0.9) return 'text-green-500'
    if (confidence >= 0.7) return 'text-yellow-500'
    return 'text-red-500'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border">
      <div className="p-4 border-b bg-gray-50">
        <h3 className="text-lg font-semibold flex items-center">
          <Clock className="h-5 w-5 mr-2 text-primary-600" />
          Live Conversation
        </h3>
        <p className="text-sm text-gray-600">Real-time transcription of your roleplay session</p>
      </div>
      
      <div className="h-96 overflow-y-auto p-4 space-y-4">
        {transcript.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Bot className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p className="text-lg font-medium">Waiting for conversation to begin...</p>
              <p className="text-sm">Start speaking to see the live transcription</p>
            </div>
          </div>
        ) : (
          transcript.map((entry, index) => (
            <div
              key={index}
              className={`flex items-start space-x-3 transcript-slide-in ${
                entry.speaker === 'agent' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                entry.speaker === 'agent' 
                  ? 'bg-primary-100 text-primary-600' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {entry.speaker === 'agent' ? (
                  <User className="h-4 w-4" />
                ) : (
                  <Bot className="h-4 w-4" />
                )}
              </div>
              
              <div className={`flex-1 min-w-0 ${
                entry.speaker === 'agent' ? 'text-right' : ''
              }`}>
                <div className={`inline-block max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  entry.speaker === 'agent'
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{entry.text}</p>
                </div>
                
                <div className={`flex items-center space-x-2 mt-1 text-xs ${
                  entry.speaker === 'agent' ? 'justify-end' : ''
                }`}>
                  <span className="text-gray-500">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                  {entry.confidence && (
                    <span className={`${getConfidenceColor(entry.confidence)}`}>
                      {Math.round(entry.confidence * 100)}% confidence
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        
        {/* Speaking indicators */}
        {isSpeaking && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center">
              <User className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="inline-block bg-primary-200 text-primary-800 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-primary-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-sm">You are speaking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {isClientSpeaking && (
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center">
              <Bot className="h-4 w-4" />
            </div>
            <div className="flex-1">
              <div className="inline-block bg-gray-200 text-gray-800 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-2">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                  <span className="text-sm">Client is speaking...</span>
                </div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={transcriptEndRef} />
      </div>
    </div>
  )
}

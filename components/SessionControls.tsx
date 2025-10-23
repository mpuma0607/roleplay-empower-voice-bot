'use client'

import { useState } from 'react'
import { Square, RotateCcw, Download, Share2, Settings } from 'lucide-react'
import { SessionData } from '@/app/page'

interface SessionControlsProps {
  session: SessionData
  onEndSession: () => void
  onRestart: () => void
}

export function SessionControls({ session, onEndSession, onRestart }: SessionControlsProps) {
  const [showSettings, setShowSettings] = useState(false)

  const downloadTranscript = () => {
    const transcriptText = session.transcript
      .map(entry => `${entry.speaker.toUpperCase()}: ${entry.text}`)
      .join('\n')
    
    const blob = new Blob([transcriptText], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `roleplay-transcript-${session.id}.txt`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
  }

  const shareSession = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Roleplay Session: ${session.scenario}`,
          text: `Check out my roleplay training session!`,
          url: window.location.href
        })
      } catch (error) {
        console.log('Error sharing:', error)
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href)
      alert('Session link copied to clipboard!')
    }
  }

  return (
    <div className="space-y-4">
      {/* Main Controls */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-semibold mb-4">Session Controls</h3>
        
        <div className="space-y-3">
          <button
            onClick={onEndSession}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2"
          >
            <Square className="h-4 w-4" />
            <span>End Session</span>
          </button>
          
          <button
            onClick={onRestart}
            className="w-full bg-gray-600 text-white py-2 px-4 rounded-lg hover:bg-gray-700 flex items-center justify-center space-x-2"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Restart Session</span>
          </button>
        </div>
      </div>

      {/* Session Actions */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-semibold mb-4">Session Actions</h3>
        
        <div className="space-y-3">
          <button
            onClick={downloadTranscript}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download Transcript</span>
          </button>
          
          <button
            onClick={shareSession}
            className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2"
          >
            <Share2 className="h-4 w-4" />
            <span>Share Session</span>
          </button>
        </div>
      </div>

      {/* Session Info */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <h3 className="text-lg font-semibold mb-4">Session Info</h3>
        
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600">Session ID:</span>
            <span className="font-mono text-xs">{session.id}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Started:</span>
            <span>{new Date(session.startTime).toLocaleTimeString()}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Messages:</span>
            <span>{session.transcript.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Current Score:</span>
            <span className="font-semibold">{session.scores.overall}%</span>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white rounded-lg shadow-sm border p-4">
        <button
          onClick={() => setShowSettings(!showSettings)}
          className="w-full flex items-center justify-between text-gray-700 hover:text-gray-900"
        >
          <span className="font-medium">Settings</span>
          <Settings className="h-4 w-4" />
        </button>
        
        {showSettings && (
          <div className="mt-4 space-y-3 pt-4 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Auto-save transcript</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Real-time scoring</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Audio recording</span>
              <input type="checkbox" defaultChecked className="rounded" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

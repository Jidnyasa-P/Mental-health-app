'use client'

import { useState, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play, Pause, Volume2, CheckCircle, X, Volume1 } from 'lucide-react'

interface MeditationPlayerProps {
  session: {
    id: string
    title: string
    description: string
    duration_minutes: number
    content: string
    difficulty_level: string
  }
  onClose: () => void
}

export function MeditationPlayer({ session, onClose }: MeditationPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [timeElapsed, setTimeElapsed] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [voiceEnabled, setVoiceEnabled] = useState(true)
  const [volume, setVolume] = useState(70)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
  const totalSeconds = session.duration_minutes * 60

  // Handle session timer
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isPlaying && timeElapsed < totalSeconds) {
      interval = setInterval(() => {
        setTimeElapsed(prev => {
          const next = prev + 1
          if (next >= totalSeconds) {
            setIsPlaying(false)
            setIsComplete(true)
            stopVoice()
          }
          return next
        })
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isPlaying, timeElapsed, totalSeconds])

  // Text-to-speech function
  const speakContent = () => {
    if (!voiceEnabled || isSpeaking) return

    const utterance = new SpeechSynthesisUtterance(session.content)
    utterance.rate = 0.9 // Slightly slower for meditation
    utterance.pitch = 1
    utterance.volume = volume / 100
    
    utterance.onstart = () => setIsSpeaking(true)
    utterance.onend = () => setIsSpeaking(false)
    
    synthesisRef.current = utterance
    window.speechSynthesis.speak(utterance)
  }

  const stopVoice = () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercent = (timeElapsed / totalSeconds) * 100

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-background border-2 border-border shadow-2xl rounded-2xl">
        <div className="p-6 md:p-8 relative">
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-secondary/50 rounded-lg transition"
          >
            <X className="h-6 w-6" />
          </button>

          {/* Session Info */}
          <div className="mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">{session.title}</h2>
            <p className="text-muted-foreground mb-4">{session.description}</p>
            <div className="flex gap-4 text-sm">
              <span className="px-3 py-1 bg-primary/10 rounded-full text-primary font-medium">
                {session.difficulty_level}
              </span>
              <span className="px-3 py-1 bg-secondary/10 rounded-full text-secondary font-medium">
                {session.duration_minutes} minutes
              </span>
            </div>
          </div>

          {/* Session Content */}
          <div className="bg-background rounded-lg p-6 mb-8 max-h-40 overflow-y-auto">
            <p className="text-foreground leading-relaxed whitespace-pre-wrap text-sm md:text-base">
              {session.content}
            </p>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="w-full bg-secondary/20 rounded-full h-2 overflow-hidden mb-4">
              <div
                className="bg-gradient-to-r from-primary to-accent h-full transition-all duration-300"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>{formatTime(timeElapsed)}</span>
              <span>{formatTime(totalSeconds)}</span>
            </div>
          </div>

          {/* Complete Message */}
          {isComplete && (
            <div className="mb-8 p-4 bg-accent/10 border border-accent/30 rounded-lg flex items-start gap-3">
              <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground mb-1">Great work!</p>
                <p className="text-sm text-muted-foreground">
                  You've completed the {session.title} meditation session. Continue practicing for best results.
                </p>
              </div>
            </div>
          )}

          {/* Controls */}
          <div className="flex flex-col gap-6 mb-8">
            <div className="flex items-center justify-center gap-4">
              <Button
                size="lg"
                variant={isPlaying ? 'default' : 'outline'}
                onClick={() => {
                  setIsPlaying(!isPlaying)
                  if (!isPlaying && voiceEnabled && timeElapsed === 0) {
                    setTimeout(() => speakContent(), 500)
                  }
                }}
                className="flex-1 max-w-xs"
              >
                {isPlaying ? (
                  <>
                    <Pause className="h-5 w-5 mr-2" />
                    Pause
                  </>
                ) : (
                  <>
                    <Play className="h-5 w-5 mr-2" />
                    {timeElapsed === 0 ? 'Start Session' : 'Resume'}
                  </>
                )}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setTimeElapsed(0)
                  setIsPlaying(false)
                  setIsComplete(false)
                  stopVoice()
                }}
              >
                Restart
              </Button>
            </div>

            {/* Voice Controls */}
            <div className="bg-secondary/10 rounded-lg p-4 space-y-4">
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={voiceEnabled}
                    onChange={(e) => {
                      setVoiceEnabled(e.target.checked)
                      if (!e.target.checked) {
                        stopVoice()
                      }
                    }}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm font-medium text-foreground">Voice Narration</span>
                </label>
                <span className="text-xs text-muted-foreground">{isSpeaking ? 'Speaking...' : 'Ready'}</span>
              </div>

              {voiceEnabled && (
                <div className="flex items-center gap-3">
                  <Volume1 className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume}
                    onChange={(e) => setVolume(parseInt(e.target.value))}
                    className="flex-1 h-2 bg-primary/30 rounded-full appearance-none cursor-pointer"
                  />
                  <Volume2 className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground w-8 text-right">{volume}%</span>
                </div>
              )}

              {voiceEnabled && (
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="secondary"
                    onClick={speakContent}
                    disabled={isSpeaking}
                    className="flex-1"
                  >
                    {isSpeaking ? 'Reading...' : 'Read Aloud'}
                  </Button>
                  {isSpeaking && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={stopVoice}
                    >
                      Stop
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Tips */}
          <div className="mt-8 p-4 bg-secondary/5 rounded-lg">
            <p className="text-xs font-medium text-foreground mb-2">Tips for best results:</p>
            <ul className="text-xs text-muted-foreground space-y-1">
              <li>• Find a quiet, comfortable place to meditate</li>
              <li>• Sit with your back straight and shoulders relaxed</li>
              <li>• Close your eyes or maintain a soft gaze</li>
              <li>• Practice consistently for optimal benefits</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

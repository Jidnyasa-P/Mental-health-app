'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Phone, PhoneOff, Mic, MicOff, Volume2, VolumeX } from 'lucide-react'

interface CallInterfaceProps {
  contactName: string
  contactImage?: string
  onHangup: () => void
}

export function CallInterface({ contactName, onHangup }: CallInterfaceProps) {
  const [callStarted, setCallStarted] = useState(false)
  const [callDuration, setCallDuration] = useState(0)
  const [isRinging, setIsRinging] = useState(true)
  const [isMuted, setIsMuted] = useState(false)
  const [isSpeakerOn, setIsSpeakerOn] = useState(true)

  // Simulate ringing for 3 seconds then answer
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsRinging(false)
      setCallStarted(true)
    }, 3000)
    return () => clearTimeout(timer)
  }, [])

  // Call duration timer
  useEffect(() => {
    if (!callStarted) return
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [callStarted])

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const handleHangup = () => {
    onHangup()
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-sm p-8 text-center bg-gradient-to-b from-primary/20 to-background border-primary/30">
        {/* Avatar */}
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/20 flex items-center justify-center text-4xl font-bold text-primary">
          {contactName.charAt(0)}
        </div>

        {/* Contact Name */}
        <h2 className="text-2xl font-bold text-foreground mb-2">{contactName}</h2>

        {/* Call Status */}
        <div className="mb-6">
          {isRinging ? (
            <div className="space-y-2">
              <p className="text-muted-foreground animate-pulse">Calling...</p>
              <div className="flex gap-1 justify-center">
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200" />
              </div>
            </div>
          ) : (
            <div>
              <p className="text-sm text-muted-foreground mb-1">Active Call</p>
              <p className="text-2xl font-semibold text-primary font-mono">
                {formatDuration(callDuration)}
              </p>
            </div>
          )}
        </div>

        {/* Control Buttons */}
        <div className="flex gap-4 justify-center mb-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
              isMuted
                ? 'bg-red-500 text-white'
                : 'bg-muted hover:bg-secondary text-foreground'
            }`}
            title={isMuted ? 'Unmute' : 'Mute'}
          >
            {isMuted ? <MicOff className="h-5 w-5" /> : <Mic className="h-5 w-5" />}
          </button>

          <button
            onClick={() => setIsSpeakerOn(!isSpeakerOn)}
            className={`w-12 h-12 rounded-full flex items-center justify-center transition ${
              isSpeakerOn
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted hover:bg-secondary text-foreground'
            }`}
            title={isSpeakerOn ? 'Speaker On' : 'Speaker Off'}
          >
            {isSpeakerOn ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>

          <button
            onClick={handleHangup}
            className="w-14 h-14 rounded-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white transition shadow-lg"
            title="Hang up"
          >
            <PhoneOff className="h-6 w-6" />
          </button>
        </div>

        {/* Info */}
        <p className="text-xs text-muted-foreground">
          {isMuted && 'Your mic is muted • '}
          {isSpeakerOn ? 'Speaker enabled' : 'Speaker disabled'}
        </p>
      </Card>
    </div>
  )
}

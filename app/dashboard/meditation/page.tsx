'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Zap, Play, Clock } from 'lucide-react'
import { useState } from 'react'

const sessions = [
  { id: 1, title: 'Morning Meditation', duration: 10, level: 'Beginner', description: 'Start your day with calm and clarity' },
  { id: 2, title: 'Afternoon Energy Boost', duration: 5, level: 'Beginner', description: 'Quick energy and focus restoration' },
  { id: 3, title: 'Evening Relaxation', duration: 15, level: 'Intermediate', description: 'Unwind and prepare for restful sleep' },
  { id: 4, title: 'Deep Sleep Meditation', duration: 20, level: 'Intermediate', description: 'Drift into peaceful, restorative sleep' },
  { id: 5, title: 'Anxiety Relief', duration: 12, level: 'Advanced', description: 'Techniques for managing anxiety' },
  { id: 6, title: 'Body Scan', duration: 18, level: 'Advanced', description: 'Complete body awareness meditation' },
]

export default function Meditation() {
  const [playing, setPlaying] = useState<number | null>(null)
  const [completed, setCompleted] = useState([1, 3])

  const handlePlay = (id: number) => {
    setPlaying(playing === id ? null : id)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Meditation & Mindfulness</h1>
        <p className="text-muted-foreground">Guided sessions for peace and wellbeing</p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Sessions Completed</h3>
          <p className="text-3xl font-bold text-primary">{completed.length}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Minutes</h3>
          <p className="text-3xl font-bold text-primary">147</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">This Week</h3>
          <p className="text-3xl font-bold text-primary">3</p>
        </Card>
      </div>

      {/* Sessions */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Meditation Sessions</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sessions.map((session) => (
            <Card key={session.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-foreground">{session.title}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{session.level}</p>
                </div>
                {completed.includes(session.id) && (
                  <div className="h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">✓</div>
                )}
              </div>
              
              <p className="text-sm text-muted-foreground mb-4">{session.description}</p>
              
              <div className="flex items-center gap-2 mb-4">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">{session.duration} minutes</span>
              </div>

              <Button 
                onClick={() => handlePlay(session.id)}
                className="w-full"
                variant={playing === session.id ? "secondary" : "default"}
              >
                <Play className="h-4 w-4 mr-2" />
                {playing === session.id ? 'Playing...' : 'Start Session'}
              </Button>
            </Card>
          ))}
        </div>
      </div>

      {/* Current Playing */}
      {playing && (
        <Card className="mt-8 p-8 text-center">
          <Zap className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {sessions.find(s => s.id === playing)?.title}
          </h2>
          <p className="text-muted-foreground mb-6">
            {sessions.find(s => s.id === playing)?.duration} minutes
          </p>
          <div className="h-2 bg-muted rounded-full overflow-hidden mb-4">
            <div className="h-full w-1/3 bg-primary transition-all" />
          </div>
          <p className="text-sm text-muted-foreground mb-6">1/3 - Let your mind settle...</p>
          <Button onClick={() => setPlaying(null)} variant="outline">Stop</Button>
        </Card>
      )}
    </div>
  )
}

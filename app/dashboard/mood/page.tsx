'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart } from 'lucide-react'
import { useState } from 'react'

const moods = ['😢 Terrible', '😟 Bad', '😐 Okay', '🙂 Good', '😄 Great']

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [notes, setNotes] = useState('')
  const [entries, setEntries] = useState([
    { id: 1, mood: 'Good', date: 'Today', notes: 'Had a productive day' },
    { id: 2, mood: 'Okay', date: 'Yesterday', notes: 'Feeling neutral' },
    { id: 3, mood: 'Great', date: '2 days ago', notes: 'Amazing workout session' },
  ])

  const handleLogMood = () => {
    if (selectedMood !== null) {
      const newEntry = {
        id: entries.length + 1,
        mood: moods[selectedMood].split(' ')[1],
        date: 'Today',
        notes: notes || 'No notes',
      }
      setEntries([newEntry, ...entries])
      setSelectedMood(null)
      setNotes('')
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Mood Tracker</h1>
        <p className="text-muted-foreground">Monitor and understand your emotional patterns</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Log Mood */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">How are you feeling?</h2>
            
            <div className="space-y-4 mb-6">
              {moods.map((mood, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedMood(index)}
                  className={`w-full p-4 rounded-lg border-2 transition ${
                    selectedMood === index
                      ? 'border-primary bg-primary/10'
                      : 'border-border hover:border-primary/50'
                  }`}
                >
                  <span className="text-2xl">{mood.split(' ')[0]}</span>
                  <span className="ml-2 text-sm font-medium text-foreground">{mood.split(' ')[1]}</span>
                </button>
              ))}
            </div>

            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add notes about your mood..."
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground mb-4 resize-none"
              rows={4}
            />

            <Button onClick={handleLogMood} className="w-full" disabled={selectedMood === null}>
              <Heart className="h-4 w-4 mr-2" />
              Log Mood
            </Button>
          </Card>
        </div>

        {/* History */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">Recent Entries</h2>
            <div className="space-y-4">
              {entries.map((entry) => (
                <div key={entry.id} className="p-4 rounded-lg border border-border hover:border-primary/50 transition">
                  <div className="flex items-start justify-between mb-2">
                    <span className="font-semibold text-foreground">{entry.mood}</span>
                    <span className="text-xs text-muted-foreground">{entry.date}</span>
                  </div>
                  <p className="text-sm text-muted-foreground">{entry.notes}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>

      {/* Chart */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Mood Trends</h2>
        <div className="h-64 bg-muted rounded-lg flex items-center justify-center">
          <p className="text-muted-foreground">Chart visualization coming soon</p>
        </div>
      </Card>
    </div>
  )
}

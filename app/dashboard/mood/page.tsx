'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, TrendingUp } from 'lucide-react'
import { useState } from 'react'
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const moods = ['😢 Terrible', '😟 Bad', '😐 Okay', '🙂 Good', '😄 Great']
const moodValues = { 'Terrible': 1, 'Bad': 2, 'Okay': 3, 'Good': 4, 'Great': 5 }

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null)
  const [notes, setNotes] = useState('')
  const [entries, setEntries] = useState([
    { id: 1, mood: 'Good', date: 'Mon', dateStr: 'Today', notes: 'Had a productive day', value: 4 },
    { id: 2, mood: 'Okay', date: 'Tue', dateStr: 'Yesterday', notes: 'Feeling neutral', value: 3 },
    { id: 3, mood: 'Great', date: 'Wed', dateStr: '2 days ago', notes: 'Amazing workout session', value: 5 },
    { id: 4, mood: 'Good', date: 'Thu', dateStr: '3 days ago', notes: 'Good energy', value: 4 },
    { id: 5, mood: 'Okay', date: 'Fri', dateStr: '4 days ago', notes: 'Neutral mood', value: 3 },
    { id: 6, mood: 'Great', date: 'Sat', dateStr: '5 days ago', notes: 'Excellent day!', value: 5 },
  ])

  const chartData = entries.slice().reverse().map(e => ({
    date: e.date,
    mood: e.value,
    name: e.mood
  }))

  const handleLogMood = () => {
    if (selectedMood !== null) {
      const moodName = moods[selectedMood].split(' ')[1]
      const newEntry = {
        id: entries.length + 1,
        mood: moodName,
        date: new Date().toLocaleDateString('en-US', { weekday: 'short' }),
        dateStr: 'Today',
        notes: notes || 'No notes',
        value: selectedMood + 1,
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

      {/* Statistics */}
      <div className="grid gap-4 md:grid-cols-4 mt-6">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Mood</h3>
          <p className="text-3xl font-bold text-primary">{(entries.reduce((acc, e) => acc + e.value, 0) / entries.length).toFixed(1)}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Best Mood</h3>
          <p className="text-3xl font-bold text-accent">{entries.reduce((a, b) => a.value > b.value ? a : b).mood}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Entries</h3>
          <p className="text-3xl font-bold text-secondary">{entries.length}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Trend</h3>
          <p className="text-3xl font-bold text-green-500 flex items-center gap-1">
            <TrendingUp className="h-6 w-6" /> +2
          </p>
        </Card>
      </div>

      {/* Chart */}
      <Card className="mt-6 p-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Mood Trends (Last 7 Days)</h2>
        <div className="w-full h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis dataKey="date" stroke="var(--color-muted-foreground)" />
              <YAxis domain={[0, 5]} stroke="var(--color-muted-foreground)" />
              <Tooltip 
                contentStyle={{ backgroundColor: 'var(--color-background)', border: '1px solid var(--color-border)' }}
                labelStyle={{ color: 'var(--color-foreground)' }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="mood" 
                stroke="var(--color-primary)" 
                strokeWidth={3}
                dot={{ fill: 'var(--color-primary)', r: 6 }}
                activeDot={{ r: 8 }}
                name="Mood Level"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  )
}

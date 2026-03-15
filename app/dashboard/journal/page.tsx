'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Feather, Trash2 } from 'lucide-react'
import { useState } from 'react'

export default function PrivateJournal() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [entries, setEntries] = useState([
    { id: 1, title: 'Beautiful Day', date: 'Today', preview: 'Today was absolutely wonderful. The sun was shining...' },
    { id: 2, title: 'Reflection', date: 'Yesterday', preview: 'I had time to reflect on my personal growth this year...' },
    { id: 3, title: 'New Beginning', date: '3 days ago', preview: 'Starting fresh with new goals and aspirations...' },
  ])

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      const newEntry = {
        id: entries.length + 1,
        title: title || 'Untitled',
        date: 'Today',
        preview: content.substring(0, 100) + '...',
      }
      setEntries([newEntry, ...entries])
      setTitle('')
      setContent('')
    }
  }

  const handleDelete = (id: number) => {
    setEntries(entries.filter(e => e.id !== id))
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Private Journal</h1>
        <p className="text-muted-foreground">Your safe space for thoughts and feelings</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Write */}
        <div className="lg:col-span-2">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-6">New Entry</h2>
            
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title (optional)"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground mb-4"
            />

            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your thoughts here... This is a private space for you."
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground mb-4 resize-none h-96"
            />

            <div className="flex gap-2">
              <Button onClick={handleSave} className="flex-1">
                <Feather className="h-4 w-4 mr-2" />
                Save Entry
              </Button>
              <Button 
                variant="outline"
                onClick={() => {
                  setTitle('')
                  setContent('')
                }}
              >
                Clear
              </Button>
            </div>
          </Card>
        </div>

        {/* Recent */}
        <div className="lg:col-span-1">
          <Card className="p-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Recent Entries</h2>
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {entries.map((entry) => (
                <div key={entry.id} className="p-3 rounded-lg border border-border hover:border-primary/50 transition group">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-foreground">{entry.title}</p>
                      <p className="text-xs text-muted-foreground">{entry.date}</p>
                    </div>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-destructive/10 rounded"
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </button>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{entry.preview}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

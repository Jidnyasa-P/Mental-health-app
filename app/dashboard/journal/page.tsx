'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Feather, Trash2, Volume2, Mic } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function PrivateJournal() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [speakingId, setSpeakingId] = useState<number | null>(null)
  const [isListening, setIsListening] = useState(false)
  const [listeningFor, setListeningFor] = useState<'title' | 'content' | null>(null)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)
  const recognitionRef = useRef<any>(null)
  const [entries, setEntries] = useState([
    { id: 1, title: 'Beautiful Day', date: 'Today', content: 'Today was absolutely wonderful. The sun was shining and I felt a sense of peace I haven\'t experienced in a long time...' },
    { id: 2, title: 'Reflection', date: 'Yesterday', content: 'I had time to reflect on my personal growth this year. Looking back, I can see how far I\'ve come...' },
    { id: 3, title: 'New Beginning', date: '3 days ago', content: 'Starting fresh with new goals and aspirations. This journal will be my companion through this journey...' },
  ])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || (window as any).webkitSpeechRecognition
      if (SpeechRecognition) {
        recognitionRef.current = new SpeechRecognition()
        recognitionRef.current.onstart = () => setIsListening(true)
        recognitionRef.current.onend = () => setIsListening(false)
        recognitionRef.current.onresult = (event: any) => {
          const transcript = Array.from(event.results)
            .map((result: any) => result[0].transcript)
            .join('')
          if (listeningFor === 'title') {
            setTitle(prev => prev + (prev ? ' ' : '') + transcript)
          } else if (listeningFor === 'content') {
            setContent(prev => prev + (prev ? ' ' : '') + transcript)
          }
        }
      }
    }
  }, [listeningFor])

  const startListening = (field: 'title' | 'content') => {
    setListeningFor(field)
    if (recognitionRef.current) {
      recognitionRef.current.start()
    }
  }

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
    }
    setListeningFor(null)
  }

  const handleSave = () => {
    if (title.trim() || content.trim()) {
      const newEntry = {
        id: entries.length + 1,
        title: title || 'Untitled',
        date: 'Today',
        content: content,
      }
      setEntries([newEntry, ...entries])
      setTitle('')
      setContent('')
    }
  }

  const handleDelete = (id: number) => {
    setEntries(entries.filter(e => e.id !== id))
  }

  const speakEntry = (id: number, title: string, content: string) => {
    if (speakingId === id) {
      window.speechSynthesis.cancel()
      setSpeakingId(null)
      return
    }

    const fullText = `${title}. ${content}`
    const utterance = new SpeechSynthesisUtterance(fullText)
    utterance.rate = 0.95
    utterance.pitch = 1
    utterance.volume = 1

    utterance.onstart = () => setSpeakingId(id)
    utterance.onend = () => setSpeakingId(null)

    synthesisRef.current = utterance
    window.speechSynthesis.speak(utterance)
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
            
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-muted-foreground">Title</label>
                <button
                  onClick={() => isListening && listeningFor === 'title' ? stopListening() : startListening('title')}
                  className={`p-1 rounded transition ${isListening && listeningFor === 'title' ? 'bg-primary/20 text-primary' : 'hover:bg-muted'}`}
                  title="Voice input"
                >
                  <Mic className="h-4 w-4" />
                </button>
              </div>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title (optional)"
                className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
            </div>

            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-muted-foreground">Your Thoughts</label>
                <button
                  onClick={() => isListening && listeningFor === 'content' ? stopListening() : startListening('content')}
                  className={`p-1 rounded transition ${isListening && listeningFor === 'content' ? 'bg-primary/20 text-primary' : 'hover:bg-muted'}`}
                  title="Voice input"
                >
                  <Mic className="h-4 w-4" />
                </button>
              </div>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your thoughts here... This is a private space for you. You can also use voice input."
                className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none h-64"
              />
            </div>

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
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground">{entry.title}</p>
                      <p className="text-xs text-muted-foreground">{entry.date}</p>
                    </div>
                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() => speakEntry(entry.id, entry.title, entry.content)}
                        className={`opacity-0 group-hover:opacity-100 transition p-1 rounded ${speakingId === entry.id ? 'bg-primary/10 text-primary' : 'hover:bg-primary/10'}`}
                        title="Read entry aloud"
                      >
                        <Volume2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(entry.id)}
                        className="opacity-0 group-hover:opacity-100 transition p-1 hover:bg-destructive/10 rounded"
                        title="Delete entry"
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">{entry.content.substring(0, 100)}...</p>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

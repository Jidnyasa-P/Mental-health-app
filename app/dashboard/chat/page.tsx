'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Brain, Send, Mic, Volume2, Copy, Check } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

export default function AISupportChat() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Hello! I\'m here to support you with any mental health concerns or general wellbeing questions. What\'s on your mind today?' },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [copiedId, setCopiedId] = useState<number | null>(null)
  const recognitionRef = useRef<any>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    // Setup speech recognition
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
          setMessage(prev => prev + (prev ? ' ' : '') + transcript)
        }
      }
    }
  }, [])

  const startListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.start()
    }
  }

  const handleSend = async () => {
    if (!message.trim()) return

    const userMessage = message
    setMessage('')
    setMessages(prev => [...prev, { id: prev.length + 1, type: 'user', text: userMessage }])
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      })

      if (response.ok) {
        const data = await response.json()
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          type: 'ai', 
          text: data.response 
        }])
      } else {
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          type: 'ai', 
          text: 'Sorry, I\'m having trouble processing that. Please try again.' 
        }])
      }
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { 
        id: prev.length + 1, 
        type: 'ai', 
        text: 'I encountered an error. Please make sure the API key is configured.' 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const speakMessage = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.95
    window.speechSynthesis.speak(utterance)
  }

  const copyToClipboard = (id: number, text: string) => {
    navigator.clipboard.writeText(text)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">AI Support Chat</h1>
        <p className="text-muted-foreground">Get instant mental health support and guidance</p>
      </div>

      <div className="flex-1 overflow-hidden">
        <Card className="h-full flex flex-col">
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs lg:max-w-md p-4 rounded-lg ${
                  msg.type === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{msg.text}</p>
                  {msg.type === 'ai' && (
                    <div className="flex gap-2 mt-2">
                      <button
                        onClick={() => speakMessage(msg.text)}
                        className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition text-xs"
                        title="Read aloud"
                      >
                        <Volume2 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => copyToClipboard(msg.id, msg.text)}
                        className="p-1 hover:bg-black/10 dark:hover:bg-white/10 rounded transition text-xs"
                        title="Copy text"
                      >
                        {copiedId === msg.id ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-muted text-foreground p-4 rounded-lg">
                  <p className="text-sm">Thinking...</p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-border p-6 space-y-3">
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type or speak your message..."
                className="flex-1 p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground"
                disabled={isLoading}
              />
              <Button 
                onClick={startListening} 
                size="icon" 
                variant={isListening ? 'default' : 'outline'}
                disabled={isLoading}
                title="Voice input"
              >
                <Mic className="h-4 w-4" />
              </Button>
              <Button 
                onClick={handleSend} 
                size="icon"
                disabled={isLoading || !message.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground">
              For urgent support, contact emergency services immediately.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

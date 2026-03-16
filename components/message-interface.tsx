'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Send, X } from 'lucide-react'

interface Message {
  id: number
  sender: 'user' | 'contact'
  text: string
  timestamp: Date
}

interface MessageInterfaceProps {
  contactName: string
  onClose: () => void
}

export function MessageInterface({ contactName, onClose }: MessageInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: 'contact',
      text: `Hi there! How can I help you today?`,
      timestamp: new Date(Date.now() - 5000)
    }
  ])
  const [inputText, setInputText] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      sender: 'user',
      text: inputText,
      timestamp: new Date()
    }

    setMessages([...messages, userMessage])
    setInputText('')

    // Simulate response after a short delay
    setTimeout(() => {
      const responses = [
        'That sounds important. Tell me more.',
        "I understand. How have you been feeling?",
        'That\'s great to hear! Anything else?',
        'I appreciate you sharing that with me.',
        'Let\'s explore that further.'
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const responseMessage: Message = {
        id: messages.length + 2,
        sender: 'contact',
        text: randomResponse,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, responseMessage])
    }, 500)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md h-[600px] flex flex-col bg-background border-2 border-border">
        {/* Header */}
        <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
          <div>
            <h3 className="font-semibold text-foreground">{contactName}</h3>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded transition"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs p-3 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted text-foreground'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user'
                    ? 'text-primary-foreground/70'
                    : 'text-muted-foreground'
                }`}>
                  {formatTime(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-border p-4 bg-muted/20">
          <div className="flex gap-3">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              disabled={!inputText.trim()}
              className="flex-shrink-0"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>
    </div>
  )
}

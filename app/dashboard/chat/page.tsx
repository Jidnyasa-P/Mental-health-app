'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Brain, Send } from 'lucide-react'
import { useState } from 'react'

export default function AISupportChat() {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([
    { id: 1, type: 'ai', text: 'Hello! I\'m here to support you with any mental health concerns or general wellbeing questions. What\'s on your mind today?' },
    { id: 2, type: 'user', text: 'I\'ve been feeling a bit stressed lately.' },
    { id: 3, type: 'ai', text: 'Stress is a common experience. Try some of these helpful techniques:\n\n1. Deep breathing exercises\n2. Short meditation sessions\n3. Physical activity\n4. Talking to someone you trust\n\nWould any of these help?' },
  ])

  const handleSend = () => {
    if (message.trim()) {
      setMessages([...messages, { id: messages.length + 1, type: 'user', text: message }])
      setMessage('')
      
      // Simulate AI response
      setTimeout(() => {
        setMessages(prev => [...prev, { 
          id: prev.length + 1, 
          type: 'ai', 
          text: 'Thank you for sharing. That\'s important information. How can I help you feel better today?' 
        }])
      }, 500)
    }
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
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-6">
            <div className="flex gap-3">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground"
              />
              <Button onClick={handleSend} size="icon">
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
              For urgent support, contact emergency services immediately.
            </p>
          </div>
        </Card>
      </div>
    </div>
  )
}

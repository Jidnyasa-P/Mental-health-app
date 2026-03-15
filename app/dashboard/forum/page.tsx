'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Users, MessageCircle, Heart, Reply } from 'lucide-react'
import { useState } from 'react'

const threads = [
  { id: 1, author: 'Sarah', title: 'Tips for Managing Anxiety', replies: 23, likes: 156, timestamp: '2 hours ago', preview: 'I\'ve found some great techniques that help me manage...' },
  { id: 2, author: 'Mike', title: 'New to meditation - advice needed', replies: 18, likes: 92, timestamp: '5 hours ago', preview: 'Just started my meditation journey and looking for...' },
  { id: 3, author: 'Emma', title: 'Celebrating small wins!', replies: 42, likes: 234, timestamp: 'Yesterday', preview: 'Today I managed to get out of bed and take a walk...' },
  { id: 4, author: 'James', title: 'Work stress affecting sleep', replies: 15, likes: 78, timestamp: '2 days ago', preview: 'My work has been hectic and I can\'t sleep...' },
]

export default function CommunityForum() {
  const [newThread, setNewThread] = useState('')
  const [showReply, setShowReply] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')

  const handlePostThread = () => {
    if (newThread.trim()) {
      setNewThread('')
      alert('Your post has been shared with the community!')
    }
  }

  const handleReply = () => {
    if (replyText.trim()) {
      setReplyText('')
      setShowReply(null)
      alert('Your reply has been posted!')
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Community Forum</h1>
        <p className="text-muted-foreground">Connect with others on their mental health journey</p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* New Thread */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-6">
            <h2 className="text-xl font-semibold text-foreground mb-4">Start a Discussion</h2>
            <textarea
              value={newThread}
              onChange={(e) => setNewThread(e.target.value)}
              placeholder="Share your thoughts, ask questions, or offer support..."
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground mb-4 resize-none h-32"
            />
            <Button onClick={handlePostThread} className="w-full">
              <MessageCircle className="h-4 w-4 mr-2" />
              Post Thread
            </Button>
            <div className="mt-6 pt-6 border-t border-border">
              <h3 className="font-semibold text-foreground mb-4 text-sm">Community Guidelines</h3>
              <ul className="text-xs text-muted-foreground space-y-2">
                <li>✓ Be respectful and kind</li>
                <li>✓ Share experiences, not advice</li>
                <li>✓ Maintain confidentiality</li>
                <li>✓ Avoid triggering content</li>
              </ul>
            </div>
          </Card>
        </div>

        {/* Threads */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {threads.map((thread) => (
              <Card key={thread.id} className="p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-lg">{thread.title}</h3>
                    <p className="text-xs text-muted-foreground mt-1">By {thread.author} • {thread.timestamp}</p>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{thread.preview}</p>
                
                <div className="flex items-center gap-6 mb-4 pb-4 border-b border-border">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MessageCircle className="h-4 w-4" />
                    {thread.replies} replies
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Heart className="h-4 w-4" />
                    {thread.likes} likes
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowReply(showReply === thread.id ? null : thread.id)}
                >
                  <Reply className="h-4 w-4 mr-2" />
                  Reply
                </Button>

                {showReply === thread.id && (
                  <div className="mt-4 pt-4 border-t border-border">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Share your thoughts..."
                      className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground mb-3 resize-none h-24"
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleReply}>Post Reply</Button>
                      <Button size="sm" variant="outline" onClick={() => setShowReply(null)}>Cancel</Button>
                    </div>
                  </div>
                )}
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

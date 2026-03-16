'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MessageCircle, Heart, Reply, X } from 'lucide-react'
import { useState } from 'react'

export default function CommunityForum() {
  const [threads, setThreads] = useState([
    { id: 1, author: 'Sarah', title: 'Tips for Managing Anxiety', replies: 23, likes: 156, timestamp: '2 hours ago', preview: 'I\'ve found some great techniques that help me manage...', full_content: 'I\'ve found some great techniques that help me manage anxiety: deep breathing, grounding exercises, and meditation.' },
    { id: 2, author: 'Mike', title: 'New to meditation - advice needed', replies: 18, likes: 92, timestamp: '5 hours ago', preview: 'Just started my meditation journey and looking for...', full_content: 'Just started my meditation journey and looking for tips from experienced practitioners.' },
    { id: 3, author: 'Emma', title: 'Celebrating small wins!', replies: 42, likes: 234, timestamp: 'Yesterday', preview: 'Today I managed to get out of bed and take a walk...', full_content: 'Today I managed to get out of bed and take a walk. It might seem small but it\'s a big step for me!' },
    { id: 4, author: 'James', title: 'Work stress affecting sleep', replies: 15, likes: 78, timestamp: '2 days ago', preview: 'My work has been hectic and I can\'t sleep...', full_content: 'My work has been hectic and I can\'t sleep properly. Anyone else dealing with this?' },
  ])
  
  const [newThread, setNewThread] = useState('')
  const [showReply, setShowReply] = useState<number | null>(null)
  const [replyText, setReplyText] = useState('')
  const [likedPosts, setLikedPosts] = useState<number[]>([])
  const [selectedThread, setSelectedThread] = useState<number | null>(null)

  const handlePostThread = () => {
    if (newThread.trim()) {
      const newPost = {
        id: threads.length + 1,
        author: 'You',
        title: newThread.substring(0, 50),
        replies: 0,
        likes: 0,
        timestamp: 'just now',
        preview: newThread.substring(0, 100) + '...',
        full_content: newThread,
      }
      setThreads([newPost, ...threads])
      setNewThread('')
    }
  }

  const handleLike = (threadId: number) => {
    setThreads(threads.map(thread => {
      if (thread.id === threadId) {
        if (likedPosts.includes(threadId)) {
          setLikedPosts(likedPosts.filter(id => id !== threadId))
          return { ...thread, likes: thread.likes - 1 }
        } else {
          setLikedPosts([...likedPosts, threadId])
          return { ...thread, likes: thread.likes + 1 }
        }
      }
      return thread
    }))
  }

  const handleReply = () => {
    if (replyText.trim()) {
      setThreads(threads.map(thread => {
        if (thread.id === showReply) {
          return { ...thread, replies: thread.replies + 1 }
        }
        return thread
      }))
      setReplyText('')
      setShowReply(null)
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
                
                <div className="flex items-center gap-4 mb-4 pb-4 border-b border-border">
                  <button
                    onClick={() => handleLike(thread.id)}
                    className={`flex items-center gap-2 text-sm transition ${
                      likedPosts.includes(thread.id)
                        ? 'text-red-500 font-semibold'
                        : 'text-muted-foreground hover:text-red-500'
                    }`}
                  >
                    <Heart className={`h-4 w-4 ${likedPosts.includes(thread.id) ? 'fill-current' : ''}`} />
                    {thread.likes} likes
                  </button>
                  <button
                    onClick={() => setSelectedThread(selectedThread === thread.id ? null : thread.id)}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition"
                  >
                    <MessageCircle className="h-4 w-4" />
                    {thread.replies} replies
                  </button>
                </div>

                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowReply(showReply === thread.id ? null : thread.id)}
                  className="mr-2"
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

      {/* Full Thread Modal */}
      {selectedThread && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 relative">
              <button
                onClick={() => setSelectedThread(null)}
                className="absolute top-4 right-4 p-2 hover:bg-muted rounded transition"
              >
                <X className="h-6 w-6" />
              </button>
              
              {threads.find(t => t.id === selectedThread) && (
                <div>
                  <h2 className="text-2xl font-bold text-foreground mb-2">
                    {threads.find(t => t.id === selectedThread)?.title}
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    By {threads.find(t => t.id === selectedThread)?.author} • {threads.find(t => t.id === selectedThread)?.timestamp}
                  </p>
                  <div className="bg-muted/30 p-4 rounded-lg mb-6">
                    <p className="text-foreground whitespace-pre-wrap">
                      {threads.find(t => t.id === selectedThread)?.full_content}
                    </p>
                  </div>
                  <div className="flex gap-4 mb-6 pb-6 border-b border-border">
                    <button
                      onClick={() => {
                        handleLike(selectedThread)
                      }}
                      className={`flex items-center gap-2 text-sm transition ${
                        likedPosts.includes(selectedThread)
                          ? 'text-red-500 font-semibold'
                          : 'text-muted-foreground hover:text-red-500'
                      }`}
                    >
                      <Heart className={`h-5 w-5 ${likedPosts.includes(selectedThread) ? 'fill-current' : ''}`} />
                      {threads.find(t => t.id === selectedThread)?.likes} likes
                    </button>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MessageCircle className="h-5 w-5" />
                      {threads.find(t => t.id === selectedThread)?.replies} replies
                    </div>
                  </div>
                </div>
              )}
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}

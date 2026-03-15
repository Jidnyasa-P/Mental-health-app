'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BookOpen, ExternalLink, Play, FileText } from 'lucide-react'
import { useState } from 'react'

const resources = [
  { id: 1, type: 'article', title: 'Understanding Anxiety Disorders', author: 'Dr. Smith', date: 'Jan 15, 2024', readTime: '8 min read', category: 'Mental Health' },
  { id: 2, type: 'video', title: 'Cognitive Behavioral Therapy Basics', author: 'Sarah Chen', date: 'Jan 10, 2024', duration: '12 min', category: 'Therapy' },
  { id: 3, type: 'article', title: 'Sleep Hygiene Tips for Better Rest', author: 'Dr. Johnson', date: 'Jan 5, 2024', readTime: '6 min read', category: 'Wellness' },
  { id: 4, type: 'video', title: 'Building Resilience in Difficult Times', author: 'Dr. Martinez', date: 'Dec 28, 2023', duration: '15 min', category: 'Mental Health' },
  { id: 5, type: 'article', title: 'Mindfulness for Beginners', author: 'Emma Wilson', date: 'Dec 20, 2023', readTime: '10 min read', category: 'Meditation' },
  { id: 6, type: 'video', title: 'Managing Work Stress Effectively', author: 'Michael Lee', date: 'Dec 15, 2023', duration: '9 min', category: 'Wellness' },
]

const categories = ['All', 'Mental Health', 'Therapy', 'Wellness', 'Meditation']

export default function EducationalResources() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [savedResources, setSavedResources] = useState<number[]>([])

  const filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory)

  const handleSave = (id: number) => {
    setSavedResources(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Educational Resources</h1>
        <p className="text-muted-foreground">Learn about mental health, wellness, and personal growth</p>
      </div>

      {/* Categories */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition ${
              selectedCategory === cat
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-foreground hover:bg-muted/80'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3 mb-8">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Resources</h3>
          <p className="text-3xl font-bold text-primary">{resources.length}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Saved</h3>
          <p className="text-3xl font-bold text-primary">{savedResources.length}</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Categories</h3>
          <p className="text-3xl font-bold text-primary">{categories.length - 1}</p>
        </Card>
      </div>

      {/* Resources Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-start gap-3 flex-1">
                {resource.type === 'article' ? (
                  <FileText className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                ) : (
                  <Play className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{resource.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">By {resource.author}</p>
                </div>
              </div>
              <button
                onClick={() => handleSave(resource.id)}
                className={`p-2 rounded-lg transition ${
                  savedResources.includes(resource.id)
                    ? 'bg-primary/10 text-primary'
                    : 'hover:bg-muted'
                }`}
              >
                ♥
              </button>
            </div>

            <div className="flex items-center justify-between text-xs text-muted-foreground mb-4 pb-4 border-b border-border">
              <span>{resource.category}</span>
              <span>
                {resource.type === 'article' ? resource.readTime : resource.duration}
              </span>
            </div>

            <Button variant="outline" className="w-full">
              <ExternalLink className="h-4 w-4 mr-2" />
              View Resource
            </Button>
          </Card>
        ))}
      </div>

      {filteredResources.length === 0 && (
        <Card className="p-12 text-center">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">No resources found in this category.</p>
        </Card>
      )}
    </div>
  )
}

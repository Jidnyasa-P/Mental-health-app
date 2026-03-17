'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BookOpen, ExternalLink, Heart, Volume2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'

const resources = [
  {
    id: 1,
    type: 'organization',
    title: 'NAMI - National Alliance on Mental Illness',
    description: 'Comprehensive mental health information, support groups, and education',
    url: 'https://www.nami.org',
    category: 'Organizations',
    icon: '🏥'
  },
  {
    id: 2,
    type: 'hotline',
    title: 'Crisis Text Line',
    description: 'Text HOME to 741741. Free, 24/7 crisis support from trained counselors',
    url: 'https://www.crisistextline.org',
    category: 'Crisis Support',
    icon: '📱'
  },
  {
    id: 3,
    type: 'hotline',
    title: 'SAMHSA National Helpline',
    description: 'Free, confidential, 24/7 treatment referral: 1-800-662-4357',
    url: 'https://www.samhsa.gov/find-help/national-helpline',
    category: 'Crisis Support',
    icon: '☎️'
  },
  {
    id: 4,
    type: 'platform',
    title: 'Psychology Today - Therapist Finder',
    description: 'Find licensed therapists near you with detailed profiles and specialties',
    url: 'https://www.psychologytoday.com/us/basics/therapy',
    category: 'Therapist Directory',
    icon: '👥'
  },
  {
    id: 5,
    type: 'app',
    title: 'Headspace - Meditation & Sleep',
    description: 'Guided meditations, sleep stories, and mindfulness exercises',
    url: 'https://www.headspace.com',
    category: 'Meditation',
    icon: '🧘'
  },
  {
    id: 6,
    type: 'app',
    title: 'Calm - Sleep & Relaxation',
    description: 'Sleep stories, breathing exercises, and relaxation programs',
    url: 'https://www.calm.com',
    category: 'Meditation',
    icon: '🌙'
  },
  {
    id: 7,
    type: 'organization',
    title: 'Anxiety and Depression Association of America',
    description: 'Resources and support for anxiety and depression disorders',
    url: 'https://adaa.org',
    category: 'Organizations',
    icon: '💪'
  },
  {
    id: 8,
    type: 'organization',
    title: 'Mental Health America',
    description: 'Mental health screening tools and educational resources',
    url: 'https://www.mhanational.org',
    category: 'Organizations',
    icon: '🌟'
  },
  {
    id: 9,
    type: 'platform',
    title: 'BetterHelp - Online Therapy',
    description: 'Connect with licensed therapists online for affordable mental health support',
    url: 'https://www.betterhelp.com',
    category: 'Online Therapy',
    icon: '💻'
  },
  {
    id: 10,
    type: 'app',
    title: 'Insight Timer - Free Meditation',
    description: 'Largest free meditation app with 100,000+ guided sessions',
    url: 'https://insighttimer.com',
    category: 'Meditation',
    icon: '🔔'
  },
  {
    id: 11,
    type: 'article',
    title: 'MindBodyGreen - Mental Health Articles',
    description: 'Expert-written articles on mental health, wellness, and mindfulness',
    url: 'https://www.mindbodygreen.com/basics/mental-health',
    category: 'Education',
    icon: '📖'
  },
  {
    id: 12,
    type: 'organization',
    title: 'The Jed Foundation - Youth Mental Health',
    description: 'Resources and support for adolescent mental health',
    url: 'https://jedfoundation.org',
    category: 'Youth Resources',
    icon: '👨‍👩‍👧‍👦'
  },
]

const categories = ['All', 'Organizations', 'Crisis Support', 'Meditation', 'Online Therapy', 'Therapist Directory', 'Education', 'Youth Resources']

export default function EducationalResources() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [showSavedOnly, setShowSavedOnly] = useState(false)
  const [savedResources, setSavedResources] = useState<number[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('saved_resources')
      return saved ? JSON.parse(saved) : []
    }
    return []
  })
  const [speakingId, setSpeakingId] = useState<number | null>(null)
  const synthesisRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Persist saved resources to localStorage
  useEffect(() => {
    localStorage.setItem('saved_resources', JSON.stringify(savedResources))
  }, [savedResources])

  let filteredResources = selectedCategory === 'All' 
    ? resources 
    : resources.filter(r => r.category === selectedCategory)

  if (showSavedOnly) {
    filteredResources = filteredResources.filter(r => savedResources.includes(r.id))
  }

  const handleSave = (id: number) => {
    setSavedResources(prev => prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id])
  }

  const speakDescription = (id: number, title: string, description: string) => {
    if (speakingId === id) {
      window.speechSynthesis.cancel()
      setSpeakingId(null)
      return
    }

    const fullText = `${title}. ${description}`
    const utterance = new SpeechSynthesisUtterance(fullText)
    utterance.rate = 1
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
        <h1 className="text-3xl font-bold text-foreground mb-2">Educational Resources</h1>
        <p className="text-muted-foreground">Learn about mental health, wellness, and personal growth</p>
      </div>

      {/* Categories & Filters */}
      <div className="flex gap-3 mb-8 overflow-x-auto pb-2 items-center">
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
        <button
          onClick={() => setShowSavedOnly(!showSavedOnly)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition flex items-center gap-2 ${
            showSavedOnly
              ? 'bg-red-500/20 text-red-600 border border-red-500/50'
              : 'bg-muted text-foreground hover:bg-muted/80'
          }`}
        >
          <Heart className="h-4 w-4" />
          Saved ({savedResources.length})
        </button>
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredResources.map((resource) => (
          <Card key={resource.id} className="p-6 hover:shadow-lg transition-shadow flex flex-col">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-start gap-3 flex-1">
                <span className="text-3xl leading-none">{resource.icon}</span>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground leading-tight">{resource.title}</h3>
                </div>
              </div>
              <button
                onClick={() => handleSave(resource.id)}
                className={`p-2 rounded-lg transition flex-shrink-0 ${
                  savedResources.includes(resource.id)
                    ? 'bg-accent/10 text-accent'
                    : 'hover:bg-muted text-muted-foreground'
                }`}
                title="Save resource"
              >
                <Heart className="h-4 w-4" fill={savedResources.includes(resource.id) ? 'currentColor' : 'none'} />
              </button>
            </div>

            <p className="text-sm text-muted-foreground mb-4 flex-grow">{resource.description}</p>

            <div className="flex items-center justify-between text-xs mb-4 pb-4 border-b border-border">
              <span className="bg-primary/10 text-primary px-2 py-1 rounded">{resource.category}</span>
              <span className="text-muted-foreground">{resource.type}</span>
            </div>

            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => speakDescription(resource.id, resource.title, resource.description)}
                className={`flex-1 ${speakingId === resource.id ? 'bg-primary/20 text-primary' : ''}`}
                title="Read aloud"
              >
                <Volume2 className="h-4 w-4 mr-2" />
                {speakingId === resource.id ? 'Stop' : 'Read'}
              </Button>
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full">
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Visit
                </Button>
              </a>
            </div>
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

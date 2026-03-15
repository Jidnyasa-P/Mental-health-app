'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Play, Clock, CheckCircle, Zap } from 'lucide-react'
import { useState } from 'react'
import { MeditationPlayer } from '@/components/meditation-player'

const meditationSessions = [
  {
    id: '1',
    title: 'Morning Mindfulness',
    description: 'Start your day with a refreshing 10-minute mindfulness session',
    duration_minutes: 10,
    content: 'Welcome to Morning Mindfulness. Find a comfortable position and close your eyes. Take a deep breath in through your nose for a count of 4, hold it for 4, and exhale for 4. This breathing technique activates your parasympathetic nervous system, helping you feel calm and centered. Continue this pattern for the next 10 minutes. Notice any thoughts that arise, acknowledge them, and gently return your focus to your breath. As you breathe, imagine a warm, golden light filling your body with each inhale, and releasing any tension with each exhale.',
    difficulty_level: 'Beginner',
  },
  {
    id: '2',
    title: 'Stress Relief',
    description: 'Release tension and anxiety with this guided relaxation',
    duration_minutes: 15,
    content: 'Welcome to Stress Relief meditation. This session will help you release the accumulated stress from your day. Start by slowly tensing and releasing each muscle group in your body. Begin with your feet - tense them for 5 seconds, then release and notice the difference. Move up through your calves, thighs, abdomen, chest, arms, shoulders, neck, and finally your face. This progressive muscle relaxation technique helps identify where you hold tension and teaches your body how to release it. As you relax each area, imagine it becoming lighter and warmer.',
    difficulty_level: 'Beginner',
  },
  {
    id: '3',
    title: 'Sleep Preparation',
    description: 'Prepare your mind and body for restful sleep',
    duration_minutes: 20,
    content: 'Welcome to Sleep Preparation meditation. This session is designed to help you transition into a peaceful sleep. Lie down in a comfortable position and allow your body to sink into the mattress. Begin by visualizing a peaceful place - perhaps a quiet beach, a calm forest, or a cozy bedroom. Engage all your senses: What do you see? What sounds do you hear? What does the air feel like on your skin? As you deepen this visualization, feel your body becoming heavier and more relaxed. Your eyelids may begin to feel heavy. That is a sign of deep relaxation.',
    difficulty_level: 'Beginner',
  },
  {
    id: '4',
    title: 'Anxiety Dissolving',
    description: 'Techniques to calm anxious thoughts and racing mind',
    duration_minutes: 12,
    content: 'Welcome to Anxiety Dissolving meditation. If you are experiencing anxiety, know that you are safe. This session uses grounding techniques to anchor you to the present moment. Start by noticing 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste. This 5-4-3-2-1 grounding technique helps shift your focus from anxious thoughts to your immediate physical surroundings. Next, we will use breathing to calm your nervous system. Try the 4-7-8 breathing: inhale for 4 counts, hold for 7, exhale for 8. This longer exhale activates relaxation.',
    difficulty_level: 'Beginner',
  },
  {
    id: '5',
    title: 'Love and Compassion',
    description: 'Cultivate kindness and compassion for yourself and others',
    duration_minutes: 18,
    content: 'Welcome to Love and Compassion meditation. In this session, we practice Metta or loving-kindness meditation. Start by directing loving-kindness to yourself: Silently repeat, "May I be happy, may I be healthy, may I be safe, may I live with ease." Feel the warmth of these wishes in your heart. Now extend these wishes to someone you love: "May you be happy, may you be healthy, may you be safe, may you live with ease." Then extend them to a neutral person, someone you do not know well. Finally, extend loving-kindness to all beings everywhere.',
    difficulty_level: 'Intermediate',
  },
  {
    id: '6',
    title: 'Body Scan',
    description: 'Deep awareness of your body and physical sensations',
    duration_minutes: 25,
    content: 'Welcome to Body Scan meditation. This practice develops awareness of your body and helps release tension you may not realize you are holding. Lie down comfortably or sit with your back supported. Close your eyes and begin at the top of your head. Without trying to change anything, simply notice the sensations: Is it warm or cool? Tense or relaxed? Heavy or light? Slowly move your attention down through your body. Spend 30-60 seconds on each area. If you notice tension, breathe into that area and imagine your breath bringing relaxation.',
    difficulty_level: 'Intermediate',
  },
]

export default function MeditationPage() {
  const [selectedSession, setSelectedSession] = useState<typeof meditationSessions[0] | null>(null)
  const [completedSessions] = useState(['1', '3'])

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground mb-2">Meditation & Mindfulness</h1>
        <p className="text-muted-foreground">
          Find peace and balance with our guided meditation sessions tailored to your needs
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-6 bg-gradient-to-br from-primary/5 to-primary/2">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Sessions Completed</h3>
          <p className="text-3xl font-bold text-primary">{completedSessions.length}</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-accent/5 to-accent/2">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Minutes</h3>
          <p className="text-3xl font-bold text-accent">145</p>
        </Card>
        <Card className="p-6 bg-gradient-to-br from-secondary/5 to-secondary/2">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Streak</h3>
          <p className="text-3xl font-bold text-secondary">7 days</p>
        </Card>
      </div>

      {/* Sessions Grid */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">All Sessions</h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {meditationSessions.map((session) => {
            const isCompleted = completedSessions.includes(session.id)
            return (
              <Card
                key={session.id}
                className="p-6 hover:shadow-lg transition-all cursor-pointer hover:border-primary/50"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-foreground text-lg">{session.title}</h3>
                      {isCompleted && <CheckCircle className="h-5 w-5 text-accent flex-shrink-0" />}
                    </div>
                    <p className="text-xs font-medium text-primary">{session.difficulty_level}</p>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{session.description}</p>

                <div className="flex items-center gap-2 mb-6">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{session.duration_minutes} minutes</span>
                </div>

                <Button
                  className="w-full"
                  onClick={() => setSelectedSession(session)}
                >
                  <Play className="h-4 w-4 mr-2" />
                  Start Session
                </Button>
              </Card>
            )
          })}
        </div>
      </div>

      {/* Tips Section */}
      <Card className="p-6 bg-secondary/5 border-secondary/20">
        <div className="flex gap-4">
          <Zap className="h-6 w-6 text-secondary flex-shrink-0 mt-1" />
          <div>
            <h3 className="font-semibold text-foreground mb-2">Tips for Best Results</h3>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Find a quiet, comfortable space to practice</li>
              <li>• Meditate at the same time each day for consistency</li>
              <li>• Start with shorter sessions and gradually increase duration</li>
              <li>• Use headphones for better audio experience</li>
              <li>• Practice regularly - benefits compound over time</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Meditation Player Modal */}
      {selectedSession && (
        <MeditationPlayer
          session={selectedSession}
          onClose={() => setSelectedSession(null)}
        />
      )}
    </div>
  )
}

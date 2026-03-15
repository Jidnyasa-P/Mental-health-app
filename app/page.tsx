'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, Brain, Zap, Users, BookOpen, MessageCircle, Feather, Search, Bell } from 'lucide-react'
import { Footer } from '@/components/footer'

const features = [
  {
    icon: Heart,
    title: 'Mood Tracking',
    description: 'Track your emotional patterns and discover insights about your wellbeing.',
    href: '/dashboard/mood',
  },
  {
    icon: Feather,
    title: 'Private Journaling',
    description: 'Express yourself in a safe, private space with our journaling tool.',
    href: '/dashboard/journal',
  },
  {
    icon: Brain,
    title: 'AI Support Chat',
    description: 'Get personalized support from our intelligent AI companion.',
    href: '/dashboard/chat',
  },
  {
    icon: Zap,
    title: 'Meditation & Mindfulness',
    description: 'Guided sessions to help you relax and find inner peace.',
    href: '/dashboard/meditation',
  },
  {
    icon: Users,
    title: 'Community Forum',
    description: 'Connect with others and share your experiences safely.',
    href: '/dashboard/forum',
  },
  {
    icon: Search,
    title: 'Find a Therapist',
    description: 'Discover and connect with licensed mental health professionals.',
    href: '/dashboard/therapist',
  },
  {
    icon: BookOpen,
    title: 'Educational Resources',
    description: 'Learn about mental health with evidence-based articles and guides.',
    href: '/dashboard/resources',
  },
  {
    icon: MessageCircle,
    title: 'Crisis Support',
    description: 'Immediate support when you need it most.',
    href: '/dashboard/crisis',
  },
]

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                MW
              </div>
              <span className="text-lg font-semibold text-foreground">MindWell</span>
            </div>
            <nav className="hidden items-center gap-8 md:flex">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition">Features</Link>
              <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground transition">Sign In</Link>
              <Button asChild>
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </nav>
            <Button variant="outline" size="icon" className="md:hidden">
              <Bell className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl md:text-6xl text-balance">
            Your Mental Health Companion
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Track your mood, journal privately, chat with AI support, find therapists, and connect with a supportive community. All in one place.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
            <Button size="lg" asChild>
              <Link href="/auth/signup">Get Started Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="#features">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground sm:text-4xl">Everything You Need</h2>
          <p className="mt-4 text-muted-foreground">Comprehensive tools for your mental wellness journey</p>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature) => {
            const Icon = feature.icon
            return (
              <Link key={feature.href} href={feature.href}>
                <Card className="h-full p-6 hover:shadow-lg transition-shadow cursor-pointer hover:border-primary/50">
                  <Icon className="h-8 w-8 text-primary mb-4" />
                  <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </Card>
              </Link>
            )
          })}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-xl bg-primary/10 border border-primary/20 p-8 text-center md:p-12">
          <h2 className="text-2xl font-bold text-foreground md:text-3xl">Ready to Transform Your Mental Health?</h2>
          <p className="mt-4 text-muted-foreground">Join thousands of people taking control of their wellness today.</p>
          <Button size="lg" className="mt-8" asChild>
            <Link href="/auth/signup">Start Your Journey</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}

'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, Brain, Zap, Users, BookOpen, MessageCircle, Feather, ArrowRight, CheckCircle, Sparkles } from 'lucide-react'
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
    description: 'Express yourself with voice support in a safe, private space.',
    href: '/dashboard/journal',
  },
  {
    icon: Brain,
    title: 'AI Support Chat',
    description: 'Get personalized support from Groq-powered intelligent assistant.',
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
    icon: BookOpen,
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
    description: 'Immediate support and safety planning when you need it most.',
    href: '/dashboard/crisis',
  },
]

function FlipCard({ feature, index }) {
  const [isFlipped, setIsFlipped] = useState(false)
  const Icon = feature.icon

  return (
    <div
      className="h-64 cursor-pointer perspective animate-fade-in"
      style={{ animationDelay: `${index * 0.1}s` }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div
        className="relative w-full h-full transition-transform duration-500 transform-gpu"
        style={{
          transformStyle: 'preserve-3d',
          transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* Front of card */}
        <div
          className="absolute w-full h-full p-6 bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-primary/20 hover:border-primary/50 hover:shadow-lg flex flex-col items-center justify-center text-center transition-all"
          style={{ backfaceVisibility: 'hidden' }}
        >
          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-all">
            <Icon className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
          <p className="text-xs text-muted-foreground mb-4">Click to learn more</p>
          <Sparkles className="h-4 w-4 text-primary/60 animate-pulse" />
        </div>

        {/* Back of card */}
        <div
          className="absolute w-full h-full p-6 bg-gradient-to-br from-primary/10 to-accent/10 rounded-lg border border-primary/30 hover:border-primary/60 hover:shadow-lg flex flex-col items-center justify-center text-center transition-all"
          style={{
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          <div className="flex flex-col h-full justify-between items-center">
            <div>
              <p className="text-sm text-foreground font-medium mb-2">{feature.description}</p>
            </div>
            <Link
              href={feature.href}
              className="px-4 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary hover:text-primary-foreground transition-all text-sm font-medium"
            >
              Start Now <ArrowRight className="h-3 w-3 inline ml-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background overflow-hidden">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="public/mindwell-logo.png"
                alt="MindWell Logo"
                className="h-10 w-10 rounded-lg object-contain bg-white"
              />
              <span className="text-lg font-semibold text-foreground">MindWell</span>
            </div>
            <nav className="hidden items-center gap-8 md:flex">
              <Link href="#features" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Features</Link>
              <Link href="/auth/login" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Sign In</Link>
              <Button asChild className="animate-bounce">
                <Link href="/auth/signup">Get Started</Link>
              </Button>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section with Animations */}
      <section className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

        <div className="relative text-center">
          <div className="inline-block mb-4 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
            <p className="text-sm font-medium text-primary">Welcome to MindWell</p>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-foreground text-balance mb-6 animate-fade-in">
            Your Mental Health Companion
          </h1>

          <p className="mt-6 text-xl text-muted-foreground max-w-3xl mx-auto text-pretty animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Track your mood, journal with voice support, get AI guidance, find therapists, and connect with a supportive community. All in one peaceful place.
          </p>

          <div className="mt-12 flex items-center justify-center gap-4 flex-wrap animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <Button size="lg" asChild className="hover:scale-105 transition-transform">
              <Link href="/auth/login">Get Started</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="hover:scale-105 transition-transform">
              <Link href="#features">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all animate-slide-up">
            <p className="text-3xl font-bold text-primary">100%</p>
            <p className="text-muted-foreground mt-2">Private & Secure</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <p className="text-3xl font-bold text-primary">24/7</p>
            <p className="text-muted-foreground mt-2">AI Support Available</p>
          </div>
          <div className="text-center p-4 rounded-lg bg-primary/5 border border-primary/10 hover:border-primary/30 transition-all animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <p className="text-3xl font-bold text-primary">Free</p>
            <p className="text-muted-foreground mt-2">To Get Started</p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">Everything You Need</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">Comprehensive tools for mental health and wellbeing</p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <FlipCard key={feature.href} feature={feature} index={index} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl bg-gradient-to-r from-primary/20 to-accent/20 border border-primary/30 p-12 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl"></div>
          <div className="relative text-center">
            <h2 className="text-4xl font-bold text-foreground mb-4">Ready to Start Your Journey?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">Join thousands using MindWell for better mental health</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="hover:scale-105 transition-transform">
                <Link href="/auth/login">Get Started Free</Link>
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle className="h-4 w-4 text-green-500" />
                No credit card required
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 1s ease-in forwards;
          opacity: 0;
        }
        .animate-slide-up {
          animation: slide-up 0.6s ease-out forwards;
          opacity: 0;
        }
        .perspective {
          perspective: 1000px;
        }
        .transform-gpu {
          will-change: transform;
        }
      `}</style>
    </div>
  )
}

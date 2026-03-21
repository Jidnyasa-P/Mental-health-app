'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft, Heart, Users, Target } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition w-fit">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 text-center">
        <h1 className="text-4xl font-bold text-foreground sm:text-5xl mb-4">About MindWell</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          We're on a mission to make mental health support accessible to everyone
        </p>
      </section>

      {/* Our Story */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-6">Our Story</h2>
        <Card className="p-8">
          <p className="text-muted-foreground leading-relaxed mb-4">
            MindWell was founded by a team of mental health professionals and tech enthusiasts who saw a gap in accessible mental health support. We believed that everyone deserves easy access to tools that help them understand and improve their mental wellbeing.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Today, MindWell serves thousands of users worldwide, providing comprehensive mental health support through mood tracking, journaling, AI-powered conversations, meditation, and professional resources all in one place.
          </p>
        </Card>
      </section>

      {/* Our Values */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Values</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="p-8 text-center">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">Compassion</h3>
            <p className="text-muted-foreground">
              We approach every interaction with empathy and understanding, recognizing the challenges people face with their mental health.
            </p>
          </Card>
          <Card className="p-8 text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">Community</h3>
            <p className="text-muted-foreground">
              We foster a supportive community where people can connect, share experiences, and support each other's mental health journeys.
            </p>
          </Card>
          <Card className="p-8 text-center">
            <Target className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">Accessibility</h3>
            <p className="text-muted-foreground">
              We're committed to making quality mental health resources available to everyone, regardless of background or circumstances.
            </p>
          </Card>
        </div>
      </section>

      {/* Team */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Team</h2>
        <div className="grid gap-6 md:grid-cols-2">
          {[
            { name: 'Jidnyasa Patil', role: 'Founder & Developer' },
            { name: 'Asmi Tatawar', role: 'Co-Founder & Developer' },
          ].map((member, index) => (
            <Card key={index} className="p-6">
              <img
                src="/Jidnyasa.png"
                alt="Jidnyasa"
                className="h-10 w-10 rounded-lg object-contain bg-white"
              />
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{member.role, <img 
      src="/Asmi.png" 
      alt="Asmi" 
      className="h-10 w-10 rounded-lg object-contain bg-white" 
    />
              <h3 className="font-semibold text-foreground">{member.name}</h3>
              <p className="text-sm text-muted-foreground mt-1">{member.role,}</p>
            </Card>
          ))}
        </div>
      </section>

      {/* Impact */}
      <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-foreground mb-12 text-center">Our Impact</h2>
        <div className="grid gap-6 md:grid-cols-4">
          <Card className="p-6 text-center">
            <p className="text-4xl font-bold text-primary mb-2">50K+</p>
            <p className="text-muted-foreground">Users Served</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-4xl font-bold text-primary mb-2">500K+</p>
            <p className="text-muted-foreground">Mood Entries Logged</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-4xl font-bold text-primary mb-2">100K+</p>
            <p className="text-muted-foreground">Meditation Sessions</p>
          </Card>
          <Card className="p-6 text-center">
            <p className="text-4xl font-bold text-primary mb-2">30+</p>
            <p className="text-muted-foreground">Countries</p>
          </Card>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <Card className="p-8 bg-primary/10 border-primary/20 text-center">
          <h2 className="text-2xl font-bold text-foreground mb-4">Join Our Mission</h2>
          <p className="text-muted-foreground mb-6">
            Be part of a community dedicated to making mental health support accessible to everyone.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/">Learn More</Link>
            </Button>
          </div>
        </Card>
      </section>

      {/* Footer Navigation */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 flex gap-4 justify-center flex-wrap">
        <Button asChild variant="outline">
          <Link href="/privacy">Privacy Policy</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/terms">Terms of Service</Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
  )
}

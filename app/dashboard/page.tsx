'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Heart, Feather, Brain, Zap, Users, Search, BookOpen, MessageCircle } from 'lucide-react'

const quickAccess = [
  { title: 'Mood Tracking', description: 'Log and track your mood', href: '/dashboard/mood', icon: Heart, color: 'text-red-500' },
  { title: 'Journal', description: 'Write your thoughts', href: '/dashboard/journal', icon: Feather, color: 'text-purple-500' },
  { title: 'AI Chat', description: 'Get instant support', href: '/dashboard/chat', icon: Brain, color: 'text-blue-500' },
  { title: 'Meditation', description: 'Relax and breathe', href: '/dashboard/meditation', icon: Zap, color: 'text-amber-500' },
  { title: 'Community', description: 'Connect with others', href: '/dashboard/forum', icon: Users, color: 'text-green-500' },
  { title: 'Therapist', description: 'Find professional help', href: '/dashboard/therapist', icon: Search, color: 'text-indigo-500' },
  { title: 'Resources', description: 'Learn & grow', href: '/dashboard/resources', icon: BookOpen, color: 'text-cyan-500' },
  { title: 'Crisis Help', description: 'Urgent support', href: '/dashboard/crisis', icon: MessageCircle, color: 'text-rose-500' },
]

export default function DashboardOverview() {
  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h1>
        <p className="text-muted-foreground">Your mental wellness dashboard</p>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4 mb-8">
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Mood Entries</h3>
          <p className="text-3xl font-bold text-primary">12</p>
          <p className="text-xs text-muted-foreground mt-2">This week</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Journal Entries</h3>
          <p className="text-3xl font-bold text-primary">5</p>
          <p className="text-xs text-muted-foreground mt-2">This month</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Meditation Time</h3>
          <p className="text-3xl font-bold text-primary">120</p>
          <p className="text-xs text-muted-foreground mt-2">Minutes total</p>
        </Card>
        <Card className="p-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-2">Streak</h3>
          <p className="text-3xl font-bold text-primary">7</p>
          <p className="text-xs text-muted-foreground mt-2">Days</p>
        </Card>
      </div>

      {/* Quick Access */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-6">Quick Access</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {quickAccess.map((item) => {
            const Icon = item.icon
            return (
              <Link key={item.href} href={item.href}>
                <Card className="h-full p-6 hover:shadow-lg hover:border-primary/50 transition-all cursor-pointer">
                  <Icon className={`h-8 w-8 mb-4 ${item.color}`} />
                  <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              </Link>
            )
          })}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-foreground mb-6">Recent Activity</h2>
        <Card className="p-6">
          <div className="space-y-4">
            <div className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Logged mood entry - Happy</p>
                <p className="text-xs text-muted-foreground">Today at 2:30 PM</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Completed meditation session</p>
                <p className="text-xs text-muted-foreground">Yesterday at 7:00 AM</p>
              </div>
            </div>
            <div className="flex items-start gap-4 pb-4 border-b border-border last:border-0">
              <div className="h-2 w-2 rounded-full bg-primary mt-2" />
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">Added journal entry</p>
                <p className="text-xs text-muted-foreground">2 days ago</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

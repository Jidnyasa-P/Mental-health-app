'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { UserMenu } from '@/components/user-menu'
import { UserProvider } from '@/lib/user-context'
import {
  Heart,
  Feather,
  Brain,
  Zap,
  Users,
  Search,
  BookOpen,
  MessageCircle,
  Menu,
  X,
  Settings,
  Home,
  LogOut
} from 'lucide-react'

const navigationItems = [
  { name: 'Overview', href: '/dashboard', icon: Home },
  { name: 'Mood Tracking', href: '/dashboard/mood', icon: Heart },
  { name: 'Private Journal', href: '/dashboard/journal', icon: Feather },
  { name: 'AI Support Chat', href: '/dashboard/chat', icon: Brain },
  { name: 'Meditation', href: '/dashboard/meditation', icon: Zap },
  { name: 'Community Forum', href: '/dashboard/forum', icon: Users },
  { name: 'Find Therapist', href: '/dashboard/therapist', icon: Search },
  { name: 'Resources', href: '/dashboard/resources', icon: BookOpen },
  { name: 'Crisis Support', href: '/dashboard/crisis', icon: MessageCircle },
]

function DashboardContent({
  children,
}: {
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={`${sidebarOpen ? 'block' : 'hidden'
        } md:block w-full md:w-64 border-r border-border bg-sidebar overflow-y-auto`}>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-8">
            <img
              src="/mindwell-logo.png"
              alt="MindWell Logo"
              className="h-10 w-10 rounded-lg object-contain bg-white"
            />
            <span className="text-lg font-semibold text-sidebar-foreground">MindWell</span>
          </div>

          <nav className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${isActive
                      ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                      : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground'
                    }`}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{item.name}</span>
                </Link>
              )
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-sidebar-border bg-sidebar md:relative">
          <div className="space-y-2">
            <Link href="/dashboard/settings" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
              <Settings className="h-5 w-5" />
              <span className="text-sm font-medium">Settings</span>
            </Link>
            <Link href="/auth/logout" className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors">
              <LogOut className="h-5 w-5" />
              <span className="text-sm font-medium">Logout</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="border-b border-border bg-background px-4 py-4 sm:px-6 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-muted rounded-lg transition"
          >
            {sidebarOpen ? (
              <X className="h-6 w-6 text-foreground" />
            ) : (
              <Menu className="h-6 w-6 text-foreground" />
            )}
          </button>

          <div className="flex-1 ml-4 md:ml-0" />

          <div className="flex items-center gap-4">
            <UserMenu />
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="h-full">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 md:hidden bg-black/50 z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  )
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <UserProvider>
      <DashboardContent>{children}</DashboardContent>
    </UserProvider>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useUser } from '@/lib/user-context'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { LogOut, Settings, User as UserIcon } from 'lucide-react'

export function UserMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, logout } = useUser()
  const router = useRouter()

  const handleLogout = () => {
    logout()
    setIsOpen(false)
    router.push('/auth/login')
  }

  if (!user) return null

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-center h-10 w-10 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 transition font-semibold"
        title={user.email}
      >
        {user.full_name ? user.full_name.charAt(0).toUpperCase() : 'U'}
      </button>

      {isOpen && (
        <Card className="absolute right-0 mt-2 w-56 p-0 shadow-2xl z-50">
          <div className="p-4 border-b border-border bg-muted/30">
            <p className="text-sm font-semibold text-foreground">{user.full_name || 'User'}</p>
            <p className="text-xs text-muted-foreground truncate">{user.email}</p>
          </div>

          <div className="p-2">
            <Link href="/dashboard/settings" onClick={() => setIsOpen(false)}>
              <Button variant="ghost" className="w-full justify-start text-sm">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
            </Link>
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 rounded transition"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </Card>
      )}

      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  )
}

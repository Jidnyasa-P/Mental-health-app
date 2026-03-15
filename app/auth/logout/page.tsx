'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Logout() {
  const router = useRouter()

  useEffect(() => {
    // Simulate logout process
    setTimeout(() => {
      router.push('/')
    }, 1500)
  }, [router])

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 mb-6">
          <div className="text-3xl">👋</div>
        </div>
        <h1 className="text-2xl font-bold text-foreground mb-2">See You Soon!</h1>
        <p className="text-muted-foreground">You have been logged out successfully.</p>
        <p className="text-sm text-muted-foreground mt-4">Redirecting to home page...</p>
      </div>
    </div>
  )
}

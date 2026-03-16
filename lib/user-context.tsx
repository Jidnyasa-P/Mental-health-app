'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  full_name?: string
  avatar_url?: string
}

interface UserContextType {
  user: User | null
  isLoading: boolean
  logout: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for demo session
    const demoSession = localStorage.getItem('mindwell_demo_session')
    if (demoSession) {
      try {
        const session = JSON.parse(demoSession)
        setUser({
          id: session.user.id,
          email: session.user.email,
          full_name: session.user.user_metadata?.full_name || 'Demo User'
        })
      } catch (error) {
        console.error('Error loading demo session:', error)
      }
    }
    setIsLoading(false)
  }, [])

  const logout = () => {
    localStorage.removeItem('mindwell_demo_session')
    setUser(null)
  }

  return (
    <UserContext.Provider value={{ user, isLoading, logout }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error('useUser must be used within UserProvider')
  }
  return context
}

'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Bell, Lock, Eye, Save, LogOut } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Settings() {
  const [saved, setSaved] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [user, setUser] = useState(() => {
    if (typeof window !== 'undefined') {
      const session = localStorage.getItem('mindwell_demo_session')
      return session ? JSON.parse(session).user : null
    }
    return null
  })
  const [formData, setFormData] = useState({
    fullName: user?.user_metadata?.full_name || 'Demo User',
    email: user?.email || 'demo@mindwell.com',
    phone: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [notifications, setNotifications] = useState({
    email: true,
    meditation: true,
    community: false
  })
  const [privacy, setPrivacy] = useState({
    profileVisibility: 'private',
    showActivity: false,
    allowDiscovery: true
  })
  const router = useRouter()

  const handleSave = () => {
    // Update user session with new info
    if (user) {
      const updated = {
        user: {
          ...user,
          email: formData.email,
          user_metadata: {
            full_name: formData.fullName,
            phone: formData.phone
          }
        },
        session_token: 'demo-token-xyz'
      }
      localStorage.setItem('mindwell_demo_session', JSON.stringify(updated))
    }
    localStorage.setItem('settings', JSON.stringify({
      formData,
      notifications,
      privacy
    }))
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  const handlePasswordChange = () => {
    if (formData.newPassword === formData.confirmPassword && formData.newPassword.length >= 6) {
      alert('Password changed successfully!')
      setFormData({...formData, newPassword: '', confirmPassword: ''})
      setSaved(true)
      setTimeout(() => setSaved(false), 3000)
    } else {
      alert('Passwords must match and be at least 6 characters')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('mindwell_demo_session')
    router.push('/auth/login')
  }

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      localStorage.clear()
      router.push('/')
    } else {
      setShowDeleteConfirm(true)
    }
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
        <p className="text-muted-foreground">Manage your account and preferences</p>
      </div>

      {/* Notification Settings */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notifications
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-foreground">Email Notifications</p>
              <p className="text-sm text-muted-foreground">Receive updates about your account</p>
            </div>
            <input 
              type="checkbox" 
              checked={notifications.email}
              onChange={(e) => setNotifications({...notifications, email: e.target.checked})}
              className="h-5 w-5 rounded" 
            />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-medium text-foreground">Meditation Reminders</p>
              <p className="text-sm text-muted-foreground">Get daily meditation reminders</p>
            </div>
            <input 
              type="checkbox" 
              checked={notifications.meditation}
              onChange={(e) => setNotifications({...notifications, meditation: e.target.checked})}
              className="h-5 w-5 rounded" 
            />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-medium text-foreground">Community Updates</p>
              <p className="text-sm text-muted-foreground">Hear about new threads and replies</p>
            </div>
            <input 
              type="checkbox" 
              checked={notifications.community}
              onChange={(e) => setNotifications({...notifications, community: e.target.checked})}
              className="h-5 w-5 rounded" 
            />
          </div>
        </div>
      </Card>

      {/* Privacy Settings */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <Eye className="h-5 w-5" />
          Privacy
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Profile Visibility</label>
            <select 
              value={privacy.profileVisibility}
              onChange={(e) => setPrivacy({...privacy, profileVisibility: e.target.value})}
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground"
            >
              <option value="private">Private (only you can see)</option>
              <option value="friends">Friends Only</option>
              <option value="public">Public</option>
            </select>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-medium text-foreground">Show Activity Status</p>
              <p className="text-sm text-muted-foreground">Let others see when you're using MindWell</p>
            </div>
            <input 
              type="checkbox" 
              checked={privacy.showActivity}
              onChange={(e) => setPrivacy({...privacy, showActivity: e.target.checked})}
              className="h-5 w-5 rounded" 
            />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-medium text-foreground">Allow Therapist Discovery</p>
              <p className="text-sm text-muted-foreground">Help therapists find you based on your needs</p>
            </div>
            <input 
              type="checkbox" 
              checked={privacy.allowDiscovery}
              onChange={(e) => setPrivacy({...privacy, allowDiscovery: e.target.checked})}
              className="h-5 w-5 rounded" 
            />
          </div>
        </div>
      </Card>

      {/* Security Settings */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
          <Lock className="h-5 w-5" />
          Security
        </h2>
        <div className="space-y-4">
          <div className="p-4 rounded-lg bg-primary/5 border border-primary/10">
            <label className="block text-sm font-medium text-foreground mb-4">Change Password</label>
            <input
              type="password"
              value={formData.newPassword}
              onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
              placeholder="New Password (min 6 characters)"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground mb-3"
            />
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
              placeholder="Confirm Password"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground mb-3"
            />
            <Button onClick={handlePasswordChange} className="w-full">Update Password</Button>
          </div>
          <div className="border-t border-border pt-4">
            <label className="block text-sm font-medium text-foreground mb-2">Two-Factor Authentication</label>
            <p className="text-sm text-muted-foreground mb-4">Add an extra layer of security to your account</p>
            <Button variant="outline" className="w-full">Enable 2FA</Button>
          </div>
          <div className="border-t border-border pt-4">
            <label className="block text-sm font-medium text-foreground mb-2">Active Sessions</label>
            <p className="text-sm text-muted-foreground mb-4">Manage devices and sessions</p>
            <div className="p-3 rounded-lg bg-muted mb-3">
              <p className="text-sm font-medium text-foreground">Chrome on Mac - Last active 10 minutes ago</p>
            </div>
            <Button variant="outline" size="sm">Sign Out All Other Sessions</Button>
          </div>
        </div>
      </Card>

      {/* Account Settings */}
      <Card className="p-6 mb-6">
        <h2 className="text-xl font-semibold text-foreground mb-6">Account Information</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Full Name</label>
            <input 
              type="text" 
              value={formData.fullName}
              onChange={(e) => setFormData({...formData, fullName: e.target.value})}
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input 
              type="email" 
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground" 
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
            <input 
              type="tel" 
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+1 (555) 123-4567" 
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground" 
            />
          </div>
          <div className="border-t border-border pt-4">
            <h3 className="text-sm font-medium text-foreground mb-3">Change Password</h3>
            <div className="space-y-3">
              <input 
                type="password" 
                placeholder="New password"
                value={formData.newPassword}
                onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                className="w-full p-3 rounded-lg border border-border bg-background text-foreground text-sm" 
              />
              <input 
                type="password" 
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                className="w-full p-3 rounded-lg border border-border bg-background text-foreground text-sm" 
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex gap-3 mb-6">
        <Button onClick={handleSave} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
        <Button onClick={handleLogout} variant="outline" className="flex-1">
          <LogOut className="h-4 w-4 mr-2" />
          Logout
        </Button>
      </div>

      {saved && (
        <div className="mt-4 p-4 rounded-lg bg-green-500/10 border border-green-500/20 text-sm text-green-600">
          ✓ Settings saved successfully!
        </div>
      )}

      {/* Danger Zone */}
      <Card className="p-6 mt-8 border-destructive/20 bg-destructive/5">
        <h2 className="text-lg font-semibold text-destructive mb-4">Danger Zone</h2>
        <div className="space-y-3">
          {!showDeleteConfirm ? (
            <>
              <Button 
                onClick={handleDeleteAccount}
                variant="outline" 
                className="w-full text-destructive hover:bg-destructive/10"
              >
                Delete Account
              </Button>
              <p className="text-xs text-muted-foreground">This action cannot be undone. All your data will be permanently deleted.</p>
            </>
          ) : (
            <>
              <div className="p-4 rounded-lg bg-destructive/10 border border-destructive/20">
                <p className="text-sm font-medium text-destructive mb-4">Are you sure? This will delete your account and all associated data permanently.</p>
                <div className="flex gap-3">
                  <Button 
                    onClick={handleDeleteAccount}
                    className="flex-1 bg-destructive hover:bg-destructive/90"
                  >
                    Yes, Delete Everything
                  </Button>
                  <Button 
                    onClick={() => setShowDeleteConfirm(false)}
                    variant="outline"
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </Card>
    </div>
  )
}

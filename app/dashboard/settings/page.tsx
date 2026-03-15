'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Bell, Lock, Eye, Save } from 'lucide-react'
import { useState } from 'react'

export default function Settings() {
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
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
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-medium text-foreground">Meditation Reminders</p>
              <p className="text-sm text-muted-foreground">Get daily meditation reminders</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-medium text-foreground">Community Updates</p>
              <p className="text-sm text-muted-foreground">Hear about new threads and replies</p>
            </div>
            <input type="checkbox" className="h-5 w-5 rounded" />
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
            <select className="w-full p-3 rounded-lg border border-border bg-background text-foreground">
              <option>Private (only you can see)</option>
              <option>Friends Only</option>
              <option>Public</option>
            </select>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-medium text-foreground">Show Activity Status</p>
              <p className="text-sm text-muted-foreground">Let others see when you're using MindWell</p>
            </div>
            <input type="checkbox" className="h-5 w-5 rounded" />
          </div>
          <div className="flex items-center justify-between border-t border-border pt-4">
            <div>
              <p className="font-medium text-foreground">Allow Therapist Discovery</p>
              <p className="text-sm text-muted-foreground">Help therapists find you based on your needs</p>
            </div>
            <input type="checkbox" defaultChecked className="h-5 w-5 rounded" />
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
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Password</label>
            <Button variant="outline" className="w-full">Change Password</Button>
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
            <input type="text" placeholder="Your name" defaultValue="John Doe" className="w-full p-3 rounded-lg border border-border bg-background text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Email</label>
            <input type="email" placeholder="your@email.com" defaultValue="john@example.com" className="w-full p-3 rounded-lg border border-border bg-background text-foreground" />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone</label>
            <input type="tel" placeholder="+1 (555) 123-4567" className="w-full p-3 rounded-lg border border-border bg-background text-foreground" />
          </div>
        </div>
      </Card>

      {/* Save Button */}
      <div className="flex gap-3">
        <Button onClick={handleSave} className="flex-1">
          <Save className="h-4 w-4 mr-2" />
          Save Changes
        </Button>
        <Button variant="outline" className="flex-1">Cancel</Button>
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
          <Button variant="outline" className="w-full text-destructive hover:bg-destructive/10">
            Delete Account
          </Button>
          <p className="text-xs text-muted-foreground">This action cannot be undone. All your data will be permanently deleted.</p>
        </div>
      </Card>
    </div>
  )
}

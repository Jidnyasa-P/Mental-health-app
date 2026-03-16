'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Phone, MessageCircle, AlertCircle, Heart, Save } from 'lucide-react'
import { useState, useEffect } from 'react'
import { CallInterface } from '@/components/call-interface'

const crisisResources = [
  { id: 1, name: 'National Suicide Prevention Lifeline', number: '988', description: 'Available 24/7 for emotional distress and suicidal crisis', type: 'Call' },
  { id: 2, name: 'Crisis Text Line', number: 'Text HOME to 741741', description: 'Text support for crisis situations', type: 'Text' },
  { id: 3, name: 'International Association for Suicide Prevention', number: '+1-212-363-3500', description: 'Global suicide prevention support', type: 'Call' },
]

const copingStrategies = [
  { title: 'Ground Yourself', description: 'Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste' },
  { title: 'Progressive Muscle Relaxation', description: 'Tense and release each muscle group to reduce anxiety' },
  { title: 'Box Breathing', description: 'Breathe in for 4, hold for 4, out for 4, hold for 4' },
  { title: 'Connect with Someone', description: 'Reach out to a trusted friend or family member immediately' },
  { title: 'Physical Activity', description: 'Go for a walk, do jumping jacks, or any movement that helps' },
  { title: 'Cold Water', description: 'Splash cold water on your face or hold ice to activate your senses' },
]

export default function CrisisSupport() {
  const [contactsOpen, setContactsOpen] = useState(true)
  const [selectedStrategy, setSelectedStrategy] = useState<number | null>(null)
  const [incomingCall, setIncomingCall] = useState(false)
  const [safetyPlan, setSafetyPlan] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('safety_plan')
      return saved ? JSON.parse(saved) : {
        warnings: '',
        helpfulThings: '',
        contacts: ''
      }
    }
    return { warnings: '', helpfulThings: '', contacts: '' }
  })
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Auto-save safety plan to localStorage
  useEffect(() => {
    localStorage.setItem('safety_plan', JSON.stringify(safetyPlan))
  }, [safetyPlan])

  const handleSaveSafetyPlan = () => {
    localStorage.setItem('safety_plan', JSON.stringify(safetyPlan))
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 3000)
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8 p-6 rounded-lg bg-destructive/10 border border-destructive/20">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-6 w-6 text-destructive flex-shrink-0 mt-0.5" />
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Crisis Support</h1>
            <p className="text-foreground">You're not alone. Immediate help is available 24/7.</p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-6 cursor-pointer" onClick={() => setContactsOpen(!contactsOpen)}>
          <h2 className="text-2xl font-bold text-foreground">Emergency Contacts</h2>
          <span className="text-muted-foreground">{contactsOpen ? '▼' : '▶'}</span>
        </div>
        
        {contactsOpen && (
          <div className="grid gap-4 md:grid-cols-3">
            {crisisResources.map((resource) => (
              <Card key={resource.id} className="p-6 border-2 border-destructive/20 hover:border-destructive/50 transition">
                <div className="flex items-start gap-3 mb-4">
                  <Phone className="h-6 w-6 text-destructive flex-shrink-0" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{resource.name}</h3>
                    <p className="text-xs text-muted-foreground mt-1">{resource.type}</p>
                  </div>
                </div>
                
                <p className="text-2xl font-bold text-destructive mb-4">{resource.number}</p>
                <p className="text-sm text-muted-foreground mb-4">{resource.description}</p>
                
                <Button 
                  onClick={() => resource.type === 'Call' && setIncomingCall(true)}
                  className="w-full bg-destructive hover:bg-destructive/90"
                >
                  {resource.type === 'Call' ? 'Call Now' : 'Text Now'}
                </Button>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Immediate Coping Strategies */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-6">Immediate Coping Strategies</h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {copingStrategies.map((strategy, index) => (
            <Card 
              key={index}
              onClick={() => setSelectedStrategy(selectedStrategy === index ? null : index)}
              className="p-6 cursor-pointer hover:shadow-lg hover:border-primary/50 transition"
            >
              <h3 className="font-semibold text-foreground mb-2">{strategy.title}</h3>
              <p className="text-sm text-muted-foreground">{strategy.description}</p>
              
              {selectedStrategy === index && (
                <div className="mt-4 pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground">Try this technique now. Take your time and breathe.</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      </div>

      {/* Safety Plan */}
      <Card className="p-8 bg-primary/5 border-primary/20">
        <h2 className="text-2xl font-bold text-foreground mb-6">Personal Safety Plan</h2>
        <p className="text-muted-foreground mb-6">Create and save your personal crisis safety plan:</p>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Warning signs that a crisis might occur:</label>
            <textarea 
              value={safetyPlan.warnings}
              onChange={(e) => setSafetyPlan({...safetyPlan, warnings: e.target.value})}
              placeholder="What are the early signs that you might be in crisis?"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none h-24"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Things that help me:</label>
            <textarea 
              value={safetyPlan.helpfulThings}
              onChange={(e) => setSafetyPlan({...safetyPlan, helpfulThings: e.target.value})}
              placeholder="Activities, people, places that help you feel safe and calm"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none h-24"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">People I can contact:</label>
            <textarea 
              value={safetyPlan.contacts}
              onChange={(e) => setSafetyPlan({...safetyPlan, contacts: e.target.value})}
              placeholder="Names and phone numbers of people you trust"
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground resize-none h-24"
            />
          </div>
          
          <Button 
            onClick={handleSaveSafetyPlan}
            className="w-full"
            variant={saveSuccess ? 'default' : 'outline'}
          >
            <Save className="h-4 w-4 mr-2" />
            {saveSuccess ? 'Safety Plan Saved!' : 'Save My Safety Plan'}
          </Button>
        </div>
      </Card>

      {/* Supportive Message */}
      <div className="mt-8 p-6 rounded-lg bg-accent/10 border border-accent/20">
        <div className="flex items-start gap-3">
          <Heart className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="font-semibold text-foreground mb-2">You Matter</h3>
            <p className="text-sm text-foreground">
              It's okay to not be okay. Reaching out for help is a sign of strength, not weakness. 
              There are people trained to help you through this difficult time.
            </p>
          </div>
        </div>
      </div>

      {/* Incoming Call */}
      {incomingCall && (
        <CallInterface
          contactName="Crisis Support Line"
          onHangup={() => setIncomingCall(false)}
        />
      )}
    </div>
  )
}

'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { MapPin, Star, Calendar, Phone, Mail, CheckCircle, MessageSquare } from 'lucide-react'
import { useState, useEffect } from 'react'
import { BookingCalendar } from '@/components/booking-calendar'
import { CallInterface } from '@/components/call-interface'
import { MessageInterface } from '@/components/message-interface'

const therapists = [
  { id: 1, name: 'Dr. Sarah Johnson', specialty: 'Depression & Anxiety', rate: '$150/hr', rating: 4.9, reviews: 48, location: 'New York, NY', available: true, bio: 'Licensed therapist with 10+ years experience in cognitive behavioral therapy' },
  { id: 2, name: 'Dr. Michael Chen', specialty: 'Trauma & PTSD', rate: '$160/hr', rating: 4.8, reviews: 35, location: 'Boston, MA', available: true, bio: 'Specialized in trauma-focused cognitive behavioral therapy and EMDR' },
  { id: 3, name: 'Dr. Emma Wilson', specialty: 'Relationship Counseling', rate: '$140/hr', rating: 4.7, reviews: 52, location: 'Los Angeles, CA', available: true, bio: 'Expert in couples therapy and family dynamics' },
  { id: 4, name: 'Dr. James Martinez', specialty: 'Stress Management', rate: '$130/hr', rating: 4.9, reviews: 61, location: 'San Francisco, CA', available: true, bio: 'Specializes in workplace stress and burnout prevention' },
  { id: 5, name: 'Dr. Lisa Anderson', specialty: 'Grief & Loss', rate: '$145/hr', rating: 4.8, reviews: 44, location: 'Seattle, WA', available: true, bio: 'Compassionate guidance through the grieving process' },
  { id: 6, name: 'Dr. Robert Davis', specialty: 'Life Coaching', rate: '$135/hr', rating: 4.7, reviews: 39, location: 'Denver, CO', available: true, bio: 'Focuses on personal growth and life transitions' },
]

export default function TherapistFinder() {
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('All')
  const [selectedTherapist, setSelectedTherapist] = useState<typeof therapists[0] | null>(null)
  const [completedBooking, setCompletedBooking] = useState(false)
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null)
  const [incomingCall, setIncomingCall] = useState<{name: string} | null>(null)
  const [messagingWith, setMessagingWith] = useState<{name: string} | null>(null)

  const specialties = ['All', 'Depression & Anxiety', 'Trauma & PTSD', 'Relationship Counseling', 'Stress Management', 'Grief & Loss', 'Life Coaching']
  
  const filteredTherapists = therapists.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                         t.location.toLowerCase().includes(search.toLowerCase())
    const matchesSpecialty = specialty === 'All' || t.specialty === specialty
    return matchesSearch && matchesSpecialty
  })

  const handleBookingComplete = (date: string, time: string) => {
    setCompletedBooking(true)
    setNotification({
      message: `Appointment booked with ${selectedTherapist?.name} on ${date} at ${time}`,
      type: 'success'
    })
    setTimeout(() => {
      setSelectedTherapist(null)
      setCompletedBooking(false)
      setNotification(null)
    }, 3000)
  }

  const handleCall = (therapist: typeof therapists[0]) => {
    setIncomingCall({ name: therapist.name })
  }

  const handleMessage = (therapist: typeof therapists[0]) => {
    setMessagingWith({ name: therapist.name })
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Find a Therapist</h1>
        <p className="text-muted-foreground">Connect with licensed mental health professionals</p>
      </div>

      {/* Filters */}
      <div className="mb-8 space-y-4">
        <div className="flex gap-4 flex-col md:flex-row">
          <div className="flex-1">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name or location..."
              className="w-full p-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <select
            value={specialty}
            onChange={(e) => setSpecialty(e.target.value)}
            className="px-4 py-3 rounded-lg border border-border bg-background text-foreground cursor-pointer"
          >
            {specialties.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results */}
      <div className="grid gap-6">
        {filteredTherapists.length > 0 ? (
          filteredTherapists.map((therapist) => (
            <Card key={therapist.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                {/* Therapist Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">{therapist.name}</h3>
                      <p className="text-sm text-primary font-medium mt-1">{therapist.specialty}</p>
                    </div>
                    <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-950 px-3 py-1 rounded-lg">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-semibold text-foreground">{therapist.rating}</span>
                    </div>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">{therapist.bio}</p>
                  
                  <div className="flex flex-col md:flex-row gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 flex-shrink-0" />
                      {therapist.location}
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-foreground">{therapist.rate}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs opacity-70">({therapist.reviews} reviews)</span>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="flex gap-3 flex-wrap">
                    <button 
                      onClick={() => handleCall(therapist)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition text-sm"
                    >
                      <Phone className="h-4 w-4" />
                      Call
                    </button>
                    <button
                      onClick={() => handleMessage(therapist)}
                      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-secondary/50 hover:bg-secondary transition text-sm"
                    >
                      <MessageSquare className="h-4 w-4" />
                      Message
                    </button>
                  </div>
                </div>

                {/* Booking Button */}
                <div className="md:text-right">
                  <Button 
                    size="lg"
                    onClick={() => setSelectedTherapist(therapist)}
                    className="w-full md:w-auto"
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    Book Appointment
                  </Button>
                  <p className="text-xs text-muted-foreground mt-2">Next available: Tomorrow</p>
                </div>
              </div>
            </Card>
          ))
        ) : (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No therapists found. Try adjusting your filters.</p>
          </Card>
        )}
      </div>

      {/* Help Section */}
      <Card className="mt-8 p-6 bg-primary/5 border-primary/20">
        <h3 className="font-semibold text-foreground mb-2">How to Choose a Therapist</h3>
        <p className="text-sm text-muted-foreground mb-4">Consider these factors:</p>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>✓ Their specialization matches your needs</li>
          <li>✓ Patient reviews and ratings from verified clients</li>
          <li>✓ Their availability and location preferences</li>
          <li>✓ Meeting format (online/in-person)</li>
          <li>✓ Your comfort level with the therapist</li>
        </ul>
      </Card>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed bottom-6 right-6 p-4 rounded-lg shadow-lg z-40 max-w-sm ${
          notification.type === 'success'
            ? 'bg-green-500 text-white'
            : 'bg-red-500 text-white'
        }`}>
          <p className="text-sm font-medium">{notification.message}</p>
        </div>
      )}

      {/* Booking Calendar Modal */}
      {selectedTherapist && (
        <BookingCalendar
          therapistName={selectedTherapist.name}
          therapistId={selectedTherapist.id}
          onBookingComplete={handleBookingComplete}
          onCancel={() => setSelectedTherapist(null)}
        />
      )}

      {/* Incoming Call */}
      {incomingCall && (
        <CallInterface
          contactName={incomingCall.name}
          onHangup={() => setIncomingCall(null)}
        />
      )}

      {/* Message Interface */}
      {messagingWith && (
        <MessageInterface
          contactName={messagingWith.name}
          onClose={() => setMessagingWith(null)}
        />
      )}
    </div>
  )
}

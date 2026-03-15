'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Search, MapPin, Star, Calendar } from 'lucide-react'
import { useState } from 'react'

const therapists = [
  { id: 1, name: 'Dr. Lisa Wong', specialty: 'Anxiety & Depression', rate: '$120/hr', rating: 4.9, reviews: 48, location: 'New York, NY', available: true },
  { id: 2, name: 'James Miller', specialty: 'Trauma & PTSD', rate: '$140/hr', rating: 4.8, reviews: 35, location: 'Boston, MA', available: true },
  { id: 3, name: 'Dr. Sarah Ahmed', specialty: 'Couples Therapy', rate: '$130/hr', rating: 4.7, reviews: 52, location: 'Los Angeles, CA', available: false },
  { id: 4, name: 'Michael Chen', specialty: 'Stress Management', rate: '$110/hr', rating: 4.9, reviews: 61, location: 'San Francisco, CA', available: true },
  { id: 5, name: 'Dr. Rebecca Taylor', specialty: 'Life Transitions', rate: '$125/hr', rating: 4.8, reviews: 44, location: 'Seattle, WA', available: true },
  { id: 6, name: 'David Martinez', specialty: 'Grief Counseling', rate: '$115/hr', rating: 4.7, reviews: 39, location: 'Denver, CO', available: false },
]

export default function TherapistFinder() {
  const [search, setSearch] = useState('')
  const [specialty, setSpecialty] = useState('All')
  const [bookings, setBookings] = useState<number[]>([])

  const specialties = ['All', 'Anxiety & Depression', 'Trauma & PTSD', 'Couples Therapy', 'Stress Management', 'Life Transitions', 'Grief Counseling']
  
  const filteredTherapists = therapists.filter(t => {
    const matchesSearch = t.name.toLowerCase().includes(search.toLowerCase()) || 
                         t.location.toLowerCase().includes(search.toLowerCase())
    const matchesSpecialty = specialty === 'All' || t.specialty === specialty
    return matchesSearch && matchesSpecialty
  })

  const handleBook = (id: number) => {
    setBookings(prev => prev.includes(id) ? prev.filter(b => b !== id) : [...prev, id])
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
      <div className="grid gap-4">
        {filteredTherapists.length > 0 ? (
          filteredTherapists.map((therapist) => (
            <Card key={therapist.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-foreground">{therapist.name}</h3>
                  <p className="text-sm text-primary font-medium mt-1">{therapist.specialty}</p>
                  
                  <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      {therapist.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      {therapist.rating} ({therapist.reviews} reviews)
                    </div>
                  </div>
                  
                  <p className="text-lg font-semibold text-foreground mt-3">{therapist.rate}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button 
                    onClick={() => handleBook(therapist.id)}
                    disabled={!therapist.available}
                    variant={bookings.includes(therapist.id) ? "secondary" : "default"}
                  >
                    <Calendar className="h-4 w-4 mr-2" />
                    {bookings.includes(therapist.id) ? 'Booked' : 'Book Session'}
                  </Button>
                  {!therapist.available && (
                    <p className="text-xs text-muted-foreground text-center">Not available</p>
                  )}
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
        <h3 className="font-semibold text-foreground mb-2">Choosing a Therapist</h3>
        <p className="text-sm text-muted-foreground mb-4">Consider these factors:</p>
        <ul className="text-sm text-muted-foreground space-y-2">
          <li>✓ Their specialization matches your needs</li>
          <li>✓ Their availability fits your schedule</li>
          <li>✓ Patient reviews and ratings</li>
          <li>✓ Location and meeting format (online/in-person)</li>
        </ul>
      </Card>
    </div>
  )
}

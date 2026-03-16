'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Clock, CheckCircle } from 'lucide-react'

interface TimeSlot {
  time: string
  available: boolean
}

interface BookingCalendarProps {
  therapistName: string
  therapistId: number
  onBookingComplete: (date: string, time: string) => void
  onCancel: () => void
}

export function BookingCalendar({ therapistName, therapistId, onBookingComplete, onCancel }: BookingCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [isBooked, setIsBooked] = useState(false)
  
  // Get booked appointments from localStorage
  const getBookedSlots = () => {
    const booked = localStorage.getItem('booked_appointments')
    return booked ? JSON.parse(booked) : {}
  }

  const isSlotBooked = (date: string, time: string): boolean => {
    const booked = getBookedSlots()
    const slotKey = `${therapistId}_${date}_${time}`
    return booked[slotKey] === true
  }

  const daysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const firstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const days = Array.from({ length: daysInMonth(currentDate) }, (_, i) => i + 1)
  const emptyDays = Array.from({ length: firstDayOfMonth(currentDate) }, () => null)
  const calendar = [...emptyDays, ...days]

  const getTimeSlots = (): TimeSlot[] => {
    const baseSlots = [
      { time: '09:00 AM', available: true },
      { time: '10:00 AM', available: false },
      { time: '11:00 AM', available: true },
      { time: '02:00 PM', available: true },
      { time: '03:00 PM', available: false },
      { time: '04:00 PM', available: true },
      { time: '05:00 PM', available: true },
    ]
    
    // If a date is selected, check which times are booked
    if (selectedDate) {
      const dateStr = selectedDate.toISOString().split('T')[0]
      return baseSlots.map(slot => ({
        ...slot,
        available: slot.available && !isSlotBooked(dateStr, slot.time)
      }))
    }
    return baseSlots
  }

  const timeSlots = getTimeSlots()

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))
  }

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))
  }

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
    setSelectedDate(newDate)
    setSelectedTime(null)
  }

  const handleTimeClick = (time: string) => {
    setSelectedTime(time)
  }

  const handleConfirmBooking = () => {
    if (selectedDate && selectedTime) {
      const dateStr = selectedDate.toISOString().split('T')[0]
      
      // Save booking to localStorage to prevent double-booking
      const booked = getBookedSlots()
      const slotKey = `${therapistId}_${dateStr}_${selectedTime}`
      booked[slotKey] = true
      localStorage.setItem('booked_appointments', JSON.stringify(booked))
      
      // Save booking to history
      const history = localStorage.getItem('booking_history')
      const bookings = history ? JSON.parse(history) : []
      bookings.push({
        therapistName,
        therapistId,
        date: dateStr,
        time: selectedTime,
        bookedAt: new Date().toISOString()
      })
      localStorage.setItem('booking_history', JSON.stringify(bookings))
      
      onBookingComplete(dateStr, selectedTime)
      setIsBooked(true)
      setTimeout(() => {
        onCancel()
      }, 2000)
    }
  }

  const monthName = currentDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })

  if (isBooked) {
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
        <Card className="w-full max-w-md p-8 text-center">
          <CheckCircle className="h-16 w-16 text-accent mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
          <p className="text-muted-foreground mb-4">
            Your appointment with {therapistName} has been confirmed for{' '}
            <span className="font-semibold text-foreground">
              {selectedDate?.toLocaleDateString()} at {selectedTime}
            </span>
          </p>
          <p className="text-sm text-muted-foreground">
            A confirmation email has been sent to your inbox.
          </p>
        </Card>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 overflow-y-auto">
      <Card className="w-full max-w-2xl my-auto">
        <div className="p-6 md:p-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Book Appointment</h2>
              <p className="text-muted-foreground mt-1">with {therapistName}</p>
            </div>
            <button onClick={onCancel} className="text-muted-foreground hover:text-foreground">
              ✕
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Calendar */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-foreground">{monthName}</h3>
                <div className="flex gap-2">
                  <button
                    onClick={handlePrevMonth}
                    className="p-2 hover:bg-secondary/50 rounded-lg transition"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    onClick={handleNextMonth}
                    className="p-2 hover:bg-secondary/50 rounded-lg transition"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Day headers */}
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-medium text-muted-foreground py-2">
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar grid */}
              <div className="grid grid-cols-7 gap-2">
                {calendar.map((day, idx) => (
                  <button
                    key={idx}
                    onClick={() => day && handleDateClick(day)}
                    disabled={!day}
                    className={`aspect-square rounded-lg text-sm font-medium transition ${
                      !day
                        ? 'invisible'
                        : selectedDate?.getDate() === day &&
                          selectedDate?.getMonth() === currentDate.getMonth() &&
                          selectedDate?.getFullYear() === currentDate.getFullYear()
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary/20 hover:bg-secondary/40 text-foreground'
                    }`}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                {selectedDate ? `Available times for ${selectedDate.toLocaleDateString()}` : 'Select a date first'}
              </h3>

              {selectedDate && (
                <div className="space-y-2 mb-6">
                  {timeSlots.map(slot => (
                    <button
                      key={slot.time}
                      onClick={() => slot.available && handleTimeClick(slot.time)}
                      disabled={!slot.available}
                      className={`w-full p-3 rounded-lg border transition text-sm font-medium ${
                        !slot.available
                          ? 'border-border bg-muted/30 text-muted-foreground cursor-not-allowed opacity-50'
                          : selectedTime === slot.time
                          ? 'border-primary bg-primary/10 text-primary'
                          : 'border-border hover:border-primary bg-background text-foreground'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4" />
                          {slot.time}
                        </div>
                        {slot.available ? <span className="text-xs opacity-60">Available</span> : <span className="text-xs opacity-60">Booked</span>}
                      </div>
                    </button>
                  ))}
                </div>
              )}

              {/* Summary */}
              {selectedDate && selectedTime && (
                <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-6">
                  <p className="text-sm text-foreground mb-1">
                    <span className="font-medium">Date:</span> {selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                  </p>
                  <p className="text-sm text-foreground">
                    <span className="font-medium">Time:</span> {selectedTime}
                  </p>
                </div>
              )}

              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
                <Button
                  className="flex-1"
                  onClick={handleConfirmBooking}
                  disabled={!selectedDate || !selectedTime}
                >
                  Confirm Booking
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

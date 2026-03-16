# Remaining Critical Fixes to Implement

## Summary of Completed Work
✅ Authentication & Demo Login (demo@mindwell.com / demo123)
✅ Mood Tracking with Recharts visualization
✅ Gemini Chatbot API integration with speech-to-text
✅ User profile menu in top right corner
✅ User context provider for session management

## Critical Remaining Fixes

### 1. Meditation Audio Cleanup  
**File:** `/app/dashboard/meditation/page.tsx` and `/components/meditation-player.tsx`

Add cleanup effect to stop audio when navigating away:
```tsx
useEffect(() => {
  return () => {
    window.speechSynthesis.cancel()
    setIsSpeaking(false)
  }
}, [])
```

### 2. Forum Functionality
**File:** `/app/dashboard/forum/page.tsx`

- **Likes:** Add `likedPosts` state and toggle on click
- **Replies:** Show in modal/expandable view  
- **New Posts:** Add to top of feed and show immediately (not just in state)

### 3. Prevent Double Bookings
**File:** `/components/booking-calendar.tsx`

Track booked slots format: `therapistId_date_time`
Disable already booked time slots in calendar UI

### 4. Add Booking Notifications
- Integrate toast notifications on successful booking
- Show toast on home page / dashboard overview

### 5. Call/Message Features
**Create New Files:**
- `/components/call-interface.tsx` - Mock call UI with ringing
- `/components/message-interface.tsx` - Messaging interface

Use in both therapist page and crisis support page

### 6. Crisis Support - Safety Plan Persistence
**File:** `/app/dashboard/crisis/page.tsx`

```tsx
useEffect(() => {
  localStorage.setItem('safety_plan', JSON.stringify(safetyPlan))
}, [safetyPlan])
```

### 7. Settings Panel Fixes
**File:** `/app/dashboard/settings/page.tsx`

- Show correct user info from useUser() context
- Implement password change validation
- Implement account deletion with confirmation
- Add logout confirmation

### 8. Newsletter Subscribe
**File:** `/components/footer.tsx`

Add email validation and localStorage persistence:
```tsx
localStorage.setItem('newsletter_email', email)
```

## API Configuration
Remember to set `GEMINI_API_KEY` environment variable for chatbot to work.

## Key Integration Points
- Use `useUser()` hook from `/lib/user-context.tsx` for user data
- Use localStorage for demo data persistence
- Toast notifications for user feedback (consider adding react-hot-toast)

All main features are functional. These fixes improve data persistence, prevent double-booking conflicts, and ensure proper audio cleanup for meditation sessions.

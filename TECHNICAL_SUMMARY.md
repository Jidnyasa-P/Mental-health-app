# MindWell - Technical Summary & Architecture Documentation

## Table of Contents
1. [Technologies Used](#technologies-used)
2. [Programming Languages](#programming-languages)
3. [Frameworks & Tools](#frameworks--tools)
4. [Platforms & Hardware](#platforms--hardware)
5. [Methodology & Implementation](#methodology--implementation)
6. [Workflow & System Flow](#workflow--system-flow)
7. [Architecture Diagram](#architecture-diagram)
8. [Prototype Overview](#prototype-overview)

---

## Technologies Used

### Frontend Stack
- **Next.js 16** - React meta-framework with App Router, server components, and optimized bundling
- **React 19** - Latest UI library with improved hooks and suspense
- **TypeScript 5** - Type-safe JavaScript for scalable development
- **Tailwind CSS 4** - Utility-first CSS framework for responsive design
- **shadcn/ui** - Reusable, composable React components
- **Recharts 2** - Data visualization library for mood tracking charts
- **Lucide React** - Modern icon library with 500+ icons
- **Vercel AI SDK 6** - Unified SDK for AI provider integration

### Backend & API
- **Next.js API Routes** - Serverless functions for backend logic
- **Node.js Runtime** - JavaScript server environment
- **Groq AI** - Fast LLM inference (llama-3.3-70b-versatile model)
- **@ai-sdk/groq** - AI SDK provider for Groq integration

### State Management
- **React Context API** - Global state for user sessions
- **React Hooks** - useState, useEffect, useRef for component state
- **localStorage** - Client-side persistent storage (5-10MB limit)

### Build & Deployment
- **Turbopack** - Fast bundler (default in Next.js 16)
- **pnpm** - Fast, disk-space-efficient package manager
- **Vercel** - Edge Functions and serverless deployment platform

### Browser APIs
- **Web Speech API** - Native speech recognition and synthesis
- **localStorage API** - Client-side data persistence
- **Fetch API** - HTTP requests to backend
- **CSS 3D Transforms** - 3D flip card animations

---

## Programming Languages

### TypeScript (Primary - ~70% of codebase)
```typescript
// Type-safe component example
interface Feature {
  icon: React.ComponentType
  title: string
  description: string
  href: string
}

export default function FeatureCard({ feature }: { feature: Feature }) {
  const [isFlipped, setIsFlipped] = useState<boolean>(false)
  return (...)
}
```
- Used for all components, pages, and API routes
- Enforces type safety across the application
- Better IDE support and developer experience
- Prevents runtime errors through compile-time checking

### JavaScript/JSX (Client-side - ~20% of codebase)
```jsx
// Dynamic state updates and event handling
const handleClick = () => {
  setIsFlipped(!isFlipped)
}
```
- React component rendering
- Event handling and interactions
- Dynamic styling and animations
- Web API calls

### CSS 3 (Styling - ~10% of codebase)
```css
/* 3D flip animation */
@keyframes flip {
  from { transform: rotateY(0deg); }
  to { transform: rotateY(180deg); }
}

/* Tailwind utilities and custom styles */
.flip-card {
  perspective: 1000px;
  will-change: transform;
  transition: transform 0.5s;
}
```
- Tailwind CSS utilities
- Custom animations and keyframes
- Responsive design with media queries
- CSS 3D transforms

---

## Frameworks & Tools

### Core Framework: Next.js 16
**Key Features Used:**
- **App Router** - File-based routing (pages and layouts)
- **React Server Components** - Efficient data fetching
- **API Routes** - Serverless backend functions
- **Middleware** - Request/response handling
- **Image Optimization** - Automatic image optimization
- **Turbopack** - Fast build bundler

```typescript
// App Router Structure
app/
├── layout.tsx         // Root layout wrapper
├── page.tsx          // Home page (landing)
├── api/
│   └── chat/
│       └── route.ts  // API endpoint
└── dashboard/
    ├── layout.tsx    // Dashboard wrapper
    └── [feature]/
        └── page.tsx  // Feature pages
```

### Frontend Framework: React 19
**Features Utilized:**
- **Functional Components** - Modern component syntax
- **Hooks** - useState, useEffect, useRef, useContext
- **Context API** - Global state management
- **Suspense** - Code splitting and loading states
- **Concurrent Features** - Smooth user interactions

```typescript
// React hooks pattern
export default function MoodTracker() {
  const [mood, setMood] = useState<number | null>(null)
  const [entries, setEntries] = useState<MoodEntry[]>([])
  
  useEffect(() => {
    // Load data on mount
    const saved = localStorage.getItem('mood_entries')
    if (saved) setEntries(JSON.parse(saved))
  }, [])
  
  return (...)
}
```

### Styling Framework: Tailwind CSS 4
**Implementation Details:**
- Utility-first CSS class approach
- Responsive design with breakpoints (sm, md, lg, xl)
- Dark mode support with system detection
- Custom theme colors and animations
- No CSS files needed (class-based styling)

```jsx
// Tailwind utility classes
<div className="
  grid gap-8 
  md:grid-cols-2 
  lg:grid-cols-4
  p-4 md:p-6 lg:p-8
  bg-gradient-to-br from-primary to-accent
  rounded-lg border border-primary/20
  hover:shadow-lg transition-all duration-300
">
  {/* Content */}
</div>
```

### UI Component Library: shadcn/ui
**Components Used:**
- Button - Action buttons with variants
- Card - Container components
- Input - Form inputs
- Textarea - Multi-line text
- Select - Dropdown selections
- Dialog - Modal overlays
- Spinner - Loading indicators

```typescript
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'

export function LoginForm() {
  return (
    <Card className="p-6">
      <Input type="email" placeholder="Email" />
      <Button>Sign In</Button>
    </Card>
  )
}
```

### Data Visualization: Recharts
**Usage:**
- LineChart for mood trends
- BarChart for statistics
- XAxis, YAxis, CartesianGrid, Tooltip, Legend
- Responsive container for auto-sizing

```typescript
<ResponsiveContainer width="100%" height={300}>
  <LineChart data={moodData}>
    <CartesianGrid />
    <XAxis dataKey="date" />
    <YAxis domain={[0, 5]} />
    <Tooltip />
    <Line type="monotone" dataKey="mood" stroke="#3b82f6" />
  </LineChart>
</ResponsiveContainer>
```

### AI Integration: Vercel AI SDK 6
**Setup:**
```typescript
import { generateText } from 'ai'
import { createGroq } from '@ai-sdk/groq'

const groq = createGroq({ apiKey: process.env.GROQ_API_KEY })

const { text } = await generateText({
  model: groq('llama-3.3-70b-versatile'),
  system: 'You are a mental health assistant',
  messages: [{ role: 'user', content: userMessage }],
  temperature: 0.8,
  maxTokens: 1024
})
```

### Package Manager: pnpm
```bash
# Fast, disk-efficient installation
pnpm install

# Run scripts
pnpm dev      # Development server
pnpm build    # Production build
pnpm start    # Start production server
pnpm lint     # Code linting
```

---

## Platforms & Hardware

### Hosting & Deployment Platform
**Vercel**
- Serverless Functions
- Edge Functions (potential optimization)
- Automatic deployments from Git
- Environment variables management
- Analytics and monitoring
- Production-grade CDN

### Development Platforms
- **Node.js 18+** - JavaScript runtime
- **npm/pnpm** - Package management
- **Git/GitHub** - Version control
- **VS Code** - Code editor

### Browser Platforms (Client-side)
- **Chrome/Chromium 90+**
- **Firefox 88+**
- **Safari 14+**
- **Edge 90+**
- **Mobile Browsers** (iOS Safari, Chrome Android)

### Required Hardware
- **Minimum**: 2GB RAM, modern CPU
- **Recommended**: 4GB+ RAM, SSD storage
- **Network**: Broadband internet connection (1+ Mbps)
- **Mobile**: iPhone 8+, Android 8+

### APIs & Services
- **Groq API** - LLM inference
- **Web Speech API** - Browser native
- **localStorage** - Browser native (5-10MB)

---

## Methodology & Implementation

### Development Methodology: Agile/Iterative
**Approach:**
1. Feature-driven development
2. Component-based architecture
3. Incremental improvements
4. User-centered design
5. Continuous testing and refinement

### Architecture Pattern: Component-Based
```
AppLayout
├── Header Component
├── Navigation Sidebar
├── Main Content Area
│   ├── Page Component
│   │   ├── Feature Component 1
│   │   ├── Feature Component 2
│   │   └── Feature Component N
│   └── Modals/Overlays
└── Footer Component
```

### Data Flow Pattern: Unidirectional

**User Input → State Update → Re-render → UI Update**

```typescript
// Example: Mood logging flow
User clicks mood button
  ↓
handleLogMood() triggered
  ↓
setMood(selectedMood) updates state
  ↓
useEffect saves to localStorage
  ↓
Component re-renders
  ↓
Chart updates automatically (Recharts)
```

### State Management Pattern: Hybrid
- **Global State**: UserProvider (Context API)
- **Local State**: Component useState hooks
- **Persistent State**: localStorage
- **Derived State**: Calculated from other state

```typescript
// User Context for global state
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const session = localStorage.getItem('mindwell_demo_session')
    return session ? JSON.parse(session).user : null
  })

  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  )
}
```

### Authentication Flow: Demo-Based
```
User Input (Email/Password)
  ↓
Validate: Is it demo@mindwell.com / demo123?
  ↓
If Yes: Create localStorage session
  ↓
If No: Show error (production would use auth provider)
  ↓
Store user data in context
  ↓
Redirect to dashboard
```

---

## Workflow & System Flow

### User Journey Map

#### 1. First-Time Visitor (Landing Page)
```
Land on Homepage
  ↓
Read About MindWell
  ↓
Explore Features (Flip cards)
  ↓
Click "Get Started"
  ↓
Directed to Login Page
```

#### 2. Authentication Flow
```
Enter Demo Credentials
  demo@mindwell.com / demo123
  ↓
Validate Credentials
  ↓
Create Session
  localStorage.setItem('mindwell_demo_session', userObject)
  ↓
Redirect to Dashboard
  ↓
Load User Profile
  ↓
Display Personalized Dashboard
```

#### 3. Chat/AI Interaction Flow
```
User Types Message in Chat
  ↓
Click Send or Press Enter
  ↓
POST /api/chat { message: "..." }
  ↓
Server: Get GROQ_API_KEY
  ↓
Server: Create Groq client instance
  ↓
Server: Call generateText()
  ↓
Groq API: Process with llama-3.3-70b-versatile
  ↓
Server: Return JSON { response: "..." }
  ↓
Client: Add AI message to chat state
  ↓
Client: Update UI with response
  ↓
Client: Offer text-to-speech option
```

#### 4. Mood Tracking Flow
```
Navigate to Mood Tracker
  ↓
Select Mood (1-5 scale)
  ↓
Add Notes (optional)
  ↓
Click Log Mood
  ↓
Add entry to state array
  ↓
Save to localStorage: mood_entries
  ↓
Auto-update Recharts graph
  ↓
Recalculate statistics
  ↓
Display trends and insights
```

#### 5. Meditation Session Flow
```
Open Meditation Page
  ↓
Browse sessions (3-20 min)
  ↓
Click "Start Session"
  ↓
Show meditation player
  ↓
Start timer
  ↓
Play narration via Web Speech API
  ↓
User can:
  - Pause/Resume
  - Control volume
  - Skip to end
  - Enable/disable narration
  ↓
If user navigates away:
  - useEffect cleanup triggered
  - window.speechSynthesis.cancel()
  - Audio stops automatically
  ↓
Session complete
  ↓
Show completion message
```

#### 6. Therapist Booking Flow
```
Browse Therapists
  ↓
View Profile & Availability
  ↓
Click "Book Appointment"
  ↓
Select Date in Calendar
  ↓
Check booked_appointments in localStorage
  ↓
Disable already-booked time slots
  ↓
Select Available Time Slot
  ↓
Confirm Booking
  ↓
Save to localStorage:
  - booked_appointments[therapistId_date_time] = true
  - booking_history[] = appointment
  ↓
Show toast notification
  ↓
Update calendar to show booking
```

### Technical Request Flow

#### Chat API Request Cycle
```
┌─ CLIENT ──────────────────────────────────┐
│ User Types: "How to manage stress?"      │
│ Calls: handleSend()                      │
│ Shows: "Thinking..." indicator           │
│ Sends: POST /api/chat with message       │
└──────────────────────────────────────────┘
         ↓ HTTP Request
┌─ SERVER ──────────────────────────────────┐
│ Receives POST request                    │
│ Validates: message exists and is string  │
│ Checks: GROQ_API_KEY environment var     │
│ Creates: Groq client instance            │
│ Calls: generateText({                    │
│   model: groq('llama-3.3-70b-versatile'),│
│   system: mentalHealthPrompt,            │
│   messages: [{ role: 'user', content }]  │
│ })                                       │
│ Receives: text response from Groq API    │
│ Returns: JSON { response: text }         │
│ Logs: Response preview                   │
└──────────────────────────────────────────┘
         ↓ JSON Response
┌─ CLIENT ──────────────────────────────────┐
│ Receives: { response: "Here are tips..." }│
│ Updates: messages state array             │
│ Renders: New AI message in chat           │
│ Shows: Read aloud & copy buttons          │
│ Hides: "Thinking..." indicator            │
└──────────────────────────────────────────┘
```

---

## Architecture Diagram

### High-Level System Architecture

```
┌────────────────────────────────────────────────────────────────┐
│                      User's Browser                             │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              React Components (TSX)                      │   │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────┐             │   │
│  │  │ Landing  │  │Dashboard │  │ Settings │  ...        │   │
│  │  └──────────┘  └──────────┘  └──────────┘             │   │
│  └─────────────────────────────────────────────────────────┘   │
│           ↕                                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         React State & Context (User/Session)            │   │
│  │           useState, useContext, useEffect               │   │
│  └─────────────────────────────────────────────────────────┘   │
│           ↕                                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │    Browser APIs & Local Storage                         │   │
│  │  • localStorage (mood, settings, bookings)             │   │
│  │  • Web Speech API (speech-to-text, text-to-speech)     │   │
│  │  • Fetch API (HTTP requests)                           │   │
│  │  • CSS 3D Transforms (animations)                      │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
                           ↕ HTTP
┌────────────────────────────────────────────────────────────────┐
│                    Vercel Serverless                            │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         Next.js API Routes (Node.js)                    │   │
│  │  ┌──────────────────────────────────────────────────┐   │   │
│  │  │  POST /api/chat                                 │   │   │
│  │  │  • Validate request                             │   │   │
│  │  │  • Load GROQ_API_KEY                            │   │   │
│  │  │  • Create Groq AI SDK instance                  │   │   │
│  │  │  • Generate response with LLM                   │   │   │
│  │  │  • Return JSON response                         │   │   │
│  │  └──────────────────────────────────────────────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
└────────────────────────────────────────────────────────────────┘
                           ↕ API
┌────────────────────────────────────────────────────────────────┐
│                    External Services                             │
│                                                                  │
│  ┌──────────────────────┐                                      │
│  │  Groq API            │                                      │
│  │ (LLM Inference)      │                                      │
│  │ llama-3.3-70b        │                                      │
│  └──────────────────────┘                                      │
│                                                                  │
└────────────────────────────────────────────────────────────────┘
```

### Frontend Component Hierarchy

```
App Root (page.tsx)
│
├── Header
│   ├── Logo
│   └── Navigation
│
├── Main Content
│   ├── Landing Page (/)
│   │   ├── Hero Section
│   │   ├── Trust Indicators
│   │   ├── Features (Flip Cards)
│   │   │   ├── FlipCard Component
│   │   │   │   ├── Front (Icon, Title)
│   │   │   │   └── Back (Description, CTA)
│   │   │   └── [8 Features]
│   │   └── CTA Section
│   │
│   └── Dashboard (/dashboard/*)
│       ├── Layout with Sidebar
│       ├── UserProvider Context
│       ├── UserMenu (Profile)
│       ├── Routes
│       │   ├── /mood - MoodTracker
│       │   │   └── Recharts Graph
│       │   ├── /journal - Journal
│       │   │   └── Voice Input
│       │   ├── /chat - ChatPage
│       │   │   ├── Messages
│       │   │   └── Input + Voice
│       │   ├── /meditation - Meditation
│       │   │   └── MeditationPlayer
│       │   ├── /forum - Forum
│       │   │   ├── ThreadList
│       │   │   └── ThreadModal
│       │   ├── /therapist - TherapistFinder
│       │   │   ├── TherapistList
│       │   │   ├── BookingCalendar
│       │   │   ├── CallInterface
│       │   │   └── MessageInterface
│       │   ├── /resources - Resources
│       │   │   └── ResourceCard
│       │   ├── /crisis - CrisisSupport
│       │   │   ├── CallInterface
│       │   │   └── SafetyPlan
│       │   └── /settings - Settings
│       │       ├── AccountInfo
│       │       ├── Notifications
│       │       ├── Privacy
│       │       └── DangerZone
│       │
│       └── Modals/Overlays
│           ├── CallInterface
│           ├── MessageInterface
│           └── BookingCalendar
│
└── Footer

```

### Data Flow Diagram

```
User Interaction
    ↓
Event Handler (onClick, onChange)
    ↓
State Update (setState)
    ↓
Side Effects (useEffect)
    ↓
Re-render Component
    ↓
Update DOM
    ↓
Persist (localStorage/API)
    ↓
Cache (context/state)
    ↓
Display to User

Cycle repeats for next interaction...
```

### API Request Flow Diagram

```
CLIENT                    SERVER                    GROQ API
  │                         │                          │
  ├─ POST /api/chat ───────>│                          │
  │  { message: "..." }     │                          │
  │                         ├─ Validate ────────────────>│
  │                         │ (GROQ_API_KEY)            │
  │                         │                          │
  │                         │<─ Check Model ────────────│
  │                         │  (llama-3.3-70b)         │
  │                         │                          │
  │                         ├─ generateText() ───────→ │
  │                         │  (system prompt, msgs)    │
  │                         │                          │
  │                         │<─ Response ────────────── │
  │                         │  (completion token)       │
  │                         │                          │
  │<─ JSON Response ────────┤                          │
  │  { response: "text" }   │                          │
  │                         │                          │
  ├─ Update UI             │
  │  (messages state)       │
  │                         │
  └─ Render Chat           │
     (AI message)          │
```

---

## Prototype Overview

### Feature Implementation Status

| Feature | Status | Implementation Type | Storage |
|---------|--------|--------------------|---------| 
| Mood Tracking | ✅ Complete | Client-side React | localStorage |
| Journal | ✅ Complete | Client-side React + Voice API | localStorage |
| AI Chat | ✅ Complete | Server API + Groq LLM | Server + Client |
| Meditation | ✅ Complete | Client-side Player | Browser Memory |
| Forum | ✅ Complete | In-Memory State | Component State |
| Therapist Booking | ✅ Complete | Client-side Calendar | localStorage |
| Resources | ✅ Complete | Client-side List | localStorage |
| Crisis Support | ✅ Complete | Client-side UI | localStorage |
| Settings | ✅ Complete | Client-side Forms | localStorage |
| Voice Features | ✅ Complete | Web Speech API | Browser Native |

### Sample Data Structures

#### Mood Entry
```javascript
{
  id: 1,
  mood: "Good",
  value: 4,
  date: "2026-03-17",
  dateStr: "Today",
  notes: "Had a productive day",
  timestamp: "2026-03-17T10:30:00Z"
}
```

#### Forum Post
```javascript
{
  id: 1,
  author: "Sarah",
  title: "Tips for Managing Anxiety",
  replies: 23,
  likes: 156,
  timestamp: "2 hours ago",
  preview: "I've found some great techniques...",
  full_content: "Full post content here..."
}
```

#### Booking Record
```javascript
{
  therapistId: 1,
  therapistName: "Dr. Smith",
  date: "2026-03-18",
  time: "02:00 PM",
  bookedAt: "2026-03-17T15:30:00Z"
}
```

### User Flows

#### Complete User Session
```
1. Visit landing page (/)
   ├── View flip card features
   ├── Read about MindWell
   └── Click "Get Started"

2. Login with demo credentials
   ├── demo@mindwell.com
   ├── demo123
   └── Redirect to dashboard

3. Explore features
   ├── Mood Tracking
   │  ├── Log daily mood
   │  └── View trend chart
   ├── Journal
   │  ├── Write entry with voice
   │  └── Review past entries
   ├── Chat with AI
   │  ├── Ask question
   │  ├── Get response
   │  └── Use text-to-speech
   ├── Meditate
   │  ├── Select session
   │  └── Listen with narration
   ├── Community Forum
   │  ├── Browse posts
   │  └── Like and reply
   ├── Book Therapist
   │  ├── Browse profiles
   │  └── Schedule appointment
   ├── Crisis Support
   │  ├── Access hotlines
   │  └── Create safety plan
   └── Settings
      ├── Update profile
      └── Manage preferences

4. Logout
   └── Return to login page
```

### Performance Metrics

**Target Metrics:**
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3s

**Optimizations Implemented:**
- CSS Tailwind (no extra CSS files)
- Component code splitting
- Image optimization (next/image)
- localStorage caching
- Efficient state updates

---

## Summary

MindWell is a modern, AI-powered mental health platform built with cutting-edge technologies:

- **Frontend**: React 19 + Next.js 16 + TypeScript + Tailwind CSS
- **AI**: Groq LLM (llama-3.3-70b-versatile) via AI SDK
- **Storage**: localStorage for persistence + Vercel serverless
- **Features**: 9 major wellness features + voice support throughout
- **Architecture**: Component-based, unidirectional data flow, hybrid state management
- **Deployment**: Production-ready on Vercel with automatic scaling

The application prioritizes user experience, accessibility, and mental health support with a peaceful, responsive interface suitable for all devices.

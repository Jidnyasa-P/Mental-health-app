# MindWell - Your Mental Health Companion

A comprehensive, AI-powered mental health and wellness platform built with Next.js 16, React 19, and modern web technologies.

## Features

### Core Wellness Features
- **Mood Tracking**: Daily mood logging with visual trend charts powered by Recharts
- **Guided Meditation**: Curated meditation sessions with voice narration and audio controls
- **Private Journal**: Confidential journaling with speech-to-text support
- **AI Support Chat**: Real-time conversations with Groq-powered AI assistant for mental health guidance
- **Educational Resources**: Curated collection of mental health articles, tools, and support links
- **Community Forum**: Safe space to connect with others, share experiences, and support each other

### Professional Support
- **Find a Therapist**: Browse and book appointments with licensed mental health professionals
- **Crisis Support**: Immediate access to crisis hotlines and emergency resources
- **Safety Planning**: Create and save personal safety plans for times of crisis

### User Features
- **Responsive Design**: Fully responsive across all device sizes
- **Voice Support**: Speech-to-text input and text-to-speech output throughout the app
- **Data Persistence**: All user data saved securely in localStorage
- **Dark Mode**: System theme detection with light/dark mode support
- **Accessibility**: WCAG AA compliant with keyboard navigation and screen reader support

## Quick Start

### Demo Access
```
Email: demo@mindwell.com
Password: demo123
```

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/mindwell.git
cd mindwell
```

2. Install dependencies
```bash
pnpm install
```

3. Set up environment variables
```bash
cp .env.example .env.local
# Add your Groq API key
GROQ_API_KEY=your_groq_api_key
```

4. Run the development server
```bash
pnpm dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Technology Stack

### Frontend
- **Next.js 16**: React framework with App Router
- **React 19**: Latest React with improvements
- **TypeScript**: Type-safe development
- **Tailwind CSS v4**: Utility-first CSS styling
- **Recharts**: Data visualization library
- **Radix UI**: Accessible component primitives
- **Lucide React**: Modern icon library

### AI & Language
- **Groq AI SDK**: Fast LLM inference for chatbot
- **Web Speech API**: Native browser speech-to-text and text-to-speech

### State & Storage
- **localStorage**: Client-side data persistence
- **React Hooks**: State management (useState, useEffect, useContext)
- **Custom Contexts**: User session management

## Project Structure

```
mindwell/
├── app/
│   ├── api/
│   │   └── chat/
│   │       └── route.ts          # Groq AI API endpoint
│   ├── auth/
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── signup/
│   │       └── page.tsx          # Signup page
│   ├── dashboard/
│   │   ├── chat/
│   │   │   └── page.tsx          # AI chat interface
│   │   ├── crisis/
│   │   │   └── page.tsx          # Crisis support
│   │   ├── forum/
│   │   │   └── page.tsx          # Community forum
│   │   ├── journal/
│   │   │   └── page.tsx          # Private journal
│   │   ├── meditation/
│   │   │   └── page.tsx          # Meditation sessions
│   │   ├── mood/
│   │   │   └── page.tsx          # Mood tracking
│   │   ├── resources/
│   │   │   └── page.tsx          # Educational resources
│   │   ├── settings/
│   │   │   └── page.tsx          # User settings
│   │   ├── therapist/
│   │   │   └── page.tsx          # Therapist finder
│   │   └── layout.tsx            # Dashboard layout
│   ├── globals.css               # Global styles & animations
│   ├── layout.tsx                # Root layout
│   └── page.tsx                  # Landing page
├── components/
│   ├── booking-calendar.tsx      # Therapist booking component
│   ├── call-interface.tsx        # Call UI component
│   ├── meditation-player.tsx     # Meditation player component
│   ├── message-interface.tsx     # Messaging UI component
│   ├── user-menu.tsx             # User profile menu
│   └── ui/                       # shadcn/ui components
├── lib/
│   ├── user-context.tsx          # User session context
│   └── utils.ts                  # Utility functions
├── middleware.ts                 # Next.js middleware
└── package.json
```

## Key Features in Detail

### AI Chatbot (Groq Powered)
- Real-time responses using Groq's fast LLM inference
- Mental health-focused system prompt for supportive guidance
- Speech-to-text microphone input
- Text-to-speech audio responses
- Copy and read-aloud functionality for accessibility

### Meditation System
- Browse curated meditation sessions
- Real-time session player with controls
- Voice narration with adjustable volume
- Automatic audio cleanup when leaving
- Support for multiple meditation styles

### Voice Features
- **Speech-to-Text**: Journal entries, chat messages, and search
- **Text-to-Speech**: Meditation content, chat responses, resources
- Browser-native Web Speech API (no external dependencies)
- Works offline (except AI features)

### Mood Tracking
- Daily mood logging with 5-level scale
- Visual trend chart with Recharts
- Statistics dashboard (average, best, count)
- Historical data visualization

### Security & Privacy
- All data stored locally in browser localStorage
- No cloud sync (except for Groq API calls)
- HTTPS recommended for production
- Password change support in settings
- Account deletion functionality

## Configuration

### Environment Variables
```
GROQ_API_KEY=your_groq_api_key_here
```

### Customization
- Color scheme: Modify CSS variables in `app/globals.css`
- Font: Change in `app/layout.tsx` and `@theme` in `globals.css`
- Animations: Add/modify in `globals.css` keyframes

## Browser Support

- Chrome/Chromium 90+
- Firefox 88+
- Safari 14+
- Edge 90+

**Note**: Voice features require modern browsers with Web Speech API support

## Accessibility

- WCAG 2.1 Level AA compliant
- Keyboard navigation throughout
- Screen reader friendly
- High contrast mode support
- Focus indicators on all interactive elements
- Alt text for all images
- Semantic HTML structure

## Performance

- Optimized animations for smooth 60fps
- Lazy loading for chat messages
- Efficient state management
- Responsive images
- No unnecessary re-renders
- LocalStorage for instant data access

## Testing

See [TESTING_GUIDE.md](./TESTING_GUIDE.md) for comprehensive testing checklist.

### Quick Test
1. Login with demo credentials
2. Try each feature from the sidebar
3. Test voice input/output in chat and journal
4. Book a therapist appointment
5. Check saved resources persist

## Known Limitations

- Voice input requires microphone permissions
- Speech-to-text may vary by browser
- Groq API requires active internet connection
- Mobile keyboard may hide UI on some devices
- No offline mode (except static pages)

## Future Enhancements

- Backend database with Supabase
- Real therapist scheduling system
- Push notifications
- Premium features and subscription
- Social sharing capabilities
- Advanced analytics and insights
- Real-time collaboration features
- Mobile native apps

## Contributing

Contributions are welcome! Please follow these guidelines:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see LICENSE file for details.

## Support

For issues, feature requests, or questions:
- Open an issue on GitHub
- Contact: support@mindwell.com
- Documentation: See TESTING_GUIDE.md and README files

## Credits

Built with ❤️ using modern web technologies and a commitment to mental health support.

### Technologies
- Next.js & Vercel
- React & TypeScript
- Tailwind CSS
- Groq AI
- Recharts
- Radix UI
- shadcn/ui

## Disclaimer

MindWell is designed as a support tool and should not replace professional mental health care. If you're experiencing a mental health crisis, please contact emergency services or a crisis helpline immediately.

**Crisis Resources:**
- National Suicide Prevention Lifeline: 988 (US)
- Crisis Text Line: Text HOME to 741741
- International Association for Suicide Prevention: https://www.iasp.info/resources/Crisis_Centres/

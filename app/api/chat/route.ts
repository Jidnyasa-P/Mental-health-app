import { NextRequest, NextResponse } from 'next/server'
import { generateText } from 'ai'
import { createGroq } from '@ai-sdk/groq'

const GROQ_API_KEY = process.env.GROQ_API_KEY

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      )
    }

    if (!GROQ_API_KEY) {
      console.error('[v0] GROQ_API_KEY environment variable not found')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    console.log('[v0] Using Groq API for chat')

    const groq = createGroq({
      apiKey: GROQ_API_KEY,
    })

    // System prompt for mental health chatbot
    const systemPrompt = `You are a compassionate and supportive mental health assistant for MindWell, a mental health and wellness platform. 

Your role is to:
- Provide helpful, evidence-based mental health support and coping strategies
- Guide users through meditation and mindfulness techniques
- Help with mood tracking and emotional insights
- Recommend relevant resources and features
- Navigate users through MindWell sections:
  * Meditation: Browse and start guided meditation sessions
  * Journal: Write private journal entries with voice support
  * Find Therapist: Book appointments with licensed therapists
  * Crisis Support: Access emergency resources and create safety plans
  * Community Forum: Connect with others for support
  * Mood Tracker: Track emotions and view trends
  * Resources: Access educational materials
  * Settings: Manage account and preferences

Always be empathetic, supportive, and professional. For serious mental health emergencies, direct users to crisis support. Keep responses concise and actionable.`

    const { text } = await generateText({
      model: groq('llama-3.3-70b-versatile'),
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.8,
      maxTokens: 1024,
    })

    console.log('[v0] Groq response received:', text.substring(0, 50) + '...')

    return NextResponse.json({ response: text })
  } catch (error) {
    console.error('[v0] Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to get response from AI. Please try again.' },
      { status: 500 }
    )
  }
}

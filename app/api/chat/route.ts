import { NextRequest, NextResponse } from 'next/server'

const GEMINI_API_KEY = process.env.API_KEY || process.env.GEMINI_API_KEY
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent'

export async function POST(request: NextRequest) {
  try {
    const { message } = await request.json()

    if (!message || typeof message !== 'string') {
      return NextResponse.json(
        { error: 'Invalid message' },
        { status: 400 }
      )
    }

    if (!GEMINI_API_KEY) {
      console.error('[v0] GEMINI_API_KEY or API_KEY environment variable not found')
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      )
    }

    console.log('[v0] Using Gemini API key:', GEMINI_API_KEY.substring(0, 10) + '...')

    // Call Gemini API
    const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text: `You are a compassionate and supportive mental health counselor for the MindWell app. 
Your role is to provide helpful, evidence-based advice on mental health, wellness, and stress management.
Always remind users that for serious mental health concerns, they should seek professional help.
Keep responses concise and supportive.

User message: ${message}`
              }
            ]
          }
        ],
        generationConfig: {
          maxOutputTokens: 500,
          temperature: 0.7,
        }
      })
    })

    if (!response.ok) {
      const error = await response.json()
      console.error('Gemini API error:', error)
      return NextResponse.json(
        { error: 'Failed to get response from AI' },
        { status: 500 }
      )
    }

    const data = await response.json()
    console.log('[v0] Gemini API response:', JSON.stringify(data, null, 2))
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 'I could not generate a response.'
    console.log('[v0] Final AI response:', aiResponse)

    return NextResponse.json({ response: aiResponse })
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

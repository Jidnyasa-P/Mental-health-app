import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { CheckCircle } from 'lucide-react'

export default function SignupSuccess() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="w-full max-w-md px-4">
        <Card className="p-8">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <CheckCircle className="h-16 w-16 text-accent" />
            </div>
            <h1 className="text-2xl font-bold text-foreground mb-2">Welcome to MindWell!</h1>
            <p className="text-muted-foreground mb-6">
              Your account has been created successfully. A confirmation email has been sent to your inbox.
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              Please check your email and click the confirmation link to complete your signup.
            </p>
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Once confirmed, you can:</p>
              <ul className="text-sm text-muted-foreground space-y-2 text-left">
                <li>✓ Access your personal dashboard</li>
                <li>✓ Track your daily mood and emotions</li>
                <li>✓ Write private journal entries</li>
                <li>✓ Chat with our AI support assistant</li>
                <li>✓ Join our supportive community</li>
              </ul>
            </div>
            <div className="mt-8 space-y-3">
              <p className="text-sm text-muted-foreground">Didn't receive the email?</p>
              <p className="text-xs text-muted-foreground">
                Check your spam folder or{' '}
                <Link href="/auth/login" className="text-primary hover:underline">
                  try signing in
                </Link>
              </p>
            </div>
            <Link href="/" className="block mt-8">
              <Button variant="outline" className="w-full">
                Return Home
              </Button>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/95 backdrop-blur sticky top-0 z-40">
        <div className="mx-auto max-w-4xl px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition w-fit">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Introduction</h2>
            <p className="text-muted-foreground mb-4">
              MindWell ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our mental health platform.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Information We Collect</h2>
            <div className="space-y-4 text-muted-foreground">
              <div>
                <h3 className="font-semibold text-foreground mb-2">Personal Information</h3>
                <p>Name, email address, phone number, and account credentials when you register.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Health Information</h3>
                <p>Mood entries, journal entries, meditation activity, and any information you voluntarily share.</p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Usage Data</h3>
                <p>Information about how you interact with our platform, including access times and pages viewed.</p>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. How We Use Your Information</h2>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Provide and maintain our services</li>
              <li>Personalize your experience</li>
              <li>Process transactions</li>
              <li>Send administrative and promotional information</li>
              <li>Respond to your inquiries</li>
              <li>Improve and optimize our platform</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Data Protection</h2>
            <p className="text-muted-foreground mb-4">
              We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
            <p className="text-muted-foreground">
              All sensitive health information is encrypted and stored securely. We use industry-standard SSL/TLS encryption for data in transit.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground mb-4">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Right to access your personal data</li>
              <li>Right to correct inaccurate data</li>
              <li>Right to delete your data</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground mb-4">
              If you have any questions about this Privacy Policy or our privacy practices, please contact us:
            </p>
            <div className="text-muted-foreground space-y-2">
              <p><strong>Email:</strong> privacy@mindwell.com</p>
              <p><strong>Address:</strong> 123 Wellness Street, New York, NY 10001</p>
              <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            </div>
          </Card>
        </div>

        {/* Footer Navigation */}
        <div className="flex gap-4 mt-12">
          <Button asChild variant="outline">
            <Link href="/terms">Terms of Service</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

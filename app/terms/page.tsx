'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { ArrowLeft } from 'lucide-react'

export default function Terms() {
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
        <h1 className="text-4xl font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

        <div className="space-y-8">
          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using MindWell, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use License</h2>
            <p className="text-muted-foreground mb-4">
              Permission is granted to temporarily download one copy of the materials (information or software) on MindWell's platform for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Modifying or copying the materials</li>
              <li>Using the materials for any commercial purpose or for any public display</li>
              <li>Attempting to decompile or reverse engineer any software</li>
              <li>Removing any copyright or other proprietary notations</li>
              <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
            </ul>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Disclaimer</h2>
            <p className="text-muted-foreground mb-4">
              The materials on MindWell's platform are provided on an 'as is' basis. MindWell makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
            <p className="text-muted-foreground font-semibold text-destructive">
              IMPORTANT: MindWell is not a substitute for professional mental health care. If you are experiencing a mental health crisis, please contact emergency services or call the National Suicide Prevention Lifeline at 988.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Limitations</h2>
            <p className="text-muted-foreground">
              In no event shall MindWell or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on MindWell's platform.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Accuracy of Materials</h2>
            <p className="text-muted-foreground">
              The materials appearing on MindWell's platform could include technical, typographical, or photographic errors. MindWell does not warrant that any of the materials on our platform are accurate, complete, or current. MindWell may make changes to the materials contained on our platform at any time without notice.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Links</h2>
            <p className="text-muted-foreground">
              MindWell has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by MindWell of the site. Use of any such linked website is at the user's own risk.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Modifications</h2>
            <p className="text-muted-foreground">
              MindWell may revise these terms of service for our platform at any time without notice. By using our platform, you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </Card>

          <Card className="p-6">
            <h2 className="text-2xl font-semibold text-foreground mb-4">8. Governing Law</h2>
            <p className="text-muted-foreground">
              These terms and conditions are governed by and construed in accordance with the laws of the United States, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </Card>
        </div>

        {/* Footer Navigation */}
        <div className="flex gap-4 mt-12">
          <Button asChild variant="outline">
            <Link href="/privacy">Privacy Policy</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/">Back to Home</Link>
          </Button>
        </div>
      </main>
    </div>
  )
}

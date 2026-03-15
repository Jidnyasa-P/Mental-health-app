import Link from 'next/link'
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react'

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-secondary/5 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Section */}
          <div className="col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold">
                MW
              </div>
              <h3 className="text-lg font-bold text-foreground">MindWell</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Your personal mental health companion supporting your wellness journey.
            </p>
            <div className="flex gap-3">
              <Link href="#" className="text-muted-foreground hover:text-primary transition">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary transition">
                <Linkedin className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Features</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard/mood" className="text-muted-foreground hover:text-primary transition">
                  Mood Tracking
                </Link>
              </li>
              <li>
                <Link href="/dashboard/journal" className="text-muted-foreground hover:text-primary transition">
                  Journaling
                </Link>
              </li>
              <li>
                <Link href="/dashboard/chat" className="text-muted-foreground hover:text-primary transition">
                  AI Support
                </Link>
              </li>
              <li>
                <Link href="/dashboard/meditation" className="text-muted-foreground hover:text-primary transition">
                  Meditation
                </Link>
              </li>
              <li>
                <Link href="/dashboard/resources" className="text-muted-foreground hover:text-primary transition">
                  Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Community Links */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Community</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/dashboard/forum" className="text-muted-foreground hover:text-primary transition">
                  Community Forum
                </Link>
              </li>
              <li>
                <Link href="/dashboard/therapist" className="text-muted-foreground hover:text-primary transition">
                  Find Therapist
                </Link>
              </li>
              <li>
                <Link href="/dashboard/crisis" className="text-muted-foreground hover:text-primary transition">
                  Crisis Support
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & Support */}
          <div>
            <h4 className="font-semibold text-foreground mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="text-muted-foreground hover:text-primary transition">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-muted-foreground hover:text-primary transition">
                  Terms of Service
                </Link>
              </li>
              <li>
                <a href="mailto:support@mindwell.com" className="text-muted-foreground hover:text-primary transition">
                  Email Support
                </a>
              </li>
              <li>
                <a href="tel:+1-800-MINDWELL" className="text-muted-foreground hover:text-primary transition">
                  1-800-MINDWELL
                </a>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary transition">
                  Report an Issue
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-lg font-semibold text-foreground mb-2">Stay Updated</h3>
              <p className="text-sm text-muted-foreground">
                Subscribe to our newsletter for mental health tips and wellness resources.
              </p>
            </div>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground text-sm"
              />
              <button
                type="submit"
                className="px-6 py-2 rounded-lg bg-primary text-primary-foreground font-medium hover:opacity-90 transition text-sm"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Contact Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 py-6 border-t border-border">
          <div className="flex items-start gap-3">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground text-sm mb-1">Address</h4>
              <p className="text-sm text-muted-foreground">123 Wellness Ave, Health City, HC 12345</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground text-sm mb-1">Phone</h4>
              <p className="text-sm text-muted-foreground">1-800-MINDWELL (646-3935)</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground text-sm mb-1">Email</h4>
              <p className="text-sm text-muted-foreground">support@mindwell.com</p>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© {currentYear} MindWell. All rights reserved.</p>
            <div className="flex gap-6">
              <Link href="/privacy" className="hover:text-primary transition">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-primary transition">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-primary transition">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

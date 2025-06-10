import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

export default function Header() {
  return (
    <div>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 sm:px-4 flex h-16 items-center justify-between gap-4 max-w-6xl">
          <div className="font-bold text-xl">Kevin Kantona</div>
          <nav className="hidden md:flex gap-6">
            <Link
              href="#about"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              About
            </Link>
            <Link
              href="#skills"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Skills
            </Link>
            {/* <Link
              href="#projects"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Projects
            </Link> */}
            <Link
              href="#contacts"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              Contacts
            </Link>
          </nav>
          <a
            href="mailto:kevinkho96@gmail.com?subject=Hello%20Kevin"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
          </a>
        </div>
      </header>
    </div>
  )
}

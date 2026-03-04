'use client'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

export default function Header() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  const handleScroll = (e: React.MouseEvent, targetId: string) => {
    e.preventDefault()
    const element = document.getElementById(targetId)
    if (element) {
      // 64px offset for the fixed header
      const y = element.getBoundingClientRect().top + window.scrollY - 64
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto px-6 sm:px-4 flex h-16 items-center justify-between gap-4 max-w-6xl">
          <button
            onClick={(e) => handleScroll(e, 'profile')}
            className="font-bold text-xl cursor-pointer hover:opacity-80 transition-opacity"
          >
            Kevin Kantona
          </button>
          <nav className="hidden md:flex gap-6">
            <a
              href="#about"
              onClick={(e) => handleScroll(e, 'about')}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              About
            </a>
            <a
              href="#projects"
              onClick={(e) => handleScroll(e, 'projects')}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Projects
            </a>
            <a
              href="#skills"
              onClick={(e) => handleScroll(e, 'skills')}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Skills
            </a>
            <a
              href="#contacts"
              onClick={(e) => handleScroll(e, 'contacts')}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              Contacts
            </a>
          </nav>
          <a
            href="#contacts"
            onClick={(e) => handleScroll(e, 'contacts')}
            className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
          >
            <Button variant="outline" size="sm">
              <Mail className="mr-2 h-4 w-4" />
              Contact Me
            </Button>
          </a>
        </div>
      </header>
    </>
  )
}

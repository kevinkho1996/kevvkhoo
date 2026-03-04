'use client'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Github, Linkedin, Mail } from 'lucide-react'

export default function Footer() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null

  return (
    <footer className="border-t py-6 md:py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 max-w-6xl">
        <div className="text-center md:text-left">
          <p className="text-sm text-muted-foreground">
            {new Date().getFullYear()} Kevin Kantona. All rights reserved.
          </p>
        </div>
        <div className="flex gap-4">
          <a
            href="https://github.com/kevinkho1996"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Github className="h-5 w-5" />
            </Button>
          </a>
          <a
            href="https://linkedin.com/in/kevinkantona"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="ghost" size="icon">
              <Linkedin className="h-5 w-5" />
            </Button>
          </a>
        </div>
      </div>
    </footer>
  )
}

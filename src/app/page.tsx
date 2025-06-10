'use client'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'

import Header from './header/page'
import Profile from './profile/page'
import About from './about/page'
import Skills from './skills/page'
import Contacts from './contacts/page'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <Profile />
        <About />
        <Skills />
        <Contacts />
      </main>
    </div>
  )
}

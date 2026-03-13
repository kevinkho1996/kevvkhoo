'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Kevin from '@/components/images/profile.jpg'

import DecryptedText from '@/components/DecryptedText/DecryptedText'
import FadeContent from '@/components/FadeContent/FadeContent'
import AnimatedContent from '@/components/AnimatedContent/AnimatedContent'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { SiteIdentity } from '@/lib/data'

interface ProfileProps {
  initialData?: SiteIdentity
}

export default function Profile({ initialData }: ProfileProps) {
  const [displayName, setDisplayName] = useState<string>(initialData?.displayName || '')
  const [loading, setLoading] = useState(!initialData)

  useEffect(() => {
    if (initialData) return

    const fetchIdentity = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'site_config', 'identity'))
        if (docSnap.exists() && docSnap.data().displayName) {
          setDisplayName(docSnap.data().displayName)
        } else {
          setDisplayName('Kevin Kantona')
        }
      } catch (error) {
        console.error('Error fetching displayName:', error)
        setDisplayName('Kevin Kantona')
      } finally {
        setLoading(false)
      }
    }

    fetchIdentity()
  }, [initialData])

  return (
    <div id="profile">
      <section className="py-12 md:py-24 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        <div className="flex-1 max-w-2xl space-y-4 text-center md:text-left">
          <div className="h-8">
            <AnimatedContent
              distance={100}
              direction="vertical"
              reverse={true}
              duration={1.2}
              ease="power3.out"
              initialOpacity={0}
              animateOpacity
              scale={1.1}
              threshold={0.2}
            >
              <Badge className="mb-4 mx-auto md:mx-0 w-fit">
                Open for new opportunity
              </Badge>
            </AnimatedContent>
          </div>

          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={true}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={0}
          >
            <div className="min-h-[48px] md:min-h-[72px] flex items-center justify-center md:justify-start">
              {loading ? (
                <div className="h-12 w-64 bg-muted/50 rounded animate-pulse mb-2"></div>
              ) : (
                <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                  I'm {displayName}!
                </h1>
              )}
            </div>
          </AnimatedContent>

          <div className="min-h-[28px] md:min-h-[32px]">
            <DecryptedText
              text="Software Engineer FrontEnd"
              animateOn="view"
              speed={50}
              maxIterations={20}
              sequential={true}
              revealDirection="start"
              className="text-xl font-medium text-muted-foreground"
            />
          </div>
          <div className="min-h-[60px] md:min-h-[80px]">
            <DecryptedText
              text="I develop internal mobile and web application that help teams work more efficiently and effectively"
              animateOn="view"
              speed={20}
              maxIterations={20}
              sequential={true}
              revealDirection="start"
              className="text-lg text-muted-foreground"
            />
          </div>
          <div className="flex gap-4 pt-4 justify-center md:justify-start">
            <a
              href="https://www.linkedin.com/in/kevinkantona/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>View LinkedIn</Button>
            </a>
            <a
              href="https://drive.google.com/file/d/1uHhwBb0sf5B7UV8Tns5wvPldDUQeBs8E/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">Download CV</Button>
            </a>
          </div>
        </div>
        <FadeContent
          blur={true}
          duration={400}
          easing="ease-out"
          initialOpacity={0}
          delay={0}
        >
          <div className="flex-1 flex justify-center">
            <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-muted shadow-lg">
              <Image
                src={Kevin}
                alt="Kevin Kantona"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </FadeContent>
      </section>
    </div>
  )
}

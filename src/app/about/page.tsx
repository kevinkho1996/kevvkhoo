'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { SiteIdentity } from '@/lib/data'

interface AboutProps {
  initialData?: SiteIdentity
}

export default function About({ initialData }: AboutProps) {
  const [bio, setBio] = useState<string>(initialData?.bio || '')
  const [loading, setLoading] = useState(!initialData)

  useEffect(() => {
    if (initialData) return

    const fetchIdentity = async () => {
      try {
        const docSnap = await getDoc(doc(db, 'site_config', 'identity'))

        if (docSnap.exists()) {
          setBio(docSnap.data().bio || '')
        } else {
          setBio(
            'I am a software engineer specializing in frontend experiences with a deep passion for interaction design...',
          )
        }
      } catch (error) {
        console.error('Error fetching bio:', error)
        setBio(
          'I am a software engineer specializing in frontend experiences with a deep passion for interaction design...',
        )
      } finally {
        setLoading(false)
      }
    }

    fetchIdentity()
  }, [initialData])

  return (
    <div>
      <section id="about" className="py-12 md:py-24 border-t">
        <h2 className="text-3xl font-bold mb-8">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4 min-h-[160px] md:min-h-[200px]">
            {loading ? (
              <div className="space-y-3">
                <div className="h-4 bg-muted/50 rounded animate-pulse w-full"></div>
                <div className="h-4 bg-muted/50 rounded animate-pulse w-[90%]"></div>
                <div className="h-4 bg-muted/50 rounded animate-pulse w-[95%]"></div>
                <div className="h-4 bg-muted/50 rounded animate-pulse w-[80%]"></div>
                <div className="h-4 bg-muted/50 rounded animate-pulse w-[85%] mt-4"></div>
                <div className="h-4 bg-muted/50 rounded animate-pulse w-[90%]"></div>
              </div>
            ) : (
              <p className="text-lg whitespace-pre-wrap leading-relaxed">
                {bio}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-bold mb-2">Education</h3>
              <p>B.S. Computer Science</p>
              <p className="text-sm text-muted-foreground">
                Universitas Ciputra
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-bold mb-2">Experience</h3>
              <p>5+ Years</p>
              <p className="text-sm text-muted-foreground">FrontEnd Engineer</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-bold mb-2">Location</h3>
              <p>South Tangerang, Banten</p>
              <p className="text-sm text-muted-foreground">Indonesia</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-bold mb-2">Languages</h3>
              <p>Indonesia, English, German</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, onSnapshot } from 'firebase/firestore'

export default function Skills() {
  const [skills, setSkills] = useState<{ id: string; name: string }[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = collection(db, 'portfolio_skills')
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedSkills = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
      }))

      fetchedSkills.sort((a, b) => a.name.localeCompare(b.name))
      setSkills(fetchedSkills)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div>
      <section id="skills" className="py-12 md:py-24 border-t">
        <h2 className="text-3xl font-bold mb-8">Skills and Expertise</h2>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
              <div
                key={i}
                className="bg-muted/50 p-4 rounded-lg animate-pulse h-14"
              ></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {skills.map((skill) => (
              <div
                key={skill.id}
                className="bg-muted p-4 rounded-lg text-center shadow-sm"
              >
                <p className="font-medium">{skill.name}</p>
              </div>
            ))}

            {skills.length === 0 && (
              <div className="col-span-full text-center text-muted-foreground py-8">
                No skills found. Add some from the admin dashboard!
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

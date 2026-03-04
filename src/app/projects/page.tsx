'use client'

import { useEffect, useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, query, orderBy, onSnapshot } from 'firebase/firestore'
import { ExternalLink } from 'lucide-react'

interface Project {
  id: string
  title: string
  subtitle: string
  date: string
  bgColor: string
  textColor: string
  url?: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const q = collection(db, 'portfolio_projects')
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedProjects = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[]

      // Sort by title ascending to match admin
      fetchedProjects.sort((a, b) => a.title.localeCompare(b.title))
      setProjects(fetchedProjects)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <div>
      <section id="projects" className="py-12 md:py-24 border-t">
        <h2 className="text-3xl font-bold mb-8">My projects</h2>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-muted/50 rounded-3xl p-6 h-64 animate-pulse"
              ></div>
            ))}
          </div>
        ) : projects.length === 0 ? (
          <div className="text-center text-muted-foreground py-12">
            No projects published yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => {
              const ProjectCard = (
                <div
                  key={project.id}
                  className={`bg-muted/30 hover:bg-muted/50 rounded-3xl p-6 flex flex-col shadow-sm border border-border relative group transition-all hover:-translate-y-1 h-full`}
                >
                  <div className="text-xs font-semibold text-muted-foreground mb-4 bg-background/50 border border-border w-fit px-3 py-1 rounded-full backdrop-blur-sm">
                    {project.date}
                  </div>

                  <div className="flex flex-col items-start justify-center flex-1 py-8">
                    <h3 className="text-2xl font-bold mb-2 text-left text-foreground">
                      {project.title}
                    </h3>
                    <p className="text-sm font-medium text-muted-foreground text-left">
                      {project.subtitle}
                    </p>
                  </div>

                  {project.url && (
                    <div className="absolute top-4 right-4 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-background/80 p-2 rounded-full shadow-sm text-foreground">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                    </div>
                  )}
                </div>
              )

              return project.url ? (
                <a
                  key={project.id}
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block h-full"
                >
                  {ProjectCard}
                </a>
              ) : (
                <div key={project.id} className="block h-full">
                  {ProjectCard}
                </div>
              )
            })}
          </div>
        )}
      </section>
    </div>
  )
}

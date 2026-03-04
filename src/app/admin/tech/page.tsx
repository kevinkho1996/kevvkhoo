'use client'

import React, { useContext, useState, useEffect } from 'react'
import { Plus, Trash2 } from 'lucide-react'
import { AdminHeader } from '../components/AdminHeader'
import { AdminContext } from '../AdminLayoutWrapper'
import { db } from '@/lib/firebase'
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
} from 'firebase/firestore'

interface Skill {
  id: string
  name: string
  createdAt: any
}

export default function TechMatrixPage() {
  const { toggleSidebar } = useContext(AdminContext)
  const [skills, setSkills] = useState<Skill[]>([])
  const [newSkillName, setNewSkillName] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Optionally orderBy('createdAt', 'desc') if you want sorting, but requires an index.
    // For now, let's just fetch all.
    const q = collection(db, 'portfolio_skills')
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const fetchedSkills = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Skill[]

      // Sort in memory by name if no DB index is set up yet
      fetchedSkills.sort((a, b) => a.name.localeCompare(b.name))
      setSkills(fetchedSkills)
    })

    return () => unsubscribe()
  }, [])

  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault()
    const trimmedName = newSkillName.trim()
    if (!trimmedName) return

    const isDuplicate = skills.some(
      (skill) => skill.name.toLowerCase() === trimmedName.toLowerCase(),
    )
    if (isDuplicate) {
      setError(`"${trimmedName}" is already in your matrix.`)
      return
    }

    setError(null)
    setIsSubmitting(true)
    try {
      await addDoc(collection(db, 'portfolio_skills'), {
        name: trimmedName,
        createdAt: new Date().toISOString(),
      })
      setNewSkillName('')
    } catch (err) {
      console.error('Error adding skill:', err)
      setError('Failed to add skill.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDeleteSkill = async (id: string) => {
    try {
      await deleteDoc(doc(db, 'portfolio_skills', id))
    } catch (error) {
      console.error('Error deleting skill:', error)
      alert('Failed to delete skill.')
    }
  }

  return (
    <>
      <AdminHeader title="Tech Matrix" onToggleSidebar={toggleSidebar} />

      <div className="bg-white dark:bg-[#181d2f]/80 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-white/5">
        <form onSubmit={handleAddSkill} className="mb-8">
          <div className="flex gap-4">
            <input
              type="text"
              value={newSkillName}
              onChange={(e) => {
                setNewSkillName(e.target.value)
                if (error) setError(null)
              }}
              placeholder="Add a new skill (e.g. Next.js, GraphQL)"
              className="bg-[#f4f7fe] dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 w-full text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting || !newSkillName.trim()}
              className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-medium transition-colors flex shrink-0 items-center justify-center gap-2 shadow-md shadow-indigo-500/20 md:w-auto w-32"
            >
              <Plus className="w-5 h-5" />
              <span>Add Skill</span>
            </button>
          </div>
          {error && (
            <p className="text-red-500 text-sm mt-3 ml-1 font-medium">
              {error}
            </p>
          )}
        </form>

        <div className="flex flex-wrap gap-3">
          {skills.length === 0 ? (
            <div className="text-slate-400 text-sm py-4">
              No skills added yet.
            </div>
          ) : (
            skills.map((skill) => (
              <div
                key={skill.id}
                className="flex items-center gap-2 bg-[#f4f7fe] dark:bg-white/5 border border-slate-200 dark:border-white/10 pl-4 pr-1.5 py-1.5 rounded-full text-sm text-slate-700 dark:text-slate-300 transition-all hover:border-slate-300 dark:hover:border-white/20"
              >
                <span className="font-medium">{skill.name}</span>
                <button
                  onClick={() => handleDeleteSkill(skill.id)}
                  className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-full transition-colors"
                  aria-label={`Delete ${skill.name}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  )
}

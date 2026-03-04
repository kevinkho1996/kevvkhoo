'use client'

import React, { useContext, useState, useEffect } from 'react'
import { AdminHeader } from '../components/AdminHeader'
import { AdminContext } from '../AdminLayoutWrapper'
import { db } from '@/lib/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'

export default function IdentityProfilePage() {
  const { toggleSidebar } = useContext(AdminContext)
  const [displayName, setDisplayName] = useState('')
  const [bio, setBio] = useState('')

  // To keep track if values have changed vs the database
  const [originalData, setOriginalData] = useState<{
    displayName: string
    bio: string
  } | null>(null)

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [message, setMessage] = useState<{
    type: 'success' | 'error'
    text: string
  } | null>(null)

  useEffect(() => {
    const fetchIdentity = async () => {
      try {
        const docRef = doc(db, 'site_config', 'identity')
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()) {
          const data = docSnap.data()
          setDisplayName(data.displayName || '')
          setBio(data.bio || '')
          setOriginalData({
            displayName: data.displayName || '',
            bio: data.bio || '',
          })
        } else {
          // Document doesn't exist yet (first run)
          setOriginalData({ displayName: '', bio: '' })
        }
      } catch (error) {
        console.error('Error fetching identity:', error)
        setMessage({ type: 'error', text: 'Failed to load profile data.' })
      } finally {
        setIsLoading(false)
      }
    }

    fetchIdentity()
  }, [])

  const handleSave = async () => {
    setIsSubmitting(true)
    setMessage(null)

    try {
      const docRef = doc(db, 'site_config', 'identity')
      // setDoc with merge: true will create it if it doesn't exist, and just update these fields if it does
      await setDoc(
        docRef,
        {
          displayName,
          bio,
          updatedAt: new Date().toISOString(),
        },
        { merge: true },
      )

      setOriginalData({ displayName, bio })
      setMessage({ type: 'success', text: 'Profile updated successfully!' })

      // Auto dismiss success message
      setTimeout(() => setMessage(null), 3000)
    } catch (error) {
      console.error('Error saving identity:', error)
      setMessage({
        type: 'error',
        text: 'Failed to save changes. Check permissions.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDiscard = () => {
    if (originalData) {
      setDisplayName(originalData.displayName)
      setBio(originalData.bio)
      setMessage(null)
    }
  }

  const hasUnsavedChanges =
    originalData &&
    (displayName !== originalData.displayName || bio !== originalData.bio)

  return (
    <>
      <AdminHeader title="Identity Profile" onToggleSidebar={toggleSidebar} />

      <div className="bg-white dark:bg-[#181d2f]/80 rounded-3xl p-8 shadow-sm border border-slate-200 dark:border-white/5 max-w-3xl relative">
        {isLoading && (
          <div className="absolute inset-0 z-10 bg-white/50 dark:bg-[#181d2f]/50 backdrop-blur-sm rounded-3xl flex items-center justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
          </div>
        )}

        {message && (
          <div
            className={`mb-6 p-4 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400' : 'bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400'}`}
          >
            {message.text}
          </div>
        )}

        <div className="mb-6">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            Display Name
          </label>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            disabled={isSubmitting || isLoading}
            placeholder="E.g. Kevin Kantona"
            className="bg-[#f4f7fe] dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 w-full text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
          />
        </div>
        <div className="mb-8">
          <label className="block text-sm font-bold text-slate-700 dark:text-slate-300 mb-2">
            About Me (Bio)
          </label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            disabled={isSubmitting || isLoading}
            placeholder="Write a short biography..."
            className="bg-[#f4f7fe] dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 w-full h-48 text-slate-700 dark:text-slate-200 outline-none focus:ring-2 focus:ring-indigo-500 resize-none leading-relaxed"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={handleDiscard}
            disabled={!hasUnsavedChanges || isSubmitting}
            className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 disabled:opacity-50 disabled:cursor-not-allowed px-6 py-3 rounded-xl font-medium transition-colors"
          >
            Discard Changes
          </button>
          <button
            onClick={handleSave}
            disabled={!hasUnsavedChanges || isSubmitting}
            className="bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed text-white px-8 py-3 rounded-xl font-medium transition-colors shadow-md shadow-indigo-500/20"
          >
            {isSubmitting ? 'Saving...' : 'Save Identity'}
          </button>
        </div>
      </div>
    </>
  )
}

import { useState, useEffect } from 'react'
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'

const ADMIN_EMAIL =
  process.env.NEXT_PUBLIC_ADMIN_EMAIL || 'your-admin-email@gmail.com'

export function useAdminAuth() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Authorization Check
        if (currentUser.email?.toLowerCase() === ADMIN_EMAIL.toLowerCase()) {
          setUser(currentUser)
          setError(null)
        } else {
          // If a user tries to log in with an unauthorized email, sign them out instantly
          console.error(`Unauthorized access attempt by: ${currentUser.email}`)
          setError(
            `Unauthorized access. The email ${currentUser.email} is not mapped to the admin account.`,
          )
          signOut(auth)
          setUser(null)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const loginWithGoogle = async () => {
    setError(null)
    try {
      const result = await signInWithPopup(auth, googleProvider)
      if (result.user.email?.toLowerCase() !== ADMIN_EMAIL.toLowerCase()) {
        await signOut(auth)
        throw new Error(`Unauthorized Account`)
      }
    } catch (err: any) {
      console.error('Login failed:', err)
      const errorMsg =
        err.message === 'Unauthorized Account'
          ? `Unauthorized Account: Please log in with the correct specified email.`
          : `Login failed: ${err.message || 'Unknown error occurred during login.'}`
      setError(errorMsg)
    }
  }

  const logout = async () => {
    await signOut(auth)
    setError(null)
  }

  return { user, loading, error, loginWithGoogle, logout }
}

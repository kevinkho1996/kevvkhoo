'use client'

import React, { useState, useEffect } from 'react'
import { AdminSidebar } from './components/AdminSidebar'
import { ClientMessages } from './components/ClientMessages'
import { useAdminAuth } from './hooks/useAdminAuth'

export default function AdminLayoutWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [isBlurred, setIsBlurred] = useState(false)
  const { user, loading, error, loginWithGoogle, logout } = useAdminAuth()

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f4f7fe] dark:bg-[#1f2437]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-[#f4f7fe] dark:bg-[#1f2437] p-4">
        <div className="bg-white dark:bg-[#181d2f] p-8 rounded-3xl shadow-lg border border-slate-200 dark:border-white/5 max-w-md w-full shrink-0">
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-rose-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold mx-auto mb-4 shadow-lg shrink-0">
              KK
            </div>
            <h1 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
              Admin Access
            </h1>
            <p className="text-sm text-slate-500">
              Please verify your identity to continue to the command center.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-400 text-sm font-medium border border-red-100 dark:border-red-500/20">
              {error}
            </div>
          )}

          <button
            onClick={loginWithGoogle}
            className="w-full bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 hover:bg-slate-50 dark:hover:bg-white/10 text-slate-800 dark:text-white px-4 py-3 rounded-xl font-medium transition-colors flex items-center justify-center gap-3"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Continue with Google
          </button>
        </div>
      </div>
    )
  }

  return (
    <AdminContext.Provider
      value={{
        isSidebarOpen,
        toggleSidebar: () => setIsSidebarOpen(!isSidebarOpen),
        user,
        logout,
        isBlurred,
        setIsBlurred,
      }}
    >
      <div className="flex h-screen w-full bg-[#f4f7fe] dark:bg-[#1f2437] text-slate-800 dark:text-slate-100 overflow-hidden font-sans relative">
        <div
          className={`flex h-full w-full transition-all duration-300 ${isBlurred ? 'blur-md pointer-events-none brightness-90' : ''}`}
        >
          <AdminSidebar isOpen={isSidebarOpen} />
          <div className="flex-1 flex flex-col min-w-0">
            <div className="flex-1 overflow-auto p-8 flex gap-8">
              <div className="flex-1 flex flex-col min-w-0">{children}</div>
              <ClientMessages />
            </div>
          </div>
        </div>
      </div>
    </AdminContext.Provider>
  )
}

export const AdminContext = React.createContext({
  isSidebarOpen: true,
  toggleSidebar: () => {},
  user: null as null | {
    displayName: string | null
    email: string | null
    photoURL: string | null
  },
  logout: () => {},
  isBlurred: false,
  setIsBlurred: (val: boolean) => {},
})

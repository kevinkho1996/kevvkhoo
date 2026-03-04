"use client"

import React, { useState, useEffect, useContext } from 'react'
import { Menu } from 'lucide-react'
import { AdminContext } from '../AdminLayoutWrapper'

export function AdminHeader({ 
  title, 
  onToggleSidebar 
}: { 
  title: string
  onToggleSidebar: () => void 
}) {
  const [greeting, setGreeting] = useState('Good Morning')
  const { user } = useContext(AdminContext)
  
  // Use the Google SSO first name, or fallback
  const userName = user?.displayName ? user.displayName.split(' ')[0] : 'Kevin'

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 18) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')
  }, [])

  return (
    <div className="flex items-end justify-between mb-8">
      <div>
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={onToggleSidebar} 
            className="p-2 bg-white dark:bg-[#181d2f] text-slate-500 hover:text-indigo-600 rounded-lg border border-slate-200 dark:border-white/5 shadow-sm transition-colors shrink-0"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h2 className="text-xl font-medium text-slate-500 dark:text-slate-400">
            {greeting}, {userName}!
          </h2>
        </div>
        <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-6">
          {title}
        </h1>
      </div>
      
      <div className="flex flex-col items-end justify-between h-full py-1">
        <span className="text-sm font-medium text-slate-500">
          {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
        </span>
      </div>
    </div>
  )
}

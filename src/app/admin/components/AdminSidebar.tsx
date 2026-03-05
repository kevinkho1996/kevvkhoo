'use client'

import React, { useContext, useState } from 'react'
import { createPortal } from 'react-dom'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FolderGit2, Settings2, UserCircle2, LogOut, X } from 'lucide-react'
import { AdminContext } from '../AdminLayoutWrapper'

export function AdminSidebar({
  isOpen,
  closeSidebar,
}: {
  isOpen: boolean
  closeSidebar?: () => void
}) {
  const pathname = usePathname()
  const { user, logout, setIsBlurred } = useContext(AdminContext)
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false)

  const navItems = [
    { label: 'Project Registry', icon: FolderGit2, href: '/admin/projects' },
    { label: 'Tech Matrix', icon: Settings2, href: '/admin/tech' },
    { label: 'Identity Profile', icon: UserCircle2, href: '/admin/identity' },
  ]

  return (
    <aside
      className={`fixed md:relative flex flex-col items-start py-8 bg-white dark:bg-[#181d2f] z-30 shrink-0 transition-all ease-in-out duration-300 overflow-hidden whitespace-nowrap h-full shadow-2xl md:shadow-none
        ${isOpen ? 'translate-x-0 w-[240px] px-4 opacity-100 border-r border-slate-200 dark:border-white/5' : '-translate-x-full md:translate-x-0 w-0 px-0 opacity-0 border-none md:border-r md:w-0 md:px-0 md:opacity-0'}`}
    >
      {closeSidebar && (
        <button
          onClick={closeSidebar}
          className="md:hidden absolute top-4 right-4 p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      )}
      <div className="flex items-center justify-between w-full mb-12 px-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-500 via-purple-500 to-indigo-500 flex items-center justify-center text-white font-bold text-xs shadow-lg shrink-0 overflow-hidden">
            {user?.photoURL ? (
              <img
                src={user.photoURL}
                alt="Admin"
                className="w-full h-full object-cover"
              />
            ) : (
              'KK'
            )}
          </div>
          <span className="font-bold text-lg text-slate-800 dark:text-white">
            Admin
          </span>
        </div>
      </div>

      <nav className="flex flex-col gap-2 w-full flex-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm whitespace-nowrap
                ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
                    : 'text-slate-500 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-slate-800 dark:hover:text-white'
                }`}
            >
              <Icon className="w-5 h-5 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="w-full mt-auto mt-8">
        <button
          onClick={() => {
            setIsLogoutModalOpen(true)
            if (setIsBlurred) setIsBlurred(true)
          }}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm whitespace-nowrap text-slate-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          Sign Out
        </button>
      </div>

      {isLogoutModalOpen &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#181d2f] rounded-[2rem] p-8 w-full max-w-sm shadow-xl border border-slate-200 dark:border-white/5 relative text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-6">
                <LogOut className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Sign Out
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8 whitespace-normal">
                Are you sure you want to sign out? You will need to log back in
                to access the admin panel.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => {
                    setIsLogoutModalOpen(false)
                    if (setIsBlurred) setIsBlurred(false)
                  }}
                  className="flex-1 bg-[#f4f7fe] hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setIsLogoutModalOpen(false)
                    if (setIsBlurred) setIsBlurred(false)
                    logout()
                  }}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition-colors shadow-md shadow-red-500/20"
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </aside>
  )
}

'use client'

import React, { useContext } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FolderGit2, Settings2, UserCircle2, LogOut } from 'lucide-react'
import { AdminContext } from '../AdminLayoutWrapper'

export function AdminSidebar({ isOpen }: { isOpen: boolean }) {
  const pathname = usePathname()
  const { user, logout } = useContext(AdminContext)

  const navItems = [
    { label: 'Project Registry', icon: FolderGit2, href: '/admin/projects' },
    { label: 'Tech Matrix', icon: Settings2, href: '/admin/tech' },
    { label: 'Identity Profile', icon: UserCircle2, href: '/admin/identity' },
  ]

  return (
    <aside
      className={`flex flex-col items-start py-8 bg-white dark:bg-[#181d2f] z-10 shrink-0 transition-all ease-in-out duration-300 overflow-hidden whitespace-nowrap ${isOpen ? 'w-[240px] px-4 opacity-100 border-r border-slate-200 dark:border-white/5' : 'w-0 px-0 opacity-0 border-none'}`}
    >
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
          onClick={logout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm whitespace-nowrap text-slate-500 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400"
        >
          <LogOut className="w-5 h-5 shrink-0" />
          Sign Out
        </button>
      </div>
    </aside>
  )
}

import React, { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { db } from '@/lib/firebase'
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore'
import { Mail, Trash2, User, X } from 'lucide-react'
import { AdminContext } from '../AdminLayoutWrapper'

interface Message {
  id: string
  name: string
  email: string
  message: string
  subject?: string
  createdAt: any
  starred?: boolean
}

export function ClientMessages() {
  const { setIsBlurred } = React.useContext(AdminContext)
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const [messageToDelete, setMessageToDelete] = useState<string | null>(null)

  useEffect(() => {
    setIsBlurred(!!messageToDelete)
  }, [messageToDelete, setIsBlurred])

  useEffect(() => {
    const q = query(
      collection(db, 'client_messages'),
      orderBy('createdAt', 'desc'),
    )

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const msgs: Message[] = []
      querySnapshot.forEach((doc) => {
        msgs.push({ id: doc.id, ...doc.data() } as Message)
      })
      setMessages(msgs)
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleReply = (msg: Message) => {
    const mailtoLink = `mailto:${msg.email}?subject=RE: ${msg.subject || 'Portfolio Inquiry'}&body=Hi ${msg.name},\n\n`
    window.location.href = mailtoLink
  }

  const confirmDelete = async () => {
    if (!messageToDelete) return
    try {
      await deleteDoc(doc(db, 'client_messages', messageToDelete))
      setMessageToDelete(null)
    } catch (error) {
      console.error('Error deleting message:', error)
    }
  }

  const formatDate = (timestamp: any) => {
    if (!timestamp) return ''
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp)
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date)
  }

  return (
    <div className="w-[320px] bg-white dark:bg-[#181d2f]/80 rounded-[2rem] p-6 shadow-sm border border-slate-200 dark:border-white/5 flex flex-col shrink-0 h-[calc(100vh-144px)] sticky top-0 hidden lg:flex">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-slate-800 dark:text-white">
          Client Messages
        </h2>
        <span className="bg-indigo-500 text-white text-[10px] px-2 py-0.5 rounded-full">
          {messages.length}
        </span>
      </div>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin">
        {loading ? (
          <div className="flex flex-col items-center justify-center h-40 gap-3 opacity-50">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-600"></div>
            <p className="text-xs">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-sm text-slate-500 italic">No messages found</p>
          </div>
        ) : (
          messages.map((msg, i) => (
            <div
              key={msg.id}
              className={`flex gap-4 group ${i !== messages.length - 1 ? 'border-b border-slate-100 dark:border-white/5 pb-6' : ''}`}
            >
              <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shrink-0">
                <User className="w-5 h-5 text-slate-400" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between mb-1">
                  <div className="flex flex-col min-w-0">
                    <span
                      className="font-bold text-sm text-slate-800 dark:text-slate-200 truncate"
                      title={msg.name}
                    >
                      {msg.name}
                    </span>
                    <span
                      className="text-[10px] text-slate-400 truncate"
                      title={msg.email}
                    >
                      {msg.email}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleReply(msg)}
                      title="Reply via Email"
                      className="p-1 text-slate-300 hover:text-indigo-500 dark:text-slate-600 transition-colors"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setMessageToDelete(msg.id)}
                      title="Delete Message"
                      className="p-1 text-slate-300 hover:text-red-500 dark:text-slate-600 transition-colors opacity-0 group-hover:opacity-100"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
                {msg.subject && (
                  <p className="text-[10px] font-semibold text-indigo-500 uppercase tracking-wider mb-1">
                    {msg.subject}
                  </p>
                )}
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[95%] mb-2">
                  {msg.message}
                </p>
                <div className="text-[10px] text-right font-medium text-slate-400">
                  {formatDate(msg.createdAt)}
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {messageToDelete &&
        typeof document !== 'undefined' &&
        createPortal(
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
            <div className="bg-white dark:bg-[#181d2f] rounded-[2rem] p-8 w-full max-w-sm shadow-xl border border-slate-200 dark:border-white/5 relative text-center">
              <div className="w-16 h-16 rounded-full bg-red-100 dark:bg-red-500/20 text-red-500 flex items-center justify-center mx-auto mb-6">
                <Trash2 className="w-8 h-8" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white mb-2">
                Delete Message
              </h2>
              <p className="text-slate-500 dark:text-slate-400 mb-8">
                Are you sure you want to delete this message? This action cannot
                be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setMessageToDelete(null)}
                  className="flex-1 bg-[#f4f7fe] hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 py-3 rounded-xl font-medium transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl font-medium transition-colors shadow-md shadow-red-500/20"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>,
          document.body,
        )}
    </div>
  )
}

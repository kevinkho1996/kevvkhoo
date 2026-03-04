import React from 'react'

export function ClientMessages() {
  const messages = [
    { id: 1, name: 'Stephanie', avatar: 'https://i.pravatar.cc/150?u=1', message: 'I got your first assignment. It was quite good. We can continue with the next assignment.', date: 'Dec, 12', starred: true },
    { id: 2, name: 'Mark', avatar: 'https://i.pravatar.cc/150?u=2', message: 'Hey, can tell me about progress of project? I\'m waiting for your response.', date: 'Dec, 12', starred: false },
    { id: 3, name: 'David', avatar: 'https://i.pravatar.cc/150?u=3', message: 'Hey, can tell me about progress of project? I\'m waiting for your response.', date: 'Dec, 12', starred: false },
    { id: 4, name: 'Mark', avatar: 'https://i.pravatar.cc/150?u=4', message: 'I am really impressed! Can\'t wait to see the final result.', date: 'Dec, 12', starred: false },
  ]

  return (
    <div className="w-[320px] bg-white dark:bg-[#181d2f]/80 rounded-[2rem] p-6 shadow-sm border border-slate-200 dark:border-white/5 flex flex-col shrink-0 h-[calc(100vh-144px)] sticky top-0 hidden lg:flex">
      <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">Client Messages</h2>
      
      <div className="flex-1 overflow-y-auto space-y-6 pr-2 scrollbar-thin">
        {messages.map((msg, i) => (
          <div key={msg.id} className={`flex gap-4 ${i !== messages.length -1 ? 'border-b border-slate-100 dark:border-white/5 pb-6' : ''}`}>
            <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between mb-1">
                <span className="font-bold text-sm text-slate-800 dark:text-slate-200">{msg.name}</span>
                <span className={`w-4 h-4 cursor-pointer text-center ${msg.starred ? 'text-amber-400' : 'text-slate-300 dark:text-slate-600'}`}>
                   ★
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-[90%] mb-2">
                {msg.message}
              </p>
              <div className="text-[10px] text-right font-medium text-slate-400">
                {msg.date}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

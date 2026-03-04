'use client'
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Loader2,
  User,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import { db } from '@/lib/firebase'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'

export default function Contacts() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [status, setStatus] = useState<{
    type: 'success' | 'error'
    message: string
  } | null>(null)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.name || !form.email || !form.message) {
      setStatus({
        type: 'error',
        message: 'Please fill in all required fields.',
      })
      return
    }

    setIsLoading(true)
    setStatus(null)

    try {
      await addDoc(collection(db, 'client_messages'), {
        ...form,
        createdAt: serverTimestamp(),
      })

      // Send email notification via API route
      // We don't await this to avoid delaying the user's success message,
      // but we handle it gracefully.
      fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      }).catch((err) => console.error('Notification error:', err))

      setForm({ name: '', email: '', subject: '', message: '' })
      setStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.',
      })
    } catch (error) {
      console.error('Error adding document: ', error)
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again later.',
      })
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div>
      <section id="contacts" className="py-12 md:py-24 border-t">
        <h2 className="text-3xl font-bold mb-8">Get In Touch!</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="flex flex-col h-full justify-between py-2">
            <div className="space-y-8">
              <div>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  I'm currently open to new opportunities and collaborations. If
                  you have a project that needs my expertise or just want to
                  connect, feel free to reach out!
                </p>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-all shrink-0">
                    <ExternalLink className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Future-Proof Solutions</p>
                    <p className="text-sm text-muted-foreground leading-snug">
                      Scalable architecture built with modern frameworks to grow
                      with your needs.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-all shrink-0">
                    <Loader2 className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">Performance First</p>
                    <p className="text-sm text-muted-foreground leading-snug">
                      Optimized for speed, SEO, and accessibility to ensure the
                      widest reach possible.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 group">
                  <div className="w-10 h-10 rounded-xl bg-foreground/5 flex items-center justify-center text-foreground group-hover:bg-foreground group-hover:text-background transition-all shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold">User-Centric Design</p>
                    <p className="text-sm text-muted-foreground leading-snug">
                      Interfaces designed with the end-user in mind, ensuring
                      clarity and ease of use.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-auto pt-10">
              <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <p className="text-xs font-bold text-green-600 uppercase tracking-widest">
                  Available for Collaboration
                </p>
              </div>
            </div>
          </div>
          <div className="bg-muted p-6 rounded-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input
                    id="name"
                    className="w-full p-2 rounded-md border bg-background"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    className="w-full p-2 rounded-md border bg-background"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <input
                  id="subject"
                  className="w-full p-2 rounded-md border bg-background"
                  placeholder="Subject"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className="w-full p-2 rounded-md border bg-background resize-none"
                  placeholder="Your message"
                  value={form.message}
                  onChange={handleChange}
                  disabled={isLoading}
                />
              </div>

              {status && (
                <div
                  className={`p-3 rounded-md text-sm ${
                    status.type === 'success'
                      ? 'bg-green-500/10 text-green-600 border border-green-500/20'
                      : 'bg-red-500/10 text-red-600 border border-red-500/20'
                  }`}
                >
                  {status.message}
                </div>
              )}

              <Button className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  'Send Message'
                )}
              </Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

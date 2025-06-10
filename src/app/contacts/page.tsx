'use client'
import { Github, Linkedin, Mail, ExternalLink } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export default function Contacts() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm({ ...form, [e.target.id]: e.target.value })
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const mailtoLink = `mailto:kevinkho96@gmail.com?subject=${encodeURIComponent(
      form.subject,
    )}&body=${encodeURIComponent(
      `Hai, I'm ${form.name}\n\n${form.message}\n\nFrom\n${form.email}`,
    )}`
    window.location.href = mailtoLink
  }
  return (
    <div>
      <section id="contacts" className="py-12 md:py-24 border-t">
        <h2 className="text-3xl font-bold mb-8">Get In Touch!</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-lg">
              I'm currently open to new opportunities and collaborations. If you
              have a project that needs my expertise or just want to connect,
              feel free to reach out!
            </p>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center">
                <Mail className="mr-2 h-5 w-5" />
                kevinkho96@gmail.com
              </div>
              <div className="flex items-center">
                <Linkedin className="mr-2 h-5 w-5" />
                <span>linkedin.com/in/kevinkantona</span>
              </div>
              <div className="flex items-center">
                <Github className="mr-2 h-5 w-5" />
                <span>github.com/kevinkho1996</span>
              </div>
            </div>
            <div className="flex gap-4 pt-4">
              <Button variant="outline" size="icon">
                <Github className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="outline" size="icon">
                <Mail className="h-5 w-5" />
              </Button>
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
                />
              </div>
              <Button className="w-full">Send Message</Button>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}

import type React from 'react'
import '@/app/globals.css'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'

import Header from './header/page'
import Footer from './footer/page'
import AnalyticsTracker from '@/components/AnalyticsTracker'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Kevin Kantona | Software Engineer',
  description: 'Portfolio of Kevin Kantona, as a Software Engineer Frontend',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AnalyticsTracker />
        {/* JSON‑LD structured data for the portfolio */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Kevin Kantona',
              url: 'https://kevinkantona.com',
              sameAs: [
                'https://github.com/kevinkho1996',
                'https://linkedin.com/in/kevinkantona',
              ],
              jobTitle: 'Front‑End Engineer',
              worksFor: {
                '@type': 'Organization',
                name: 'Freelance / Open‑Source',
              },
            }),
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

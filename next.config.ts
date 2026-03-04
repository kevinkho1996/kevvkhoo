import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value:
              "default-src 'self'; script-src 'self' 'unsafe-inline' https://www.gstatic.com https://www.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https:; font-src https://fonts.gstatic.com; connect-src 'self' https://*.firebaseio.com https://*.googleapis.com; frame-src https://*.firebaseapp.com;",
          },
        ],
      },
    ]
  },
}

export default nextConfig

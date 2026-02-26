import { initializeApp, getApps } from 'firebase/app'
import { getAnalytics, isSupported } from 'firebase/analytics'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "your-api-key",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "your-auth-domain.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "your-project-id",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "your-project-id.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "your-messaging-sender-id",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "your-app-id",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "your-measurement-id",
}

// Mencegah inisialisasi ganda saat hot-reloading di Next.js
const app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0]

// Inisialisasi Analytics khusus untuk client-side
let analytics: import('firebase/analytics').Analytics | undefined;
if (typeof window !== 'undefined' && firebaseConfig.apiKey && firebaseConfig.apiKey !== 'your-api-key') {
  // Only initialize Analytics when a real API key is provided
  isSupported().then((yes) => {
    if (yes) {
      analytics = getAnalytics(app);
    }
  });
} else {
  console.warn('Firebase Analytics not initialized: missing or placeholder API key');
}

export { app, analytics }

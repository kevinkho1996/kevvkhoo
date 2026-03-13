import { db } from './firebase'
import { collection, doc, getDoc, getDocs, orderBy, query } from 'firebase/firestore'

export interface Project {
  id: string
  title: string
  subtitle: string
  date: string
  bgColor: string
  textColor: string
  url?: string
}

export interface SiteIdentity {
  displayName: string
  bio: string
}

/**
 * Fetches all necessary data for the home page in one go (on the server).
 */
export async function getHomePageData() {
  try {
    // Run fetches in parallel for better performance
    const [identitySnap, projectsSnap] = await Promise.all([
      getDoc(doc(db, 'site_config', 'identity')),
      getDocs(query(collection(db, 'portfolio_projects')))
    ])

    const identity = identitySnap.exists() 
      ? identitySnap.data() as SiteIdentity 
      : { displayName: 'Kevin Kantona', bio: '' }

    const projects = projectsSnap.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    })) as Project[]

    // Sort projects by title ascending
    projects.sort((a, b) => a.title.localeCompare(b.title))

    return {
      identity,
      projects
    }
  } catch (error) {
    console.error('Error fetching home page data:', error)
    return {
      identity: { displayName: 'Kevin Kantona', bio: '' },
      projects: []
    }
  }
}

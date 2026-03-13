import { getHomePageData } from '@/lib/data'
import Profile from './profile/page'
import About from './about/page'
import Projects from './projects/page'
import Skills from './skills/page'
import Contacts from './contacts/page'

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const { identity, projects } = await getHomePageData()

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-8 md:py-12 max-w-6xl">
        <Profile initialData={identity} />
        <About initialData={identity} />
        <Projects initialData={projects} />
        <Skills />
        <Contacts />
      </main>
    </div>
  )
}

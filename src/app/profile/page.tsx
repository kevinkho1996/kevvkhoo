import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import Kevin from '@/components/images/profile.jpg'

import DecryptedText from '@/components/DecryptedText/DecryptedText'
import FadeContent from '@/components/FadeContent/FadeContent'
import AnimatedContent from '@/components/AnimatedContent/AnimatedContent'

export default function Profile() {
  return (
    <div>
      <section className="py-12 md:py-24 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
        <div className="flex-1 max-w-2xl space-y-4 text-center md:text-left">
          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={true}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
          >
            <Badge className="mb-4 mx-auto md:mx-0 w-fit">
              Open for new opportunity
            </Badge>
          </AnimatedContent>

          <AnimatedContent
            distance={100}
            direction="vertical"
            reverse={true}
            duration={1.2}
            ease="power3.out"
            initialOpacity={0}
            animateOpacity
            scale={1.1}
            threshold={0.2}
            delay={1}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
              I'm Kevin Kantona!
            </h1>
          </AnimatedContent>

          <DecryptedText
            text="Software Engineer FrontEnd"
            animateOn="view"
            speed={50}
            maxIterations={20}
            sequential={true}
            revealDirection="start"
          />
          <DecryptedText
            text="I develop internal mobile and web application that help teams work
            more efficiently and effectively"
            animateOn="view"
            speed={20}
            maxIterations={20}
            sequential={true}
            revealDirection="start"
          />
          <div className="flex gap-4 pt-4 justify-center md:justify-start">
            <a
              href="https://www.linkedin.com/in/kevinkantona/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>View LinkedIn</Button>
            </a>
            <a
              href="https://drive.google.com/file/d/1uHhwBb0sf5B7UV8Tns5wvPldDUQeBs8E/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              {' '}
              <Button variant="outline">Download CV</Button>
            </a>
          </div>
        </div>
        <FadeContent
          blur={true}
          duration={1000}
          easing="ease-out"
          initialOpacity={0}
          delay={2000}
        >
          <div className="flex-1 flex justify-center">
            <div className="relative w-72 h-72 rounded-full overflow-hidden border-4 border-muted">
              <Image
                src={Kevin}
                alt="Kevin Kantona"
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </FadeContent>
      </section>
    </div>
  )
}

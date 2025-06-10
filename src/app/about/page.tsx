export default function About() {
  return (
    <div>
      <section id="about" className="py-12 md:py-24 border-t">
        <h2 className="text-3xl font-bold mb-8">About Me</h2>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-4">
            <p className="text-lg">
              I started my career as a mobile developer, then gradually shifted
              into web development, and today I lead tech teams while still
              staying hands-on with code. Most of my work revolves around
              building internal systems and mobile banking features using React
              Native and Next.js, mainly in the banking sector. <br />
              <br /> As a Tech Lead, I enjoy helping my team grow, making sprint
              planning healthier, and solving problems together—both technical
              and non-technical. I believe good tech is not just about clean
              code, but also about how we work as a team. <br />
              <br />
              One of the key moments in my journey was joining the Apple
              Developer Academy, where I built an iOS app from scratch during an
              intense 10-month program. That experience shaped the way I
              approach product development today—start simple, build
              iteratively, and always focus on the user. <br />
              <br />
              I'm still learning every day, and I’m always open to new
              challenges that combine tech, teamwork, and meaningful impact.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-bold mb-2">Education</h3>
              <p>B.S. Computer Science</p>
              <p className="text-sm text-muted-foreground">
                Universitas Ciputra
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-bold mb-2">Experience</h3>
              <p>5+ Years</p>
              <p className="text-sm text-muted-foreground">FrontEnd Engineer</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-bold mb-2">Location</h3>
              <p>South Tangerang, Banten</p>
              <p className="text-sm text-muted-foreground">Indonesia</p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <h3 className="font-bold mb-2">Languages</h3>
              <p>Indonesia, English, German</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

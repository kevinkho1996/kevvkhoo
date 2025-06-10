export default function Skills() {
  return (
    <div>
      <section id="skills" className="py-12 md:py-24 border-t">
        <h2 className="text-3xl font-bold mb-8">Skills and Expertise</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            'Java',
            'JavaScript',
            'TypeScript',
            'Next.JS',
            'Tailwind',
            'React Native',
            'CSS',
            'HTML',
            'Swift',
            'SwiftUI',
            'XCode',
          ].map((skill) => (
            <div key={skill} className="bg-muted p-4 rounded-lg text-center">
              <p className="font-medium">{skill}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

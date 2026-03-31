import { GraduationCap, Clock, Award, Laptop } from "lucide-react"

const features = [
  {
    icon: GraduationCap,
    title: "Expert Instructors",
    color: "text-blue-600",
    bg: "bg-blue-500/10",
  },
  {
    icon: Clock,
    title: "Flexible Learning",
    color: "text-emerald-600",
    bg: "bg-emerald-500/10",
  },
  {
    icon: Laptop,
    title: "Hands-on Projects",
    color: "text-purple-600",
    bg: "bg-purple-500/10",
  },
  {
    icon: Award,
    title: "Certificates",
    color: "text-orange-600",
    bg: "bg-orange-500/10",
  },
]


export function WhyChooseUs() {
  return (
    <section className="rounded-3xl border border-border/60 bg-card/60 backdrop-blur">
      <div className="mx-auto max-w-7xl space-y-12 px-6 py-14">
        <div className="space-y-2 text-center">
          <h2 className="section-title">Why Learn With Us?</h2>
          <p className="section-subtitle">Built for outcomes, not just content.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2  lg:grid-cols-4">
          {features.map(({ icon: Icon, title, color, bg }) => (
            <div
              key={title}
              className="glass-card p-5 hover-lift animate-fade-up text-center"
            >
              <div
                className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl ${bg}`}
              >
                <Icon className={`h-6 w-6 ${color}`} />
              </div>

              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Learn skills that matter in real-world projects.
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

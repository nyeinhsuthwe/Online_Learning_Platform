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
    <section className="bg-muted/40 dark:bg-transparent rounded-md">
      <div className="mx-auto max-w-7xl px-6 py-10 space-y-12">
        <h2 className="text-2xl font-semibold text-center tracking-tight">
          Why Learn With Us?
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map(({ icon: Icon, title, color, bg }) => (
            <div
              key={title}
              className="
                rounded-2xl border bg-card p-6 text-center
                transition hover:-translate-y-1 hover:shadow-md
              "
            >
              <div
                className={`mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full ${bg}`}
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

const steps = [
  {
    title: "Browse Courses",
    cardBg: "bg-blue-500/5",
    border: "border-blue-500/20",
    accent: "text-blue-600",
  },
  {
    title: "Start Learning",
    cardBg: "bg-emerald-500/5",
    border: "border-emerald-500/20",
    accent: "text-emerald-600",
  },
  {
    title: "Build Projects",
    cardBg: "bg-purple-500/5",
    border: "border-purple-500/20",
    accent: "text-purple-600",
  },
]



export function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-6 space-y-12">
      <h2 className="text-2xl font-semibold text-center tracking-tight">
        How It Works
      </h2>

      <div className="grid sm:grid-cols-3 gap-8">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={`
              rounded-2xl border p-6 text-center
              transition-all duration-300
              hover:-translate-y-1 hover:shadow-md
              ${step.cardBg} ${step.border}
            `}
          >
            {/* Number */}
            <div
              className={`
                mx-auto mb-4 flex h-12 w-12 items-center justify-center
                rounded-full bg-background font-bold text-lg
                ${step.accent}
              `}
            >
              {index + 1}
            </div>

            <h3 className="font-semibold">{step.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Follow a simple, guided learning path.
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}



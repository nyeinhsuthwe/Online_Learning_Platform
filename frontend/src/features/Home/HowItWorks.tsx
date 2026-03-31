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
    <section className="mx-auto max-w-7xl space-y-12 px-2 sm:px-6">
      <div className="space-y-2 text-center">
        <h2 className="section-title">How It Works</h2>
        <p className="section-subtitle">A simple path from curiosity to mastery.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-3">
        {steps.map((step, index) => (
          <div
            key={step.title}
            className={`
              glass-card hover-lift text-center p-5
              ${step.cardBg} ${step.border}
            `}
          >
            {/* Number */}
            <div
              className={`
                mx-auto mb-4 flex h-12 w-12 items-center justify-center
                rounded-2xl bg-background font-bold text-lg
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


import { Button } from "@/components/ui/button"


export function CTASection() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 text-primary-foreground shadow-sm backdrop-blur">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.18),_transparent_55%),radial-gradient(circle_at_bottom,_rgba(20,184,166,0.18),_transparent_55%)]" />
      <div className="mx-auto max-w-7xl space-y-6 px-6 py-20 text-center text-foreground">
        <h2 className="text-3xl font-semibold tracking-tight">
          Start Learning Today
        </h2>

        <p className="text-muted-foreground">
          Join thousands of learners building real skills.
        </p>

        <Button size="lg" variant="secondary" className="h-12 rounded-xl bg-emerald-500 text-[14px] text-white shadow-lg shadow-emerald-500/25 transition hover:-translate-y-0.5 hover:bg-emerald-600">
          Get Started
        </Button>
      </div>
    </section>
  )
}

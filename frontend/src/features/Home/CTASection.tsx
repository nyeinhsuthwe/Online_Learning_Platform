import { Button } from "@/components/ui/button"


export function CTASection() {
  return (
    <section className="bg-muted/40 rounded-md dark:bg-card text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-24 text-black dark:text-white text-center space-y-6">
        <h2 className="text-3xl font-bold tracking-tight">
          Start Learning Today
        </h2>

        <p className="opacity-90">
          Join thousands of learners building real skills.
        </p>

        <Button size="lg" variant="secondary" className="h-12 text-[14px] bg-text-yellow hover:bg-yellow-600 text-white">
          Get Started
        </Button>
      </div>
    </section>
  )
}

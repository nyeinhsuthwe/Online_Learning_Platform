import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/70 shadow-sm backdrop-blur">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.15),_transparent_50%),radial-gradient(circle_at_bottom,_rgba(20,184,166,0.12),_transparent_55%)]" />
      <div className="mx-auto grid max-w-7xl gap-12 px-6 py-20 lg:grid-cols-2 lg:gap-16">

        <div className="space-y-6 animate-fade-up">
          <p className="text-xs uppercase tracking-[0.35em] text-muted-foreground">Online Learning</p>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Learn skills that move your career forward.
          </h1>

          <p className="text-lg text-muted-foreground">
            Build real-world expertise with expert-led lessons, guided projects, and flexible pacing that fits your schedule.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button
              onClick={() => { navigate('/user/course') }}
              size="lg"
              className="h-12 rounded-xl bg-gradient-to-r from-sky-600 via-cyan-600 to-emerald-500 text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 hover:shadow-sky-500/30"
            >
              Browse Courses
            </Button>
          </div>
        </div>

        <div className="hidden lg:block">
          <div className="relative mx-auto w-full max-w-md">
            <div className="absolute -left-8 -top-10 h-24 w-24 rounded-full bg-sky-500/20 blur-2xl" />
            <div className="absolute -bottom-10 right-0 h-32 w-32 rounded-full bg-emerald-500/20 blur-2xl" />
            <div className="glass-card animate-float overflow-hidden p-2">
              <img src="/online-course.webp" alt="" className="rounded-2xl object-cover shadow-md" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

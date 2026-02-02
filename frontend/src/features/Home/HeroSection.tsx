import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export function HeroSection() {
  const navigate = useNavigate();
  return (
    <section className="bg-muted/40 rounded-md shadow">
      <div className="mx-auto max-w-7xl px-10  py-24 grid lg:grid-cols-2 gap-14 items-center">

        <div className="space-y-6">
          <h1 className="text-4xl md:text-5xl text-text-yellow font-bold tracking-tight">
            Learn Skills That Shape Your Future
          </h1>

          <p className="text-lg text-text-skyblue dark:text-sky-400">
            Learn anytime, anywhere with expert-led online courses.
          </p>

          <div className="flex gap-4">
            <Button onClick={()=>{ navigate('/user/course')}} size="lg" className="h-12 text-[14px] bg-primary-dark hover:bg-primary-hover text-white">Browse Courses</Button>
           
          </div>
        </div>

        <div className="hidden lg:block">
          <img src="/online-course.webp" alt="" />
        </div>
      </div>
    </section>
  )
}

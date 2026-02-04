import { CTASection } from "@/features/Home/CTASection"
import { FeaturedCourses } from "@/features/Home/FeaturedCourses"
import { HeroSection } from "@/features/Home/HeroSection"
import { HowItWorks } from "@/features/Home/HowItWorks"
import { WhyChooseUs } from "@/features/Home/WhyChooseUs"
import { useCourse } from "@/common/api"
import { HomePageSkeleton } from "@/features/skeletons/HomeSkeleton"

export default function HomePage() {
  const { isLoading } = useCourse()

  if (isLoading) {
    return <HomePageSkeleton />
  }

  return (
    <main className="space-y-15">
      <HeroSection />
      <FeaturedCourses />
      <WhyChooseUs />
      <HowItWorks />
      <CTASection />
    </main>
  )
}

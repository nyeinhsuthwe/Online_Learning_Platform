import { CTASection } from "@/features/Home/CTASection";
import { FeaturedCourses } from "@/features/Home/FeaturedCourses";
import { HeroSection } from "@/features/Home/HeroSection";
import { HowItWorks } from "@/features/Home/HowItWorks";
import { WhyChooseUs } from "@/features/Home/WhyChooseUs";


export default function HomePage() {
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

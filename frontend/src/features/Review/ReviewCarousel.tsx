import { useEffect, useState } from "react"
import {
  type CarouselApi,
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel"
import type { Review } from "@/types/type"
import { ReviewCard } from "./ReviewCard"

export const ReviewCarousel = ({ reviews }: { reviews: Review[] }) => {
  const [api, setApi] = useState<CarouselApi>()

  useEffect(() => {
    if (!api || reviews.length <= 1) return

    const intervalId = window.setInterval(() => {
      if (api.canScrollNext()) {
        api.scrollNext()
        return
      }

      api.scrollTo(0)
    }, 2200)

    return () => window.clearInterval(intervalId)
  }, [api, reviews.length])

  return (
    <Carousel className="w-full" setApi={setApi}>
      <CarouselContent className="-ml-4">
        {reviews.map((review) => (
          <CarouselItem
            key={review._id}
            className="pl-4 md:basis-1/2 xl:basis-full"
          >
            <ReviewCard review={review} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { Review } from "@/types/type"
import { ReviewCard } from "./ReviewCard"

export const ReviewCarousel = ({ reviews }: { reviews: Review[] }) => {
  return (
    <Carousel className="w-full pl-10">
      <CarouselContent>
        {reviews.map((review) => (
          <CarouselItem
            key={review._id}
            className="md:basis-1/2 lg:basis-1/3"
          >
            <ReviewCard review={review} />
          </CarouselItem>
        ))}
      </CarouselContent>

      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  )
}

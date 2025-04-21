"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type CarouselProps = {
  children: React.ReactNode[]
  className?: string
  onSlideChange?: (index: number) => void
  buttonPosition?: "default" | "higher"
}

// Update the component definition to use the buttonPosition prop
export function Carousel({ children, className, onSlideChange, buttonPosition = "default" }: CarouselProps) {
  const [currentIndex, setCurrentIndex] = React.useState(0)
  const carouselRef = React.useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const newIndex = Math.max(0, Math.min(index, children.length - 1))
      setCurrentIndex(newIndex)

      const scrollAmount = carouselRef.current.offsetWidth * newIndex
      carouselRef.current.scrollTo({
        left: scrollAmount,
        behavior: "smooth",
      })

      // Notify parent component about slide change
      if (onSlideChange) {
        onSlideChange(newIndex)
      }
    }
  }

  const handleNext = () => {
    scrollToIndex(currentIndex + 1)
  }

  const handlePrevious = () => {
    scrollToIndex(currentIndex - 1)
  }

  // Update the handleScroll function to be more reliable
  const handleScroll = React.useCallback(() => {
    if (carouselRef.current) {
      const scrollLeft = carouselRef.current.scrollLeft
      const itemWidth = carouselRef.current.offsetWidth
      const newIndex = Math.round(scrollLeft / itemWidth)

      if (newIndex !== currentIndex) {
        setCurrentIndex(newIndex)

        // Notify parent component about slide change
        if (onSlideChange) {
          onSlideChange(newIndex)
        }
      }
    }
  }, [currentIndex, onSlideChange])

  // Add touch event handlers to detect swipe navigation
  React.useEffect(() => {
    const carousel = carouselRef.current
    if (carousel) {
      // Add scroll event listener
      carousel.addEventListener("scroll", handleScroll)

      // Add touch event listeners to detect swipes
      let touchStartX = 0

      const handleTouchStart = (e: TouchEvent) => {
        touchStartX = e.touches[0].clientX
      }

      const handleTouchEnd = (e: TouchEvent) => {
        const touchEndX = e.changedTouches[0].clientX
        const diff = touchStartX - touchEndX

        // If significant swipe detected, notify about slide change
        if (Math.abs(diff) > 50 && onSlideChange) {
          // Small delay to ensure the scroll has completed
          setTimeout(() => {
            const scrollLeft = carousel.scrollLeft
            const itemWidth = carousel.offsetWidth
            const newIndex = Math.round(scrollLeft / itemWidth)
            onSlideChange(newIndex)
          }, 100)
        }
      }

      carousel.addEventListener("touchstart", handleTouchStart)
      carousel.addEventListener("touchend", handleTouchEnd)

      return () => {
        carousel.removeEventListener("scroll", handleScroll)
        carousel.removeEventListener("touchstart", handleTouchStart)
        carousel.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [handleScroll, onSlideChange])

  return (
    <div className={cn("relative", className)}>
      <div
        ref={carouselRef}
        className="flex w-full overflow-x-auto snap-x snap-mandatory scroll-smooth touch-pan-x scrollbar-hide"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {children.map((child, index) => (
          <div key={index} className="flex-none w-full snap-start px-2">
            {child}
          </div>
        ))}
      </div>

      {/* Position buttons based on the buttonPosition prop */}
      <div
        className={`absolute ${buttonPosition === "higher" ? "top-20" : "top-1/2 -translate-y-1/2"} left-0 right-0 flex justify-between pointer-events-none`}
      >
        <button
          onClick={handlePrevious}
          className={`bg-green-500 rounded-full p-1 shadow-md z-10 pointer-events-auto ${
            currentIndex <= 0 ? "opacity-0" : "opacity-100"
          }`}
          aria-label="Previous slide"
          disabled={currentIndex <= 0}
        >
          <ChevronLeft className="h-4 w-4 text-white" />
        </button>

        <button
          onClick={handleNext}
          className={`bg-green-500 rounded-full p-1 shadow-md z-10 pointer-events-auto ${
            currentIndex >= children.length - 1 ? "opacity-0" : "opacity-100"
          }`}
          aria-label="Next slide"
          disabled={currentIndex >= children.length - 1}
        >
          <ChevronRight className="h-4 w-4 text-white" />
        </button>
      </div>

      <div className="flex justify-center mt-2 gap-1">
        {children.map((_, index) => (
          <button
            key={index}
            className={`h-1.5 rounded-full transition-all ${
              index === currentIndex ? "w-4 bg-green-500" : "w-1.5 bg-gray-300"
            }`}
            onClick={() => scrollToIndex(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

// Keep the individual components for more advanced use cases
type CarouselContentProps = React.HTMLAttributes<HTMLDivElement>
type CarouselItemProps = React.HTMLAttributes<HTMLDivElement>
type CarouselPreviousProps = React.HTMLAttributes<HTMLButtonElement>
type CarouselNextProps = React.HTMLAttributes<HTMLButtonElement>

const CarouselContent = React.forwardRef<HTMLDivElement, CarouselContentProps>(({ className, ...props }, ref) => {
  return (
    <div
      className={cn(
        "relative flex w-full overflow-auto snap-x snap-mandatory scroll-smooth touch-pan-x will-change-[scroll-position,transform] py-2",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
CarouselContent.displayName = "CarouselContent"

const CarouselItem = React.forwardRef<HTMLDivElement, CarouselItemProps>(({ className, ...props }, ref) => {
  return <div className={cn("snap-start shrink-0 w-full", className)} ref={ref} {...props} />
})
CarouselItem.displayName = "CarouselItem"

const CarouselPrevious = React.forwardRef<HTMLButtonElement, CarouselPreviousProps>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "absolute left-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

const CarouselNext = React.forwardRef<HTMLButtonElement, CarouselNextProps>(({ className, ...props }, ref) => {
  return (
    <button
      className={cn(
        "absolute right-2 top-1/2 z-10 h-8 w-8 -translate-y-1/2 rounded-full bg-background/80 backdrop-blur-sm",
        className,
      )}
      ref={ref}
      {...props}
    />
  )
})
CarouselNext.displayName = "CarouselNext"

export { CarouselContent, CarouselItem, CarouselPrevious, CarouselNext }

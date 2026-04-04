"use client"

import { useState } from "react"
import { Play, X } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"

export function PromoVideo() {
  const [isOpen, setIsOpen] = useState(false)
  const { language } = useLanguage()

  return (
    <section id="video" className="py-20 md:py-32 bg-background">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              {language === "en" ? "See How We Work" : "Zie Hoe We Werken"}
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {language === "en"
                ? "Discover our process, our approach, and how we help businesses leap forward in the digital world."
                : "Ontdek ons proces, onze aanpak en hoe we bedrijven helpen vooruit te springen in de digitale wereld."}
            </p>
          </div>

          {/* Video Thumbnail/Player */}
          <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl bg-gradient-to-br from-green-500 to-emerald-600 group cursor-pointer" onClick={() => setIsOpen(true)}>
            {/* Placeholder Video Thumbnail */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-500/90 to-emerald-600/90 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="relative">
                  <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Play className="h-12 w-12 md:h-16 md:w-16 text-white ml-2" fill="white" />
                  </div>
                </div>
                <p className="text-white text-lg md:text-xl font-semibold">
                  {language === "en" ? "Watch Our Story" : "Bekijk Ons Verhaal"}
                </p>
              </div>
            </div>

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
          </div>

          {/* Video Dialog */}
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-5xl w-[95vw] p-0 bg-black">
              <div className="relative aspect-video">
                {/* Placeholder for actual video - replace with your video embed */}
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <div className="text-center space-y-4 text-white">
                    <p className="text-xl">
                      {language === "en"
                        ? "Video placeholder - Replace with your promo video embed"
                        : "Video placeholder - Vervang door uw promo video embed"}
                    </p>
                    <p className="text-sm text-gray-400">
                      {language === "en"
                        ? "Use YouTube, Vimeo, or any video hosting service"
                        : "Gebruik YouTube, Vimeo of een andere videohostingservice"}
                    </p>
                    {/* Example: <iframe src="YOUR_VIDEO_URL" className="absolute inset-0 w-full h-full" /> */}
                  </div>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </section>
  )
}

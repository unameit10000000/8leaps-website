"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { ArrowDown, Play } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"

export function HeroSection() {
  const { t, language } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-green-500 via-green-400 to-emerald-500">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "2s" }} />
      </div>

      {/* Content */}
      <div className="container relative z-10 text-center px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Main Title with Animation */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight animate-fade-in">
            {language === "en" ? (
              <>
                Jump Forward.
                <br />
                Stay Ahead.
              </>
            ) : (
              <>
                Spring Vooruit.
                <br />
                Blijf Voorop.
              </>
            )}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.2s" }}>
            {language === "en"
              ? "From idea to reality in weeks, not months. We build digital solutions that help you leap forward."
              : "Van idee naar realiteit in weken, niet maanden. We bouwen digitale oplossingen die u helpen vooruit te springen."}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Button
              asChild
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50 text-lg px-8 py-6 h-auto shadow-xl"
            >
              <Link href="#services">
                {language === "en" ? "Explore Solutions" : "Bekijk Oplossingen"}
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="border-2 border-white text-white/90 bg-black/20 hover:bg-white hover:text-green-700 text-lg px-8 py-6 h-auto"
            >
              <Link href="#process">
                <Play className="mr-2 h-5 w-5" />
                {language === "en" ? "See How We Work" : "Zie Hoe We Werken"}
              </Link>
            </Button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-12 flex justify-center animate-bounce">
            <a href="#services" className="text-white/70 hover:text-white transition-colors">
              <ArrowDown className="h-8 w-8" />
            </a>
          </div>
        </div>
      </div>

      {/* Wave at bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full">
          <path
            fill="currentColor"
            fillOpacity="1"
            className="text-background"
            d="M0,96L48,90.7C96,85,192,75,288,69.3C384,64,480,64,576,69.3C672,75,768,85,864,85.3C960,85,1056,75,1152,69.3C1248,64,1344,64,1392,64L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          />
        </svg>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 0.8s ease-out forwards;
          opacity: 0;
        }
      `}</style>
    </section>
  )
}

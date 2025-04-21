"use client"

import { useLanguage } from "./language-provider"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { useEffect, useState } from "react"

export function Hero() {
  const { t } = useLanguage()
  const { theme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Only show theme-specific content after mounting to prevent hydration mismatch
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-green-500 to-green-400 py-16 md:py-36 lg:px-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-10 left-10 h-8 w-8 rounded-full bg-white"></div>
        <div className="absolute top-20 right-20 h-4 w-4 rounded-full bg-white"></div>
        <div className="absolute bottom-40 left-1/4 h-6 w-6 rounded-full bg-white"></div>
        <div className="absolute top-1/3 right-1/3 h-5 w-5 rounded-full bg-white"></div>
      </div>

      <div className="container relative z-10 grid gap-8 md:grid-cols-2 items-center">
        <div className="order-2 md:order-1">
          {mounted ? (
            <div
              className={`p-4 md:p-8 rounded-lg max-w-md ${
                theme === "dark" ? "bg-card text-card-foreground border-2 border-border" : "bg-black text-white"
              }`}
            >
              {/* Adjusted grid layout with more space for text (1/7 ratio) */}
              <h1 className="text-3xl md:text-3xl font-bold w-full mb-4">
                {t("hero.title")}
                <span className="inline-block ml-1">
                  <Image src="/logo.png" alt="8Leaps Logo" width={40} height={40} className="inline" />
                </span>
              </h1>
              <p className={`mb-5 ${theme === "dark" ? "text-muted-foreground" : "text-gray-300"}`}>
                {t("hero.subtitle")}
              </p>
              <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
                <a href="#services">{t("hero.cta")}</a>
              </Button>
            </div>
          ) : (
            <div className="p-4 md:p-8 rounded-lg max-w-md bg-black text-white">
              {/* Adjusted grid layout with more space for text (1/7 ratio) */}
              <div className="grid grid-cols-8 items-center gap-2 mb-4">
                <div className="col-span-1 flex justify-center">
                  <div className="relative w-10 h-10">
                    <Image src="/logo.png" alt="8Leaps Logo" fill className="object-contain" />
                  </div>
                </div>
                <h1 className="col-span-7 text-3xl md:text-4xl font-bold">{t("hero.title")}</h1>
              </div>

              <p className="mb-5 text-gray-300">{t("hero.subtitle")}</p>
              <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
                <a href="#services">{t("hero.cta")}</a>
              </Button>
            </div>
          )}
        </div>

        <div className="order-1 md:order-2 flex justify-center">
          <div className="relative h-64 w-64 md:h-80 md:w-80">
            <Image src="/hero.png" alt="Digital growth illustration" fill className="object-contain" />
          </div>
        </div>
      </div>

      {/* Wave effect at the bottom */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path
            fill="currentColor"
            fillOpacity="1"
            className="text-background"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,202.7C672,203,768,181,864,181.3C960,181,1056,203,1152,208C1248,213,1344,203,1392,197.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          ></path>
        </svg>
      </div>
    </section>
  )
}

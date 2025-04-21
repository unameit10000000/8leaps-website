"use client"

import { useLanguage } from "./language-provider"
import { Button } from "@/components/ui/button"
import { ClipboardList, Code, Rocket, Wrench } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

export function SimplifiedHowWeWork() {
  const { t } = useLanguage()

  const stages = [
    {
      icon: <ClipboardList className="h-8 w-8 text-green-500" />,
      title: t("howwework.stage1.title"),
    },
    {
      icon: <Code className="h-8 w-8 text-green-500" />,
      title: t("howwework.stage2.title"),
    },
    {
      icon: <Rocket className="h-8 w-8 text-green-500" />,
      title: t("howwework.stage3.title"),
    },
    {
      icon: <Wrench className="h-8 w-8 text-green-500" />,
      title: t("howwework.stage4.title"),
    },
  ]

  return (
    <section id="how-we-work" className="py-16 md:py-32 bg-muted/50 lg:px-4">
      <div className="container">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl font-bold mb-4 md:mb-6">{t("howwework.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("howwework.description")}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-8 mb-12 relative">
          {stages.map((stage, index) => (
            <div key={index} className="relative">
              {/* Process card */}
              <div className="bg-card border-2 rounded-lg p-6 h-full flex flex-col items-start">
                <div className="flex items-center mb-3">
                  {stage.icon}
                  <h3 className="text-xl font-bold ml-3">{stage.title}</h3>
                </div>
              </div>

              {/* Desktop arrows - only show between items, not after the last one */}
              {index < stages.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-12 transform -translate-y-1/2 z-10">
                  <div className="relative w-16 h-12">
                    <Image src="/arrow-right.png" alt="Next step" fill className="object-contain opacity-80" />
                  </div>
                </div>
              )}

              {/* Mobile arrows - only show between items, not after the last one */}
              {index < stages.length - 1 && (
                <div className="md:hidden flex justify-center w-full">
                  <div className="relative w-10 h-14 -mt-5 mb-1 z-20">
                    <Image src="/arrow-down.png" alt="Next step" fill className="object-contain opacity-80" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="text-center">
          <Button asChild className="bg-green-500 hover:bg-green-600 text-white px-8">
            <Link href="/services#how-we-work">{t("howwework.learn.more")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

"use client"

import { Carousel } from "@/components/ui/carousel"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"
import Link from "next/link"

type CaseItem = {
  title: string
  url: string
  status?: "live" | "building"
  imageUrl: string
}

const cases: CaseItem[] = [
  {
    title: "Techblog - jetstack.xyz",
    url: "https://jetstack.xyz",
    status: "building",
    imageUrl: "/cases/jetstack.png",
  },
  {
    title: "Marktplaats - fyndly.io",
    url: "https://fyndly.io",
    status: "live",
    imageUrl: "/cases/fyndly-resized.png",
  },
  {
    title: "Eetcafe - dekameraad.nl",
    url: "https://dekameraad.nl",
    status: "live",
    imageUrl: "/cases/snapshot-dekameraad-resized.png",
  },
  {
    title: "Herstel bedrijf - schadeherstelkosta.nl",
    url: "https://schadeherstelkosta.nl",
    status: "live",
    imageUrl: "/cases/snapshot-kostaschadeherstel-resized.png",
  },
]

export function CasesCarousel() {
  const { t } = useLanguage()

  const caseCards = cases.map((item, index) => (
    <Card
      key={index}
      className="overflow-hidden border-2 hover:border-green-500 transition-all duration-300 bg-card group cursor-pointer h-full"
    >
      <div className="aspect-[16/9] w-full bg-muted relative overflow-hidden">
        <Image
          src={item.imageUrl}
          alt={item.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
          <div className="flex items-center justify-between">
            {item.status === "live" ? (
              <Link
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="text-sm font-medium">{t("cases.view.project")}</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            ) : null}
            <Badge
              variant={item.status === "live" ? "default" : "secondary"}
              className={
                item.status === "live"
                  ? "bg-green-500 text-white"
                  : "bg-yellow-500 text-white"
              }
            >
              {item.status === "live" ? t("cases.status.live") : t("cases.status.building")}
            </Badge>
          </div>
        </div>
      </div>
    </Card>
  ))

  return (
    <section id="cases" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{t("cases.title")}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("cases.subtitle")}
          </p>
        </div>

        <Carousel className="h-auto">
          {caseCards}
        </Carousel>
      </div>
    </section>
  )
}


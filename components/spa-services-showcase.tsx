"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Code2, Lightbulb, Bot, MessageCircleQuestion, Rocket, ArrowRight } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

type ServiceItem = {
  icon: JSX.Element
  titleEn: string
  titleNl: string
  descEn: string
  descNl: string
  link: string
  color: string
}

export function ServicesShowcase() {
  const { language } = useLanguage()

  const sectionTitle =
    language === "en" ? "What we can build for you" : "Wat we voor u kunnen bouwen"
  const sectionSubtitle =
    language === "en"
      ? "From simple landing pages to full MVPs and AI-powered tools – pick what fits your stage."
      : "Van simpele landingspagina tot volledige MVP en AI-oplossingen – kies wat past bij uw fase."

  const services: ServiceItem[] = [
    {
      icon: <MessageCircleQuestion className="h-12 w-12 text-green-500" />,
      titleEn: "Clarity & strategy",
      titleNl: "Focus & strategie",
      descEn: "We help you translate ideas into a clear, buildable plan with realistic scope and priorities.",
      descNl: "We vertalen uw idee naar een helder, maakbaar plan met realistische scope en prioriteiten.",
      link: "/solutions#consulting",
      color: "from-blue-500 to-cyan-500",
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-green-500" />,
      titleEn: "Idea validation",
      titleNl: "Ideevalidatie",
      descEn: "Test your concept with real users before investing heavily: interviews, prototypes and feedback loops.",
      descNl: "Test uw concept bij echte gebruikers vóór u veel investeert: interviews, prototypes en feedbackloops.",
      link: "/solutions#validation",
      color: "from-yellow-500 to-orange-500",
    },
    {
      icon: <Code2 className="h-12 w-12 text-green-500" />,
      titleEn: "Launch-ready websites",
      titleNl: "Lancering‑klare websites",
      descEn: "A clean, fast site with the pages and forms you actually need – ready to share within days.",
      descNl: "Een snelle, heldere site met precies de pagina's en formulieren die u nodig heeft – binnen dagen deelbaar.",
      link: "/solutions#webdev",
      color: "from-green-500 to-emerald-500",
    },
    {
      icon: <Rocket className="h-12 w-12 text-green-500" />,
      titleEn: "MVP + first users",
      titleNl: "MVP + eerste gebruikers",
      descEn: "We build a usable MVP and help you get it in front of real users so you can learn and iterate.",
      descNl: "We bouwen een bruikbare MVP en helpen u bij de eerste gebruikers zodat u kunt leren en bijsturen.",
      link: "/mvp",
      color: "from-purple-500 to-pink-500",
    },
    {
      icon: <Bot className="h-12 w-12 text-green-500" />,
      titleEn: "Smart internal tools",
      titleNl: "Slimme interne tools",
      descEn: "Small AI helpers and automations that remove boring work from your day‑to‑day operations.",
      descNl: "Kleine AI‑hulpen en automatiseringen die saai werk uit uw dagelijkse operatie weghalen.",
      link: "/solutions#ai-integration",
      color: "from-indigo-500 to-blue-500",
    },
  ]

  return (
    <section id="services" className="py-20 md:py-32 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{sectionTitle}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{sectionSubtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto justify-items-center">
          {services.map((service, index) => {
            const title = language === "en" ? service.titleEn : service.titleNl
            const desc = language === "en" ? service.descEn : service.descNl

            return (
              <Card
                key={index}
                className="border-2 hover:border-green-500 transition-all duration-300 overflow-hidden group cursor-pointer h-full flex flex-col w-full max-w-sm"
              >
                {/* Gradient Background on Hover */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${service.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}
                />

                <CardHeader className="relative z-10">
                  <div className="mb-4 transform group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <CardTitle className="text-2xl mb-2">{title}</CardTitle>
                </CardHeader>

                <CardContent className="flex-grow flex flex-col relative z-10">
                  <CardDescription className="text-base mb-4 flex-grow">{desc}</CardDescription>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full hover:bg-green-500 hover:text-white hover:border-green-500 transition-all group/btn"
                  >
                    <Link href={service.link}>
                      {language === "en" ? "Learn more" : "Meer informatie"}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}


"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Code, Lightbulb, Bot, MessageCircleQuestion, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Services() {
  const { t } = useLanguage()

  // Define the explore services (IT Consultancy and Idea Validation)
  const exploreServices = [
    {
      icon: <MessageCircleQuestion className="h-10 w-10 text-green-500" />,
      title: t("services.consulting"),
      description: t("services.consulting.desc"),
      link: "/services#consulting",
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-green-500" />,
      title: t("services.validation"),
      description: t("services.validation.desc"),
      link: "/services#validation",
    },
  ]

  // Define the create services (Web Development, MVP Development, AI Integrations)
  const createServices = [
    {
      icon: <Code className="h-10 w-10 text-white" />,
      title: t("services.webdev"),
      description: t("services.webdev.desc"),
      link: "/services#webdev",
    },
    {
      icon: <Rocket className="h-10 w-10 text-white" />,
      title: t("services.mvp.title"),
      description: t("services.mvp.desc"),
      link: "/mvp",
    },
    {
      icon: <Bot className="h-10 w-10 text-white" />,
      title: t("services.aiintegration"),
      description: t("services.aiintegration.desc"),
      link: "/services#ai-integration",
    },
  ]

  return (
    <section id="services" className="pt-16 pb-0 md:pt-32 md:pb-0">
      <div className="container">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl font-bold mb-4 md:mb-6">{t("services.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("services.description")}</p>
        </div>

        {/* Explore Section */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold mb-8 text-center">{t("services.explore")}</h3>
          <div className="grid gap-6 md:gap-10 md:grid-cols-2">
            {exploreServices.map((service, index) => (
              <Card
                key={index}
                className="border-2 transition-all duration-300 flex flex-col hover:scale-105 hover:z-10"
              >
                <CardHeader>
                  <div className="mb-2">{service.icon}</div>
                  <CardTitle>{service.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription>{service.description}</CardDescription>
                </CardContent>
                <CardFooter>
                  <Button
                    asChild
                    variant="outline"
                    className="w-full hover:text-green-500 hover:border-green-500 transition-transform"
                  >
                    <Link href={service.link}>{t("services.learnmore")}</Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Create Section with proper full-width background and wave effects */}
      <div className="relative w-full">
        {/* Top wave */}
        <div
          className="absolute top-0 left-0 right-0 w-full overflow-hidden"
          style={{ height: "70px", transform: "translateY(-99%)" }}
        >
          <svg
            viewBox="0 0 1440 120"
            className="absolute w-full h-full"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,64L80,69.3C160,75,320,85,480,80C640,75,800,53,960,48C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
              fill="#22c55e"
            ></path>
          </svg>
        </div>

        {/* Green background content */}
        <div className="bg-green-500 text-white py-16 w-full">
          <div className="container">
            <h3 className="text-2xl font-bold mb-8 text-center text-white">{t("services.create")}</h3>
            <div className="grid gap-6 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
              {createServices.map((service, index) => (
                <Card
                  key={index}
                  className="border-2 border-white/20 bg-white/10 backdrop-blur-sm transition-all duration-300 flex flex-col text-white hover:scale-105 hover:z-10"
                >
                  <CardHeader>
                    <div className="mb-2">{service.icon}</div>
                    <CardTitle className="text-white">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <p className="text-white/80">{service.description}</p>
                  </CardContent>
                  <CardFooter>
                    <Button
                      asChild
                      variant="outline"
                      className="w-full border-white text-white transition-transform dark:hover:bg-white/20 bg-green-400/30 hover:bg-green-400/50"
                    >
                      <Link href={service.link}>{t("services.learnmore")}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom wave */}
        <div
          className="absolute bottom-0 left-0 right-0 w-full overflow-hidden"
          style={{ height: "70px", transform: "translateY(99%)" }}
        >
          <svg
            viewBox="0 0 1440 120"
            className="absolute w-full h-full"
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,0L1360,0C1280,0,1120,0,960,0C800,0,640,0,480,0C320,0,160,0,80,0L0,0Z"
              fill="#22c55e"
            ></path>
          </svg>
        </div>
      </div>
    </section>
  )
}

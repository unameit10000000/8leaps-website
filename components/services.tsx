"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Code, Lightbulb, Bot, MessageCircleQuestion, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Services() {
  const { t } = useLanguage()

  // Update the services array to include MVP development and make all cards link to specific sections
  const services = [
    {
      icon: <Rocket className="h-10 w-10 text-green-500" />,
      title: t("services.mvp.title"),
      description: t("services.mvp.desc"),
      link: "/mvp",
    },
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
    {
      icon: <Code className="h-10 w-10 text-green-500" />,
      title: t("services.webdev"),
      description: t("services.webdev.desc"),
      link: "/services#webdev",
    },
    {
      icon: <Bot className="h-10 w-10 text-green-500" />,
      title: t("services.aiintegration"),
      description: t("services.aiintegration.desc"),
      link: "/services#ai-integration",
    },
  ]

  // Update the return statement to use the link property for navigation
  return (
    <section id="services" className="py-16 md:py-32 lg:px-4">
      <div className="container">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl font-bold mb-4 md:mb-6">{t("services.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("services.description")}</p>
        </div>

        <div className="grid gap-6 md:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Card key={index} className="border-2 hover:border-green-500 transition-all duration-300 flex flex-col">
              <CardHeader>
                <div className="mb-2">{service.icon}</div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <CardDescription>{service.description}</CardDescription>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline" className="w-full hover:text-green-500 hover:border-green-500">
                  <Link href={service.link}>{t("services.learnmore")}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

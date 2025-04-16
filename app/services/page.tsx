"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Code, Lightbulb, Bot, MessageCircleQuestion } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function ServicesPage() {
  const { t } = useLanguage()

  // Main service categories
  const mainServices = [
    {
      icon: <MessageCircleQuestion className="h-12 w-12 text-green-500" />,
      title: t("services.consulting"),
      description: t("services.consulting.desc"),
      subServices: [
        t("services.consulting.sub1"),
        t("services.consulting.sub2"),
        t("services.consulting.sub3"),
        t("services.consulting.sub4"),
      ],
      bgColor: "bg-muted/50", // Start with grey background
    },
    {
      icon: <Lightbulb className="h-12 w-12 text-green-500" />,
      title: t("services.validation"),
      description: t("services.validation.desc"),
      subServices: [
        t("services.validation.sub1"),
        t("services.validation.sub2"),
        t("services.validation.sub3"),
        t("services.validation.sub4"),
      ],
      bgColor: "bg-green-50 dark:bg-green-900/20", // Then green background
    },
    {
      icon: <Code className="h-12 w-12 text-green-500" />,
      title: t("services.webdev"),
      description: t("services.webdev.desc"),
      subServices: [
        t("services.webdev.sub1"),
        t("services.webdev.sub2"),
        t("services.webdev.sub3"),
        t("services.webdev.sub4"),
        t("services.webdev.sub5"),
      ],
      bgColor: "bg-muted/50", // Then grey background again
    },
    {
      icon: <Bot className="h-12 w-12 text-green-500" />,
      title: t("services.aiintegration"),
      description: t("services.aiintegration.desc"),
      subServices: [
        t("services.aiintegration.sub1"),
        t("services.aiintegration.sub2"),
        t("services.aiintegration.sub3"),
        t("services.aiintegration.sub4"),
      ],
      bgColor: "bg-green-50 dark:bg-green-900/20", // End with green background
    },
  ]

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gradient-to-b from-green-500 to-green-400 py-12 md:py-24">
        <div className="container">
          <h1 className="text-4xl font-bold text-white text-center">{t("services.title")}</h1>
          <p className="text-white text-center mt-4 max-w-2xl mx-auto">{t("services.page.subtitle")}</p>
        </div>
      </div>

      {/* Main services section with detailed cards */}
      <section className="py-12 md:py-32">
        <div className="container">
          <div className="grid gap-8 md:gap-20">
            {mainServices.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-4 md:gap-12 items-start p-4 md:p-12 rounded-lg ${service.bgColor}`}
              >
                <div>
                  <div className="flex items-center gap-4 mb-4 md:mb-8">
                    {service.icon}
                    <h2 className="text-2xl md:text-3xl font-bold">{service.title}</h2>
                  </div>
                  <p className="text-muted-foreground mb-4 md:mb-8">{service.description}</p>
                  <ul className="space-y-2 md:space-y-4">
                    {service.subServices.map((subService, idx) => (
                      <li key={idx} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                        <span>{subService}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid gap-4 md:gap-8">
                  {index === 0 && (
                    <>
                      <Card className="border-2 hover:border-green-500 transition-all duration-300">
                        <CardHeader>
                          <CardTitle>{t("services.consulting.card1.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{t("services.consulting.card1.description")}</CardDescription>
                        </CardContent>
                      </Card>
                      <Card className="border-2 hover:border-green-500 transition-all duration-300">
                        <CardHeader>
                          <CardTitle>{t("services.consulting.card2.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{t("services.consulting.card2.description")}</CardDescription>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {index === 1 && (
                    <>
                      <Card className="border-2 hover:border-green-500 transition-all duration-300">
                        <CardHeader>
                          <CardTitle>{t("services.validation.card1.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{t("services.validation.card1.description")}</CardDescription>
                        </CardContent>
                      </Card>
                      <Card className="border-2 hover:border-green-500 transition-all duration-300">
                        <CardHeader>
                          <CardTitle>{t("services.validation.card2.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{t("services.validation.card2.description")}</CardDescription>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {index === 2 && (
                    <>
                      <Card className="border-2 hover:border-green-500 transition-all duration-300">
                        <CardHeader>
                          <CardTitle>{t("services.webdev.card1.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{t("services.webdev.card1.description")}</CardDescription>
                        </CardContent>
                      </Card>
                      <Card className="border-2 hover:border-green-500 transition-all duration-300">
                        <CardHeader>
                          <CardTitle>{t("services.webdev.card2.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{t("services.webdev.card2.description")}</CardDescription>
                        </CardContent>
                      </Card>
                    </>
                  )}
                  {index === 3 && (
                    <>
                      <Card className="border-2 hover:border-green-500 transition-all duration-300">
                        <CardHeader>
                          <CardTitle>{t("services.aiintegration.card1.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{t("services.aiintegration.card1.description")}</CardDescription>
                        </CardContent>
                      </Card>
                      <Card className="border-2 hover:border-green-500 transition-all duration-300">
                        <CardHeader>
                          <CardTitle>{t("services.aiintegration.card2.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{t("services.aiintegration.card2.description")}</CardDescription>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
                <div className="mt-4 md:mt-8">
                  <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
                    <Link href="/contact">{t("services.contact")}</Link>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4 md:mb-8">{t("services.cta.title")}</h2>
          <p className="text-muted-foreground mb-6 md:mb-12 max-w-2xl mx-auto">{t("services.cta.description")}</p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-6">
            <Button asChild className="bg-green-500 hover:bg-green-600 text-white px-8">
              <Link href="/contact">{t("services.cta.contact")}</Link>
            </Button>
            <Button asChild variant="outline" className="hover:text-green-500 hover:border-green-500">
              <Link href="/pricing">{t("services.cta.pricing")}</Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

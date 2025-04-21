"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check, Code, Lightbulb, Bot, MessageCircleQuestion, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"
import { HowWeWork } from "@/components/how-we-work"

export default function ServicesPage() {
  const { t, language } = useLanguage()

  // Add this useEffect at the beginning of the ServicesPage component to handle hash navigation
  useEffect(() => {
    // Function to scroll to section based on hash
    const scrollToSection = () => {
      // Get the hash from the URL (remove the # symbol)
      const hash = window.location.hash.substring(1)

      if (hash) {
        // Use a longer delay to ensure everything is fully loaded and rendered
        // Longer delay for mobile devices
        setTimeout(() => {
          // Find the element with the corresponding ID
          const element = document.getElementById(hash)

          if (element) {
            // Get the navbar height - fixed value if we can't calculate it
            const navbar = document.querySelector("header")
            const navbarHeight = navbar ? navbar.offsetHeight : 64

            // Add extra padding for mobile
            const mobilePadding = window.innerWidth < 768 ? 20 : 0

            // Calculate the element's position
            const elementPosition = element.getBoundingClientRect().top + window.scrollY

            // Scroll with a larger offset to ensure visibility
            window.scrollTo({
              top: elementPosition - navbarHeight - 60 - mobilePadding, // Increased padding to 60px + mobile padding
              behavior: "smooth",
            })

            // Add a visual indicator to the current section
            element.classList.add("ring-2", "ring-green-500")

            // Remove the highlight after a few seconds
            setTimeout(() => {
              element.classList.remove("ring-2", "ring-green-500")
            }, 2000)
          }
        }, 600) // Increased delay to 600ms for better mobile compatibility
      }
    }

    // Call the function when the component mounts
    scrollToSection()

    // Also add an event listener for hash changes
    window.addEventListener("hashchange", scrollToSection)

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("hashchange", scrollToSection)
    }
  }, [])

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
      icon: <Rocket className="h-12 w-12 text-green-500" />,
      title: t("services.mvp.title"),
      description: t("services.mvp.desc"),
      subServices: [
        language === "en" ? "From idea to MVP in 1-3 weeks" : "Van idee naar MVP in 1-3 weken",
        t("services.mvp.sub2"),
        t("services.mvp.sub3"),
        t("services.mvp.sub4"),
      ],
      bgColor: "bg-green-50 dark:bg-green-900/20", // Green background
      specialLink: "/mvp", // Special link for MVP service
      buttonText: t("services.mvp.button"), // Custom button text
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
      bgColor: "bg-muted/50", // End with grey background
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
                id={
                  index === 0
                    ? "consulting"
                    : index === 1
                      ? "validation"
                      : index === 2
                        ? "webdev"
                        : index === 3
                          ? "mvp"
                          : "ai-integration"
                }
                className={`grid md:grid-cols-2 gap-4 md:gap-12 items-start p-4 md:p-12 rounded-lg ${service.bgColor} scroll-mt-32 md:scroll-mt-24 pt-8`}
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
                  {index === 3 && (
                    <>
                      <Card className="border-2 hover:border-green-500 transition-all duration-300">
                        <CardHeader>
                          <CardTitle>{t("services.mvp.card1.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            {language === "en"
                              ? "Get your product to market in just 1-3 weeks, allowing you to start gathering user feedback immediately."
                              : "Breng uw product in slechts 1-3 weken op de markt, zodat u direct gebruikersfeedback kunt verzamelen."}
                          </CardDescription>
                        </CardContent>
                      </Card>
                      <Card className="border-2 hover:border-green-500 transition-all duration-300">
                        <CardHeader>
                          <CardTitle>{t("services.mvp.card2.title")}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{t("services.mvp.card2.description")}</CardDescription>
                        </CardContent>
                      </Card>
                    </>
                  )}
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
                  {index === 4 && (
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
                          <CardTitle>{t("services.aiintegration.card2.title") || "AI-Powered Automation"}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>
                            {t("services.aiintegration.card2.description") ||
                              "Streamline operations and boost productivity with custom AI solutions."}
                          </CardDescription>
                        </CardContent>
                      </Card>
                    </>
                  )}
                </div>
                <div className="mt-4 md:mt-8">
                  <Button asChild className="bg-green-500 hover:bg-green-600 text-white">
                    {index === 3 ? (
                      // MVP service - link to /mvp
                      <Link href="/mvp">{service.buttonText || t("services.contact")}</Link>
                    ) : index === 2 ? (
                      // Web development service - link to /pricing
                      <Link href="/pricing">Start</Link>
                    ) : (
                      // Other services - link to /contact
                      <Link href="/contact">{t("services.contact")}</Link>
                    )}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Add the full How We Work section here */}
      <div id="how-we-work">
        <HowWeWork />
      </div>

      {/* Call to action section */}
      <section className="py-12 md:py-24 bg-muted/50">
        <div className="container text-center">
          {" "}
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

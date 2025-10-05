"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Zap, Target, Lightbulb } from "lucide-react"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

export default function ResourcesPage() {
  const { t } = useLanguage()
  
  const guides = [
    {
      id: "automations-quickstart",
      title: "Automations Quickstart Guide",
      description: t("resources.automations.description"),
      status: "available",
      icon: Zap,
      color: "text-green-600",
      bgColor: "bg-green-50",
      borderColor: "border-green-200"
    },
    {
      id: "10-hour-x-growth-strategy",
      title: "10-Hour X Growth Strategy",
      description: t("resources.x-growth.description"),
      status: "coming-soon",
      icon: Target,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: "no-bs-ai-marketing-guide",
      title: "No-BS AI Marketing Guide",
      description: t("resources.ai-marketing.description"),
      status: "coming-soon",
      icon: Clock,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      borderColor: "border-purple-200"
    }
  ]
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-green-500 to-green-400 py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            {t("resources.title")}
          </h1>
          <p className="text-xl text-white/90 text-center max-w-2xl mx-auto">
            {t("resources.subtitle")}
          </p>
        </div>
      </div>

      {/* Guides Section */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <div className="grid gap-6">
            {guides.map((guide) => (
              <Card 
                key={guide.id}
                className={`cursor-pointer transition-all duration-200 hover:shadow-lg ${guide.borderColor} ${
                  guide.status === 'available' ? 'hover:shadow-md' : 'opacity-75'
                }`}
              >
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg ${guide.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <guide.icon className={`h-6 w-6 ${guide.color}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg sm:text-xl">{guide.title}</CardTitle>
                        <CardDescription className="text-sm sm:text-base mt-1">
                          {guide.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center sm:ml-6 flex-shrink-0">
                      {guide.status === 'available' ? (
                        <Button asChild size="sm" className="bg-green-500 hover:bg-green-600 text-white w-full sm:w-auto">
                          <Link href={`/resources/${guide.id}`}>
                            {t("resources.get-guide")}
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600 w-full sm:w-auto text-center">
                          {t("resources.coming-soon")}
                        </Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Final Section */}
      <div className="container py-16">
        <div className="max-w-4xl mx-auto">
          <Card className="border-2 border-gray-200 bg-gray-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Lightbulb className="h-6 w-6 text-gray-600" />
                {t("resources.final.title")}
              </CardTitle>
              <CardDescription>
                {t("resources.final.description")}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-3">
                <Button asChild className="flex-1 bg-green-500 hover:bg-green-600">
                  <Link href="/solutions">{t("resources.final.services")}</Link>
                </Button>
                <Button asChild variant="outline" className="flex-1">
                  <Link href="/contact">{t("resources.final.contact")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </main>
  )
}

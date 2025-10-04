"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Clock, Zap, Target } from "lucide-react"
import Link from "next/link"

const guides = [
  {
    id: "automations-quickstart",
    title: "Automations Quickstart Guide",
    description: "Learn how to set up powerful automations that save you time and boost your productivity. Perfect for beginners looking to streamline their workflow.",
    status: "available",
    icon: Zap,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200"
  },
  {
    id: "10-hour-x-growth-strategy",
    title: "10-Hour X Growth Strategy",
    description: "A comprehensive guide to growing your presence on X (Twitter) with just 10 hours of focused effort per week. Coming soon!",
    status: "coming-soon",
    icon: Target,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200"
  },
  {
    id: "no-bs-ai-marketing-guide",
    title: "No-BS AI Marketing Guide",
    description: "Cut through the AI marketing hype and learn practical strategies that actually work. No fluff, just actionable insights.",
    status: "coming-soon",
    icon: Clock,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200"
  }
]

export default function ResourcesPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-b from-green-500 to-green-400 py-16 md:py-24">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold text-white text-center mb-4">
            Get Our Free Guides
          </h1>
          <p className="text-xl text-white/90 text-center max-w-2xl mx-auto">
            Access our collection of free guides designed to help you grow your business and improve your workflow.
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
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-lg ${guide.bgColor} flex items-center justify-center flex-shrink-0`}>
                        <guide.icon className={`h-6 w-6 ${guide.color}`} />
                      </div>
                      <div className="flex-1">
                        <CardTitle className="text-xl">{guide.title}</CardTitle>
                        <CardDescription className="text-base mt-1">
                          {guide.description}
                        </CardDescription>
                      </div>
                    </div>
                    <div className="flex items-center ml-6">
                      {guide.status === 'available' ? (
                        <Button asChild size="sm" className="bg-green-500 hover:bg-green-600 text-white">
                          <Link href={`/resources/${guide.id}`}>
                            Get Guide
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Link>
                        </Button>
                      ) : (
                        <Badge variant="secondary" className="bg-gray-100 text-gray-600">
                          Coming Soon
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

      <Footer />
    </main>
  )
}

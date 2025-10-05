"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"

const resourceContent = {
  "automations-quickstart": {
    title: "Automations Quickstart Guide",
    description: "Learn how to set up powerful automations that save you time and boost your productivity.",
    content: `
      # Automations Quickstart Guide
      
      ## Introduction
      Welcome to the ultimate guide for setting up business automations that will save you hours every week.
      
      ## Chapter 1: Getting Started
      - Understanding automation basics
      - Choosing the right tools
      - Setting up your first automation
      
      ## Chapter 2: Advanced Techniques
      - Multi-step workflows
      - Conditional logic
      - Error handling
      
      ## Chapter 3: Best Practices
      - Testing your automations
      - Monitoring performance
      - Scaling your setup
      
      ## Conclusion
      You now have everything you need to start automating your business processes!
      
      ## Bonus Content
      - Automation templates
      - Workflow examples
      - Troubleshooting guide
      - Advanced strategies
    `,
    image: "/resources/automations-quickstart.png"
  },
  "10-hour-x-growth-strategy": {
    title: "10-Hour X Growth Strategy",
    description: "A comprehensive guide to growing your presence on X (Twitter) with just 10 hours of focused effort per week.",
    content: "Coming soon...",
    image: "/resources/automations-quickstart.png"
  },
  "no-bs-ai-marketing-guide": {
    title: "No-BS AI Marketing Guide",
    description: "Cut through the AI marketing hype and learn practical strategies that actually work.",
    content: "Coming soon...",
    image: "/resources/automations-quickstart.png"
  }
}

export default function ResourceSrcPage() {
  const { t } = useLanguage()
  const params = useParams()
  const searchParams = useSearchParams()
  const resourceId = params.id as string
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")
  
  const resource = resourceContent[resourceId as keyof typeof resourceContent]

  useEffect(() => {
    // Check if user has valid access using ref parameter
    const checkAccess = async () => {
      const ref = searchParams.get('ref')
      
      if (!ref) {
        setError(t("resource.invalid-link"))
        setIsLoading(false)
        return
      }
      
      // Check if this is automations-quickstart and validate accordingly
      if (resourceId === 'automations-quickstart') {
        const expectedRef = process.env.NEXT_PUBLIC_RESOURCE_QUICKSTART_REF
        
        // Handle URL decoding - convert spaces back to + if needed
        const normalizedRef = ref.replace(/ /g, '+')
        
        if (normalizedRef !== expectedRef) {
          setError(t("resource.invalid-reference"))
          setIsLoading(false)
          return
        }
      } else {
        // For other resources, you can add more validation logic here
        setError(t("resource.not-found"))
        setIsLoading(false)
        return
      }
      
      setIsAuthorized(true)
      setIsLoading(false)
    }
    
    checkAccess()
  }, [searchParams, resourceId])

  if (!resource) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">{t("resource.not-found")}</h1>
          <p className="text-muted-foreground mb-6">{t("resource.not-found-desc")}</p>
          <Button asChild>
            <Link href="/resources">{t("resource.go-to-resources")}</Link>
          </Button>
        </div>
        <Footer />
      </main>
    )
  }

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="container py-16 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4">{t("resource.loading")}</p>
        </div>
        <Footer />
      </main>
    )
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      
      {/* Back Button */}
      <div className="container py-4">
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/resources">
            <ArrowLeft className="mr-2 h-4 w-4" />
            {t("resource.back-to-resources")}
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="container py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {!isAuthorized ? (
            /* Access Denied */
            <Card className="border-2 border-red-200 bg-red-50/50">
              <CardContent className="p-8 text-center">
                <X className="h-16 w-16 text-red-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-4">{t("resource.access-denied")}</h1>
                <p className="text-xl text-muted-foreground mb-6">{error}</p>
                <p className="text-sm text-muted-foreground mb-6">
                  {t("resource.email-instruction")}
                </p>
                <Button asChild>
                  <Link href="/resources">{t("resource.go-to-resources")}</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Resource Content - Only visible to authorized users */
            <div className="space-y-8">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4">{resource.title}</h1>
                <p className="text-xl text-muted-foreground">{resource.description}</p>
              </div>

              <Card>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                      {resource.content}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {resource.image && (
                <div className="flex justify-center">
                  <Image
                    src={resource.image}
                    alt={resource.title}
                    width={600}
                    height={400}
                    className="rounded-lg shadow-lg"
                  />
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

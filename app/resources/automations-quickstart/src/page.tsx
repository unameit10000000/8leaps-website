"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, CheckCircle, X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

function AutomationsQuickstartSrcContent() {
  const searchParams = useSearchParams()
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    // Check if user has valid access using ref parameter
    const checkAccess = async () => {
      const ref = searchParams.get('ref')
      
      if (!ref) {
        setError("Invalid access link")
        setIsLoading(false)
        return
      }
      
      // Verify the ref matches our specific resource reference
      const expectedRef = process.env.NEXT_PUBLIC_RESOURCE_QUICKSTART_REF
      
      // Handle URL decoding - convert spaces back to + if needed
      const normalizedRef = ref.replace(/ /g, '+')
      
      if (normalizedRef !== expectedRef) {
        setError("Invalid resource reference")
        setIsLoading(false)
        return
      }
      
      setIsAuthorized(true)
      setIsLoading(false)
    }
    
    checkAccess()
  }, [searchParams])

  if (isLoading) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="container py-16 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4">Loading...</p>
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
        <Button asChild variant="ghost" className="mb-4 hover:text-black">
          <Link href="/resources/automations-quickstart">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Automations Quickstart
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
                <h1 className="text-3xl font-bold mb-4">Access Denied</h1>
                <p className="text-xl text-muted-foreground mb-6">{error}</p>
                <p className="text-sm text-muted-foreground mb-6">
                  Please use the link provided in your email to access this resource.
                </p>
                <Button asChild>
                  <Link href="/resources/automations-quickstart">Back to Automations Quickstart</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            /* Resource Content - Only visible to authorized users */
            <div className="space-y-8">
              <div className="text-center">
                <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h1 className="text-4xl font-bold mb-4">Automations Quickstart Guide</h1>
                <p className="text-xl text-muted-foreground">
                  Learn how to set up powerful automations that save you time and boost your productivity.
                </p>
              </div>

              <Card>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">
{`# Automations Quickstart Guide

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
- Advanced strategies`}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-center">
                <Image
                  src="/resources/automations-quickstart.png"
                  alt="Automations Quickstart Guide"
                  width={600}
                  height={400}
                  className="rounded-lg shadow-lg"
                />
              </div>

              {/* Additional Resources */}
              <Card className="bg-green-50 border-green-200">
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold mb-4 text-green-800">Additional Resources</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-green-700">Templates</h4>
                      <p className="text-sm text-green-600">Ready-to-use automation templates</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-700">Examples</h4>
                      <p className="text-sm text-green-600">Real-world automation examples</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-700">Tools</h4>
                      <p className="text-sm text-green-600">Recommended automation tools</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-green-700">Support</h4>
                      <p className="text-sm text-green-600">Get help when you need it</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </main>
  )
}

export default function AutomationsQuickstartSrcPage() {
  return (
    <Suspense fallback={
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="container py-16 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4">Loading...</p>
        </div>
        <Footer />
      </main>
    }>
      <AutomationsQuickstartSrcContent />
    </Suspense>
  )
}
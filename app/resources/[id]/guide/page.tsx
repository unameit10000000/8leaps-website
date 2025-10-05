"use client"

import { useState, useEffect } from "react"
import { useParams, useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Lock, Mail, CheckCircle } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
// Remove the token-based imports since we're using secret key approach

const guideContent = {
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

export default function GuidePage() {
  const params = useParams()
  const searchParams = useSearchParams()
  const guideId = params.id as string
  const [isSubscribed, setIsSubscribed] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  
  const guide = guideContent[guideId as keyof typeof guideContent]

  useEffect(() => {
    // Check if user has valid access using secret key
    const checkAccess = async () => {
      const ref = searchParams.get('ref')
      const key = searchParams.get('key')
      
      if (!ref || !key) {
        setIsLoading(false)
        return
      }
      
      // Verify the key matches our environment variable
      const expectedKey = process.env.NEXT_PUBLIC_GUIDE_KEY_REF
      if (key !== expectedKey) {
        setIsLoading(false)
        return
      }
      
      // Verify the guide ID matches
      if (ref !== guideId) {
        setIsLoading(false)
        return
      }
      
      setIsSubscribed(true)
      setIsLoading(false)
    }
    
    checkAccess()
  }, [searchParams, guideId])

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Send to GoHighLevel webhook directly
      const ghlWebhookUrl = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL
      if (!ghlWebhookUrl) {
        throw new Error('GHL webhook URL not configured')
      }
      
      const ghlResponse = await fetch(ghlWebhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          guide: guideId,
          formType: 'guide_request',
          source: '8leaps-website',
          timestamp: new Date().toISOString(),
          language: 'en'
        }),
      })

      if (ghlResponse.ok) {
        setSubmitStatus('success')
        // Don't redirect - let user check their email for the protected link
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!guide) {
    return (
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="container py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Guide not found</h1>
          <p className="text-muted-foreground mb-6">The guide you're looking for doesn't exist.</p>
          <Button asChild>
            <Link href="/resources">Back to Resources</Link>
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
        <Button asChild variant="ghost" className="mb-4">
          <Link href="/resources">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Resources
          </Link>
        </Button>
      </div>

      {/* Main Content */}
      <div className="container py-8 flex-1">
        <div className="max-w-4xl mx-auto">
          {!isSubscribed ? (
            /* Subscription Required */
            <Card className="border-2 border-green-200 bg-green-50/50">
              <CardContent className="p-8 text-center">
                <Lock className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h1 className="text-3xl font-bold mb-4">{guide.title}</h1>
                <p className="text-xl text-muted-foreground mb-6">{guide.description}</p>
                
                <div className="bg-white p-6 rounded-lg mb-6">
                  <h2 className="text-xl font-semibold mb-4">Subscribe to Access This Guide</h2>
                  <form onSubmit={handleSubscribe} className="space-y-4">
                    <div className="flex gap-2">
                      <input
                        type="email"
                        placeholder="Enter your email address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      />
                      <Button 
                        type="submit" 
                        disabled={isSubmitting || !email}
                        className="bg-green-500 hover:bg-green-600 text-white px-8"
                      >
                        {isSubmitting ? "Sending..." : "GET FREE GUIDE"}
                      </Button>
                    </div>

                    {submitStatus === 'success' && (
                      <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg text-sm">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4" />
                          Check your email for the guide!
                        </div>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg text-sm">
                        Something went wrong. Please try again.
                      </div>
                    )}
                  </form>
                </div>
              </CardContent>
            </Card>
          ) : (
            /* Guide Content - Only visible to subscribed users */
            <div className="space-y-8">
              <div className="text-center">
                <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>
                <p className="text-xl text-muted-foreground">{guide.description}</p>
              </div>

              <Card>
                <CardContent className="p-8">
                  <div className="prose max-w-none">
                    <pre className="whitespace-pre-wrap text-sm leading-relaxed">
                      {guide.content}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {guide.image && (
                <div className="flex justify-center">
                  <Image
                    src={guide.image}
                    alt={guide.title}
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

"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, Mail, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { useParams } from "next/navigation"

const guideData = {
  "automations-quickstart": {
    title: "Automations Quickstart Guide",
    description: "Learn how to set up powerful automations that save you time and boost your productivity. This comprehensive guide covers everything from basic setup to advanced automation strategies.",
    image: "/automations-quickstart.png"
  },
  "10-hour-x-growth-strategy": {
    title: "10-Hour X Growth Strategy",
    description: "A comprehensive guide to growing your presence on X (Twitter) with just 10 hours of focused effort per week. Coming soon!",
    image: "/automations-quickstart.png" // Placeholder
  },
  "no-bs-ai-marketing-guide": {
    title: "No-BS AI Marketing Guide",
    description: "Cut through the AI marketing hype and learn practical strategies that actually work. No fluff, just actionable insights.",
    image: "/automations-quickstart.png" // Placeholder
  }
}

export default function ResourceDetailPage() {
  const params = useParams()
  const guideId = params.id as string
  const guide = guideData[guideId as keyof typeof guideData]
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

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

  const handleSubmit = async (e: React.FormEvent) => {
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
        setEmail("")
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Back Button - Fixed position */}
      <Button asChild variant="ghost" className="absolute top-4 left-4 text-white hover:bg-white/10 hover:text-white">
        <Link href="/resources">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Resources
        </Link>
      </Button>

      {/* Single Centered Card */}
      <Card className="w-full max-w-4xl bg-white">
        <CardContent className="p-0">
          <div className="grid lg:grid-cols-2">
            {/* Left Column - Content */}
            <div className="p-8 space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-4">{guide.title}</h1>
                <p className="text-xl text-muted-foreground leading-relaxed">
                  {guide.description}
                </p>
              </div>

              {/* CTA Section */}
              <div className="border-2 border-green-200 bg-green-50/50 rounded-lg p-6">
                <div className="text-center space-y-6">
                  <div className="space-y-2">
                    <h2 className="text-2xl font-bold text-green-800">
                      Subscribe to our newsletter to get guide
                    </h2>
                    <p className="text-green-700">
                      Get instant access to this comprehensive guide and stay updated with our latest resources.
                    </p>
                  </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <h3 className="text-lg font-semibold mb-3 text-center">
                        Subscribe to get guide
                      </h3>
                      <div className="flex gap-2">
                        <Input
                          type="email"
                          placeholder="Enter your email address"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="flex-1"
                        />
                        <Button 
                          type="submit" 
                          disabled={isSubmitting || !email}
                          className="bg-green-500 hover:bg-green-600 text-white px-8"
                        >
                          {isSubmitting ? "Sending..." : "GET FREE GUIDE"}
                        </Button>
                      </div>
                    </div>

                    {/* Status Messages */}
                    {submitStatus === 'success' && (
                      <div className="bg-green-100 border border-green-300 text-green-800 p-3 rounded-lg text-sm">
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4" />
                          Check your email for the guide!
                        </div>
                      </div>
                    )}

                    {submitStatus === 'error' && (
                      <div className="bg-red-100 border border-red-300 text-red-800 p-3 rounded-lg text-sm">
                        Something went wrong. Please try again.
                      </div>
                    )}

                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                      <Shield className="h-4 w-4" />
                      We respect your privacy. Unsubscribe at any time.
                    </p>
                  </form>
                </div>
              </div>
            </div>

            {/* Right Column - Image */}
            <div className="flex justify-center items-center bg-gray-50">
              <div className="relative w-full h-full min-h-[400px]">
                <Image
                  src="/resources/automations-quickstart.png"
                  alt={guide.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

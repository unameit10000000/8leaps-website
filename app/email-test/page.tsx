"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Send, Info } from "lucide-react"

export default function EmailTestPage() {
  const [formData, setFormData] = useState({
    name: "Test User",
    email: "", // You'll need to fill this in with your email
    subject: "Email Test",
    message: "This is a test message from the 8Leaps email test page.",
  })

  const [status, setStatus] = useState<{
    type: "success" | "error" | "info" | null
    message: string
  }>({
    type: null,
    message: "",
  })

  const [isLoading, setIsLoading] = useState(false)
  const [debugInfo, setDebugInfo] = useState<any>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setStatus({ type: "info", message: "Sending email... This may take a moment." })
    setDebugInfo(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()
      setDebugInfo(data)

      if (response.ok) {
        setStatus({
          type: "success",
          message: `Email sent successfully! Message ID: ${data.messageId}`,
        })
      } else {
        setStatus({
          type: "error",
          message: data.error || "Failed to send email",
        })
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "An unexpected error occurred",
      })
      setDebugInfo(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="container py-12">
        <h1 className="text-3xl font-bold mb-8">Email Testing Tool</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send Test Email</CardTitle>
                <CardDescription>Use this form to test the email sending functionality</CardDescription>
              </CardHeader>
              <CardContent>
                {status.type && (
                  <Alert
                    variant={status.type === "success" ? "default" : status.type === "info" ? "default" : "destructive"}
                    className="mb-6"
                  >
                    {status.type === "success" ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : status.type === "info" ? (
                      <Info className="h-4 w-4" />
                    ) : (
                      <AlertCircle className="h-4 w-4" />
                    )}
                    <AlertTitle>
                      {status.type === "success" ? "Success" : status.type === "info" ? "Info" : "Error"}
                    </AlertTitle>
                    <AlertDescription>{status.message}</AlertDescription>
                  </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">
                      Your Name
                    </label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Your Email Address (where you'll receive the test email)
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your-email@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={4}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-green-500 hover:bg-green-600" disabled={isLoading}>
                    {isLoading ? (
                      <span className="flex items-center">
                        <svg
                          className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <circle
                            className="opacity-25"
                            cx="12"
                            cy="12"
                            r="10"
                            stroke="currentColor"
                            strokeWidth="4"
                          ></circle>
                          <path
                            className="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                          ></path>
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Send className="mr-2 h-4 w-4" />
                        Send Test Email
                      </span>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Email Configuration Guide</CardTitle>
                <CardDescription>Make sure your environment variables are set correctly</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Required Environment Variables</h3>
                    <div className="bg-muted p-4 rounded-md font-mono text-sm mt-2">
                      <p>EMAIL_SERVER_HOST=smtp.example.com</p>
                      <p>EMAIL_SERVER_PORT=587</p>
                      <p>EMAIL_SERVER_SECURE=false</p>
                      <p>EMAIL_USERNAME=your-email@example.com</p>
                      <p>EMAIL_PASSWORD=your-password</p>
                      <p>EMAIL_FROM='"Your Name" &lt;your-email@example.com&gt;'</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Hostinger SMTP Settings</h3>
                    <div className="bg-muted p-4 rounded-md font-mono text-sm mt-2">
                      <p>EMAIL_SERVER_HOST=smtp.hostinger.com</p>
                      <p>EMAIL_SERVER_PORT=465</p>
                      <p>EMAIL_SERVER_SECURE=true</p>
                      <p>EMAIL_USERNAME=info@8leaps.com</p>
                      <p>EMAIL_PASSWORD=your-password</p>
                      <p>EMAIL_FROM='"8Leaps" &lt;info@8leaps.com&gt;'</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium">Debug Information</h3>
                    {debugInfo ? (
                      <pre className="bg-muted p-4 rounded-md text-xs mt-2 overflow-auto max-h-60">
                        {JSON.stringify(debugInfo, null, 2)}
                      </pre>
                    ) : (
                      <p className="text-sm text-muted-foreground mt-2">Send a test email to see debug information</p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

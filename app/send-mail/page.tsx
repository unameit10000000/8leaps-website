"use client"

import type React from "react"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { CheckCircle2, AlertCircle, Send } from "lucide-react"

export default function SendMailPage() {
  const [formData, setFormData] = useState({
    to: "",
    subject: "",
    text: "",
  })
  const [status, setStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({
    type: null,
    message: "",
  })
  const [isLoading, setIsLoading] = useState(false)

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
    setStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (response.ok) {
        setStatus({
          type: "success",
          message: `Email sent successfully! Message ID: ${data.messageId}`,
        })
        // Reset form
        setFormData({
          to: "",
          subject: "",
          text: "",
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
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1 container py-12">
        <h1 className="text-3xl font-bold mb-8">Email Testing Page</h1>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <Card>
              <CardHeader>
                <CardTitle>Send Test Email</CardTitle>
                <CardDescription>Use this form to test the email sending functionality</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="to" className="text-sm font-medium">
                      Recipient Email
                    </label>
                    <Input
                      id="to"
                      name="to"
                      type="email"
                      placeholder="recipient@example.com"
                      value={formData.to}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="Email subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="text" className="text-sm font-medium">
                      Message
                    </label>
                    <Textarea
                      id="text"
                      name="text"
                      placeholder="Your message here..."
                      value={formData.text}
                      onChange={handleChange}
                      rows={6}
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
                        Send Email
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
                <CardTitle>Email Configuration</CardTitle>
                <CardDescription>Environment variables needed for email functionality</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-muted p-4 rounded-md font-mono text-sm">
                  <p># SMTP Server Configuration</p>
                  <p>EMAIL_SERVER_HOST=smtp.example.com</p>
                  <p>EMAIL_SERVER_PORT=587</p>
                  <p>EMAIL_SERVER_SECURE=false</p>
                  <p># Email Authentication</p>
                  <p>EMAIL_USERNAME=your-email@example.com</p>
                  <p>EMAIL_PASSWORD=your-password-or-app-password</p>
                  <p># Sender Information</p>
                  <p>EMAIL_FROM='"Your Name" &lt;your-email@example.com&gt;'</p>
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">Add these variables to your .env.local file</p>
              </CardFooter>
            </Card>

            {status.type && (
              <Alert variant={status.type === "success" ? "default" : "destructive"}>
                {status.type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{status.type === "success" ? "Success" : "Error"}</AlertTitle>
                <AlertDescription>{status.message}</AlertDescription>
              </Alert>
            )}

            <Card>
              <CardHeader>
                <CardTitle>Common Email Providers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-medium">Gmail</h3>
                    <p className="text-sm text-muted-foreground">
                      Host: smtp.gmail.com
                      <br />
                      Port: 587
                      <br />
                      Secure: false
                      <br />
                      <span className="text-amber-600">Note: Requires App Password if 2FA is enabled</span>
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">Outlook/Office 365</h3>
                    <p className="text-sm text-muted-foreground">
                      Host: smtp.office365.com
                      <br />
                      Port: 587
                      <br />
                      Secure: false
                    </p>
                  </div>

                  <div>
                    <h3 className="font-medium">Transactional Email Services</h3>
                    <p className="text-sm text-muted-foreground">
                      For production, consider using services like:
                      <br />- SendGrid
                      <br />- Mailgun
                      <br />- Amazon SES
                    </p>
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

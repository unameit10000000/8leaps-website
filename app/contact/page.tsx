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
import { CheckCircle2, AlertCircle, Send, Info, Mail, MapPin } from "lucide-react"
import { useLanguage } from "@/components/language-provider"

export default function ContactPage() {
  const { t, language } = useLanguage()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
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
    setStatus({
      type: "info",
      message:
        language === "en"
          ? "Sending your message... This may take a moment."
          : "Uw bericht wordt verzonden... Dit kan even duren.",
    })
    setDebugInfo(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          language, // Pass the current language to the API
        }),
      })

      const data = await response.json()

      // Store debug info but don't show it to regular users
      setDebugInfo(data)

      if (response.ok) {
        setStatus({
          type: "success",
          message:
            language === "en"
              ? "Your message has been sent successfully! We'll get back to you soon."
              : "Uw bericht is succesvol verzonden! We nemen spoedig contact met u op.",
        })
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
        })
      } else {
        setStatus({
          type: "error",
          message: data.error || (language === "en" ? "Failed to send message" : "Bericht verzenden mislukt"),
        })
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: language === "en" ? "An unexpected error occurred" : "Er is een onverwachte fout opgetreden",
      })
      setDebugInfo(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gradient-to-b from-green-500 to-green-400 py-12 md:py-24">
        <div className="container">
          <h1 className="text-4xl font-bold text-white text-center">
            {language === "en" ? "Contact Us" : "Neem Contact Op"}
          </h1>
        </div>
      </div>

      <div className="container py-12 md:py-24">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Get in Touch Section */}
          <div>
            <h2 className="text-2xl font-bold mb-4">{t("contact.getintouch.title")}</h2>
            <p className="text-muted-foreground mb-8">{t("contact.getintouch.text")}</p>

            <div className="space-y-6 mb-8">
              <div className="flex items-start space-x-4">
                <Mail className="h-6 w-6 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">{t("contact.email.title")}</h3>
                  <p className="text-muted-foreground">info@8leaps.com</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <MapPin className="h-6 w-6 text-green-500 mt-0.5" />
                <div>
                  <h3 className="font-medium">{t("contact.location.title")}</h3>
                  <p className="text-muted-foreground">Leeuwarden, Netherlands</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
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
                  {status.type === "success"
                    ? language === "en"
                      ? "Success"
                      : "Succes"
                    : status.type === "info"
                      ? language === "en"
                        ? "Info"
                        : "Info"
                      : language === "en"
                        ? "Error"
                        : "Fout"}
                </AlertTitle>
                <AlertDescription>{status.message}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  {language === "en" ? "Your Name" : "Uw Naam"}
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder={language === "en" ? "John Doe" : "Jan Jansen"}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {language === "en" ? "Your Email Address" : "Uw E-mailadres"}
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={language === "en" ? "john.doe@example.com" : "jan.jansen@voorbeeld.nl"}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  {language === "en" ? "Subject" : "Onderwerp"}
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder={language === "en" ? "How can we help you?" : "Hoe kunnen we u helpen?"}
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {language === "en" ? "Message" : "Bericht"}
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder={
                    language === "en" ? "Please provide details about your inquiry..." : "Geef details over uw vraag..."
                  }
                  value={formData.message}
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
                    {language === "en" ? "Sending..." : "Verzenden..."}
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Send className="mr-2 h-4 w-4" />
                    {language === "en" ? "Send Message" : "Verstuur Bericht"}
                  </span>
                )}
              </Button>
            </form>
          </div>

          {/* Let's Chat Section */}
          <div>
            <Card className="border-2">
              <CardHeader>
                <CardTitle>{t("contact.letschat.title")}</CardTitle>
                <CardDescription>{t("contact.letschat.text")}</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="bg-green-500 hover:bg-green-600 text-white w-full">
                  <a
                    href={
                      language === "en"
                        ? "https://calendly.com/bartolomeohart/intro-discovery-call"
                        : "https://calendly.com/bartolomeohart/intro-ontdekking-gesprek"
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("contact.letschat.button")}
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

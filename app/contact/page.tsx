"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gradient-to-b from-green-500 to-green-400 py-12 md:py-24">
        <div className="container">
          <h1 className="text-4xl font-bold text-white text-center">{t("contact.title")}</h1>
        </div>
      </div>

      <section className="py-12 md:py-32">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-6 md:mb-10">{t("contact.getintouch.title")}</h2>
              <p className="text-muted-foreground mb-8 md:mb-12">{t("contact.getintouch.text")}</p>

              <div className="space-y-6 md:space-y-10">
                <div className="flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t("contact.email.title")}</h3>
                    <p className="text-muted-foreground">info@8leaps.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-green-500 mt-0.5" />
                  <div>
                    <h3 className="font-medium">{t("contact.phone.title")}</h3>
                    <p className="text-muted-foreground">+31 6 39667436</p>
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
            </div>

            {/* Moved "Let's Chat" section to the right side */}
            <Card className="p-6 md:p-10 border-2">
              <div className="text-center">
                <h2 className="text-2xl font-bold mb-6 md:mb-8">{t("contact.letschat.title")}</h2>
                <p className="text-muted-foreground mb-8 md:mb-12">{t("contact.letschat.text")}</p>
                <Button asChild className="bg-green-500 hover:bg-green-600 text-white px-8 w-full">
                  <a href="https://calendly.com/8leaps" target="_blank" rel="noopener noreferrer">
                    {t("contact.letschat.button")}
                  </a>
                </Button>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

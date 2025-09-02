"use client"

import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { Services } from "@/components/solutions"
import { SimplifiedHowWeWork } from "@/components/simplified-how-we-work"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useLanguage } from "@/components/language-provider"

function CTASection() {
  const { t } = useLanguage()

  return (
    <section className="py-12 md:py-24 bg-muted/50 lg:px-4">
      <div className="container text-center">
        <h2 className="text-3xl font-bold mb-4 md:mb-8">{t("services.cta.title")}</h2>
        <p className="text-muted-foreground mb-6 md:mb-12 max-w-2xl mx-auto">{t("services.cta.description")}</p>
        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
          <Button asChild className="bg-green-500 hover:bg-green-600 text-white px-8">
            <Link href="/contact">{t("services.cta.contact")}</Link>
          </Button>
          <Button asChild variant="outline" className="hover:text-green-500 hover:border-green-500">
            <Link href="/pricing">{t("services.cta.pricing")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <Hero />
      <Services />
      <SimplifiedHowWeWork />
      <CTASection />
      <Footer />
    </main>
  )
}

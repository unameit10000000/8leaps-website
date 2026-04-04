"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Chatbox } from "@/components/spa-chatbox"
import { HeroSection } from "@/components/spa-hero"
// import { PromoVideo } from "@/components/spa-promo-video"
import { ProcessSection } from "@/components/spa-process"
import { CasesCarousel } from "@/components/spa-cases-carousel"
import { ServicesShowcase } from "@/components/spa-services-showcase"
import { MetricsSection } from "@/components/spa-metrics"
import { PricingSection } from "@/components/spa-pricing"
import { FAQSection } from "@/components/spa-faq"

export default function SPAPage() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <HeroSection />
      <Chatbox />
      {/* Video section temporarily disabled – keep component for later use */}
      {/* <PromoVideo /> */}
      <ProcessSection />
      <ServicesShowcase />
      <CasesCarousel />
      <MetricsSection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  )
}

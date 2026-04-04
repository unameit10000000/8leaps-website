"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Check } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

const pricingTiers = [
  {
    name: "Starter",
    nameNl: "Starter",
    price: "€249",
    description: "Perfect for simple websites",
    descriptionNl: "Perfect voor eenvoudige websites",
    features: [
      "Unique design",
      "Mobile-friendly",
      "Up to 5 pages",
      "SEO Setup",
    ],
    featuresNl: [
      "Uniek ontwerp",
      "Mobiel-vriendelijk",
      "Tot 5 pagina's",
      "SEO Setup",
    ],
    cta: "Get Started",
    ctaNl: "Begin",
    link: "/pricing",
    popular: false,
  },
  {
    name: "Professional",
    nameNl: "Professional",
    price: "€499",
    description: "Complete solution for businesses",
    descriptionNl: "Complete oplossing voor bedrijven",
    features: [
      "Everything in Starter +",
      "Unlimited pages",
      "Advanced SEO",
      "Performance optimized",
      "Including texts & images",
    ],
    featuresNl: [
      "Alles in Starter +",
      "Onbeperkt aantal pagina's",
      "Geavanceerde SEO",
      "Prestatie geoptimaliseerd",
      "Inclusief teksten & afbeeldingen",
    ],
    cta: "Get Started",
    ctaNl: "Begin",
    link: "/pricing",
    popular: true,
  },
  {
    name: "Custom",
    nameNl: "Op Maat",
    price: "Custom",
    description: "Tailored to your needs",
    descriptionNl: "Afgestemd op uw behoeften",
    features: [
      "Everything in Professional +",
      "Custom API development",
      "AI integrations",
      "Advanced database",
      "Unlimited iterations",
    ],
    featuresNl: [
      "Alles in Professional +",
      "Aangepaste API-ontwikkeling",
      "AI-integraties",
      "Geavanceerde database",
      "Onbeperkte iteraties",
    ],
    cta: "Contact Us",
    ctaNl: "Neem Contact Op",
    link: "/contact",
    popular: false,
  },
]

export function PricingSection() {
  const { language } = useLanguage()

  return (
    <section id="pricing" className="py-20 md:py-32 bg-background">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "en" ? "Simple, Transparent Pricing" : "Eenvoudige, Transparante Prijzen"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "Choose the plan that fits your needs. All prices are transparent with no hidden fees."
              : "Kies het plan dat bij uw behoeften past. Alle prijzen zijn transparant zonder verborgen kosten."}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingTiers.map((tier, index) => (
            <Card
              key={index}
              className={`border-2 transition-all duration-300 flex flex-col h-full ${
                tier.popular
                  ? "border-green-500 shadow-xl scale-105 relative"
                  : "hover:border-green-500"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-green-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                    {language === "en" ? "Most Popular" : "Meest Populair"}
                  </span>
                </div>
              )}

              <CardHeader className="text-center pb-4">
                <CardTitle className="text-3xl mb-2">
                  {language === "en" ? tier.name : tier.nameNl}
                </CardTitle>
                <div className="text-4xl font-bold text-green-500 mb-2">
                  {tier.price}
                </div>
                <CardDescription className="text-base">
                  {language === "en" ? tier.description : tier.descriptionNl}
                </CardDescription>
              </CardHeader>

              <CardContent className="flex-grow flex flex-col">
                <ul className="space-y-3 mb-6 flex-grow">
                  {(language === "en" ? tier.features : tier.featuresNl).map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-green-500 mr-2 shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className={`w-full ${
                    tier.popular
                      ? "bg-green-500 hover:bg-green-600 text-white"
                      : "bg-muted hover:bg-green-500 hover:text-white"
                  }`}
                >
                  <Link href={tier.link}>
                    {language === "en" ? tier.cta : tier.ctaNl}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

      </div>
    </section>
  )
}

"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { useLanguage } from "@/components/language-provider"
import { cn } from "@/lib/utils"

const faqs = {
  en: [
    {
      question: "How long does it take to build a website?",
      answer: "For simple websites, we typically deliver within 2-4 weeks. MVP projects can be completed in 1-3 weeks. Complex custom solutions may take longer, depending on your specific requirements.",
    },
    {
      question: "Do you offer ongoing maintenance?",
      answer: "Yes! We offer maintenance packages starting at €9.99/month, which includes domain, hosting, email, and regular updates. This ensures your website stays secure and up-to-date.",
    },
    {
      question: "Can you help with existing websites?",
      answer: "Absolutely! We can help improve, redesign, or add new features to your existing website. We work with various platforms including WordPress, custom-built sites, and more.",
    },
    {
      question: "What technologies do you use?",
      answer: "We use modern technologies including Next.js, React, WordPress, and various AI tools. We choose the best technology stack based on your project's specific needs and goals.",
    },
    {
      question: "Do you work with non-profits?",
      answer: "Yes! We offer a 50% discount for registered non-profit organizations. We're passionate about supporting projects that make a positive impact.",
    },
    {
      question: "How do I get started?",
      answer: "Simply use the chatbox on this page, schedule a call through our booking system, or fill out our contact form. We'll get back to you within 24 hours to discuss your project.",
    },
  ],
  nl: [
    {
      question: "Hoe lang duurt het om een website te bouwen?",
      answer: "Voor eenvoudige websites leveren we meestal binnen 2-4 weken. MVP-projecten kunnen binnen 1-3 weken worden voltooid. Complexe aangepaste oplossingen kunnen langer duren, afhankelijk van uw specifieke vereisten.",
    },
    {
      question: "Bieden jullie doorlopend onderhoud?",
      answer: "Ja! We bieden onderhoudspakketten vanaf €9,99/maand, inclusief domein, hosting, e-mail en regelmatige updates. Dit zorgt ervoor dat uw website veilig en up-to-date blijft.",
    },
    {
      question: "Kunnen jullie helpen met bestaande websites?",
      answer: "Absoluut! We kunnen helpen met het verbeteren, herontwerpen of toevoegen van nieuwe functies aan uw bestaande website. We werken met verschillende platforms, waaronder WordPress, op maat gemaakte sites en meer.",
    },
    {
      question: "Welke technologieën gebruiken jullie?",
      answer: "We gebruiken moderne technologieën zoals Next.js, React, WordPress en verschillende AI-tools. We kiezen de beste technologiestack op basis van de specifieke behoeften en doelen van uw project.",
    },
    {
      question: "Werken jullie met non-profits?",
      answer: "Ja! We bieden 50% korting voor geregistreerde non-profit organisaties. We zijn gepassioneerd over het ondersteunen van projecten die een positieve impact maken.",
    },
    {
      question: "Hoe begin ik?",
      answer: "Gebruik gewoon de chatbox op deze pagina, plan een gesprek via ons boekingssysteem of vul ons contactformulier in. We nemen binnen 24 uur contact met u op om uw project te bespreken.",
    },
  ],
}

export function FAQSection() {
  const { language } = useLanguage()
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const currentFaqs = faqs[language] || faqs.en

  return (
    <section id="faq" className="py-20 md:py-32 bg-muted/30">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "en" ? "Frequently Asked Questions" : "Veelgestelde Vragen"}
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {language === "en"
              ? "Got questions? We've got answers."
              : "Heeft u vragen? Wij hebben antwoorden."}
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-4">
          {currentFaqs.map((faq, index) => (
            <div
              key={index}
              className="bg-card border-2 rounded-lg overflow-hidden transition-all hover:border-green-500"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-lg pr-4">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform",
                    openIndex === index && "transform rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                )}
              >
                <div className="px-6 pb-4 text-muted-foreground">{faq.answer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

"use client"

import { useLanguage } from "@/components/language-provider"
import { ClipboardList, Code2, Rocket, Wrench } from "lucide-react"

const steps = [
  {
    id: 1,
    icon: ClipboardList,
    titleEn: "Clarify your idea",
    titleNl: "Verduidelijk uw idee",
    descEn: "In a short conversation or via chat, we capture what you want to achieve, your budget, and your timeline.",
    descNl: "In een kort gesprek of via de chat brengen we uw doelen, budget en tijdlijn helder in kaart.",
  },
  {
    id: 2,
    icon: Code2,
    titleEn: "Design & build",
    titleNl: "Ontwerp & bouw",
    descEn: "We propose a lean solution and start building: from simple website to MVP or AI-powered tools.",
    descNl: "We stellen een slanke oplossing voor en starten de bouw: van simpele website tot MVP of AI-oplossing.",
  },
  {
    id: 3,
    icon: Rocket,
    titleEn: "Launch & validate",
    titleNl: "Lanceren & valideren",
    descEn: "We launch quickly, collect feedback, and fine-tune so your product actually gets used.",
    descNl: "We lanceren snel, verzamelen feedback en scherpen bij zodat uw product ook echt gebruikt wordt.",
  },
  {
    id: 4,
    icon: Wrench,
    titleEn: "Support & grow",
    titleNl: "Onderhoud & groei",
    descEn: "Optional ongoing support, improvements, and automation to keep you ahead.",
    descNl: "Optioneel doorlopend onderhoud, verbeteringen en automatisering om u voorop te houden.",
  },
]

export function ProcessSection() {
  const { language } = useLanguage()

  const title = language === "en" ? "How we turn ideas into reality" : "Hoe we ideeën werkelijkheid maken"
  const subtitle =
    language === "en"
      ? "A simple, fast, four-step process from first chat to live product."
      : "Een eenvoudig, snel vierstappenproces van eerste gesprek tot live product."

  return (
    <section id="process" className="py-20 md:py-32 bg-muted/40">
      <div className="container px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {steps.map((step) => {
            const Icon = step.icon
            const stepTitle = language === "en" ? step.titleEn : step.titleNl
            const stepDesc = language === "en" ? step.descEn : step.descNl

            return (
              <div
                key={step.id}
                className="relative bg-card border-2 rounded-xl p-6 flex flex-col h-full overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/0 to-emerald-500/0 group-hover:from-green-500/5 group-hover:to-emerald-500/10 transition-colors duration-300" />
                <div className="relative z-10 flex flex-col h-full gap-4">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center">
                      <Icon className="h-6 w-6 text-green-500" />
                    </div>
                    <span className="text-sm font-medium text-muted-foreground">Step {step.id}</span>
                  </div>
                  <h3 className="text-xl font-semibold">{stepTitle}</h3>
                  <p className="text-sm text-muted-foreground flex-1">{stepDesc}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}


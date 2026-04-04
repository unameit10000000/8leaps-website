"use client"

import { useLanguage } from "@/components/language-provider"
import { TrendingUp, Zap, Shield, Clock } from "lucide-react"
import { useEffect, useState } from "react"

const metrics = [
  {
    icon: TrendingUp,
    value: "10X",
    label: "Faster Development",
    labelNl: "Snellere Ontwikkeling",
    color: "text-green-500",
  },
  {
    icon: Shield,
    value: "99%",
    label: "Fewer Errors",
    labelNl: "Minder Fouten",
    color: "text-blue-500",
  },
  {
    icon: Clock,
    value: "132",
    label: "Hours Saved",
    labelNl: "Uren Bespaard",
    color: "text-purple-500",
  },
  {
    icon: Zap,
    value: "1-3",
    label: "Weeks to MVP",
    labelNl: "Weken tot MVP",
    color: "text-orange-500",
  },
]

export function MetricsSection() {
  const { language } = useLanguage()
  const [countedValues, setCountedValues] = useState<Record<number, number>>({})

  useEffect(() => {
    // Animate numbers on mount
    metrics.forEach((metric, index) => {
      const numericValue = parseFloat(metric.value)
      if (!isNaN(numericValue)) {
        const duration = 2000
        const steps = 60
        const increment = numericValue / steps
        let current = 0

        const timer = setInterval(() => {
          current += increment
          if (current >= numericValue) {
            current = numericValue
            clearInterval(timer)
          }
          setCountedValues((prev) => ({
            ...prev,
            [index]: Math.floor(current),
          }))
        }, duration / steps)
      }
    })
  }, [])

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-green-500 to-emerald-600 text-white">
      <div className="container px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            {language === "en" ? "Proven Results" : "Bewezen Resultaten"}
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            {language === "en"
              ? "Numbers that speak for themselves"
              : "Cijfers die voor zich spreken"}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-5xl mx-auto">
          {metrics.map((metric, index) => {
            const Icon = metric.icon
            const displayValue =
              countedValues[index] !== undefined
                ? `${countedValues[index]}${metric.value.includes("X") ? "X" : ""}${metric.value.includes("%") ? "%" : ""}${metric.value.includes("-") ? "-3" : ""}`
                : metric.value

            return (
              <div
                key={index}
                className="text-center space-y-4 p-6 rounded-lg bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex justify-center">
                  <Icon className={`h-12 w-12 ${metric.color.replace("text-", "text-white")}`} />
                </div>
                <div className="space-y-2">
                  <div className="text-5xl md:text-6xl font-bold">{displayValue}</div>
                  <div className="text-lg text-white/90">
                    {language === "en" ? metric.label : metric.labelNl}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

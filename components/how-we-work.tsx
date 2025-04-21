"use client"

import { useLanguage } from "./language-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ClipboardList, Code, Rocket, Wrench } from "lucide-react"

export function HowWeWork() {
  const { t } = useLanguage()

  const stages = [
    {
      number: 1,
      icon: <ClipboardList className="h-10 w-10 text-green-500" />,
      title: t("howwework.stage1.title"),
      description: t("howwework.stage1.description"),
      items: [
        t("howwework.stage1.item1"),
        t("howwework.stage1.item2"),
        t("howwework.stage1.item3"),
        t("howwework.stage1.item4"),
      ],
    },
    {
      number: 2,
      icon: <Code className="h-10 w-10 text-green-500" />,
      title: t("howwework.stage2.title"),
      description: t("howwework.stage2.description"),
      items: [t("howwework.stage2.item1"), t("howwework.stage2.item2"), t("howwework.stage2.item3")],
    },
    {
      number: 3,
      icon: <Rocket className="h-10 w-10 text-green-500" />,
      title: t("howwework.stage3.title"),
      description: t("howwework.stage3.description"),
      items: [t("howwework.stage3.item1"), t("howwework.stage3.item2"), t("howwework.stage3.item3")],
    },
    {
      number: 4,
      icon: <Wrench className="h-10 w-10 text-green-500" />,
      title: t("howwework.stage4.title"),
      description: t("howwework.stage4.description"),
      items: [t("howwework.stage4.item1"), t("howwework.stage4.item2"), t("howwework.stage4.item3")],
    },
  ]

  return (
    <section id="how-we-work" className="py-16 md:py-32 bg-muted/50 lg:px-4">
      <div className="container">
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl font-bold mb-4 md:mb-6">{t("howwework.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("howwework.description")}</p>
        </div>

        <div className="space-y-12 md:space-y-16">
          {stages.map((stage, index) => (
            <div key={index} className="relative">
              {/* Stage number with connecting line */}
              <div className="hidden md:flex absolute left-0 top-0 bottom-0 items-center">
                <div className="flex flex-col items-center">
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-green-500 text-white font-bold text-lg mb-4 z-10">
                    {stage.number}
                  </div>
                  {index < stages.length - 1 && (
                    <div className="w-0.5 bg-green-300 h-full absolute top-16 bottom-0 z-0"></div>
                  )}
                </div>
              </div>

              {/* Stage content */}
              <div className="md:hidden flex items-center gap-4 mb-4">
                <span className="font-bold text-lg text-green-500">{stage.number}.</span>
                {stage.icon}
                <h3 className="text-2xl font-bold">{stage.title}</h3>
              </div>

              <div className="md:ml-20">
                <div className="hidden md:flex items-center gap-4 mb-4">
                  {stage.icon}
                  <h3 className="text-2xl font-bold">{stage.title}</h3>
                </div>
                <p className="text-muted-foreground mb-6">{stage.description}</p>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">{t("howwework.includes")}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="grid gap-2 md:grid-cols-2">
                      {stage.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start">
                          <div className="mr-2 mt-1 h-1.5 w-1.5 rounded-full bg-green-500"></div>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

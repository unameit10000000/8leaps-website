"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-gradient-to-b from-green-500 to-green-400 py-12 md:py-24">
        <div className="container">
          <h1 className="text-4xl font-bold text-white text-center">{t("about.title")}</h1>
        </div>
      </div>

      <section className="py-12 md:py-32 lg:px-4">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 md:mb-10">{t("about.mission.title")}</h2>
              <p className="text-muted-foreground mb-4 md:mb-8">{t("about.mission.text1")}</p>
              <p className="text-muted-foreground mb-4 md:mb-8">{t("about.mission.text2")}</p>
            </div>
            <div className="flex justify-center">
              <div className="relative h-64 w-64 md:h-80 md:w-80">
                <Image
                  src="/about-our-mission.png"
                  alt="Digital concept illustration"
                  width={320}
                  height={320}
                  className="rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-32 bg-muted/50 lg:px-4">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 md:mb-16 text-center">{t("about.values.title")}</h2>
          <div className="grid md:grid-cols-3 gap-6 md:gap-12">
            <div className="bg-card p-6 md:p-10 rounded-lg border-2">
              <h3 className="text-xl font-bold mb-3 md:mb-5">{t("about.values.innovation.title")}</h3>
              <p className="text-muted-foreground">{t("about.values.innovation.text")}</p>
            </div>
            <div className="bg-card p-6 md:p-10 rounded-lg border-2">
              <h3 className="text-xl font-bold mb-3 md:mb-5">{t("about.values.quality.title")}</h3>
              <p className="text-muted-foreground">{t("about.values.quality.text")}</p>
            </div>
            <div className="bg-card p-6 md:p-10 rounded-lg border-2">
              <h3 className="text-xl font-bold mb-3 md:mb-5">{t("about.values.collaboration.title")}</h3>
              <p className="text-muted-foreground">{t("about.values.collaboration.text")}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-32 lg:px-4">
        <div className="container">
          <h2 className="text-3xl font-bold mb-8 md:mb-16 text-center">{t("about.approach.title")}</h2>
          <div className="max-w-3xl mx-auto">
            <p className="text-muted-foreground mb-6 md:mb-10">{t("about.approach.text1")}</p>
            <p className="text-muted-foreground mb-6 md:mb-10">{t("about.approach.text2")}</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}

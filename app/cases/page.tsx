"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/components/language-provider"
import Link from "next/link"

type CaseItem = {
  title: string
  url: string
  status?: "live" | "building"
  imageUrl: string
}

// Dummy data – will be replaced by database later
const cases: CaseItem[] = [
  {
    title: "Techblog - jetstack.xyz",
    url: "https://jetstack.xyz",
    status: "building",
    imageUrl: "/cases/jetstack.png",
  },
  {
    title: "Marktplaats - fyndly.io",
    url: "https://fyndly.io",
    status: "live",
    imageUrl: "/cases/fyndly-resized.png",
  },
  {
    title: "Eetcafe - dekameraad.nl",
    url: "https://dekameraad.nl",
    status: "building",
    imageUrl: "/cases/snapshot-dekameraad-resized.png",
  },
  {
    title: "Herstel bedrijf - schadeherstelkosta.nl",
    url: "https://schadeherstelkosta.nl",
    status: "building",
    imageUrl: "/cases/snapshot-kostaschadeherstel-resized.png",
  },
]

export default function CasesPage() {
  const { t } = useLanguage()
  return (
    <main className="min-h-screen flex flex-col">
      <Header />

      <div className="bg-gradient-to-b from-green-500 to-green-400 py-12 md:py-24">
        <div className="container">
          <h1 className="text-4xl font-bold text-white text-center">{t("cases.title")}</h1>
          <p className="text-white/90 text-center mt-3 max-w-2xl mx-auto">{t("cases.subtitle")}</p>
        </div>
      </div>

      <section className="py-12 md:py-24">
        <div className="container px-4">
          <div className="grid gap-8 md:grid-cols-2">
            {cases.map((item) => (
              <div
                key={item.title}
                className="overflow-hidden rounded-lg border-2 hover:border-green-500 hover:shadow-lg hover:scale-102 transition-all duration-300 bg-card"
              >
                {/* Full background image */}
                <div className="aspect-[16/9] w-full bg-muted">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="h-full w-full object-cover"
                    loading="lazy"
                  />
                </div>

                {/* Content section below image */}
                <div className="p-4 bg-card">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-bold leading-tight text-card-foreground">{item.title}</h3>
                      {item.status === "live" && (
                        <Link
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 underline"
                        >
                          {t("cases.view.project")}
                        </Link>
                      )}
                    </div>
                    <div className="ml-4">
                      {item.status === "building" ? (
                        <span className="text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200 px-2 py-1">
                          {t("cases.status.building")}
                        </span>
                      ) : (
                        <span className="text-xs rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200 px-2 py-1">
                          {t("cases.status.live")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}



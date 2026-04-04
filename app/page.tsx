"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Mail } from "lucide-react"

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 bg-background">
      <div className="max-w-2xl w-full text-center space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 mb-2">
          <Mail className="w-8 h-8 text-green-600 dark:text-green-400" />
        </div>
        <h1 className="text-4xl font-bold tracking-tight">We&apos;re going through some changes</h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          If you haven&apos;t received an email yet and have any questions, feel free to reach out — we&apos;re happy to help.
        </p>
        <a
          href="mailto:info@8leaps.com"
          className="inline-flex items-center gap-2 text-green-600 dark:text-green-400 font-semibold text-lg hover:underline"
        >
          <Mail className="w-5 h-5" />
          info@8leaps.com
        </a>
      </div>
    </main>
  )
}

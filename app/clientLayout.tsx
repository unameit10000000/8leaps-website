"use client"

import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { LanguageProvider } from "@/components/language-provider"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

const inter = Inter({ subsets: ["latin"] })

// Let's make sure the LanguageProvider is properly wrapping the application
// Check if there are any issues with the provider setup

// Add this ScrollToTop component to handle scroll restoration
const ScrollToTop = () => {
  const pathname = usePathname()

  useEffect(() => {
    // Only scroll to top if there's no hash in the URL
    if (!window.location.hash) {
      // Use a small timeout to ensure it works consistently on mobile
      setTimeout(() => {
        window.scrollTo({
          top: 0,
          behavior: "instant", // Use instant instead of smooth for more reliable behavior
        })
      }, 100)
    }
  }, [pathname])

  return null
}

export default function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false}>
          <LanguageProvider>
            <ScrollToTop />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

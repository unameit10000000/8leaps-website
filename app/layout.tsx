import type React from "react"
import type { Metadata } from "next"
import ClientLayout from "./clientLayout"

export const metadata: Metadata = {
  title: "8Leaps | Development Services",
  description: "We from 8Leaps offer Professional web development services",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <ClientLayout>{children}</ClientLayout>
}


import './globals.css'
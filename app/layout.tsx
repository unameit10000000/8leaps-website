import type React from "react";
import type { Metadata } from "next";
import ClientLayout from "./clientLayout";
import { Analytics } from "@vercel/analytics/react";

export const metadata: Metadata = {
  title: "8Leaps | Web Development Services",
  description:
    "We offer high-quality, scalable web development solutions tailored to your needs.",
  metadataBase: new URL("https://8leaps.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://8leaps.com",
    title: "8Leaps | Web Development Services",
    description:
      "We offer high-quality, scalable web development solutions tailored to your needs.",
    siteName: "8Leaps",
    images: [
      {
        url: "https://8leaps.com/images/8leaps-preview.png",
        width: 1200,
        height: 630,
        alt: "8Leaps - Web Development Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "8Leaps | Web Development Services",
    description:
      "We offer high-quality, scalable web development solutions tailored to your needs.",
    images: ["https://8leaps.com/images/8leaps-preview.png"],
    creator: "@yourhandle", // optional, replace or remove
  },
  other: {
    "linkedin:title": "8Leaps | Web Development Services",
    "linkedin:description":
      "We offer high-quality, scalable web development solutions tailored to your needs.",
    "linkedin:image": "https://8leaps.com/images/8leaps-preview.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClientLayout>
      {children}
      <Analytics />
    </ClientLayout>
  );
}

import "./globals.css";

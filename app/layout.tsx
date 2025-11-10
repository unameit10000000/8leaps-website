import type React from "react";
import type { Metadata } from "next";
import Script from "next/script";
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
      {/* Google Analytics */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-3KSMBWX6NE"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-3KSMBWX6NE');
        `}
      </Script>
      {/* GoHighLevel Tracking Script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,o,f,js,fjs){
              w['GoHighLevelObject']=o;w[o]=w[o]||function(){(w[o].q=w[o].q||[]).push(arguments)};
              js=d.createElement(s),fjs=d.getElementsByTagName(s)[0];
              js.id=o;js.src=f;js.async=1;fjs.parentNode.insertBefore(js,fjs);
            }(window,document,'script','ghl','https://link.msgsndr.com/js/form_embed.js'));
          `,
        }}
      />
    </ClientLayout>
  );
}

import "./globals.css";

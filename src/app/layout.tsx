import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Imbatruck Company LLC — Buy, Sell & Freight Services USA",
    template: "%s | Imbatruck Company LLC",
  },
  description:
    "Trucks, trailers, equipment, freight services, drivers & parts. No payments on the platform. Direct contact with sellers. US-focused marketplace.",
  openGraph: {
    title: "Imbatruck Company LLC — Buy, Sell & Freight Services USA",
    description: "US marketplace for trucks, trailers, freight and more. Direct contact. No platform payments.",
    url: "https://imbatruck.com",
    siteName: "Imbatruck Company LLC",
    locale: "en_US",
  },
  metadataBase: new URL("https://imbatruck.com"),
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Imbatruck Company LLC",
  url: "https://imbatruck.com",
  contactPoint: {
    "@type": "ContactPoint",
    email: "info@imbatruck.com",
    telephone: "+1-512-593-3858",
    contactType: "customer service",
    areaServed: "US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased bg-background text-foreground`}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

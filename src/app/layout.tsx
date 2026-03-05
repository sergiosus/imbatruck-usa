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
    default: "Buy Trucks, Trailers & Freight Services | Imbatruck USA",
    template: "%s | Imbatruck",
  },
  description:
    "Buy and sell trucks, trailers, parts, and freight services in the USA. Connect directly with buyers and sellers. No marketplace fees.",
  openGraph: {
    title: "Buy Trucks, Trailers & Freight Services | Imbatruck USA",
    description: "Connect directly with buyers and sellers. No marketplace fees.",
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

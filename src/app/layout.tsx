import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans, Orbitron } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import ScrollToTop from "@/components/common/ScrollToTop";
import ClientLayout from "@/components/common/ClientLayout";
import { AuthProvider } from "@/contexts/AuthContext";
import { Analytics } from "@vercel/analytics/next"


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const instrumentSans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const orbitron = Orbitron({
  variable: "--font-orbitron",
  subsets: ["latin"],
  weight: ["700", "900"],
});

export const metadata: Metadata = {
  title: "ReXtro 2025 – Silver Jubilee Engineering Exhibition",
  description: "Join the biggest engineering exhibition of the year hosted by the University of Ruhuna.",
  keywords: ["ReXtro", "ReXtro 2025", "Engineering Exhibition", "University of Ruhuna", "Sri Lanka", "Silver Jubilee", "Technology Expo", "Engineering Projects", "Robotics", "Innovation"],
  authors: [{ name: "Faculty of Engineering, University of Ruhuna" }],
  alternates: {
    canonical: "https://rextro.lk/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "ReXtro 2025 – Silver Jubilee Engineering Exhibition",
    description: "Join the biggest engineering exhibition of the year hosted by the University of Ruhuna.",
    type: "website",
    url: "https://rextro.lk/",
    siteName: "ReXtro 2025",
    images: [
      {
        url: "https://rextro.lk/rextro-preview.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReXtro 2025 – Silver Jubilee Engineering Exhibition",
    description: "Experience innovation, creativity, and engineering excellence at ReXtro 2025.",
    images: ["https://rextro.lk/rextro-preview.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  other: {
    "X-UA-Compatible": "IE=edge",
    "Cache-Control": "public, max-age=31536000",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSans.variable} ${orbitron.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Event",
              "name": "ReXtro 2025 – Silver Jubilee Engineering Exhibition",
              "startDate": "2025-11-05",
              "endDate": "2025-12-31",
              "eventStatus": "https://schema.org/EventScheduled",
              "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
              "location": {
                "@type": "Place",
                "name": "Faculty of Engineering, University of Ruhuna",
                "address": "Galle, Sri Lanka"
              },
              "image": [
                "https://rextro.lk/rextro-preview.jpg"
              ],
              "description": "The Silver Jubilee engineering exhibition featuring robotics, AI, mechanical systems, renewable energy, marine engineering, and multidisciplinary innovation.",
              "organizer": {
                "@type": "Organization",
                "name": "Faculty of Engineering, University of Ruhuna",
                "url": "https://rextro.lk"
              }
            })
          }}
        />
        <ScrollToTop />
        <AuthProvider>
          <ClientLayout>
            <SmoothScroll />
            {children}
             <Analytics />
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

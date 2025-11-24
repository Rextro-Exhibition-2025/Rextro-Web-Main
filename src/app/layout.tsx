import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Sans, Orbitron } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/common/SmoothScroll";
import ClientLayout from "@/components/common/ClientLayout";
import { AuthProvider } from "@/contexts/AuthContext";

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
  // 1. Optimized Title (Max 60 characters)
  title: "ReXtro 2025: Silver Jubilee Engineering Exhibition | University of Ruhuna",
  
  // 2. Optimized Description (Max 155-160 characters)
  description: "Explore ReXtro 2025—the largest engineering exhibition celebrating 25 years of innovation at the Faculty of Engineering of University of Ruhuna . Features 40+ zones: AI, Robotics, VR, and Sustainable Tech. Dec 5-7, 2025.",
  
  // 3. Open Graph / Social Sharing Data (for better display on Facebook, Twitter, etc.)
  openGraph: {
    title: "ReXtro 2025: Silver Jubilee Engineering Exhibition | University of Ruhuna",
    description: "Explore 40+ zones of innovation: AI, Robotics, VR, and Sustainable Tech. Join us for the Silver Jubilee at the Faculty of Engineering of University of Ruhuna. Dec 5-7, 2025.",
    url: 'https://www.rextro.lk',
    siteName: 'ReXtro 2025: Silver Jubilee Engineering Exhibition | University of Ruhuna',
    images: [
      {
        url: 'https://www.rextro.lk/Hero/logo.svg', // **NOTE: Change this to the path of your main hero image or logo**
        width: 1200,
        height: 630,
        alt: 'ReXtro 2025 Engineering Exhibition Logo and Key Visual',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },

  // 4. Keywords (While not a direct ranking factor, they help with context)
  keywords: [
    'ReXtro 2025', 
    'Engineering Exhibition Sri Lanka', 
    'University of Ruhuna', 
    'Faculty of Engineering', 
    'Robotics Exhibition', 
    'AI Technology', 
    'Silver Jubilee', 
    'Tech Exhibition Galle',
    'UOR Engineering',
  ],

  // 5. Twitter Card (for better display on X/Twitter)
  twitter: {
    card: 'summary_large_image',
    title: 'ReXtro 2025: Silver Jubilee Engineering Exhibition',
    description: 'Explore 25 zones of innovation: AI, Robotics, VR, and Sustainable Tech. Join us for the Silver Jubilee at UOR. Dec 5-7, 2025.',
    creator: '@Rextro-UniversityofRuhun', // Use the official Twitter/X handle mentioned in the PDF snippet
    images: ['https://www.rextro.lk/Hero/logo.svg'], // **NOTE: Change this to the path of your Twitter-optimized image**
  },

  // 6. Canonical Link (if using a different domain for marketing)
  // metadataBase: new URL('https://www.rextro.lk'),
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
        <AuthProvider>
          <ClientLayout>
            <SmoothScroll />
            {children}
          </ClientLayout>
        </AuthProvider>
      </body>
    </html>
  );
}

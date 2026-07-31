import { Geist, Geist_Mono } from "next/font/google";
import { Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata = {
  title: "LASIKA — Swiss Luxury Timepieces Since 1885",
  description:
    "Discover LASIKA's collection of exquisite Swiss-made luxury watches. Oyster Perpetual timepieces crafted with precision, elegance, and perpetual excellence.",
  keywords: [
    "luxury watches",
    "Swiss watches",
    "LASIKA",
    "Oyster Perpetual",
    "timepieces",
    "luxury",
  ],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col bg-[var(--color-cream)]" style={{ fontFamily: "var(--font-geist)" }}>
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import PlausibleProvider from 'next-plausible'

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const currySansHeadline = localFont({
  src: [
    {
      path: "../font/currys-sans.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-currys",
});

export const metadata: Metadata = {
  title: "Curry",
  description: "Curry Advent Campaign",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${currySansHeadline.variable} antialiased`}
      >
        <PlausibleProvider
          domain={process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? "localhost"}
          trackLocalhost={true}
          trackOutboundLinks={true}
          trackFileDownloads={true}
        >
          {children}
        </PlausibleProvider>
      </body>
    </html>
  );
}

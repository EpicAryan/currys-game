import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import localFont from "next/font/local";
import { init } from "@plausible-analytics/tracker";

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

init({
  domain: process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN!, // Your production domain
  captureOnLocalhost: process.env.NODE_ENV === 'development', // Enable on localhost
});
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
        {children}
      </body>
    </html>
  );
}

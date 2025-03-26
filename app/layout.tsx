import type { Metadata } from "next";
import { Geist, Geist_Mono, Philosopher, Mulish } from "next/font/google"; 
import "./globals.css";
import Header from "@/components/Header";
import { SanityLive } from "./sanity/live";

// Existing Geist fonts
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// NEW: Philosopher and Mulish
const philosopher = Philosopher({
  variable: "--font-philosopher",
  weight: ["400", "700"], 
  subsets: ["latin"],
});

const mulish = Mulish({
  variable: "--font-mulish",
  weight: ["400", "600", "700"], 
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={[
          geistSans.variable,
          geistMono.variable,
          philosopher.variable,  // Make them all active
          mulish.variable,       // ...
          "antialiased"          // or any other global classes
        ].join(" ")}
      >
        <Header />
        {children}
        <SanityLive />
      </body>
    </html>
  );
}

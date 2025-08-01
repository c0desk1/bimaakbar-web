// src/lib/fonts.ts
import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local"

export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const atkinson = localFont({
  src: [
    { path: "../app/fonts/atkinson-regular.woff", weight: '400', style: "normal" },
    { path: "../app/fonts/atkinson-bold.woff", weight: '600', style: "bold" },
  ],
})
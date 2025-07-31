// src/lib/fonts.ts
import localFont from "next/font/local"

export const atkinson = localFont({
  src: [
    { path: "../app/fonts/atkinson-regular.woff", weight: '400', style: "normal" },
    { path: "../app/fonts/atkinson-bold.woff", weight: '600', style: "bold" },
  ],
})
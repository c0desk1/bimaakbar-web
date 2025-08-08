'use client'

import React from "react"
import { siteConfig } from "@/config"

interface HeroProps {
  title?: string
  description?: string
  children?: React.ReactNode
  align?: "left" | "center"
}

export default function Hero({
  title = siteConfig.name,
  description = siteConfig.description,
  children,
  align = "left",
}: HeroProps) {
  const isCenter = align === "center"

  return (
    <section
      className={`flex flex-col md:flex-row items-center mt-22 mb-16 md:mb-12 ${
        isCenter ? "text-center justify-center" : "md:justify-between"
      }`}>
      <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-tight md:pr-8">
        {title}
      </h1>
      <div className={`mt-5 md:pl-8 ${isCenter ? "md:text-center" : "md:text-left"}`}>
        <p className="text-lg">{description}</p>
        {children && <div className="mt-4">{children}</div>}
      </div>
    </section>
  )
}

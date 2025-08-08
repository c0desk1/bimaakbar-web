"use client"

import * as React from "react"
import ReactDOM from "react-dom"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { LazyMotion, AnimatePresence, domAnimation } from "motion/react"
import * as m from "motion/react-m"
import { cn } from "@/lib/utils"
import { Icon } from "./Icons"
import { siteConfig } from "@/config"

interface DrawerProps {
  open: boolean
  onClose: () => void
  darkMode: boolean
  toggleDarkMode: () => void
}

export function Drawer({ open, onClose, darkMode, toggleDarkMode }: DrawerProps) {
  const pathname = usePathname()
  const [dragAmount, setDragAmount] = React.useState(0)
  const [openIndex, setOpenIndex] = React.useState<number | null>(null)

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      document.body.style.overflow = open ? "hidden" : ""
    }
    return () => {
      if (typeof window !== "undefined") {
        document.body.style.overflow = ""
      }
    }
  }, [open])

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleLinkClick = (href: string) => {
    if (pathname !== href) {
      onClose()
    }
  }

  if (!open) return null

  return ReactDOM.createPortal(
    <LazyMotion features={domAnimation}>
      <AnimatePresence>
        <>
          {/* Overlay */}
          <m.div
            className="fixed inset-0 z-40 bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <m.div
            className={cn(
              "md:hidden fixed bottom-0 left-0 right-0 z-50 bg-[var(--background)] border-t-2 border-[var(--border)] rounded-t-xl shadow-lg"
            )}
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag="y"
            dragElastic={0.2}
            onDrag={(event, info) => setDragAmount(info.offset.y)}
            onDragEnd={(event, info) => {
              if (info.offset.y > 100 || info.velocity.y > 500) {
                onClose()
              }
              setDragAmount(0)
            }}
            style={{
              height: "80vh",
              maxHeight: "80vh",
              willChange: "transform",
              touchAction: "pan-y"
            }}
          >
            {/* Handle Bar */}
            <div className="w-full flex justify-center py-2">
              <div className="w-10 h-1.5 bg-[var(--muted-foreground)] rounded-full" />
            </div>

            <div className="h-full flex flex-col justify-between p-4 pt-0">
              {/* Header */}
              <div className="flex justify-between items-center h-auto pb-2">
                <h2 className="text-xl font-semibold">{siteConfig.name}</h2>
                <Icon
                  onClick={onClose}
                  aria-label="Close Menu"
                  className="size-8 p-1 rounded-full hover:bg-[var(--hover)] cursor-pointer"
                >
                  <svg stroke="var(--foreground)" className="size-full">
                    <use href="/images/icons.svg#close" />
                  </svg>
                </Icon>
              </div>

              {/* Navigation Items */}
              <div className="flex flex-col gap-4 overflow-y-auto overflow-x-hidden flex-1">
                {siteConfig.navigation.map((item, index) => {
                  const isAccordion = "links" in item
                  return (
                    <div key={item.title} className="w-full">
                      {isAccordion ? (
                        <>
                          <button
                            onClick={() => toggleAccordion(index)}
                            className="w-full flex items-center justify-between text-left font-semibold"
                          >
                            {item.title}
                            <svg
                              className={cn(
                                "size-4 transition-transform",
                                openIndex === index ? "rotate-180" : "rotate-0"
                              )}
                              stroke="currentColor"
                              fill="none"
                              viewBox="0 0 24 24"
                            >
                              <path
                                d="M6 9l6 6 6-6"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>

                          <AnimatePresence initial={false}>
                            {openIndex === index && (
                              <m.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="pl-4 flex flex-col gap-2"
                              >
                                {item.links?.map((link) => (
                                  <Link
                                    key={link.href}
                                    href={link.href}
                                    onClick={() => handleLinkClick(link.href)}
                                    className={cn(
                                      "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                                      pathname === link.href && "text-[var(--foreground)]"
                                    )}
                                  >
                                    {link.label}
                                  </Link>
                                ))}
                              </m.div>
                            )}
                          </AnimatePresence>
                        </>
                      ) : (
                        <Link
                          href={item.href!}
                          onClick={() => handleLinkClick(item.href!)}
                          className={cn(
                            "w-full text-left font-semibold block",
                            pathname === item.href && "text-[var(--foreground)]"
                          )}
                        >
                          {item.title}
                        </Link>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="mt-6 border-t border-[var(--border)] pt-4 flex items-center justify-between text-sm text-[var(--muted-foreground)]">
                <div className="flex items-center justify-center md:justify-end gap-3">
                  {[
                    ["Rss", "/rss.xml", "rss"],
                    ["Github", "https://github.com/c0desk1", "github"],
                    ["Tiktok", "https://tiktok.com/@bimaakbarmusicc", "tiktok"],
                    ["Instagram", "https://instagram.com/notmesound", "instagram"],
                    ["Youtube", "https://youtube.com/@bimaakbarmu", "youtube"],
                  ].map(([label, href, icon]) => (
                    <Link
                      key={icon}
                      href={href}
                      target="_blank"
                      aria-label={label}
                      className="w-5 h-5 flex items-center justify-center hover:opacity-70"
                    >
                      <svg stroke="var(--foreground)" width={20} height={20} className="size-full">
                        <use href={`/images/icons.svg#${icon}`} />
                      </svg>
                    </Link>
                  ))}
                </div>
                <Icon
                  onClick={toggleDarkMode}
                  className="md:hidden flex items-center p-1 rounded hover:bg-[var(--hover)]"
                >
                  <svg stroke="var(--foreground)" width="20" height="20">
                    <use href={`/images/icons.svg#${darkMode ? "sun" : "moon"}`} />
                  </svg>
                </Icon>
              </div>
            </div>
          </m.div>
        </>
      </AnimatePresence>
    </LazyMotion>,
    document.body
  )
}
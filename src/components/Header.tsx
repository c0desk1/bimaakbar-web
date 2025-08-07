"use client"
import * as React from "react"
import { useState, useEffect } from "react"
import Link from "next/link"
import clsx from "clsx"
import { Container } from "@/components/Container"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
import { useTheme } from "next-themes"
import { Moon, Sun, MenuIcon } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const { setTheme } = useTheme()

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={clsx(
        "fixed top-0 w-full z-50 max-h-14 transition-all",
        isScrolled
          ? "bg-[var(--background)]/90 shadow-sm backdrop-blur-md border-b border-[var(--border)]"
          : "bg-transparent border-transparent"
      )}>
      <Container size="lg">
        <div className="flex items-center justify-between w-full py-3 gap-4">
          <div className="flex items-center">
            <Link href="/" className="flex w-fit items-center">
              <svg
                aria-label="brand"
                fill="var(--foreground)"
                width={32}
                height={32}
                className="p-1">
                <title>Bima Akbar</title>
                <use href="/images/icons.svg#logo" />
              </svg>
            </Link>
          </div>
          <div className="hidden md:block items-center">
            <NavigationMenu viewport={false}>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/" className="text-md tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Home</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link href="/blog" className="text-md tracking-tighter leading-tight md:leading-none hover:text-[var(--foreground)]">Blog</Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Tentang</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[200px] gap-4 p-4">
                      <li>
                        <NavigationMenuLink asChild>
                          <Link href="/about">Tentang</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/privacy">Kebijakan Privasi</Link>
                        </NavigationMenuLink>
                        <NavigationMenuLink asChild>
                          <Link href="/terms">Syarat & Ketentuan</Link>
                        </NavigationMenuLink>
                      </li>
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <Sun className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
                  <Moon className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-full" align="end">
                <DropdownMenuLabel>Tema</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Terang
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Gelap
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  Sistem
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <div className="md:hidden">
              <Drawer>
                <DrawerTrigger asChild>
                  <Button variant="ghost" size="icon" aria-label="Toggle Menu">
                    <MenuIcon className="h-6 w-6" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent>
                  <div className="mx-auto w-full">
                    <DrawerHeader>
                      <DrawerTitle>Menu Navigasi</DrawerTitle>
                      <DrawerDescription className="sr-only">Navigasi situs</DrawerDescription>
                    </DrawerHeader>
                    <nav className="flex flex-col gap-4 mt-8 p-4">
                      <Link href="/" className="text-lg font-medium hover:text-primary">Home</Link>
                      <Link href="/blog" className="text-lg font-medium hover:text-primary">Blog</Link>
                      <Link href="/about" className="text-lg font-medium hover:text-primary">Tentang</Link>
                      <Link href="/privacy" className="text-lg font-medium hover:text-primary">Kebijakan Privasi</Link>
                      <Link href="/terms" className="text-lg font-medium hover:text-primary">Syarat & Ketentuan</Link>
                    </nav>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          </div>
        </div>
      </Container>
    </header>
  )
}
// src/hooks/useHeaderScrollEffect.ts
import { useEffect } from 'react'

export function useScroll() {
  useEffect(() => {
    const header = document.getElementById('header')
    if (!header) return

    const scrollThreshold = 10
    let isScrolled = false

    const handleScroll = () => {
      const shouldBeScrolled = window.scrollY > scrollThreshold
      if (shouldBeScrolled !== isScrolled) {
        isScrolled = shouldBeScrolled
        header.classList.toggle('is-scrolled', isScrolled)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])
}

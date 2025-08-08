'use client'

import { motion, AnimatePresence } from 'motion/react'
import { useEffect } from 'react'
import { createPortal } from 'react-dom'

type DrawerProps = {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export default function Drawer({ isOpen, children }: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ y: '-100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="md:hidden fixed inset-x-0 top-14 z-40 bg-[var(--background)]/90 shadow-sm backdrop-blur-md p-safe pt-[env(safe-area-inset-top)] h-full">
          <div className="relative">
            {children}
          </div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}

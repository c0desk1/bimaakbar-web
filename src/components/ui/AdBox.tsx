'use client'

import { useEffect, useState, useRef } from 'react'
import { Icon } from './Icons'

type AdBoxProps = {
  adKey: string
  width?: number
  height?: number
  className?: string
}

export default function AdBox({
  adKey,
  width = 300,
  height = 250,
  className = '',
}: AdBoxProps) {
  const [visible, setVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visible || !containerRef.current) return

    const container = containerRef.current

    const scriptConfig = document.createElement('script')
    scriptConfig.type = 'text/javascript'
    scriptConfig.innerHTML = `
      atOptions = {
        'key' : '${adKey}',
        'format' : 'iframe',
        'height' : ${height},
        'width' : ${width},
        'params' : {}
      };
    `

    const scriptInvoke = document.createElement('script')
    scriptInvoke.src = `//www.highperformanceformat.com/${adKey}/invoke.js`
    scriptInvoke.type = 'text/javascript'

    container.appendChild(scriptConfig)
    container.appendChild(scriptInvoke)

    return () => {
      container.innerHTML = ''
    }
  }, [visible, adKey, width, height])

  if (!visible) return null

  return (
    <div
      className={`relative my-6 w-fit mx-auto bg-[var(--background)] border border-[var(--border)] rounded-md shadow-sm p-2 ${className}`}>
      <Icon
        onClick={() => setVisible(false)}
        aria-label="Tutup Iklan"
        className="absolute top-1 right-1 p-1 rounded hover:bg-[var(--hover)] text-[var(--muted-foreground)]">
        <svg
          aria-label="Close"
          fill="var(--foreground)"
          width={24}
          height={24}
          className="p-1">
          <title>Tutup Iklan</title>
          <use href="/images/icons.svg#close" />
        </svg>
      </Icon>
      <div
        ref={containerRef}
        style={{ width, height }}
        className="overflow-hidden"
      />
    </div>
  )
}

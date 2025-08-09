'use client'

import { useEffect, useState, useRef } from 'react'
import { Button } from './Buttons'

type AdBoxProps =
  | {
      adKey: string
      scriptSrc?: never
      containerId?: never
      width?: number
      height?: number
      className?: string
    }
  | {
      adKey?: never
      scriptSrc: string
      containerId: string
      width?: number
      height?: number
      className?: string
    }

export default function AdBox({
  adKey,
  scriptSrc,
  containerId,
  width,
  height,
  className = '',
}: AdBoxProps) {
  const [visible, setVisible] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!visible || !containerRef.current) return

    const container = containerRef.current

    if (adKey) {
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
    }

    if (scriptSrc && containerId) {
      const script = document.createElement('script')
      script.src = scriptSrc
      script.async = true
      script.setAttribute('data-cfasync', 'false')

      container.appendChild(script)

      const nativeDiv = document.createElement('div')
      nativeDiv.id = containerId
      container.appendChild(nativeDiv)
    }

    return () => {
      container.innerHTML = ''
    }
  }, [visible, adKey, scriptSrc, containerId, width, height])

  if (!visible) return null

  return (
    <div
      className={`relative overflow-hidden my-6 w-fit mx-auto bg-[var(--background)] border border-[var(--border)] rounded-[var(--radius)] shadow-sm p-1 ${className}`}>
      <Button
        onClick={() => setVisible(false)}
        variant='ghost'
        aria-label="Tutup Iklan"
        className="absolute top-1 right-1 p-1 size-8 text-[var(--muted-foreground)]">
        <svg
          aria-label="Close"
          fill="var(--foreground)"
          width={24}
          height={24}
          className="p-1">
          <title>Tutup Iklan</title>
          <use href="/images/icons.svg#close" />
        </svg>
      </Button>
      <div
        ref={containerRef}
        style={{ width, height }}
      />
    </div>
  )
}

import React from "react"

const Spacer = () => {
  return (
    <div className="relative w-full h-10">
      <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,var(--border)_0,var(--border)_1px,transparent_1px,transparent_8px)] opacity-20 pointer-events-none" />
    </div>
  )
}

export default Spacer

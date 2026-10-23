import React, { useState, useEffect, useRef } from 'react'

export default function MouseFollow() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const [followPos, setFollowPos] = useState({ x: 0, y: 0 })
  const ref = useRef(null)

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY })

      const timeout = setTimeout(() => {
        setFollowPos({ x: e.clientX, y: e.clientY })
      }, 10)

      const interval = setInterval(() => {
        const dx = mousePos.x - followPos.x
        const dy = mousePos.y - followPos.y
        const damping = 0.15

        setFollowPos({
          x: followPos.x + dx * damping,
          y: followPos.y + dy * damping,
        })

        if (Math.abs(dx) < 0.5 && Math.abs(dy) < 0.5) {
          clearInterval(interval)
          clearTimeout(timeout)
        }
      }, 16)

      return () => {
        clearInterval(interval)
        clearTimeout(timeout)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [mousePos, followPos])

  if (!ref.current) return null

  return (
    <div
      ref={ref}
      className="fixed pointer-events-none z-50 rounded-full bg-[var(--accent)] opacity-20"
      style={{ left: `${followPos.x - 8}px`, top: `${followPos.y - 8}px`, width: '16px', height: '16px' }}
    />
  )
}
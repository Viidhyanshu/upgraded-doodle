'use client'

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const BALLOON_COLORS = [
  'rgba(255, 182, 193, 0.4)',
  'rgba(173, 216, 230, 0.4)',
  'rgba(144, 238, 144, 0.4)',
  'rgba(255, 255, 224, 0.4)',
  'rgba(221, 160, 221, 0.4)',
  'rgba(239, 158, 0, 0.3)',
]

const FlyingBalloon = ({ delay, durationBase, durationRandom }: { delay: number; durationBase: number; durationRandom: number }) => {
  const color = BALLOON_COLORS[Math.floor(Math.random() * BALLOON_COLORS.length)]
  const left = `${Math.random() * 100}%`
  const size = 30 + Math.random() * 40

  return (
    <motion.div
      initial={{ top: '105%', opacity: 0 }}
      animate={{ top: '-10%', opacity: [0, 1, 1, 0.8] }}
      transition={{ 
        duration: durationBase + Math.random() * durationRandom, 
        delay, 
        repeat: Infinity, 
        ease: "linear" 
      }}
      style={{
        position: 'absolute',
        left: left,
        zIndex: 0,
        pointerEvents: 'none',
      }}
    >
      <div style={{
        width: `${size}px`,
        height: `${size * 1.3}px`,
        background: color,
        borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
        position: "relative",
        boxShadow: "inset -4px -4px 8px rgba(0,0,0,0.05)",
      }}>
        <div style={{
          position: "absolute",
          bottom: "-8px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "1.5px",
          height: "30px",
          background: "rgba(0,0,0,0.08)",
        }} />
      </div>
    </motion.div>
  )
}

export const DecorBalloon = ({ color, size = 35, delay = 0 }: { color: string; size?: number; delay?: number }) => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <motion.div
      animate={{ y: [0, -10, 0], rotate: [-2, 2, -2] }}
      transition={{ duration: 4, delay, repeat: Infinity, ease: "easeInOut" }}
      style={{ position: 'relative', width: size, height: size * 1.3, zIndex: 5 }}
    >
      <div style={{
        width: '100%',
        height: '100%',
        background: color,
        borderRadius: "50% 50% 50% 50% / 40% 40% 60% 60%",
        boxShadow: "inset -3px -3px 6px rgba(0,0,0,0.06)",
        position: 'relative'
      }}>
        {/* Reflection */}
        <div style={{ position: 'absolute', top: '15%', left: '15%', width: '25%', height: '20%', background: 'rgba(255,255,255,0.2)', borderRadius: '50%' }} />
      </div>
      {/* String */}
      <div style={{
        position: 'absolute',
        bottom: "-10px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "1px",
        height: "25px",
        background: "rgba(0,0,0,0.1)",
      }} />
    </motion.div>
  )
}

export const Sparkles = () => {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => setMounted(true), [])
  if (!mounted) return null

  return (
    <div className="absolute inset-0 pointer-events-none">
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.8, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 2 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          style={{
            position: 'absolute',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            fontSize: '12px'
          }}
        >
          ✨
        </motion.span>
      ))}
    </div>
  )
}

export default function FlyingBalloons({ count = 120, durationBase = 8, durationRandom = 6 }: { count?: number; durationBase?: number; durationRandom?: number }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {Array.from({ length: count }).map((_, i) => (
        <FlyingBalloon key={i} delay={Math.random() * 10} durationBase={durationBase} durationRandom={durationRandom} />
      ))}
    </div>
  )
}

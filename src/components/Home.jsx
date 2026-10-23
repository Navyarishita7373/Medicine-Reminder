import React from 'react'
import { motion } from 'framer-motion'
import ThreeBackground from './ThreeBackground'

export default function Home() {
  return (
    <motion.section
      className="min-h-screen relative overflow-hidden"
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.3 }}
    >
      <ThreeBackground />
      <div className="relative z-10 min-h-screen flex items-center justify-center pt-16 px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-8 items-center max-w-7xl mx-auto w-full">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold neon-text leading-tight mb-6">
              Smart Medicine Reminder
            </h1>
            <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed mb-8">
              Never miss a dose again. Our intelligent system ensures you take your medication
              on time, every time, with reliable reminders and tracking.
            </p>
            <div className="space-x-3">
              <button className="btn-primary px-8 py-3 text-lg font-medium">
                Get Started
              </button>
              <button className="btn-outline px-8 py-3 text-lg font-medium">
                Learn More
              </button>
            </div>
          </div>
          <div className="relative flex justify-center items-center">
            <motion.div
              className="glass rounded-2xl p-6 card-tilt"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" className="neon-text">
                <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                <path d="M2 17l10 5 10-5"/>
                <path d="M2 12l10 5 10-5"/>
              </svg>
            </motion.div>
            <div className="absolute -inset-2 rounded-2xl opacity-20 blur-2xl glass"></div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
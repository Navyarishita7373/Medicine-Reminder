import React, { useState } from 'react'
import { motion } from 'framer-motion'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  return (
    <motion.section
      className="min-h-screen bg-gradient-to-b from-[var(--bg)] via-[var(--bg-secondary)] to-[var(--bg-secondary)] relative z-10"
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.5 }}
    >
      <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="absolute top-0 right-0 -z-10 opacity-20">
          <svg width="400" height="400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <circle cx="12" cy="12" r="10" opacity="0.3"/>
            <path d="M8 14s1.5 2 4 2 4-2 4-2"/>
            <line x1="9" y1="9" x2="9.01" y2="9"/>
            <line x1="12" y1="17" x2="12.01" y2="17"/>
            <line x1="15" y1="12" x2="15.01" y2="12"/>
          </svg>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="self-center">
            <h2 className="text-4xl md:text-5xl font-bold neon-text mb-6">Welcome Back</h2>
            <p className="text-[var(--muted)] text-lg mb-8">
              Sign in to your account to manage your medicines
            </p>

            <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
              <div>
                <label htmlEmail className="block text-sm font-medium mb-2">Email address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3 text-focus-visible focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              <div>
                <label htmlPassword className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3 text-focus-visible focus:outline-none focus:border-[var(--accent)] transition-colors"
                />
              </div>

              <button
                type="submit"
                className="btn-primary w-full py-3 text-lg font-medium"
                disabled={loading}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="text-center text-sm mt-6 text-[var(--muted)]">
              Don't have an account? <a href="#" className="neon-text font-medium ml-1">Sign up</a>
            </p>
          </div>

          <div className="relative flex justify-center items-center">
            <motion.div
              className="glass rounded-2xl p-8 card-tilt"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <h3 className="text-2xl font-bold mb-4">Secure & Private</h3>
              <ul className="text-sm text-[var(--muted)] space-y-3">
                <li>✓ End-to-end encrypted data</li>
                <li>✓ HIPAA compliant storage</li>
                <li>✓ Secure Supabase database</li>
                <li>✓ No data shared with third parties</li>
              </ul>
            </motion.div>
            <div className="absolute -inset-2 rounded-2xl opacity-20 blur-2xl glass"></div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
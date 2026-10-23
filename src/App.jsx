import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { useSupabase } from './hooks/useSupabase'
import Home from './components/Home'
import Login from './components/Login'
import MedicineReminder from './components/MedicineReminder'
import MouseFollow from './components/MouseFollow'

function App() {
  const { supabase, user, loading } = useSupabase()
  const [page, setPage] = useState('loading')

  useEffect(() => {
    if (!loading && user) {
      setPage('medicine')
    }
  }, [user, loading])

  if (loading) {
    return (
      <motion.div
        className="min-h-screen flex items-center justify-center"
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.5 }}
      >
        <div className="glass rounded-2xl p-8 text-center">
          <div className="w-16 h-16 animate-spin rounded-full border-4 border-[var(--accent)] border-t-transparent mx-auto mb-4"></div>
          <p className="text-[var(--muted)]">Initializing...</p>
        </div>
      </motion.div>
    )
  }

  if (!user) {
    return (
      <motion.section
        className="min-h-screen bg-gradient-to-b from-[var(--bg)] via-[var(--bg-secondary)] to-[var(--bg-secondary)] relative"
        initial="hidden"
        animate="visible"
      >
        <Home />
        <Login />
        <MouseFollow />
      </motion.section>
    )
  }

  return (
    <div className="min-h-screen">
      <MouseFollow />
      <MedicineReminder supabase={supabase} />
    </div>
  )
}

export default App
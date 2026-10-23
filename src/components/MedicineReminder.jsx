import React, { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useSupabase } from '../hooks/useSupabase'
import { useMedicineReminder } from '../services/gmail.service'

export default function MedicineReminder() {
  const [medicines, setMedicines] = useState([])
  const [newMedicine, setNewMedicine] = useState('')
  const [newTime, setNewTime] = useState('')
  const [loading, setLoading] = useState(false)
  const { data, supabase } = useSupabase()
  const controls = useAnimation()
  const { sendReminder, isSending } = useMedicineReminder()

  useEffect(() => {
    fetchMedicines()
  }, [supabase])

  const fetchMedicines = async () => {
    if (!supabase) return
    const { data, error } = await supabase
      .from('medicines')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) console.error(error)
    else setMedicines(data || [])
  }

  const addMedicine = async () => {
    if (!newMedicine.trim() || !newTime.trim()) return
    setLoading(true)
    const { error } = await supabase
      .from('medicines')
      .insert([{ name: newMedicine.trim(), time: newTime.trim(), user_id: data?.user?.id }])
    if (error) console.error(error)
    else {
      setNewMedicine('')
      setNewTime('')
      fetchMedicines()
    }
    setLoading(false)
  }

  const deleteMedicine = async (id) => {
    const { error } = await supabase.from('medicines').delete().eq('id', id)
    if (error) console.error(error)
    else fetchMedicines()
  }

  const sendReminderClick = async (medicineName, time) => {
    // Get user email from supabase auth
    const userEmail = data?.user?.email
    if (!userEmail) {
      alert('Please set up your email profile first')
      return
    }
    const result = await sendReminder(medicineName, time, userEmail)
    if (!result.success) {
      alert('Failed to send email: ' + result.message)
    }
  }

  return (
    <motion.section
      className="min-h-screen bg-pattern relative"
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.5 }}
    >
      <div className="relative max-w-7xl mx-auto px-4 py-12 md:py-20">
        <nav className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold neon-text">My Medicines</h1>
              <p className="text-[var(--muted)]">Manage your medication schedule</p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => window.location.href = '/login'}
                className="px-4 py-2 bg-transparent border border-[var(--border)] rounded-lg text-sm font-medium hover:text-[var(--accent)] transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </nav>

        <AddMedicineForm
          addMedicine={addMedicine}
          newMedicine={newMedicine}
          setNewMedicine={setNewMedicine}
          newTime={newTime}
          setNewTime={setNewTime}
          loading={loading}
        />

        <div className="mt-8">
          <h2 className="text-xl font-medium neon-text mb-4">Your Medication Schedule</h2>
          {medicines.length === 0 ? (
            <p className="text-[var(--muted)]">No medicines added yet. Add your first medicine above.</p>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {medicines.map((med) => (
                <motion.div
                  key={med.id}
                  className="glass rounded-2xl p-6 card-tilt"
                  whileHover={{ scale: 1.02 }}
                  animate={{ transition: controls }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium">{med.name}</h3>
                      <p className="text-sm text-[var(--muted)]">{med.time}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => deleteMedicine(med.id)}
                        className="px-3 py-1 bg-opacity-20 hover:bg-opacity-30 rounded text-xs text-[var(--accent)] hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                      <button
                        onClick={() => sendReminderClick(med.name, med.time)}
                        className="px-3 py-1 bg-opacity-10 hover:bg-opacity-20 rounded text-xs text-[var(--neon-pink)] hover:text-[var(--neon-blue)] transition-colors"
                        disabled={isSending}
                        title={isSending ? 'Sending...' : 'Send reminder'}
                      >
                        {isSending ? 'Sending...' : 'Remind'}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.section>
  )
}

function AddMedicineForm({
  addMedicine,
  newMedicine,
  setNewMedicine,
  newTime,
  setNewTime,
  loading
}) {
  return (
    <motion.div className="glass rounded-2xl p-6 md:p-8 card-tilt">
      <h2 className="text-2xl font-bold mb-6 neon-text">Add Medicine</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          addMedicine()
        }}
      >
        <div className="grid sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-2">Medicine Name</label>
            <input
              type="text"
              value={newMedicine}
              onChange={(e) => setNewMedicine(e.target.value)}
              placeholder="e.g., Ibuprofen"
              className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3 text-focus-visible focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Time</label>
            <input
              type="time"
              value={newTime}
              onChange={(e) => setNewTime(e.target.value)}
              className="w-full bg-[var(--card)] border border-[var(--border)] rounded-lg px-4 py-3 text-focus-visible focus:outline-none focus:border-[var(--accent)] transition-colors"
            />
          </div>
        </div>

        <button
          type="submit"
          className="btn-primary w-full py-3.5 text-lg font-medium mt-4"
          disabled={loading}
        >
          {loading ? 'Adding...' : 'Add Medicine'}
        </button>
      </form>
    </motion.div>
  )
}
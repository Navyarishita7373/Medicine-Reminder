import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for use in both browser and server environments
// @see https://supabase.com/docs/guides/javascript

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
)

// Helper function to get the supabase client for the current environment
export const getSupabase = () => {
  return supabase
}

// Type for medicine entries
export type Medicine = {
  id: string
  name: string
  time: string
  created_at: string
  user_id: string | null
}
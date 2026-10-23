import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qmkalnmkmkjzsvhucetn.supabase.co'
const supabaseAnonKey = 'sb_publishable_tTPa-2YiWVourZIv5AdAGg_tHC5PLdb'

export const useSupabase = () => {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session ?? null)
      setLoading(false)
    })

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session ?? null)
        setLoading(false)
      }
    )

    return () => subscription.unsubscribe()
  }, [supabase])

  return { supabase, user, loading }
}
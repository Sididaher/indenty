import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

// Debug: Log if environment variables are missing
if (!supabaseURL || !supabaseKey) {
  console.error('Supabase configuration missing!')
  console.error('URL:', supabaseURL ? 'Present' : 'Missing')
  console.error('Key:', supabaseKey ? 'Present' : 'Missing')
} else {
  console.log('Supabase configured with URL:', supabaseURL)
}

export const supabase = createClient<Database>(supabaseURL, supabaseKey)

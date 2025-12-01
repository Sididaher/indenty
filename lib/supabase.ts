import { createClient } from "@supabase/supabase-js"
import type { Database } from "./database.types"

const supabaseURL = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ""

export const supabase = createClient<Database>(supabaseURL, supabaseKey)

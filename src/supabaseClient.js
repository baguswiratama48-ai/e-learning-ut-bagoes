import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qlxjbwuaxgbdooyupvnx.supabase.co'
const supabaseKey = 'sb_secret_g7DAi-3P9eGzrZSvhhJeAQ_I0BYxD2X' 

// We initialize it here. If the key is just a database password or invalid token, 
// the requests will fail but we'll try to use it as an anon key/service key for now per user instruction.
export const supabase = createClient(supabaseUrl, supabaseKey)

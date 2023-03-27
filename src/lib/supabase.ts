import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;


if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error('Supabase URL is not defined');
  }

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const auth = supabase.auth;

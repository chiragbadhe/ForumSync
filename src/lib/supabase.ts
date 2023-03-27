import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zsjiuccapdvtwrehztwk.supabase.co" ;
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inpzaml1Y2NhcGR2dHdyZWh6dHdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2Nzk5MTMzMzYsImV4cCI6MTk5NTQ4OTMzNn0.wM5rXpJNlil7zu27la3d4FX_9ZOfx9ApXdYXYfU9xJo";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
export const auth = supabase.auth;

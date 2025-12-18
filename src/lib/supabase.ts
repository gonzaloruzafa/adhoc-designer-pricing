import { createClient, SupabaseClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "";

// Verificar si Supabase está configurado
export const isSupabaseConfigured = !!(supabaseUrl && supabaseAnonKey);

// Solo crear el cliente si está configurado
let supabaseInstance: SupabaseClient | null = null;

export const supabase = (() => {
  if (!isSupabaseConfigured) {
    // Return a mock client for build time
    return null;
  }
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseAnonKey);
  }
  return supabaseInstance;
})();

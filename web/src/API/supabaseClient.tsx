import { createClient } from "@supabase/supabase-js";

//const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
//const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = "https://urijtkwkfqqlipbitncp.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVyaWp0a3drZnFxbGlwYml0bmNwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzMTA3NjUsImV4cCI6MjA3Njg4Njc2NX0.xp4SG2bkIygP5dosQemScXtmnWL8baH8Fdlm3WxpSk0";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

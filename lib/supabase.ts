import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://zprcvgohvoplafpqfoax.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwcmN2Z29odm9wbGFmcHFmb2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMDkxNzUsImV4cCI6MjEwMjU4NTE3NX0.gPZvGmjTVyjB6zP4L1yDL56qrZ3i_GEoFmGW5rRCpDk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

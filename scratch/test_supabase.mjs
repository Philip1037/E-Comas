import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://zprcvgohvoplafpqfoax.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpwcmN2Z29odm9wbGFmcHFmb2F4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODcwMDkxNzUsImV4cCI6MjEwMjU4NTE3NX0.gPZvGmjTVyjB6zP4L1yDL56qrZ3i_GEoFmGW5rRCpDk';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function test() {
  console.log('--- Testing Supabase Tables ---');

  // Test 1: Products
  const { data: prods, error: prodErr } = await supabase.from('products').select('*');
  console.log('Products count:', prods?.length, 'Error:', prodErr);

  // Test 2: Settings
  const { data: settings, error: setErr } = await supabase.from('boutique_settings').select('*');
  console.log('Settings data:', settings, 'Error:', setErr);

  // Test 3: Try Upserting Settings
  const { data: upsertData, error: upsertErr } = await supabase.from('boutique_settings').upsert({
    id: 1,
    brand_name: 'MAISON LUMIÈRE',
    admin_username: 'admin@boutique.sl',
    admin_password: 'admin123',
  });
  console.log('Upsert Settings Error:', upsertErr);
}

test();

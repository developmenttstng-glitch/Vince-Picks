import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://yzndgrdgeozoixiipyts.supabase.co'
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl6bmRncmRnZW96b2l4aWlweXRzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODMxMzUzMDAsImV4cCI6MjA5ODcxMTMwMH0.tAsW5E7PSrCucJVN1mh_aJ7KMOW4UmzbLpiwSSf1X-s'

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

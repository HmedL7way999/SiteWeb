const SUPABASE_URL = "https://nkouynefoebxtebrgshq.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5rb3V5bmVmb2VieHRlYnJnc2hxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk3OTU1NzMsImV4cCI6MjA4NTM3MTU3M30.O63zzlMJn46ifVX-_P5xVBBqtbDMsXI5SkhFuoi2xfg";

// Ne pas toucher en dessous
window.supabaseClient = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

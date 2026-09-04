const url = 'https://byousszxjxkxnljnqekz.supabase.co';
const key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ5b3Vzc3p4anhreG5sam5xZWt6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzk1NDM3MDAsImV4cCI6MjA5NTExOTcwMH0.HMXfPDgL8unh-fWK6yNmOhBoXHu9XDsUGYNP_99--tc';

async function check() {
  const res = await fetch(`${url}/rest/v1/transactions?select=user_id`, {
    headers: {
      'apikey': key,
      'Authorization': `Bearer ${key}`
    }
  });
  
  if (!res.ok) {
     console.log("Error:", await res.text());
     return;
  }
  
  const data = await res.json();
  console.log("Total txns:", data.length);
  if (data.length > 0) {
    const ids = [...new Set(data.map(d => d.user_id))];
    console.log("User IDs in DB:", ids);
  }
}

check();

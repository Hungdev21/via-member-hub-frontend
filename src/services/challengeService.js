const BASE_API = import.meta.env.VITE_API_URL;


// Fetch Comment Challenges
export async function fetchCommentChallenges() {
  try {
    const res = await fetch(`${BASE_API}/challenges`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load comment challenges`);
    
    const data = await res.json();
    return (data.data || []).filter(ch => ch.type === 'comment');
  } catch (error) {
    throw new Error(error.message || 'Failed to load comment challenges');
  }
}

// Fetch Events
export async function fetchEvents() {
  try {
    const res = await fetch(`${BASE_API}/events`);
    if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load events`);
    
    const data = await res.json();
    return Array.isArray(data.data) ? data.data : [];
  } catch (error) {
    throw new Error(error.message || 'Failed to load events');
  }
}

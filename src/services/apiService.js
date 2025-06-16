const BASE_URL = import.meta.env.VITE_API_URL;

// Hàm fetch chung
async function fetchData(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  const json = await res.json();
  return json?.data || [];
}

// Lấy tất cả challenge
export async function fetchChallengesByType(type) {
  const list = await fetchData('/api/challenges');
  return list.filter(ch => ch.type === type);
}

// Chỉ lấy challenge type "comment"
export function fetchCommentChallenges() {
  return fetchChallengesByType('comment');
}

// Chỉ lấy challenge type "event"
export function fetchEventChallenges() {
  return fetchChallengesByType('event');
}

// Lấy danh sách sự kiện (dùng riêng ở trang chính)
export function fetchEvents() {
  return fetchData('/events');
}

// Lấy chi tiết sự kiện theo ID
export async function fetchEventDetailById(id) {
  const res = await fetch(`${BASE_URL}/api/events/${id}`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  const json = await res.json();
  return json?.data || json;
}

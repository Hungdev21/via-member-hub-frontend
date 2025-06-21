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

// Lấy danh sách challenges gốc từ API chính thức
export async function fetchChallenges() {
  return fetchData('api/challenges');
}

// Lấy danh sách member-challenges (thử thách mà thành viên đã tham gia)
export async function fetchMemberChallenges() {
  return fetchData('api/member-challenges');
}

// JOIN dữ liệu challenges + member-challenges theo post_challenge_id (nhận vào community_member_id)
export async function fetchChallengesWithMemberData(communityMemberId) {
  const [challenges, memberChallenges] = await Promise.all([
    fetchChallenges(),
    fetchMemberChallenges(),
  ]);

  const memberMap = new Map();
  memberChallenges.forEach(mc => {
    if (mc.community_member_id === communityMemberId) {
      memberMap.set(mc.post_challenge_id, {
        joined: mc.joined,
        commented: mc.commented,
      });
    }
  });

  return challenges.map(ch => {
    const userStatus = memberMap.get(ch.post_challenge_id);
    return {
      ...ch,
      // Dữ liệu hiển thị
      title: ch.title || ch.post?.ten_posts || `Challenge #${ch.post_challenge_id}`,
      description: ch.description || ch.post?.body?.replace(/<[^>]*>/g, '')?.slice(0, 150) || '',
      user_challenges: userStatus
        ? [{ joined: userStatus.joined, commented: userStatus.commented }]
        : [],
    };
  });
}

// Chỉ lấy challenge type "comment" và ghép dữ liệu user_challenges
export async function fetchJoinedCommentChallenges(communityMemberId) {
  const all = await fetchChallengesWithMemberData(communityMemberId);
  return all.filter(item => item.type === 'comment');
}

// Lấy tất cả challenge
export async function fetchChallengesByType(type) {
  const list = await fetchData('api/challenges');
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
  return fetchData('api/events');
}

// Lấy chi tiết sự kiện theo ID
export async function fetchEventDetailById(id) {
  const res = await fetch(`${BASE_URL}api/events/${id}`);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  const json = await res.json();
  return json?.data || json;
}

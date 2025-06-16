const token = localStorage.getItem('token'); // hoặc lấy từ Vuex/Pinia

const res = await fetch(`${BASE_URL}api/events`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // Gửi token ở đây
  }
});

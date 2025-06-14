<template>
  <div v-if="event" class="max-w-3xl mx-auto p-4 flex flex-col gap-8 font-sans">
    <!-- Banner -->
    <div class="overflow-hidden rounded-xl">
      <img :src="event.cover_image_url" :alt="event.ten_events"
        class="w-full max-h-[400px] object-cover rounded-xl transition-transform duration-300 hover:scale-105" />
    </div>

    <!-- Title & Description -->
    <h1 class="text-3xl font-bold text-left dark:text-white">{{ event.ten_events }}</h1>
    <p class="text-lg text-gray-600 dark:text-gray-300 text-left">{{ event.description }}</p>

    <!-- Back Button -->
    <div class="mt-4">
      <button
        @click="$router.push('/')"
        class="w-full sm:w-auto flex justify-center sm:inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 text-sm sm:text-base bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors duration-300"
      >
        <font-awesome-icon icon="arrow-left" />
        Back
      </button>
    </div>
  </div>

  <!-- Error -->
  <div v-else-if="errorMessage" class="text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 p-4 rounded-lg text-center">
    {{ errorMessage }}
  </div>

  <!-- Loading Spinner -->
  <div v-else class="text-center p-8 text-gray-500 dark:text-gray-300 font-medium">
    <svg class="animate-spin h-6 w-6 mx-auto text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none"
         viewBox="0 0 24 24">
      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
      <path class="opacity-75" fill="currentColor"
            d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
    </svg>
    <p class="mt-2">Đang tải chi tiết sự kiện...</p>
  </div>
</template>

<script>
export default {
  name: 'ComEventDetail',
  data() {
    return {
      event: null,
      errorMessage: ''
    };
  },
  mounted() {
    this.fetchEventDetail();
  },
  methods: {
    async fetchEventDetail() {
      const id = this.$route.params.id;
      const apiUrl = import.meta.env.VITE_API_URL;
      try {
        const response = await fetch(`${apiUrl}/events/${id}`);
        if (!response.ok) {
          throw new Error(`Lỗi HTTP: ${response.status}`);
        }
        const data = await response.json();
        this.event = data.data || data;
      } catch (error) {
        console.error('Lỗi khi tải chi tiết sự kiện:', error);
        this.errorMessage = 'Không thể tải chi tiết sự kiện. Vui lòng thử lại sau.';
      }
    },
  },
};
</script>

<style scoped>
/* Bạn có thể thêm style tùy ý nếu cần */
</style>

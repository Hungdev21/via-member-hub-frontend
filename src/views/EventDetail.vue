<template>
  <!--  Skeleton Loading -->
  <div v-if="loading" class="max-w-3xl mx-auto p-4 flex flex-col gap-8 font-sans animate-pulse">
    <div class="h-[240px] bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
    <div class="h-8 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
    <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-full"></div>
    <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-5/6"></div>
    <div class="h-4 bg-gray-200 dark:bg-gray-600 rounded w-2/3"></div>
    <div class="h-10 w-32 bg-gray-300 dark:bg-gray-700 rounded-full mt-6"></div>
  </div>

  <!-- Real Content -->
  <div v-else-if="event" class="max-w-3xl mx-auto p-4 flex flex-col gap-8 font-sans">
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
      <button @click="$router.push('/')" class="w-full sm:w-auto flex justify-center sm:inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3
         text-sm sm:text-base bg-red-600 text-white rounded-full hover:bg-red-700 transition-colors duration-300">
        <font-awesome-icon icon="arrow-left" />
        Back
      </button>


    </div>
  </div>

  <!--  Error -->
  <div v-else-if="errorMessage"
    class="text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 p-4 rounded-lg text-center">
    {{ errorMessage }}
  </div>
</template>

<script>
import { fetchEventDetailById } from '../services/apiService';

export default {
  name: 'ComEventDetail',
  data() {
    return {
      event: null,
      errorMessage: '',
      loading: true
    };
  },
  mounted() {
    this.loadEventDetail();
  },
  methods: {
    async loadEventDetail() {
      const id = this.$route.params.id;
      try {
        const event = await fetchEventDetailById(id);
        this.event = event;
      } catch (error) {
        console.error('Lỗi khi tải chi tiết sự kiện:', error);
        this.errorMessage = 'Unable to load event details. Please try again later.';
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
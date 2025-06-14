<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 font-sans text-gray-800 dark:text-gray-100">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <h2 class="text-3xl font-bold mb-8">Upcoming Events</h2>

      <!-- Error -->
      <div v-if="error" class="text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 p-4 rounded-lg">
        {{ error }}
      </div>

      <!-- Loading Placeholder -->
      <div v-else-if="loading" class="grid gap-6">
        <div v-for="n in 3" :key="n" class="animate-pulse bg-white dark:bg-gray-800 rounded-xl h-[200px]"></div>
      </div>

      <!-- Event list -->
      <div v-else class="flex flex-col gap-10">
        <div
          v-for="event in events"
          :key="event.event_id"
          class="bg-white dark:bg-gray-800 shadow-md rounded-xl transition-shadow duration-200 hover:shadow-lg p-4 sm:p-6 space-y-6"
        >
          <div class="p-4 sm:p-6">
            <img
              :src="event.cover_image_url"
              alt="Event Banner"
              class="w-full max-h-[300px] object-cover rounded-xl mb-4 cursor-pointer"
              loading="lazy"
              @click="goToDetail(event.event_id)"
            />
            <h2
              class="text-2xl font-bold mb-2 text-indigo-700 dark:text-indigo-300 cursor-pointer"
              @click="goToDetail(event.event_id)"
            >
              {{ event.ten_events }}
            </h2>
            <p
              class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-4 cursor-pointer"
              @click="goToDetail(event.event_id)"
            >
              {{ event.description }}
            </p>
            <span
              class="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              @click="goToDetail(event.event_id)"
            >
              More Details
            </span>
          </div>

          <hr class="border-t border-gray-300 dark:border-gray-600 my-4" />

          <!-- Event Card -->
          <Event1Card
            :id="event.event_id"
            :day="getDay(event.starts_at)"
            :month="getMonth(event.starts_at)"
            :title="event.ten_events"
            :time="formatDateRange(event.starts_at, event.ends_at)"
            :price="formatPrice(event.price)"
            :location="event.in_person_location"
            :mapUrl="event.location_URL"
            :mapImage="event.cover_image_url"
            :organizer="event.host"
            :description="event.description"
            :maxParticipants="event.max_attendees"
            :currentParticipants="event.current_attendees"
            :status="event.status === 'upcoming' ? 'open' : 'closed'"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Event1Card from '../components/Event1Card.vue';

const BASE_URL = import.meta.env.VITE_API_URL;

export default {
  name: 'ComEvent',
  components: {
    Event1Card,
  },
  data() {
    return {
      events: [],
      loading: true,
      error: null,
    };
  },
  created() {
    this.fetchEventData();
  },
  methods: {
    async fetchEventData() {
      try {
        const response = await fetch(`${BASE_URL}/events`);
        if (!response.ok) throw new Error('Không thể tải dữ liệu sự kiện.');
        const data = await response.json();
        this.events = Array.isArray(data.data) ? data.data : [];
      } catch (err) {
        this.error = err.message;
      } finally {
        this.loading = false;
      }
    },
    formatDateRange(start, end) {
      const s = new Date(start).toLocaleString('vi-VN', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
      const e = new Date(end).toLocaleString('vi-VN', {
        dateStyle: 'short',
        timeStyle: 'short',
      });
      return `${s} → ${e}`;
    },
    formatPrice(price) {
      if (!price || price.toLowerCase().includes('miễn phí')) return 'Miễn phí';
      const numeric = price.replace(/[^\d]/g, '');
      return Number(numeric).toLocaleString('vi-VN') + '₫';
    },
    getDay(dateStr) {
      return new Date(dateStr).getDate();
    },
    getMonth(dateStr) {
      return new Date(dateStr).toLocaleDateString('vi-VN', { month: 'short' });
    },
    goToDetail(id) {
      this.$router.push(`/event/${id}`);
    },
  },
};
</script>

<style scoped>
.line-clamp-4 {
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>

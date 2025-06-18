<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 py-8 font-sans text-gray-800 dark:text-gray-100">
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
      <h2 class="text-3xl font-bold mb-8">Upcoming Events</h2>

      <!-- Error -->
      <div v-if="error"
        class="text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300 p-4 rounded-lg text-center font-medium">
        An error has occurred. Please try again later.
      </div>


      <!-- Skeleton loading -->
      <div v-else-if="loading" class="grid gap-6">
        <div v-for="n in 3" :key="n"
          class="animate-pulse bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4 transition-shadow duration-200">
          <div class="h-48 bg-gray-200 dark:bg-gray-700 rounded-xl w-full"></div>
          <div class="h-6 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
          <div class="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
        </div>
      </div>

      <!-- Event list -->
      <div v-else class="flex flex-col gap-10">
        <div v-for="event in events" :key="event.event_id"
          class="bg-white dark:bg-gray-800 shadow-md rounded-xl transition-all duration-300 ease-in-out transform hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] hover:bg-gray-50 dark:hover:bg-gray-700 p-4 sm:p-6 space-y-6 cursor-pointer">
          <div class="p-4 sm:p-6">
            
            <img :src="event.cover_image_url" alt="Event Banner"
              class="w-full max-h-[300px] object-cover rounded-xl mb-4 cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.01]"
              loading="lazy" @click="goToDetail(event.event_id)" />

            <h2 class="text-2xl font-bold mb-2 text-black cursor-pointer" @click="goToDetail(event.event_id)">
              {{ event.ten_events }}
            </h2>

            <p class="text-gray-600 dark:text-gray-300 mb-4 line-clamp-4 cursor-pointer" @click="goToDetail(event.id)">
              {{ event.description }}
            </p>
            
           <span
  class="text-red-700 dark:text-red-500 hover:underline cursor-pointer"
  @click="goToDetail(event.event_id)"
>
  More Details...
</span>


          </div>
          <hr class="border-t border-gray-300 dark:border-gray-600 my-4" />
          <Event1Card :id="event.event_id" :day="getDay(event.starts_at)" :month="getMonth(event.starts_at)"
            :title="event.ten_events" :time="formatDateRange(event.starts_at, event.ends_at)" :price="event.price"
            :location="event.in_person_location" :mapUrl="event.location_URL" :mapImage="event.cover_image_url"
            :organizer="event.host" :description="event.description" :maxParticipants="event.max_attendees"
            :currentParticipants="event.current_attendees" :status="event.status === 'upcoming' ? 'open' : 'closed'" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Event1Card from '../components/Event1Card.vue';
import { fetchEvents } from '../services/apiService';

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
  async created() {
    this.loading = true;
    try {
      this.events = await fetchEvents();
    } catch (err) {
      this.error = true;
    } finally {
      this.loading = false;
    }
  },
  methods: {
    formatDateRange(start, end) {
      return `${start} → ${end}`;
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
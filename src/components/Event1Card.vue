<template>
  <div class="bg-white">
    <div class="flex flex-col sm:flex-row justify-between items-start mb-4 gap-4">
      <div class="flex flex-col sm:flex-row items-start gap-4">
        <div class="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 text-center min-w-[60px]">
          <div class="text-2xl font-bold text-gray-800 dark:text-gray-100">{{ day }}</div>
          <div class="text-sm text-gray-600 dark:text-gray-300 uppercase">{{ month }}</div>
        </div>
        <div>
          <h3 class="text-xl font-semibold text-gray-800 dark:text-white">{{ title }}</h3>
          <p class="text-gray-600 dark:text-gray-300">{{ time }}</p>
          <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">Organized by: {{ organizer }}</p>
        </div>
      </div>

      <div class="flex flex-row gap-4 items-center">
        <!-- Price với icon -->
        <div
          class="flex items-center gap-1 px-3 py-1.5 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-full text-sm font-medium">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-gray-600 dark:text-gray-300" viewBox="0 0 24 24"
            fill="currentColor">
            <path
              d="M4 4h16v3a2 2 0 100 4v2a2 2 0 100 4v3H4v-3a2 2 0 100-4v-2a2 2 0 100-4V4zm2 2v1.126a4.001 4.001 0 010 7.748V16h12v-1.126a4.001 4.001 0 010-7.748V6H6z" />
          </svg>
          <span>{{ formatPrice(price) }}</span>
        </div>
        <!-- Nút RSVP -->
        <button
          class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition-colors duration-300"
          :disabled="status !== 'open'" :class="{ 'opacity-50 cursor-not-allowed': status !== 'open' }">
          {{ status === 'open' ? 'RSVP' : 'Closed' }}
        </button>
      </div>
    </div>


    <div class="flex flex-col sm:flex-row items-start mt-4 gap-4">
      <div class="w-full sm:w-48 h-32">
        <iframe :src="embedMapUrl" class="w-full h-full rounded shadow" frameborder="0" allowfullscreen loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"></iframe>
      </div>
      <div class="flex-1">
        <h4 class="font-semibold text-gray-800 dark:text-white mb-2">{{ location }}</h4>
        <p class="text-gray-600 dark:text-gray-300">{{ address }}</p>
        <p class="text-gray-600 dark:text-gray-300 mt-2">{{ description }}</p>
        <a :href="mapUrl" target="_blank"
          class="text-red-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 mt-2 inline-block transition-colors duration-300">
          View Map
        </a>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue';

function formatPrice(price) {
  if (!price || price.toLowerCase().includes('miễn phí')) return 'Miễn phí';

  // Lấy số từ chuỗi kiểu '200,000 VND'
  const numericPart = price.replace(/[^\d]/g, '');

  const formatted = Number(numericPart).toLocaleString('vi-VN') + '₫';
  return formatted;
}

const props = defineProps({
  id: Number,
  day: String,
  month: String,
  title: String,
  time: String,
  price: Number,
  location: String,
  address: String,
  mapUrl: {
    type: String,
    default: ''
  },
  organizer: String,
  description: String,
  maxParticipants: Number,
  currentParticipants: Number,
  status: {
    type: String,
    validator: (value) => ['open', 'closed'].includes(value),
    required: true
  }
});

const embedMapUrl = computed(() => {
  if (!props.mapUrl) return '';
  const match = props.mapUrl.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);
  if (match) {
    const lat = match[1];
    const lng = match[2];
    return `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;
  }
  return '';
});
</script>

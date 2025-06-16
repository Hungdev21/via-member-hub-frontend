<template>
  <!-- Loading skeleton -->
  <div v-if="loading"
    class="rounded-2xl p-6 mb-6 bg-white/70 dark:bg-gray-800 animate-pulse overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm relative space-y-4">
    <div class="h-6 w-3/4 bg-gray-200 dark:bg-gray-600 rounded"></div>
    <div class="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
    <div class="h-4 w-1/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
    <div class="flex items-center justify-between">
      <div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
    <div class="h-10 w-32 bg-gray-300 dark:bg-gray-600 rounded-full mt-4"></div>
  </div>

  <!-- Main component -->
  <div v-else
    class="relative rounded-2xl p-6 mb-6 backdrop-blur-sm bg-white/90 border border-white/20 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-500 hover:-translate-y-1 group overflow-hidden active:scale-95"
    :class="{
      'opacity-80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-gray-100/20 before:to-gray-50': status === 'done',
      'border-l-4 border-green-500': joined
    }" @click="handleItemClick">
    <!-- Hover light effect -->
    <div
      class="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

    <!-- Check icon -->
    <div v-if="joined" class="absolute top-2 right-2 text-green-500">
      <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <div class="relative z-10">
      <!-- Title & Expired -->
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
        <h3
          class="text-gray-900 font-bold text-xl leading-tight group-hover:text-indigo-600 transition-colors bg-clip-text bg-gradient-to-r from-gray-800 to-gray-900">
          {{ title }}
        </h3>

        <div class="flex items-center" v-if="!joined && dueDate">
          <span v-if="status === 'done'" class="text-emerald-600 flex items-center"></span>
          <span v-else-if="dueDate"
            class="text-rose-600 flex items-center bg-rose-50/80 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm border border-rose-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
            </svg>
            Expired: {{ formattedDueDate }}
          </span>
        </div>
      </div>

      <!-- Location -->
      <div v-if="location"
        class="text-gray-600 mb-4 flex items-center text-sm bg-gray-50/80 px-3 py-1.5 rounded-full w-max border border-gray-100 shadow-sm">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-gray-500 mr-2" viewBox="0 0 20 20"
          fill="currentColor">
          <path fill-rule="evenodd" clip-rule="evenodd"
            d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" />
        </svg>
        {{ location }}
      </div>

      <!-- Reward & Participation status -->
      <div class="flex justify-between items-center">
        <div
          class="text-amber-700 flex items-center px-4 py-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full text-sm font-medium border border-amber-100 shadow-sm">
          <svg v-if="rewardType === 'points'" xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5 text-yellow-400"
            viewBox="0 0 20 20" fill="currentColor">
            viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <svg v-else xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 010 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17C5.06 5.687 5 5.35 5 5zm4 1V5a1 1 0 10-1 1h1zm3 0a1 1 0 10-1-1v1h1z" />
          </svg>
          <span>{{ rewardType === 'points' ? rewardValue + ' Point' : 'Voucher' }}</span>
        </div>

        <div v-if="!joined">
          <span class="text-gray-500 text-sm bg-gray-50/80 px-3 py-1.5 rounded-full border border-gray-100 shadow-sm">
            Not Joined
          </span>
        </div>
      </div>

      <!-- Buy Ticket button -->
      <div v-if="!joined" class="mt-5 text-right">
        <button
          class="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-indigo-600 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:from-indigo-600 hover:to-indigo-700 group"
          @click.stop="handleAction">
          <span class="relative z-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v2a2 2 0 100 4v2a2 2 0 01-2 2H4a2 2 0 01-2-2v-2a2 2 0 100-4V6z" />
            </svg>
            Buy Ticket
          </span>
          <span
            class="absolute inset-0 bg-gradient-to-br from-indigo-600 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventItem',
  props: {
    title: String,
    reward: Object,
    dueDate: [String, Date],
    status: { type: String, default: 'pending' },
    joined: { type: Boolean, default: false },
    ticketPurchased: Boolean,
    location: String,
    postId: [String, Number],
    loading: Boolean
  },
  computed: {
    rewardType() {
      return this.reward.type;
    },
    rewardValue() {
      return this.reward.value || 0;
    },
    formattedDueDate() {
      if (!this.dueDate) return '';
      const date = new Date(this.dueDate);
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }

  },
  methods: {
    handleItemClick() {
      if (this.status === 'done' && this.joined && this.postId) {
        this.$router.push(`/post/${this.postId}/comment`);
      }
    },
    handleAction() {
      if (!this.joined) {
        alert('Bạn đã tham gia thử thách!');
      } else if (this.postId) {
        this.$router.push(`/post/${this.postId}/comment`);
      }
    }
  }
};
</script>

<style scoped>
@keyframes shine {
  to {
    transform: translateX(100%) skewX(-12deg);
  }
}

.animate-shine {
  animation: shine 1.5s infinite;
}

.group:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
</style>

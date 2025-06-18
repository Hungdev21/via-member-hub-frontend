<template>
  <!-- Skeleton loading -->
  <div v-if="loading"
    class="rounded-2xl p-4 sm:p-6 mb-6 bg-white/70 dark:bg-gray-800 animate-pulse overflow-hidden border border-gray-200 dark:border-white/10 shadow-sm space-y-4">
    <div class="h-6 w-3/4 bg-gray-200 dark:bg-gray-600 rounded"></div>
    <div class="h-4 w-1/2 bg-gray-200 dark:bg-gray-700 rounded"></div>
    <div class="h-4 w-2/3 bg-gray-200 dark:bg-gray-700 rounded"></div>
    <div class="flex items-center justify-between">
      <div class="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
      <div class="h-4 w-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
    </div>
    <div class="h-10 w-32 bg-gray-300 dark:bg-gray-600 rounded-full mt-4"></div>
  </div>

  <!-- Nội dung -->
  <div v-else class="mb-6">
    <div
  class="relative rounded-2xl overflow-hidden cursor-pointer h-full flex flex-col border border-white/20 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-1 group py-4 sm:py-6">


      <!-- Hover ánh sáng -->
      <div
        class="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

      <!-- Góc phải: Reward + Đã tham gia -->
     <div class="absolute top-1 right-2 flex items-center space-x-2"
     v-if="post.reward || challengeStatus !== 'not_joined'">

           <!-- Reward -->
        <div v-if="post.reward"
          class="reward-points flex items-center px-2.5 py-1.5 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm shadow-sm text-xs sm:text-sm">
          <svg class="h-4 w-4 sm:h-5 sm:w-5 text-yellow-400 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
            <path
              d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
          <span :class="['font-medium', challengeStatus === 'not_joined' ? 'text-black' : 'text-red-600']">
            {{ rewardText }}
          </span>
        </div>
     

        <!-- Tích xanh nếu đã tham gia -->
        <div v-if="challengeStatus !== 'not_joined'" class="text-green-500">
          <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
      </div>

      <!-- Thumbnail -->
      <div v-if="post.thumbnail" class="thumbnail-container h-48 sm:h-56 md:h-64 overflow-hidden relative">
        <img :src="post.thumbnail" alt="Post thumbnail"
          class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
        <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      </div>

      <!-- Nội dung -->
      <div class="p-4 sm:p-5 md:p-6 flex-grow flex flex-col">
        <h3 class="title font-bold mb-3 text-base sm:text-lg md:text-xl lg:text-2xl pr-14 line-clamp-2
         text-black group-hover:text-red-600 transition-colors duration-300">
          {{ post.title }}
        </h3>

        <!-- Hạn -->
        <div class="challenge-info flex items-center justify-between mb-4">
          <div v-if="post.dueDate && post.status !== 'done'"
            class="due-date flex items-center text-sm bg-gradient-to-br from-rose-50 to-rose-100 px-3 py-1.5 rounded-full border border-rose-100 shadow-sm">
            <svg class="h-4 w-4 text-rose-500 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                clip-rule="evenodd" />
            </svg>
            <span class="text-rose-700">Expired: {{ formattedDueDate }}</span>
          </div>
        </div>

        <p class="text-sm sm:text-base text-gray-600 mb-5 line-clamp-3 flex-grow">{{ post.excerpt }}</p>

        <!-- Nút hành động -->
        <div class="flex justify-end mt-auto">
          <button
            class="action-button px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 relative overflow-hidden group"
            :class="buttonClass" @click.stop="handleAction">
            <span class="relative z-10 flex items-center justify-center">
              {{ buttonText }}
              <svg v-if="challengeStatus === 'joined_needs_comment' || challengeStatus === 'not_joined'"
                class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                  d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z"
                  clip-rule="evenodd" />
              </svg>
              <svg v-else-if="challengeStatus === 'completed'" class="h-4 w-4 ml-2" viewBox="0 0 20 20"
                fill="currentColor">
                <path fill-rule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd" />
              </svg>
            </span>
            <span
              class="absolute inset-0 bg-gradient-to-r opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              :class="buttonHoverClass"></span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostItem',
  props: {
    post: { type: Object, required: true, default: () => ({}) },
    loading: { type: Boolean, default: false }
  },
  computed: {
    rewardText() {
      if (this.post.reward?.type === 'points') return `${this.post.reward.value} Points`;
      return this.post.reward?.type === 'voucher' ? 'Voucher' : '';
    },
    formattedDueDate() {
      if (!this.post.dueDate) return '';
      const date = new Date(this.post.dueDate);
      return date.toLocaleDateString('en-US', {
        year: 'numeric', month: 'long', day: 'numeric'
      });
    },
    userJoined() {
      return this.post.user_challenges?.[0]?.joined || false;
    },
    userCommented() {
      return this.post.user_challenges?.[0]?.commented || false;
    },
    challengeStatus() {
      if (!this.userJoined) return 'not_joined';
      if (this.post.status === 'done') return 'completed';
      if (this.post.requiresComment && !this.userCommented) return 'joined_needs_comment';
      return 'joined';
    },
    buttonText() {
      // Hiển thị "Comment on this post" cả khi chưa tham gia
      if (this.challengeStatus === 'not_joined' || this.challengeStatus === 'joined_needs_comment') {
        return 'Comment on this post';
      }
      if (this.challengeStatus === 'completed') return 'View Details';
      return 'View Progress';
    },
    buttonClass() {
      return 'bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-md';
    },
    buttonHoverClass() {
      return 'from-red-500 to-red-600';
    }
  },
  methods: {
    handleAction() {
      if (this.challengeStatus === 'not_joined' || this.challengeStatus === 'joined_needs_comment') {
        this.$router.push(`/comment/${this.post.id}`);
      } else if (this.challengeStatus === 'completed') {
        this.$router.push(`/post/${this.post.id}/detail`);
      } else {
        this.$emit('action', this.post);
      }
    }

  }
};
</script>

<style scoped>
.thumbnail-container {
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bg-clip-text {
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.action-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}
</style>
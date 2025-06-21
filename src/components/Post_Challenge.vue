<template>
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

  <div v-else
    class="relative rounded-2xl p-6 mb-6 backdrop-blur-sm bg-white/90 border border-white/20 shadow-lg hover:shadow-xl cursor-pointer transition-all duration-500 hover:-translate-y-1 group overflow-hidden active:scale-95"
    :class="{
      'opacity-80 before:absolute before:inset-0 before:bg-gradient-to-br before:from-gray-100/20 before:to-gray-50': challengeStatus === 'completed',
      'border-l-4 border-green-500': userJoined
    }">

    <!-- Hover ánh sáng -->
    <div class="absolute inset-0 bg-gradient-to-br from-white/30 via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

    <!-- Góc phải: Reward + Check -->
    <div v-if="userJoined" class="absolute top-2 right-2 flex items-center space-x-2">
      <div
        class="flex items-center px-3 py-1 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full text-xs font-medium border border-amber-100 shadow-sm text-red-600">
        <svg v-if="rewardType === 'points'" xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1 text-yellow-400"
          viewBox="0 0 20 20" fill="currentColor">
          <path
            d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
        <span>{{ rewardText }}</span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-green-500" fill="none" viewBox="0 0 24 24"
        stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
      </svg>
    </div>

    <!-- Nội dung -->
    <div class="relative z-10">
      <div class="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-4 gap-2">
        <h3 class="text-black font-bold text-xl leading-tight group-hover:text-red-600 transition-colors duration-300">
          {{ post.title }}
        </h3>

        <div class="flex flex-col sm:flex-row sm:items-center sm:gap-3 gap-2" v-if="!userJoined && post.dueDate">
          <div
            class="flex items-center px-4 py-2 bg-gradient-to-br from-amber-50 to-amber-100 rounded-full text-sm font-medium border border-amber-100 shadow-sm text-black">
            <svg v-if="rewardType === 'points'" xmlns="http://www.w3.org/2000/svg"
              class="h-5 w-5 mr-1.5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span>{{ rewardText }}</span>
          </div>

          <span
            class="text-rose-600 flex items-center bg-rose-50/80 px-3 py-1.5 rounded-full text-sm backdrop-blur-sm border border-rose-100">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" clip-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" />
            </svg>
            Expired: {{ formattedDueDate }}
          </span>
        </div>
      </div>

      <p class="text-sm text-gray-600 mb-5 line-clamp-3">{{ post.excerpt }}</p>

      <!-- Nút hành động -->
      <div class="flex justify-end mt-auto" v-if="!isDisabled">
        <button
          class="relative overflow-hidden bg-gradient-to-br from-red-500 to-red-600 text-white text-sm font-medium px-6 py-2.5 rounded-full transition-all duration-300 shadow-md hover:shadow-lg hover:from-red-600 hover:to-red-700 group"
          @click.stop="handleAction">
          <span class="relative z-10 flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path
                d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7z" />
            </svg>
            {{ buttonText }}
          </span>
          <span
            class="absolute inset-0 bg-gradient-to-br from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Post_Challenges',
  props: {
    post: Object,
    loading: Boolean
  },
  computed: {
    rewardText() {
      return this.post.reward?.type === 'points'
        ? `${this.post.reward.value} Point`
        : 'Voucher';
    },
    rewardType() {
      return this.post.reward?.type;
    },
    userJoined() {
      return this.post.user_challenges?.[0]?.joined || false;
    },
    userCommented() {
      return this.post.user_challenges?.[0]?.commented || false;
    },
    isDisabled() {
      return this.post.type === 'comment' && this.post.status?.toLowerCase() !== 'published';
    },
    challengeStatus() {
      if (!this.userJoined) return 'not_joined';
      if (this.userCommented) return 'completed';
      return 'joined';
    },
    buttonText() {
      if (this.challengeStatus === 'completed') return 'View Details';
      return 'Comment on this post';
    },
    formattedDueDate() {
      if (!this.post.dueDate) return '';
      const date = new Date(this.post.dueDate);
      return date.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
      });
    }
  },
  methods: {
    handleAction() {
      if (this.isDisabled) return;
      const id = this.post.post_challenge_id || this.post.id;
      this.$router.push(`/comment/${id}`);
    }
  }
};
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
<template>
  <div class="max-w-3xl mx-auto px-4 py-6">
    <!-- Header -->
    <div class="flex items-center mb-6 relative">
      <button @click="goBack" class="absolute left-0 text-blue-500 text-base px-2 py-1">
        &larr; Back
      </button>
      <h2 class="flex-1 text-center text-xl font-semibold">
        Comment on the article #{{ postId }}
      </h2>
    </div>

    <!-- Post Content -->
    <div v-if="!loading" class="mb-8">
      <EventItem
        :title="post.title"
        :reward="post.reward"
        :dueDate="post.dueDate"
        :status="post.status"
        :joined="post.joined"
        :loading="false"
      />
    </div>

    <!-- Loading Skeleton -->
    <div v-else class="mb-8">
      <div class="h-32 bg-gray-200 rounded-xl animate-pulse"></div>
    </div>

    <!-- Comment Section -->
    <div class="border-t border-gray-200 pt-6">
      <h3 class="mb-4 text-lg font-medium">Comment ({{ comments.length }})</h3>

      <!-- Comment List -->
      <div class="mb-6 space-y-4">
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="flex border-b pb-4 border-gray-200"
        >
          <div class="mr-3">
            <img
              :src="comment.avatar"
              alt="Avatar"
              class="w-10 h-10 rounded-full object-cover"
            />
          </div>
          <div class="flex-1">
            <div class="font-semibold mb-1">{{ comment.author }}</div>
            <div class="mb-1 leading-snug">{{ comment.text }}</div>
            <div class="text-xs text-gray-500">{{ formatTime(comment.time) }}</div>
          </div>
        </div>
      </div>

      <!-- Add Comment -->
      <div class="mt-6">
        <textarea
          v-model="newComment"
          rows="3"
          placeholder="Write a comment..."
          class="w-full border border-gray-300 rounded-lg p-3 resize-y mb-3"
        ></textarea>
        <button
          @click="submitComment"
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import EventItem from '../components/Event_Challenge.vue'

export default {
  name: 'PostComment',
  components: {
    EventItem
  },
  props: {
    postId: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      loading: true,
      post: {},
      comments: [],
      newComment: '',
      // Mock data
      // Mock data
mockPosts: {
  1: {
    id: 1,
    title: "Tran Nguyen Gia Huy 221403 find a lover for rest of life",
    reward: { type: 'points', value: 100 },
    dueDate: '2024-06-30T23:59:59',
    status: 'pending',
    joined: true
  },
  2: {
    id: 2,
    title: "Thien An writes an open letter to Jack and their daughter Sol.",
    reward: { type: 'points', value: 50 },
    dueDate: '2024-06-15T18:00:00',
    status: 'done',
    joined: false
  },
  3: {
    id: 3,
    title: "Ronaldo nets his 937th career goal.",
    reward: { type: 'points', value: 50 },
    dueDate: '2024-06-15T18:00:00',
    status: 'done',
    joined: false
  },
  4: {
    id: 4,
    title: "Event at Ho Chi Minh City",
    reward: { type: 'voucher' },
    dueDate: '2024-06-15T18:00:00',
    status: 'done',
    joined: false
  },
  5: {
    id: 5,
    title: "Vietnam Sport Show 2025",
    reward: { type: 'voucher' },
    dueDate: '2024-06-15T18:00:00',
    status: 'done',
    joined: false
  },
  6: {
    id: 6,
    title: "GrowthVerse Summit 2025",
    reward: { type: 'voucher' },
    dueDate: '2024-06-15T18:00:00',
    status: 'done',
    joined: false
  }
},

mockComments: {
  1: [
    {
      id: 1,
      author: "Jame",
      avatar: "https://i.pravatar.cc/150?img=1",
      text: "This event was so fun, I joined!",
      time: "2024-05-20T10:30:00"
    },
    {
      id: 2,
      author: "July",
      avatar: "https://i.pravatar.cc/150?img=2",
      text: "When will the results be available, everyone?",
      time: "2024-05-20T11:45:00"
    }
  ],
  2: [
    {
      id: 3,
      author: "Adam",
      avatar: "https://i.pravatar.cc/150?img=3",
      text: "This challenge is so easy!",
      time: "2024-05-18T09:15:00"
    }
  ]
}

    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.loading = true
      setTimeout(() => {
        this.post = this.mockPosts[this.postId] || {}
        this.comments = this.mockComments[this.postId] || []
        this.loading = false
      }, 800)
    },
    formatTime(timeString) {
      const date = new Date(timeString)
      return date.toLocaleString('vi-VN', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    submitComment() {
      if (this.newComment.trim()) {
        const newComment = {
          id: Date.now(),
          author: "Bạn",
          avatar: "https://i.pravatar.cc/150?img=5",
          text: this.newComment,
          time: new Date().toISOString()
        }
        this.comments.unshift(newComment)
        this.newComment = ''
        // Gọi API thực tế nếu cần
      }
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

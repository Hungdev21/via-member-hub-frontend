<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <div v-if="loading" class="text-center text-gray-500">Loading post...</div>
    <div v-else>
      <h1 class="text-2xl sm:text-3xl font-bold mb-4">{{ post.ten_posts }}</h1>
      <img v-if="post.thumbnail" :src="post.thumbnail" alt="Thumbnail" class="rounded-lg mb-6 w-full" />

      <!-- Display HTML content -->
      <div class="prose max-w-none mb-8" v-html="post.body"></div>

      <!-- Comment input -->
      <div class="border-t pt-6 mt-6">
        <h2 class="text-lg font-semibold mb-2">✍️ Write a comment</h2>
        <textarea v-model="comment" class="w-full border rounded-lg p-3 resize-none" rows="4"
          placeholder="Enter your comment..." />
        <button @click="submitComment"
          class="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg">
          Submit Comment
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchCommentChallenges } from '../services/apiService'; // make sure this path is correct

export default {
  name: 'CommentPage',
  data() {
    return {
      post: {},
      comment: '',
      loading: true
    };
  },
  mounted() {
    const postId = Number(this.$route.params.postId);
    this.fetchPostFromChallenge(postId);
  },
  methods: {
    async fetchPostFromChallenge(postId) {
      try {
        const challenges = await fetchCommentChallenges();
        const challenge = challenges.find(ch => ch.post?.post_id === postId);

        if (challenge && challenge.post) {
          this.post = challenge.post;
        } else {
          console.warn('No post found with postId:', postId);
        }
      } catch (err) {
        console.error('Error fetching challenge:', err);
      } finally {
        this.loading = false;
      }
    },
    submitComment() {
      if (!this.comment.trim()) {
        alert('Please enter a comment!');
        return;
      }

      // 🔁 Giả lập gửi bình luận thành công
      console.log('Comment submitted:', this.comment);
      alert('Comment submitted successfully!');

      // ✅ Đánh dấu đã tham gia và đã bình luận
      if (!this.post.user_challenges) {
        this.post.user_challenges = [{ joined: true, commented: true }];
      } else {
        this.post.user_challenges[0].joined = true;
        this.post.user_challenges[0].commented = true;
      }

      this.comment = '';

      // 🔁 Back về trang challenge sau khi gửi bình luận thành công (sau 500ms)
      setTimeout(() => {
        this.$router.push('/challenges');
      }, 500);
    }


  }
};
</script>

<style scoped>
textarea:focus {
  outline: none;
  border-color: #f87171;
  /* red-400 */
  box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.2);
}
</style>
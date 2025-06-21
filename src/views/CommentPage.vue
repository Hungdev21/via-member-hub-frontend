<template>
  <div class="max-w-3xl mx-auto py-10 px-4">
    <div v-if="loading" class="text-center text-gray-500">Loading post...</div>

    <div v-else>
      <h1 class="text-2xl sm:text-3xl font-bold mb-4">{{ post.ten_posts }}</h1>
      <img v-if="post.thumbnail" :src="post.thumbnail" alt="Thumbnail" class="rounded-lg mb-6 w-full" />
      <div class="prose max-w-none mb-8" v-html="post.body"></div>

      <div class="border-t pt-6 mt-6">
        <h2 class="text-lg font-semibold mb-2">✍️ Write a comment</h2>

        <div v-if="alreadyCommented" class="text-green-600 text-sm mb-2">
          ✅ You’ve already commented on this post. You can comment again if you'd like.
        </div>

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
import { fetchCommentChallenges } from '../services/apiService';
const BASE_URL = import.meta.env.VITE_API_URL;

export default {
  name: 'CommentPage',
  data() {
    return {
      post: {},
      postChallengeId: null,
      comment: '',
      loading: true,
      batchInterval: null,
      alreadyCommented: false,
    };
  },
  mounted() {
    const postId = Number(this.$route.params.postId);
    this.fetchPostFromChallenge(postId);

    this.batchInterval = setInterval(this.sendBatchComments, 30 * 60 * 1000);
    this.sendBatchComments();
  },
  beforeUnmount() {
    clearInterval(this.batchInterval);
  },
  methods: {
    async fetchPostFromChallenge(postId) {
      try {
        const challenges = await fetchCommentChallenges();
        const challenge = challenges.find(
          ch => ch.post?.post_id === postId && ch.post.status === 'published'
        );


        if (challenge && challenge.post) {
          this.post = challenge.post;
          this.postChallengeId = challenge.post_challenge_id;

          // Kiểm tra nếu đã comment
          const commentedKey = 'commentedChallenges';
          const commented = JSON.parse(localStorage.getItem(commentedKey) || '[]');
          this.alreadyCommented = commented.includes(this.postChallengeId);
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

      const newComment = {
        postChallengeId: this.postChallengeId,
        postId: this.post.post_id,
        comment: this.comment.trim(),
        timestamp: Date.now(),
        status: 'pending'
      };

      // Lưu vào batch queue
      const key = `commentBatchQueue_${this.postChallengeId}`;
      const queue = JSON.parse(localStorage.getItem(key) || '[]');
      queue.push(newComment);
      localStorage.setItem(key, JSON.stringify(queue));

      // Ghi lại ID đã comment
      const commentedKey = 'commentedChallenges';
      const commented = JSON.parse(localStorage.getItem(commentedKey) || '[]');
      if (!commented.includes(this.postChallengeId)) {
        commented.push(this.postChallengeId);
        localStorage.setItem(commentedKey, JSON.stringify(commented));
      }

      alert('🎉 Your comment has been saved temporarily and will be sent to the server within 30 minutes.');

      this.comment = '';

      setTimeout(() => {
        this.$router.push({ path: '/challenges' });
      }, 500);
    },

    async sendBatchComments() {
      const keys = Object.keys(localStorage).filter(key => key.startsWith('commentBatchQueue_'));
      for (const key of keys) {
        const queue = JSON.parse(localStorage.getItem(key) || '[]');
        if (!queue.length) continue;

        const remaining = [];

        for (const comment of queue) {
          try {
            await fetch(`${BASE_URL}api/member-challenges`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                post_challenge_id: comment.postChallengeId,
                community_member_id: this.getCommunityMemberId(),
                joined: true,
                commented: true,
                comment: comment.comment
              })
            });
            console.log('Successfully sent:', comment);
          } catch (error) {
            console.warn('Failed to send:', comment, error);
            remaining.push(comment);
          }
        }

        localStorage.setItem(key, JSON.stringify(remaining));
      }
    },

    getCommunityMemberId() {
      return localStorage.getItem('community_member_id');
    }
  }
};
</script>

<style scoped>
textarea:focus {
  outline: none;
  border-color: #f87171;
  box-shadow: 0 0 0 3px rgba(248, 113, 113, 0.2);
}
</style>
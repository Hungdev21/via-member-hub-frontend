<template>
  <div class="challenges-container p-4">
    <h2 class="text-xl font-bold mb-4">Challenges For You</h2>
    <h3 class="text-lg font-semibold mb-4 text-gray-700">Let’s comment on posts to level up</h3>

    <div class="post-list mb-10">
      <p v-if="isLoadingComments" class="text-gray-500">Loading comment challenges...</p>
      <p v-else-if="commentError" class="text-red-500">{{ commentError }}</p>
      <PostItem
        v-else
        v-for="(post, index) in commentChallenges"
        :key="post.id || index"
        :post="mapCommentToPost(post)"
      />
    </div>

    <h3 class="text-lg font-semibold mb-4 text-gray-700">Join exciting events to gain experience</h3>
    <div class="event-list space-y-4">
      <EventItem
        v-if="isLoadingEvents"
        title="Loading..."
        :reward="{ type: 'points', value: 200 }"
        :loading="true"
      />
      <p v-else-if="eventError" class="text-red-500">{{ eventError }}</p>
      <EventItem
        v-else
        v-for="(event, index) in events"
        :key="event.event_id || index"
        :title="event.ten_events"
        :reward="{ type: 'points', value: 100 }"
        :dueDate="event.ends_at"
        :joined="event.current_attendees > 0"
        :ticketPurchased="false"
        :location="event.in_persion_location"
        :postId="event.post_id || index + 1"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { fetchCommentChallenges, fetchEvents } from '../services/challengeService';

export default {
  name: 'Challenges',
  components: {
    // Tải lười (lazy load)
    PostItem: defineAsyncComponent(() => import('../components/PostItem.vue')),
    EventItem: defineAsyncComponent(() => import('../components/EventItem.vue')),
  },
  data() {
    return {
      events: [],
      commentChallenges: [],
      isLoadingEvents: true,
      isLoadingComments: true,
      eventError: null,
      commentError: null,
    };
  },
  created() {
    this.loadCommentChallenges();
    this.loadEvents();
  },
  methods: {
    async loadCommentChallenges() {
      this.isLoadingComments = true;
      try {
        const res = await fetchCommentChallenges();
        this.commentChallenges = res;
      } catch (err) {
        this.commentError = err?.message || 'Failed to load comment challenges';
      } finally {
        this.isLoadingComments = false;
      }
    },
    async loadEvents() {
      this.isLoadingEvents = true;
      try {
        const res = await fetchEvents();
        this.events = res;
      } catch (err) {
        this.eventError = err?.message || 'Failed to load events';
      } finally {
        this.isLoadingEvents = false;
      }
    },
    mapCommentToPost(post) {
      return {
        id: post.post_id,
        title: `Comment Challenge #${post.id}`,
        author: 'Community',
        reward: { type: 'points', value: post.points_reward },
        createdAt: post.created_at,
        excerpt: 'You need to comment on this post to complete the challenge.',
        joined: true,
        requiresComment: true,
        commented: false,
        tags: ['commenting'],
      };
    },
  },
};
</script>

<template>
  <div class="challenges-container p-4">
    <h2 class="text-xl font-bold mb-4">Challenges For You</h2>
    <h3 class="text-lg font-semibold mb-4 text-gray-700">Let’s comment on posts to level up</h3>

    <div class="post-list mb-10">
      <!-- Loading: hiện nhiều skeleton -->
      <template v-if="isLoadingComments">
        <PostItem v-for="n in 3" :key="'skeleton-comment-' + n" :loading="true" />
      </template>

      <!-- Error -->
      <p v-else-if="commentError" class="text-red-500">An error has occurred. Please try again later.</p>

      <!-- Dữ liệu -->
      <PostItem
        v-else
        v-for="(challenge, index) in commentChallenges"
        :key="challenge.id || index"
        :post="challenge"
      />
    </div>

    <h3 class="text-lg font-semibold mb-4 text-gray-700">Join exciting events to gain experience</h3>

    <div class="event-list space-y-4">
      <!-- Loading: nhiều skeleton -->
      <template v-if="isLoadingEvents">
        <EventItem v-for="n in 2" :key="'skeleton-event-' + n" :loading="true" />
      </template>

      <!-- Error -->
      <p v-else-if="eventError" class="text-red-500">An error has occurred. Please try again later.</p>

      <!-- Dữ liệu -->
      <EventItem
        v-else
        v-for="(eventChallenge, index) in eventChallenges"
        :key="eventChallenge.post_challenge_id || index"
        :title="eventChallenge.event?.ten_events"
        :reward="{
          type: 'points',
          value: eventChallenge.points_reward,
          highlight: eventChallenge.event?.current_attendees > 0 || eventChallenge.event?.status === 'done'
        }"
        :dueDate="eventChallenge.event?.ends_at"
        :joined="eventChallenge.event?.current_attendees > 0"
        :ticketPurchased="false"
        :location="eventChallenge.event?.in_person_location"
        :postId="eventChallenge.event?.event_id || index + 1"
      />
    </div>
  </div>
</template>

<script>
import { defineAsyncComponent } from 'vue';
import { fetchCommentChallenges, fetchEventChallenges } from '../services/apiService';

export default {
  name: 'Challenges',
  components: {
    PostItem: defineAsyncComponent(() => import('../components/Post_Challenge.vue')),
    EventItem: defineAsyncComponent(() => import('../components/Event_Challenge.vue')),
  },
  data() {
    return {
      commentChallenges: [],
      eventChallenges: [],
      isLoadingComments: true,
      isLoadingEvents: true,
      commentError: null,
      eventError: null,
    };
  },
  created() {
    this.loadAllChallenges();
  },
  methods: {
    async loadAllChallenges() {
      this.isLoadingComments = true;
      this.isLoadingEvents = true;
      try {
        const [commentRes, eventRes] = await Promise.all([
          fetchCommentChallenges(),
          fetchEventChallenges()
        ]);

        const mappedComments = commentRes.map(challenge => this.mapCommentToPost(challenge))
          .sort((a, b) => (a.joined === b.joined ? 0 : a.joined ? 1 : -1));

        this.commentChallenges = mappedComments;
        this.eventChallenges = eventRes;
      } catch (err) {
        this.commentError = true;
        this.eventError = true;
      } finally {
        this.isLoadingComments = false;
        this.isLoadingEvents = false;
      }
    },

    mapCommentToPost(challenge) {
      const post = challenge.post;
      return {
        id: challenge.post_challenge_id,
        title: post.ten_posts || `Comment Challenge #${challenge.post_challenge_id}`,
        author: post.user_name || 'Unknown',
        reward: {
          type: 'points',
          value: challenge.points_reward,
          highlight: post.comments_count > 0
        },
        createdAt: post.created_at,
        joined: post.comments_count > 0,
        requiresComment: true,
        commented: post.comments_count > 0,
        url: post.url,
        avatar: post.user_avatar_url,
        tags: post.tags || [],
        excerpt: post.body?.replace(/<[^>]*>/g, '').slice(0, 150) || '',
        status: post.comments_count > 0 ? 'done' : '',
        dueDate: challenge.due_date
      };
    }
  }
};
</script>
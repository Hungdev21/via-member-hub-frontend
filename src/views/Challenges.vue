<template>
  <div class="challenges-container p-4">
    <h2 class="text-xl font-bold mb-4">Challenges For You</h2>
    <h3 class="text-lg font-semibold mb-4 text-gray-700">Let’s comment on posts to level up</h3>

    <div class="post-list mb-10">
      <!-- Loading -->
      <template v-if="isLoadingComments">
        <PostItem v-for="n in 3" :key="'skeleton-comment-' + n" :loading="true" />
      </template>

      <!-- Error -->
      <p v-else-if="commentError" class="text-red-500">An error has occurred. Please try again later.</p>

      <!-- Dữ liệu -->
      <PostItem v-else v-for="(challenge, index) in commentChallenges" :key="challenge.id || index" :post="challenge"
        :status="challenge.status" />
    </div>

    <h3 class="text-lg font-semibold mb-4 text-gray-700">Join exciting events to gain experience</h3>

    <div class="event-list space-y-4">
      <!-- Loading -->
      <template v-if="isLoadingEvents">
        <EventItem v-for="n in 2" :key="'skeleton-event-' + n" :loading="true" />
      </template>

      <!-- Error -->
      <p v-else-if="eventError" class="text-red-500">An error has occurred. Please try again later.</p>

      <!-- Dữ liệu -->
      <EventItem v-else v-for="(eventChallenge, index) in eventChallenges" :key="eventChallenge.id || index"
        :title="eventChallenge.title" :reward="eventChallenge.reward" :dueDate="eventChallenge.dueDate"
        :joined="eventChallenge.joined" :ticketPurchased="eventChallenge.ticketPurchased"
        :location="eventChallenge.location" :postId="eventChallenge.postId" :status="eventChallenge.status" />
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
        const [commentRes, eventResRaw] = await Promise.all([
          fetchCommentChallenges(),
          fetchEventChallenges()
        ]);

        const mappedComments = commentRes
          .map(this.mapCommentToPost)
          .filter(c => c.status !== 'hidden')
          .sort((a, b) => (a.joined === b.joined ? 0 : a.joined ? 1 : -1)); // chưa tham gia lên trước

        const mappedEvents = eventResRaw
          .map(this.mapEventChallenge)
          .filter(e => e.status !== 'cancelled')
          .sort((a, b) => (a.joined === b.joined ? 0 : a.joined ? 1 : -1)); // chưa tham gia lên trước

        this.commentChallenges = mappedComments;
        this.eventChallenges = mappedEvents;
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
      const hasCommented = post.comments_count > 0;

      let status = 'not_joined';
      switch (challenge.status) {
        case 'published':
          status = hasCommented ? 'joined' : 'not_joined';
          break;
        case 'pending_review':
          status = 'review';
          break;
        case 'archived':
        case 'draft':
          status = 'hidden';
          break;
        default:
          status = 'not_joined';
      }

      return {
        id: challenge.post_challenge_id,
        title: post.ten_posts || `Comment Challenge #${challenge.post_challenge_id}`,
        author: post.user_name || 'Unknown',
        reward: {
          type: 'points',
          value: challenge.points_reward,
          highlight: hasCommented
        },
        createdAt: post.created_at,
        joined: hasCommented,
        requiresComment: true,
        commented: hasCommented,
        url: post.url,
        avatar: post.user_avatar_url,
        tags: post.tags || [],
        excerpt: post.body?.replace(/<[^>]*>/g, '').slice(0, 150) || '',
        status,
        dueDate: challenge.due_date
      };
    },

    mapEventChallenge(challenge) {
      const event = challenge.event;
      const joined = event?.current_attendees > 0;

      let status = 'not_joined';
      switch (challenge.status) {
        case 'upcoming':
          status = joined ? 'joined' : 'not_joined';
          break;
        case 'ongoing':
          status = 'joined';
          break;
        case 'finished':
          status = 'expired';
          break;
        case 'cancelled':
          status = 'cancelled';
          break;
        default:
          status = 'not_joined';
      }

      return {
        id: challenge.post_challenge_id,
        title: event.ten_events,
        reward: {
          type: 'points',
          value: challenge.points_reward,
          highlight: joined || status === 'expired'
        },
        dueDate: event.ends_at,
        joined,
        ticketPurchased: false,
        location: event.in_person_location,
        postId: event.event_id,
        status
      };
    }
  }
};
</script>
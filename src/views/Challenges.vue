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
      <Post_Challenges v-for="post in sortedPosts" :key="post.id" :post="post" :loading="isLoading" />
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
import {
  fetchJoinedCommentChallenges,
  fetchEventChallenges
} from '../services/apiService';

export default {
  name: 'Challenges',
  components: {
    PostItem: defineAsyncComponent(() => import('../components/Post_Challenge.vue')),
    EventItem: defineAsyncComponent(() => import('../components/Event_Challenge.vue')),
    Post_Challenges: defineAsyncComponent(() => import('../components/Post_Challenge.vue'))
  },
  data() {
    return {
      commentChallenges: [],
      eventChallenges: [],
      isLoadingComments: true,
      isLoadingEvents: true,
      commentError: null,
      eventError: null
    };
  },
  computed: {
    sortedPosts() {
      return [...this.commentChallenges].sort((a, b) => {
        const aCommented = a.user_challenges?.[0]?.commented ?? false;
        const bCommented = b.user_challenges?.[0]?.commented ?? false;
        if (aCommented === bCommented) return 0;
        return aCommented ? 1 : -1;
      });
    }
  },
  created() {
    this.loadAllChallenges();
  },
  methods: {
    async loadAllChallenges() {
      this.isLoadingComments = true;
      this.isLoadingEvents = true;
      try {
        const memberId = 1; // giả định
        const [commentRes, eventResRaw] = await Promise.all([
          fetchJoinedCommentChallenges(memberId),
          fetchEventChallenges()
        ]);

        const mappedComments = commentRes
          .filter(item => item.type === 'comment' && item.post?.status === 'published')
          .map(this.mapCommentToPost);

        const mappedEvents = eventResRaw
          .map(this.mapEventChallenge)
          .filter(e => e.status !== 'cancelled')
          .sort((a, b) => (a.joined === b.joined ? 0 : a.joined ? 1 : -1));

        this.commentChallenges = mappedComments;
        this.eventChallenges = mappedEvents;

        // ✅ Gắn trạng thái comment đã hoàn thành từ localStorage
        const commentedKey = 'commentedChallenges';
        const commentedList = JSON.parse(localStorage.getItem(commentedKey) || '[]');

        this.commentChallenges.forEach(item => {
          if (commentedList.includes(item.id)) {
            if (!item.user_challenges || !item.user_challenges.length) {
              item.user_challenges = [{ joined: true, commented: true }];
            } else {
              item.user_challenges[0].joined = true;
              item.user_challenges[0].commented = true;
            }
          }
        });

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
        title: post?.ten_posts || `Challenge #${challenge.post_challenge_id}`,
        excerpt: post?.body?.replace(/<[^>]+>/g, '').slice(0, 120) || '',
        reward: {
          type: 'points',
          value: challenge.points_reward,
          highlight: challenge.user_challenges?.[0]?.commented || false
        },
        createdAt: challenge.created_at,
        status: post?.status || 'draft',
        dueDate: challenge.due_date,
        user_challenges: challenge.user_challenges || [],
        requiresComment: true,
        type: 'comment',
        thumbnail: post?.thumbnail || '',
        post_id: post?.post_id,
        slug: post?.slug
      };
    },

    mapEventChallenge(challenge) {
      const event = challenge.event;
      const joined = event?.current_attendees > 0;

      let status = 'not_joined';
      switch (challenge.status) {
        case 'upcoming': status = joined ? 'joined' : 'not_joined'; break;
        case 'ongoing': status = 'joined'; break;
        case 'finished': status = 'expired'; break;
        case 'cancelled': status = 'cancelled'; break;
        default: status = 'not_joined';
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
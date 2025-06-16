<template>
  <div class="bg-white">
    <EventCard
      v-for="event in events"
      :key="event.id"
      v-bind="event"
    />
  </div>
</template>

<script setup>
import EventCard from './Event1Card.vue';

defineProps({
  events: {
    type: Array,
    required: true
  }
});
</script>

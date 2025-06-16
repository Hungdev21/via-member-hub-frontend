<template>
  <div id="app" class="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white flex flex-col">
    <ComHeader />
    <main class="flex-1 w-full text-gray-900 dark:text-white">
      <!-- Thêm route tạm để test -->
      <router-view />
    </main>
    <ComFooter />
  </div>
</template>

<script>
import ComHeader from './components/ComHeader.vue';
import ComFooter from './components/ComFooter.vue';
import EventItem from './components/Event_Challenge.vue'; 

export default {
  name: 'App',
  components: {
    ComHeader,
    ComFooter,
    EventItem
  }
};
</script>

<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow-x: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: background-color 0.3s ease, color 0.3s ease;
}

main {
  flex: 1;
  width: 100%;
}
</style>

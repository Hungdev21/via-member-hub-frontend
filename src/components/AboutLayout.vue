<template>
  <div class="min-h-screen bg-gray-50 py-6 sm:py-8 lg:py-12">
    <!-- Wrapper -->
    <div class="container mx-auto px-4 sm:px-6 lg:px-8 max-w-full sm:max-w-2xl lg:max-w-4xl xl:max-w-7xl">
      <div class="grid gap-4 sm:gap-6 lg:gap-8 grid-cols-1 md:grid-cols-[1fr,1.5fr] lg:grid-cols-[1fr,2fr] items-start">
        <!-- User Info Block -->
        <section class="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Thông tin cá nhân</h2>
          <UserInfo />
        </section>
        <!-- Ranking Board Block -->
        <section class="bg-white p-4 sm:p-6 lg:p-8 rounded-xl shadow-lg">
          <h2 class="text-xl sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-gray-800">Bảng xếp hạng</h2>
          <RankingBoard />
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import UserInfo from './UserInfo.vue';
import RankingBoard from './RankingBoard.vue';
</script>

<style scoped>

</style>
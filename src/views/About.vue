<template>
    <div class="about">
      <UserInfo />
      <RankingBoard />
    </div>
</template>

<script>
import UserInfo from '../components/UserInfo.vue';
import RankingBoard from '../components/RankingBoard.vue';

export default {
  name: 'AboutPage',
  components: { UserInfo, RankingBoard}
};
</script>

<style scoped>
.about {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}
</style>
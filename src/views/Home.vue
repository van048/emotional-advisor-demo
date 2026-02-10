<template>
  <div class="home">
    <MoodSelector v-model="selectedMood" />
    <RecommendationList />
  </div>
</template>

<script>
import MoodSelector from '@/components/MoodSelector.vue';
import RecommendationList from '@/components/RecommendationList.vue';

export default {
  name: 'HomeView',
  data() {
    return {
      selectedMood: ''
    };
  },
  components: {
    MoodSelector,
    RecommendationList
  }
};
</script>

<style scoped>
.home {
  @apply p-4 space-y-6;
}
</style>
<!-- src/views/Home.vue -->
<template>
  <div class="container mx-auto px-4">
    <router-view />
  </div>
</template>

<script>
import recommendationService from '@/utils/recommendationService.js'

export default {
  name: 'HomeView',
  data() {
    return {
      recommendationResult: null
    }
  },
  methods: {
    showAlert() {
      alert('Vue 2 + Tailwind is working!')
    },
    async getRecommendationDemo() {
      const params = {
        emotion: 'tired',
        time: new Date(),
        // TODO 定位
        weather: 'sunny',
        device: {
          supportPressureSet: true,
          supportTemperatureSet: true,
          supportFlowControl: true,
          maxPressure: 15,
          supportedCoffees: ['espresso','americano','latte']
        }
      }
      try {
        const result = await recommendationService.getRecommendation(params)
        this.recommendationResult = result
        console.log('推荐获取成功:', result)
      } catch (error) {
        console.error('推荐获取失败:', error)
      }
    }
  },
  mounted() {
    this.getRecommendationDemo()
  }
}
</script>

<style scoped>
/* Removed direct Tailwind import as it's now imported via main.js */
</style>
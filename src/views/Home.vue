<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6 text-center text-gray-800">此刻，你的心情是？</h1>
    
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-md mx-auto mb-6">
      <!-- 情绪卡片容器 -->
      <div
        v-for="(mood, index) in moods"
        :key="index"
        class="relative overflow-hidden rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 transform hover:scale-105"
        :class="[
          mood.bgClass,
          'backdrop-blur-sm',
          'shadow-lg',
          'hover:shadow-xl',
          'active:shadow-inner',
          'active:translate-y-1',
          'hover:shadow-2xl',
          'hover:translate-y-[-2px]'
        ]"
        @click="handleMoodSelect(mood.route)"
      >
        <!-- 卡片装饰元素 -->
        <div class="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-30"></div>
        
        <!-- 卡片内容 -->
        <div class="relative z-10">
          <div class="text-4xl mb-3">{{ mood.emoji }}</div>
          <h3 class="font-bold text-lg mb-1">{{ mood.title }}</h3>
          <p class="text-sm opacity-80">{{ mood.description }}</p>
        </div>
        
        <!-- 卡片底部装饰 -->
        <div class="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      </div>
    </div>
    
    <p class="text-center text-gray-500 text-sm max-w-md mx-auto">
      选择后，AI会为你推荐最适合的咖啡方案
    </p>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      moods: [
        {
          title: '疲惫',
          description: '身体需要被温柔对待',
          emoji: '😔',
          bgClass: 'bg-gradient-to-br from-gray-200/80 to-gray-100',
          route: '/recommendation/tired'
        },
        {
          title: '开心',
          description: '让快乐再延续一会儿',
          emoji: '😊',
          bgClass: 'bg-gradient-to-br from-yellow-200/80 to-yellow-100',
          route: '/recommendation/happy'
        },
        {
          title: '焦虑',
          description: '深呼吸，慢慢来',
          emoji: '😰',
          bgClass: 'bg-gradient-to-br from-purple-200/80 to-purple-100',
          route: '/recommendation/anxious'
        },
        {
          title: '想静一静',
          description: '给自己一段独处时光',
          emoji: '😌',
          bgClass: 'bg-gradient-to-br from-green-200/80 to-green-100',
          route: '/recommendation/calm'
        }
      ]
    };
  },
  methods: {
    handleMoodSelect(route) {
      // 添加点击反馈动画
      this.$router.push(route);
    }
  }
};
</script>

<style scoped>
/* 卡片悬停效果 */
.hover\:shadow-md:hover {
  @apply shadow-lg;
}
.transition-shadow {
  @apply transition duration-300;
}
</style>
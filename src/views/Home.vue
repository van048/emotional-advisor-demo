<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-6 text-center">此刻，你的心情是？</h1>
    
    <div class="grid grid-cols-2 gap-4 max-w-md mx-auto mb-6">
      <!-- 疲惫卡片 -->
      <div 
        class="bg-gray-200 p-4 rounded-lg text-center cursor-pointer hover:shadow-md transition-shadow"
        @click="$router.push('/recommendation/tired')"
      >
        <div class="text-3xl mb-2">😔</div>
        <h3 class="font-medium">疲惫</h3>
        <p class="text-sm text-gray-600 mt-1">身体需要被温柔对待</p>
      </div>
      
      <!-- 开心卡片 -->
      <div
        class="bg-yellow-100 p-4 rounded-lg text-center cursor-pointer hover:shadow-md transition-shadow"
        @click="$router.push('/recommendation/happy')"
      >
        <div class="text-3xl mb-2">😊</div>
        <h3 class="font-medium">开心</h3>
        <p class="text-sm text-gray-600 mt-1">让快乐再延续一会儿</p>
      </div>
      
      <!-- 焦虑卡片 -->
      <div
        class="bg-purple-100 p-4 rounded-lg text-center cursor-pointer hover:shadow-md transition-shadow"
        @click="$router.push('/recommendation/anxious')"
      >
        <div class="text-3xl mb-2">😰</div>
        <h3 class="font-medium">焦虑</h3>
        <p class="text-sm text-gray-600 mt-1">深呼吸，慢慢来</p>
      </div>
      
      <!-- 想静一静卡片 -->
      <div
        class="bg-green-100 p-4 rounded-lg text-center cursor-pointer hover:shadow-md transition-shadow"
        @click="$router.push('/recommendation/calm')"
      >
        <div class="text-3xl mb-2">😌</div>
        <h3 class="font-medium">想静一静</h3>
        <p class="text-sm text-gray-600 mt-1">给自己一段独处时光</p>
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
  // 后续可扩展：添加情绪选择埋点等逻辑
}
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
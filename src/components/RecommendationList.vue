<template>
  <div class="container mx-auto px-4 py-8">
    <!-- 条件渲染：当推荐列表为空时显示提示 -->
    <div v-if="recommendations.length === 0" class="text-center text-gray-500 text-xl">
      请先选择您当前的情绪
    </div>

    <!-- 推荐列表容器 -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      <!-- 单个推荐卡片 -->
      <div 
        v-for="(item, index) in recommendations" 
        :key="index" 
        class="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:shadow-lg"
      >
        <!-- 卡片内容 -->
        <div class="p-6">
          <!-- 标题 -->
          <h3 class="text-xl font-bold text-gray-800 mb-2">{{ item.title }}</h3>
          
          <!-- 类型与咖啡模式 -->
          <div class="flex justify-between text-sm text-gray-600 mb-4">
            <span>类型: {{ item.type }}</span>
            <span>咖啡模式: {{ item.coffeeMode }}</span>
          </div>
          
          <!-- 描述 -->
          <p class="text-gray-700 mb-4">{{ item.description }}</p>
          
          <!-- 推荐理由 -->
          <div class="text-sm text-blue-600 mb-6">
            推荐理由: {{ item.reason }}
          </div>
          
          <!-- 按钮预留位置 -->
          <div class="border-t border-gray-200 pt-4 mt-4">
            <!-- 按钮占位符 -->
            <div class="h-10 bg-gray-100 rounded-md flex items-center justify-center">
              开始
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  computed: {
    ...mapState(['recommendations'])
  }
};
</script>

<style scoped>
/* 组件专属样式（Tailwind 已处理主要样式） */
</style>
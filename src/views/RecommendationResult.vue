<template>
  <div class="recommendation-result px-4 py-6">
    <!-- 全屏加载层 -->
    <div v-show="!recommendation" class="fixed inset-0 bg-white opacity-75 z-50 flex items-center justify-center transition-opacity duration-300">
      <svg class="animate-spin h-12 w-12 text-blue-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
        <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
      </svg>
    </div>

    <!-- 推荐展示区 -->
    <div class="mb-8">
      <h1 class="text-2xl font-bold mb-4">{{ recommendation?.name }}</h1>
      <div class="text-gray-700 space-y-3">
        <p v-for="(paragraph, index) in recommendation?.reason.split('，')" :key="index">
          > {{ paragraph }}<span v-if="index === 0">，</span>
        </p>
      </div>
      <!-- 制作信息（待实现） -->
    </div>

    <!-- 步骤预览区 -->
    <div class="mb-6" v-show="recommendation">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-lg font-semibold">制作流程</h2>
        <button
          v-if="recommendation?.steps.length > maxVisibleSteps"
          @click="toggleSteps"
          class="text-sm text-blue-600 hover:text-blue-800"
        >
          {{ isExpanded ? '收起' : '展开' }}
        </button>
      </div>
      
      <!-- 时间轴容器 -->
      <div class="space-y-4">
        <div
          v-for="(step, index) in visibleSteps"
          :key="step.id"
          class="relative pl-8 pb-6"
        >
          <!-- 时间轴竖线 -->
          <div
            v-if="index !== visibleSteps.length - 1"
            class="absolute left-3.5 top-6 h-full w-0.5 bg-gray-300"
          ></div>
          
          <!-- 步骤圆点 -->
          <div class="absolute left-0 top-4 w-7 h-7 rounded-full
               bg-gray-200 flex items-center justify-center">
            <span class="text-sm font-medium text-gray-600">{{ index + 1 }}</span>
          </div>
          
          <!-- 步骤内容 -->
          <div class="bg-white rounded-lg p-4 shadow-sm border border-gray-100 ml-2">
            <div class="font-medium mb-1">{{ step.description }}</div>
            <div class="text-sm text-gray-600">{{ step.params }}</div>
          </div>
        </div>
      </div>
    </div>

    <!-- 执行区 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div class="text-sm text-gray-600 mb-2">
        咖啡机将按上述步骤自动完成制作，请确认物料已准备就绪
      </div>
      <button
        class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg
               transition-colors duration-200 flex items-center justify-center"
        :disabled="isMaking"
      >
        <span v-if="!isMaking" @click="startMaking">开始制作</span>
        <span v-else class="flex items-center">
          <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
               xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
          </svg>
          制作中
        </span>
      </button>
    </div>
  </div>
</template>

<script>
import recommendationService from "@/utils/recommendationService";

export default {
  name: "RecommendationResult",
  data() {
    return {
      recommendation: null,
      isExpanded: true,
      isMaking: false,
      maxVisibleSteps: 5 // 控制默认显示步骤数（根据设备高度调整）
    };
  },
  computed: {
    visibleSteps() {
      return this.isExpanded 
        ? this.recommendation?.steps 
        : this.recommendation?.steps?.slice(0, this.maxVisibleSteps) || [];
    }
  },
  methods: {
    startMaking() {
      // TODO 开始制作
      console.log("开始制作");
    },
    toggleSteps() {
      this.isExpanded = !this.isExpanded;
    }
  },
  created() {
    const mood = this.$route.params.mood;
    console.log("获取推荐:", mood);
    recommendationService
      .getRecommendation({
        emotion: mood,
        // TODO 定位
        weather: "sunny",
        device: {
          supportPressureSet: true,
          supportTemperatureSet: true,
          supportFlowControl: true,
          maxPressure: 15,
          supportedCoffees: ["espresso", "americano", "latte"],
        },
      })
      .then((response) => {
        this.recommendation = response;
        console.log("获取推荐成功:", response);
      })
      .catch((error) => {
        console.error("获取推荐失败:", error);
      });
  }
};
</script>

<style scoped>
/* 保持原有样式不变 */
</style>

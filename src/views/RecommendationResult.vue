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
      
      <!-- 推荐理由 -->
      <div class="text-gray-700 space-y-3 mb-6">
        <div v-for="(reason, index) in recommendation?.reasons" :key="index"
             class="flex items-start">
          <span class="inline-block w-5 h-5 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center mr-2 mt-1">{{ index+1 }}</span>
          <span>{{ reason }}</span>
        </div>
      </div>

      <!-- 制作信息展示 -->
      <div class="flex flex-wrap gap-4 mb-6" v-show="recommendation">
        <!-- 总时长 -->
        <div class="flex items-center">
          <svg class="w-5 h-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <circle cx="12" cy="12" r="10" stroke-width="2" />
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l2 2" />
          </svg>
          <span class="text-sm text-gray-700">{{ recommendation?.duration }}秒</span>
        </div>
        
        <!-- 杯量 -->
        <div class="flex items-center">
          <svg class="w-5 h-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span class="text-sm text-gray-700">{{ recommendation?.cupSize }}人份</span>
        </div>
        
        <!-- 温度 -->
        <div class="flex items-center">
          <svg class="w-5 h-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            <circle cx="12" cy="12" r="8" stroke-width="2" />
          </svg>
          <span class="text-sm text-gray-700">{{ recommendation?.temperature }}℃</span>
        </div>
        
        <!-- 难度 -->
        <div class="flex items-center">
          <svg class="w-5 h-5 text-gray-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-sm text-gray-700">{{ recommendation?.difficulty }}</span>
        </div>
      </div>
    </div>

    <!-- 步骤预览区 -->
    <div class="mb-6" v-show="recommendation">
      <div class="flex justify-between items-center mb-3">
        <h2 class="text-lg font-semibold">制作流程</h2>
        <button
          v-if="recommendation?.steps.length > maxVisibleSteps"
          @click="toggleSteps"
          class="text-sm text-blue-600 hover:text-blue-800 flex items-center"
        >
          <span>{{ isExpanded ? '收起' : '展开' }}</span>
          <svg class="w-4 h-4 ml-1 transition-transform" :class="{ 'rotate-180': isExpanded }"
               fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>
      
      <!-- 时间轴容器 -->
      <div class="space-y-1 overflow-hidden transition-all duration-300"
           :style="{ maxHeight: isExpanded ? 'auto' : '400px' }">
        <div
          v-for="(step) in visibleSteps"
          :key="step.id"
          class="relative pl-12 pb-8 md:pl-16"
        >
          <!-- 时间轴竖线 -->
          <div
            class="absolute left-4 md:left-5 top-0 h-full w-0.5 bg-blue-200"
          ></div>
          
          <!-- 步骤图标 -->
          <div class="absolute left-1.5 top-0 w-8 h-8 rounded-full
               bg-white border-2 flex items-center justify-center"
               :class="{
                 'border-blue-500': step.type === 'auto',
                 'border-amber-500': step.type === 'manual'
               }">
            <span class="text-lg" v-if="step.type === 'auto'">🤖</span>
            <span class="text-lg" v-else>✋</span>
          </div>
          
          <!-- 步骤内容 -->
          <div class="bg-white rounded-lg p-5 shadow-md border border-gray-200">
            <div class="font-semibold mb-2 text-gray-800">{{ step.description }}</div>
            <div class="mt-2" v-if="step.params">
              <pre class="bg-gray-50 p-3 rounded-md text-sm font-mono overflow-x-auto"
              >{{ step.params }}</pre>
            </div>
          </div>
        </div>
        <div class="h-20"></div>
      </div>
    </div>

    <!-- 执行区 -->
    <div class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
      <div v-if="!isMaking && progress < 100">
        <div class="text-sm text-blue-600 mb-3 flex items-center">
          <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2h-1V9z" clip-rule="evenodd" />
          </svg>
          点击【开始制作】执行预设自动程序，请确保物料准备就绪。
        </div>
        <button
          class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 rounded-lg
                 transition-colors duration-200 flex items-center justify-center"
          :disabled="isMaking"
          @click="startMaking">
          <span v-if="!isMaking">开始制作</span>
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

      <!-- 制作完成状态 -->
      <div v-if="progress >= 100 && !isMaking" class="text-center py-4">
        <div class="text-2xl font-bold mb-4">制作完成，请享用☕</div>
        <div class="flex space-x-3">
          <button
            @click="restartMaking"
            class="flex-1 py-2 px-4 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors duration-200">
            再来一杯
          </button>
          <button
            @click="goHome"
            class="flex-1 py-2 px-4 bg-gray-600 hover:bg-gray-700 text-white rounded-lg transition-colors duration-200">
            返回首页
          </button>
        </div>
      </div>

      <!-- 确认弹窗 -->
      <div v-if="showConfirmDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-80 shadow-xl transform transition-all duration-300">
          <h3 class="text-lg font-semibold mb-4">确认制作</h3>
          <p class="text-sm text-gray-600 mb-6">
            <span v-if="recommendation">
              即将开始制作『{{ recommendation.name }}』，预计{{ recommendation.duration }}秒。
              请确认{{ recommendation.materials || '咖啡豆等物料' }}已就位。
            </span>
            <span v-else>加载中...</span>
          </p>
          <div class="flex space-x-3">
            <button
              @click="showConfirmDialog = false"
              class="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              取消
            </button>
            <button
              @click="confirmMakeCoffee"
              class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg py-2 px-4 transition-colors duration-200">
              确认开始
            </button>
          </div>
        </div>
      </div>

      <!-- 停止确认弹窗 -->
      <div v-if="showStopConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg p-6 w-80 shadow-xl transform transition-all duration-300">
          <h3 class="text-lg font-semibold mb-4">确认操作</h3>
          <p class="text-sm text-gray-600 mb-6">确定停止制作？</p>
          <div class="flex space-x-3">
            <button
              @click="showStopConfirm = false"
              class="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200">
              取消
            </button>
            <button
              @click="confirmStopCoffee"
              class="flex-1 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg py-2 px-4 transition-colors duration-200">
              确认停止
            </button>
          </div>
        </div>
      </div>

      <!-- 进度条容器 -->
      <div v-if="isMaking" class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-lg z-40">
        <div class="mb-2 flex justify-between items-center">
          <span class="text-sm font-medium">制作中，请稍候...</span>
          <span class="text-sm font-medium">{{ Math.floor(progress) }}%</span>
        </div>
        <div class="w-full bg-gray-200 rounded-full h-2.5">
          <div
            class="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
        <div class="flex justify-center mt-3">
          <button
            @click="showStopConfirm = true"
            class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors duration-200">
            停止
          </button>
        </div>
      </div>

      <!-- 制作中仅显示停止按钮 -->
      <div v-if="isMaking" class="text-center py-4">
        <button
          @click="showStopConfirm = true"
          class="px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors duration-200">
          停止
        </button>
      </div>
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
      isPaused: false,
      showConfirmDialog: false,
      showStopConfirm: false,
      progress: 0,
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
      this.showConfirmDialog = true;
    },

    handleStatusChange(status) {
      console.log('handleStatusChange',status)
      switch(status) {
        case 'started':
          this.isMaking = true;
          this.isPaused = false;
          break;
        case 'completed':
          this.progress = 100;
          this.isMaking = false;
          break;
        case 'stopped':
          this.isPaused = false;
          this.isMaking = false;
          this.progress = 0;
          break;
      }
    },

    async confirmMakeCoffee() {
      this.showConfirmDialog = false;
      this.isMaking = true;
      this.isPaused = false;
      
      // 如果是从暂停状态恢复，不重置进度
      if (this.progress === 0) {
        this.progress = 0;
      }

      try {
        // 启动进度条动画（从当前进度继续）
        const interval = setInterval(() => {
          if (this.progress < 95) {
            this.progress += Math.random() * 5;
          }
        }, 300);

        // 调用咖啡机API
        await recommendationService.makeCoffee();
        
        // 完成进度由事件驱动更新，不直接设置
        clearInterval(interval);
      } catch (error) {
        console.error("制作失败:", error);
        this.isMaking = false;
      }
    },

    async confirmStopCoffee() {
      this.showStopConfirm = false;

      try {
        // 调用停止咖啡机API并强制重置状态
        await recommendationService.stopCoffee();
      } catch (error) {
        console.error("停止失败:", error);
        this.isMaking = true;
        this.isPaused = false;
      }
    },

    async resumeMaking() {
      this.isPaused = false;
      this.isMaking = true;

      try {
        // 启动进度条动画（从当前进度继续）
        const interval = setInterval(() => {
          if (this.progress < 95) {
            this.progress += Math.random() * 5;
          }
        }, 300);

        // 调用咖啡机API继续制作
        await recommendationService.makeCoffee();
        
        // 完成进度由事件驱动更新，不直接设置
        clearInterval(interval);
      } catch (error) {
        console.error("继续制作失败:", error);
        this.isMaking = false;
      }
    },

    restartMaking() {
      this.progress = 0;
      this.isPaused = false;
      this.isMaking = false;
    },

    goHome() {
      this.$router.push('/');
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

    // 绑定状态变更事件监听
    recommendationService.on('statusChange', this.handleStatusChange);
  },

  beforeDestroy() {
    // 移除状态变更事件监听
    recommendationService.on('statusChange', this.handleStatusChange);
  }
};
</script>

<style scoped>
/* 保持原有样式不变 */
</style>

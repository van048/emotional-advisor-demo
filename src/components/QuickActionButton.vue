<template>
  <button
    class="px-4 py-2 rounded transition-colors"
    :class="{
      'bg-blue-500 hover:bg-blue-600 text-white': !localExecuting && !isCoffee,
      'bg-green-500 text-white': !localExecuting && isCoffee,
      'bg-gray-400 cursor-not-allowed': localExecuting,
      'animate-pulse': isAnimating
    }"
    :disabled="localExecuting"
    @click="handleClick"
  >
    {{ buttonText }}
  </button>
</template>

<script>
export default {
  props: {
    recommendation: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      localExecuting: false,
      isAnimating: false
    };
  },
  computed: {
    isCoffee() {
      return this.recommendation.type === 'coffee';
    },
    buttonText() {
      if (this.localExecuting) return '制作中...';
      if (this.isCoffee) return '查看食谱';
      return '开始制作';
    }
  },
  methods: {
    handleClick() {
      // 状态验证
      if (!this.recommendation || !this.recommendation.id || !this.recommendation.type) {
        this.$toast.error('无效的推荐项');
        return;
      }
      
      if (this.localExecuting) return;
      
      // 触发动画
      this.isAnimating = true;
      setTimeout(() => {
        this.isAnimating = false;
      }, 300);
      
      this.localExecuting = true;
      this.$store.dispatch('startExecution', this.recommendation);
      
      setTimeout(() => {
        this.localExecuting = false;
        this.$emit('execution-complete', this.recommendation);
        this.$toast.success('制作完成');
      }, 2000);
    }
  }
};
</script>

<style scoped>
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(0.95); }
  100% { transform: scale(1); }
}

.animate-pulse {
  animation: pulse 0.3s ease-in-out;
}
</style>
<template>
  <div class="flex flex-row space-x-4">
    <button
      v-for="mood in moods"
      :key="mood.value"
      :class="[
        /* 固定按钮高度并防止布局跳动 */
        'px-4 py-2 h-12 rounded-lg transition-all duration-200 transform hover:scale-105',
        /* 统一边框基础样式防止宽度变化 */
        'bg-gray-200 hover:bg-gray-300 border-2 border-transparent',
        { 'border-blue-500 bg-blue-500 shadow-md pulse-animation': isSelected(mood.value) },
        /* 使用box-sizing保持尺寸一致并添加flex布局 */
        'box-border flex items-center justify-center'
      ]"
      @click="handleSelect(mood.value)"
    >
      {{ mood.label }}
    </button>
  </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  props: {
    value: {
      type: [String, Number],
      required: true
    }
  },
  data() {
    return {
      moods: [
        { value: 'exhausted', label: '😫 疲惫' },
        { value: 'happy', label: '😄 开心' },
        { value: 'quiet', label: '🤫 想静一静' }
      ]
    };
  },
  computed: {
    isSelected() {
      return (moodValue) => moodValue === this.value;
    }
  },
  methods: {
    ...mapActions(['selectMood']),
    handleSelect(selectedMood) {
      this.$emit('input', selectedMood);
      this.selectMood(selectedMood);
      document.activeElement.setAttribute('aria-pressed', 'true');
      // 触发动画效果
      this.animateSelection();
    },
    animateSelection() {
      // 添加动画类并设置移除定时器
      const activeButton = document.activeElement;
      if (activeButton) {
        activeButton.classList.add('pulse-animation');
        setTimeout(() => {
          activeButton.classList.remove('pulse-animation');
        }, 500);
      }
    }
  }
};
</script>

<style scoped>
.pulse-animation {
  animation: pulse 0.5s ease-in-out;
}

@keyframes pulse {
  0% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0.4); }
  70% { transform: scale(1.05); box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.2); }
  100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(59, 130, 246, 0); }
}
</style>
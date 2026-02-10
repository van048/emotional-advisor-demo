<template>
  <div class="flex flex-row space-x-4">
    <button
      v-for="mood in moods"
      :key="mood.value"
      :class="[
        'px-4 py-2 rounded-lg transition-colors duration-200',
        'bg-gray-200 hover:bg-gray-300',
        { 'border-2 border-blue-500 bg-blue-500 shadow-md': isSelected(mood.value) }
      ]"
      @click="handleSelect(mood.value)"
    >
      {{ mood.label }}
    </button>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue';
import { mapActions } from 'vuex';

const props = defineProps({
  value: {
    type: [String, Number],
    required: true
  }
});

const emit = defineEmits(['input']);

const moods = [
  { value: 'exhausted', label: '😫 疲惫' },
  { value: 'happy', label: '😄 开心' },
  { value: 'quiet', label: '🤫 想静一静' }
];

const isSelected = computed(() => {
  return (moodValue) => moodValue === props.value;
});

// 正确解构使用mapActions
const { selectMood } = mapActions(['selectMood']);

const handleSelect = (selectedMood) => {
  emit('input', selectedMood);
  selectMood(selectedMood);
  // 添加ARIA反馈
  document.activeElement.setAttribute('aria-pressed', 'true');
};
</script>
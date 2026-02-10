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
    }
  }
};
</script>
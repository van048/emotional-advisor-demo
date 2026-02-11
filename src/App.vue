<!-- src/views/Home.vue -->
<template>
  <div class="container mx-auto px-4">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  methods: {
    showAlert() {
      alert('Vue 2 + Tailwind is working!')
    }
  }
}
</script>

<style scoped>
/* Removed direct Tailwind import as it's now imported via main.js */
</style>
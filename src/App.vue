<!-- src/views/Home.vue -->
<template>
  <div class="container mx-auto px-4">
    <div class="text-center py-12">
      <h1 class="text-4xl font-bold text-gray-800 mb-6">
        Welcome to Vue 2 + Tailwind + Webpack
      </h1>
      <p class="text-lg text-gray-600 mb-8">
        This project includes Vue 2, Webpack, and Tailwind CSS
      </p>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-3">Vue 2</h3>
          <p class="text-gray-600">Progressive JavaScript Framework</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-3">Webpack</h3>
          <p class="text-gray-600">Module bundler and build tool</p>
        </div>
        
        <div class="bg-white rounded-lg shadow-md p-6">
          <h3 class="text-xl font-semibold text-gray-800 mb-3">Tailwind CSS</h3>
          <p class="text-gray-600">Utility-first CSS framework</p>
        </div>
      </div>
      
      <button 
        class="mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200"
        @click="showAlert"
      >
        Click Me
      </button>
    </div>
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
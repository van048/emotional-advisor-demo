<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Home</h1>
    <div class="flex space-x-4">
      <router-link to="/about" class="text-blue-500 hover:underline">About Us</router-link>
      <router-link :to="{ name: 'about', params: { id: 123 }}" class="text-blue-500 hover:underline">About with ID</router-link>
      <router-link to="/contact" class="text-blue-500 hover:underline">Contact</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView'
}
</script>

<style scoped>
</style>
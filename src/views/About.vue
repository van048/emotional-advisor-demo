<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold">About Us</h1>
    <p v-if="$route.params.id" class="mt-4">Current ID: {{ $route.params.id }}</p>
  </div>
</template>

<script>
export default {
  name: 'AboutView'
}
</script>

<style scoped>
</style>

<style scoped>
</style>
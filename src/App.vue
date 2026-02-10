<script>
import TheHeader from '@/components/TheHeader.vue'
import TheFooter from '@/components/TheFooter.vue'

export default {
  components: {
    TheHeader,
    TheFooter
  }
}
</script>

<template>
  <main class="flex flex-col min-h-screen bg-amber-50">
    <TheHeader />
    <router-view class="flex-1 mb-16" />
    <TheFooter />
  </main>
</template>

<style>
@tailwind base;
@tailwind components;
@tailwind utilities;
</style>

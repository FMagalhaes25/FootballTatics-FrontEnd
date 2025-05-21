<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
    <Toaster position="top-right" />
  </NuxtLayout>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const layout = computed(() => route.meta?.layout || 'default')
</script>
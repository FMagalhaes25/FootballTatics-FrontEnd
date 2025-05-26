<template>
  <NuxtLayout :name="layout">
    <NuxtPage />
  </NuxtLayout>
  <Toaster position="top-right" />
</template>

<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'
import { Toaster } from 'vue-sonner'

const route = useRoute()

const layout = computed(() => route.meta?.layout || 'default')
</script>
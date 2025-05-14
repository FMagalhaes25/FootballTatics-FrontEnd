<template>
  <div class="flex min-h-screen">
    <!-- Conteúdo principal -->
    <div class="flex-1 flex flex-col">
      <!-- Conteúdo da Página -->
      <main class="flex-1 bg-[#121212] p-6 overflow-auto">
        <slot />
      </main>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>
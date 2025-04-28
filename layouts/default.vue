<template>
  <div class="flex min-h-screen">

    <!-- Sidebar -->
    <SideBarMenu :isOpen="isSidebarOpen" @close-sidebar="isSidebarOpen = false" />

    <!-- Conteúdo principal -->
    <div class="flex-1 flex flex-col">
      
      <!-- Navbar (visível sempre para abrir/fechar) -->
      <header class="flex items-center justify-between bg-[#1A1A1A] shadow p-4">
        <button @click="toggleSidebar" class="text-gray-600 hover:text-black focus:outline-none">
          <Menu class="w-6 h-6 text-[#4ADE80]" />
        </button>
      </header>

      <!-- Conteúdo da Página -->
      <main class="flex-1 bg-[#121212] p-6 overflow-auto">
        <slot />
      </main>

    </div>

  </div>
</template>

<script setup>
import { ref } from 'vue'
import SideBarMenu from '~/components/SideBarMenu.vue'
import { Menu } from 'lucide-vue-next'

const isSidebarOpen = ref(false)

function toggleSidebar() {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>
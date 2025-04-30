<template>
  <div>
    <aside :class="[
      'fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out flex flex-col bg-[#1A1A1A]',
      isOpen ? 'translate-x-0' : '-translate-x-full'
    ]">
      <div class="flex flex-col h-full text-white p-4">

        <!-- Header -->
        <div class="flex items-center mb-6 justify-between">
          <h1 class="text-2xl text-[#4ADE80] font-bold">FootballTactics</h1>
          <button @click="toggleSidebar" class="p-2 rounded-full hover:bg-[#4ADE80] transition-colors">
            <ChevronLeft class="text-[#4ADE80] w-6 h-6" />
          </button>
        </div>

        <!-- Navegação -->
        <nav class="flex-1 overflow-y-auto">
          <div class="flex flex-col space-y-2">
            <NuxtLink v-for="(item, index) in menuItems" :key="index" :to="item.to"
              class="flex items-center px-4 py-3 text-base rounded-lg transition-colors"
              :class="[
                $route.path === item.to
                  ? 'text-white font-medium'
                  : 'text-white hover:bg-[#16A249]'
              ]"
              @click="$emit('menu-item-click')">
              <component :is="item.icon" class="w-6 h-6 mr-3 opacity-70" />
              <span class="text-sm font-medium">{{ item.name }}</span>
            </NuxtLink>
          </div>
        </nav>

        <!-- Footer -->
        <div class="pt-4 border-t border-gray-700">
          <NuxtLink to="/perfil/"
            class="flex items-center px-4 py-3 text-base rounded-lg transition-colors hover:bg-[#16A249]"
            @click="closeSidebarOnMobile">
            <User class="w-6 h-6 mr-3 opacity-70" />
            <span class="text-sm font-medium">Perfil</span>
          </NuxtLink>

          <LogoutButton></LogoutButton>
        </div>

      </div>
    </aside>

    <!-- Overlay apenas no mobile -->
    <div v-if="isOpen && !isDesktop" class="fixed inset-0 bg-black opacity-50" @click="toggleSidebar"></div>
  </div>
  
</template>

<script setup>
import { ref, computed } from 'vue'
import { useMediaQuery } from '@vueuse/core'
import { ChevronLeft, LayoutDashboard, Users, Newspaper, NotebookPen, LogOut, User } from 'lucide-vue-next'
import LogoutButton from '~/components/perfil/LogoutButton.vue'

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits(['close-sidebar', 'menu-item-click'])

const isDesktop = useMediaQuery('(min-width: 1024px)')

const menuItems = ref([
  { to: '/', name: 'Home', icon: LayoutDashboard },
  { to: '/elenco/', name: 'Elenco', icon: Users },
  { to: '/formacoes', name: 'Formações', icon: NotebookPen },
  { to: '/taticas', name: 'Táticas', icon: Newspaper },
])

function toggleSidebar() {
  emit('close-sidebar')
}

function closeSidebarOnMobile() {
  if (!isDesktop.value) {
    emit('close-sidebar')
  }
}

</script>
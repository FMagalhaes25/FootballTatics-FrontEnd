<template>
  <div class="min-h-screen bg-[#f5f5f5] dark:bg-[#121212]">
    <div class="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-6">
      <!-- Sidebar Navigation -->
      <aside class="w-full md:w-64 flex-shrink-0">
        <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm p-4">
          <nav class="space-y-1">
            <a href="#" class="flex items-center space-x-3 px-3 py-2.5 rounded-lg bg-[#16A249] bg-opacity-10 text-[#16A249] font-medium">
              <LayoutDashboard class="h-5 w-5" />
              <span>Dashboard</span>
            </a>
            <a href="#" class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#252525] font-medium">
              <Users class="h-5 w-5" />
              <span>Elenco</span>
            </a>
            <a href="#" class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#252525] font-medium">
              <CalendarDays class="h-5 w-5" />
              <span>Calendário</span>
            </a>
            <a href="#" class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#252525] font-medium">
              <BarChart2 class="h-5 w-5" />
              <span>Estatísticas</span>
            </a>
            <a href="#" class="flex items-center space-x-3 px-3 py-2.5 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#252525] font-medium">
              <Settings class="h-5 w-5" />
              <span>Configurações</span>
            </a>
          </nav>
          
          <!-- Team Selector -->
          <div class="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-sm font-medium text-gray-500 dark:text-gray-400">Seus Times</h3>
              <button class="text-[#16A249] hover:text-[#0f7a36] text-sm font-medium">
                Ver Todos
              </button>
            </div>
            <div class="space-y-2">
              <button class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg bg-[#16A249] bg-opacity-10 text-[#16A249]">
                <div class="h-8 w-8 rounded-full bg-[#16A249] flex items-center justify-center text-white font-bold text-xs">FC</div>
                <span class="font-medium">FC Barcelona</span>
              </button>
              <button class="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-[#252525]">
                <div class="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-gray-600 dark:text-gray-300 font-bold text-xs">RM</div>
                <span class="font-medium">Real Madrid</span>
              </button>
            </div>
          </div>
        </div>
      </aside>
      
      <!-- Main Content -->
      <main class="flex-grow">
        <!-- Welcome Section -->
        <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm p-6 mb-6">
          <div class="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Bem-vindo, John!</h2>
              <p class="text-gray-600 dark:text-gray-300 mt-1">Gerencie seu time e acompanhe o desempenho dos jogadores.</p>
            </div>
            <div class="mt-4 md:mt-0">
              <button class="px-4 py-2 bg-[#16A249] hover:bg-[#0f7a36] text-white font-medium rounded-lg flex items-center">
                <Plus class="h-5 w-5 mr-2" />
                Novo Time
              </button>
            </div>
          </div>
        </div>
        
        <!-- Main Navigation Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <!-- Formations Card -->
          <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <div class="h-32 bg-gradient-to-r from-[#16A249] to-[#0f7a36] p-6 flex items-center justify-between">
              <h3 class="text-xl font-bold text-white">Formações</h3>
              <Newspaper class="h-12 w-12 text-white opacity-70" />
            </div>
            <div class="p-6">
              <p class="text-gray-600 dark:text-gray-300 mb-4">Crie e gerencie diferentes formações táticas para seu time.</p>
              <button class="w-full px-4 py-2 bg-gray-100 dark:bg-[#252525] hover:bg-[#16A249] hover:text-white dark:hover:bg-[#16A249] text-gray-800 dark:text-white font-medium rounded-lg transition-colors group-hover:bg-[#16A249] group-hover:text-white">
                Acessar Formações
              </button>
            </div>
          </div>
          
          <!-- Squads Card -->
          <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <div class="h-32 bg-gradient-to-r from-[#16A249] to-[#0f7a36] p-6 flex items-center justify-between">
              <h3 class="text-xl font-bold text-white">Elencos</h3>
              <Users class="h-12 w-12 text-white opacity-70" />
            </div>
            <div class="p-6">
              <p class="text-gray-600 dark:text-gray-300 mb-4">Gerencie os jogadores do seu elenco e suas características.</p>
              <button class="w-full px-4 py-2 bg-gray-100 dark:bg-[#252525] hover:bg-[#16A249] hover:text-white dark:hover:bg-[#16A249] text-gray-800 dark:text-white font-medium rounded-lg transition-colors group-hover:bg-[#16A249] group-hover:text-white">
                Acessar Elencos
              </button>
            </div>
          </div>
          
          <!-- Tactics Card -->
          <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
            <div class="h-32 bg-gradient-to-r from-[#16A249] to-[#0f7a36] p-6 flex items-center justify-between">
              <h3 class="text-xl font-bold text-white">Táticas</h3>
              <Gamepad2 class="h-12 w-12 text-white opacity-70" />
            </div>
            <div class="p-6">
              <p class="text-gray-600 dark:text-gray-300 mb-4">Defina estratégias e táticas para diferentes situações de jogo.</p>
              <button class="w-full px-4 py-2 bg-gray-100 dark:bg-[#252525] hover:bg-[#16A249] hover:text-white dark:hover:bg-[#16A249] text-gray-800 dark:text-white font-medium rounded-lg transition-colors group-hover:bg-[#16A249] group-hover:text-white">
                Acessar Táticas
              </button>
            </div>
          </div>
        </div>
        
      </main>
    </div>
  </div>
</template>

<script setup>
import { 
  Trophy, 
  Search, 
  Bell, 
  ChevronDown, 
  LayoutDashboard, 
  Users, 
  CalendarDays, 
  BarChart2, 
  Settings, 
  Plus, 
  Newspaper, 
  Gamepad2, 
  Goal, 
  ShieldAlert, 
  UserPlus, 
  ClipboardEdit, 
  CalendarCheck, 
  AlertTriangle 
} from 'lucide-vue-next';

definePageMeta({
    layout: 'default',
})

// You can add reactive data and methods here as needed
</script>

<style scoped>
/* Add any component-specific styles here */
</style>
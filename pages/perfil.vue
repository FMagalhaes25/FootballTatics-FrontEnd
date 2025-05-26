<template>
  <div class="min-h-screen bg-gradient-to-br from-[#121212] via-[#1a1919] to-[#0f0f0f] p-4 md:p-6">
    <!-- Estado de carregamento -->
    <div v-if="!profileData" class="flex items-center justify-center min-h-screen">
      <div class="text-center">
        <div class="w-16 h-16 border-4 border-[#16A249] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p class="text-white text-lg">Carregando perfil...</p>
      </div>
    </div>

    <div v-else class="max-w-7xl mx-auto">
      <div class="relative mb-8 overflow-hidden"> 
        <div class="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <pattern id="grid" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#16A249" stroke-width="1"/>
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>
        
        <div class="relative flex justify-between items-start">
          <div class="space-y-2">
            <div class="flex items-center space-x-3">
              <div class="w-2 h-8 bg-gradient-to-b from-[#16A249] to-[#0f7a36] rounded-full"></div>
              <h1 class="text-3xl md:text-4xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                Meu Perfil
              </h1>
            </div>
            <p class="text-gray-400 ml-5">Gerencie suas informações</p>
          </div>
          <LogoutButton />
        </div>
      </div>

      <!-- Seção principal -->
      <div class="grid grid-cols-1 gap-6 mb-8">
        <!-- Card de perfil  -->
        <div>
          <div class="bg-gradient-to-br from-[#1a1919] to-[#252525] rounded-2xl shadow-2xl border border-[#16A249]/20 p-8 relative overflow-hidden">
            <!-- Decoração  -->
            <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#16A249]/10 to-transparent rounded-full -translate-y-16 translate-x-16"></div>
            <div class="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-[#0f7a36]/10 to-transparent rounded-full translate-y-12 -translate-x-12"></div>
            
            <div class="relative z-10">
              <div class="flex flex-col lg:flex-row gap-8">
                <!-- Seção do Icone de usuario -->
                <div class="flex flex-col items-center lg:items-start">
                  <div class="relative group">
                    <div class="w-32 h-32 rounded-full bg-gradient-to-br from-[#16A249] to-[#0f7a36] p-1 shadow-2xl">
                      <div class="w-full h-full rounded-full bg-[#1a1919] flex items-center justify-center">
                        <User2 class="w-16 h-16 text-white" />
                      </div>
                    </div>
                    <!-- efeitos -->
                    <div class="absolute inset-0 rounded-full bg-gradient-to-br from-[#16A249] to-[#0f7a36] opacity-20 blur-xl group-hover:opacity-30 transition-opacity"></div>
                    
                    <div class="absolute -bottom-2 -right-2 bg-green-500 w-8 h-8 rounded-full border-4 border-[#1a1919] flex items-center justify-center">
                      <div class="w-3 h-3 bg-white rounded-full animate-pulse"></div>
                    </div>
                  </div>
                  
                  <!-- Titulo do usuario -->
                  <div class="mt-4 text-center lg:text-left">
                    <h2 class="text-2xl font-bold text-white">{{ profileData.name }}</h2>
                    <p class="text-[#16A249] mt-2 font-medium">Técnico Principal</p>   
                  </div>
                </div>

                <!-- Informações do usuario -->
                <div class="flex-1 space-y-6">
                  <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <!-- Email -->
                    <div class="group">
                      <label class="text-sm text-gray-400 block mb-2 font-medium">E-mail</label>
                      <div class="flex items-center gap-3 p-3 bg-[#252525] rounded-xl border border-gray-700 group-hover:border-[#16A249]/50 transition-colors">
                        <div class="p-2 bg-[#16A249]/10 rounded-lg">
                          <Mail class="w-5 h-5 text-[#16A249]" />
                        </div>
                        <span class="text-white font-medium">{{ profileData.email }}</span>
                      </div>
                    </div>

                    <!-- Telefone -->
                    <div class="group">
                      <label class="text-sm text-gray-400 block mb-2 font-medium">Telefone</label>
                      <div class="flex items-center gap-3 p-3 bg-[#252525] rounded-xl border border-gray-700 group-hover:border-[#16A249]/50 transition-colors">
                        <div class="p-2 bg-[#16A249]/10 rounded-lg">
                          <Phone class="w-5 h-5 text-[#16A249]" />
                        </div>
                        <span class="text-white font-medium">{{ profileData.phone }}</span>
                      </div>
                    </div>

                    <!-- Time -->
                    <div class="group md:col-span-2">
                      <label class="text-sm text-gray-400 block mb-2 font-medium">Time Principal</label>
                      <div class="flex items-center gap-3 p-3 bg-[#252525] rounded-xl border border-gray-700 group-hover:border-[#16A249]/50 transition-colors">
                        <div class="p-2 bg-[#16A249]/10 rounded-lg">
                          <Trophy class="w-5 h-5 text-[#16A249]" />
                        </div>
                        <span class="text-white font-medium">{{ profileData.team }}</span>
                        <div class="ml-auto flex items-center space-x-2">
                          <div class="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                          <span class="text-green-400 text-sm">Ativo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Seção da formação -->
      <div class="bg-gradient-to-br from-[#1a1919] to-[#252525] rounded-2xl shadow-2xl border border-[#16A249]/20 p-8 relative overflow-hidden">
        <!-- decoração -->
        <div class="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle cx="20" cy="20" r="2" fill="#16A249"/>
            <circle cx="80" cy="30" r="1.5" fill="#16A249"/>
            <circle cx="60" cy="70" r="1" fill="#16A249"/>
            <circle cx="30" cy="80" r="2.5" fill="#16A249"/>
          </svg>
        </div>
        
        <div class="relative z-10">
          <div class="flex items-center justify-between mb-8">
            <div>
              <h3 class="text-2xl font-bold text-white flex items-center">
                <Gamepad2 class="w-7 h-7 text-[#16A249] mr-3" />
                Formação Tática
              </h3>
              <p class="text-gray-400 mt-1">Sua formação principal selecionada</p>
            </div>
            
            <button class="px-4 py-2 bg-[#16A249] hover:bg-[#0f7a36] text-white font-medium rounded-xl transition-colors flex items-center space-x-2">
              <Edit3 class="w-4 h-4" />
              <span>Alterar</span>
            </button>
          </div>

          <!-- Display da formação -->
          <div v-if="loadingFormation" class="flex items-center justify-center py-20">
            <div class="text-center">
              <div class="w-12 h-12 border-4 border-[#16A249] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p class="text-gray-400">Carregando formação salva...</p>
            </div>
          </div>
          
          <div v-else-if="selectedFormation" class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <!-- Infos da formação -->
            <div class="space-y-6">
              <div class="bg-[#252525] rounded-xl p-6 border border-gray-700">
                <h4 class="text-xl font-bold text-white mb-4">{{ selectedFormation.name }}</h4>
                
                <div class="space-y-3">
                  <div class="flex justify-between items-center">
                    <span class="text-gray-400">Estilo:</span>
                    <span class="text-white font-medium">{{ selectedFormation.style || 'Equilibrada' }}</span>
                  </div>
                  
                  <div class="flex justify-between items-center">
                    <span class="text-gray-400">Dificuldade:</span>
                    <div class="flex space-x-1">
                      <Star 
                        v-for="i in 5" 
                        :key="i"
                        class="w-4 h-4"
                        :class="i <= (selectedFormation.difficulty || 3) ? 'text-yellow-400 fill-current' : 'text-gray-600'"
                      />
                    </div>
                  </div>
                </div>
              </div>             
            </div>
            
            <!-- Formation Field -->
            <div class="lg:col-span-2">
              <FormacaoCard
                :formation="selectedFormation"
                :large="true"
                class="h-full"
              />
            </div>
          </div>
          
          <div v-else class="text-center py-20">
            <div class="w-16 h-16 bg-[#252525] rounded-full flex items-center justify-center mx-auto mb-4">
              <Gamepad2 class="w-8 h-8 text-gray-500" />
            </div>
            <p class="text-gray-400 text-lg mb-4">Nenhuma formação selecionada</p>
            <button class="px-6 py-3 bg-[#16A249] hover:bg-[#0f7a36] text-white font-medium rounded-xl transition-colors"
            @click="'/formacoes'">
              Escolher Formação
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue'
import { 
  User2, 
  Phone, 
  Mail, 
  Trophy, 
  Star, 
  Gamepad2, 
  Edit3,
} from 'lucide-vue-next'
import { definePageMeta, useRuntimeConfig } from '#imports';
import LogoutButton from '~/components/perfil/LogoutButton.vue'
import FormacaoCard from '~/components/formacoes/Campo.vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'default',
  // middleware: 'auth'
})

const auth = useAuthStore()
const config = useRuntimeConfig();
const selectedFormation = ref(null)
const loadingFormation = ref(true)
const profileData = ref(null)

onMounted(async () => {
  profileData.value = auth.user
  await loadFormation()
})

const loadFormation = async () => {
  try {
    const response = await fetch(`${config.public.API_URL}/formacao-escolhida/`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) throw new Error('Erro ao carregar formação')

    const data = await response.json()
    selectedFormation.value = {
      name: data.formacao.nome,
      positions: data.formacao.posicoes,
      style: data.formacao.estilo || 'Equilibrada',
      difficulty: data.formacao.dificuldade || 3,
      description: data.formacao.descricao || 'Formação tática'
    }
  } catch (err) {
    console.error(err)
  } finally {
    loadingFormation.value = false
  }
}

</script>

<style scoped>
@keyframes float {
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
}

.animate-float {
  animation: float 3s ease-in-out infinite;
}

.gradient-text {
  background: linear-gradient(135deg, #16A249, #0f7a36);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.glow {
  box-shadow: 0 0 20px rgba(22, 162, 73, 0.3);
}

.hover-lift {
  transition: transform 0.3s ease;
}

.hover-lift:hover {
  transform: translateY(-5px);
}
</style>

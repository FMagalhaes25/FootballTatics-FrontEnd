<template>
  <div class="min-h-screen bg-[#121212] p-4 md:p-6">
    <div v-if="!profileData" class="text-white text-center py-20">
      Carregando perfil...
    </div>

    <div v-else>
      <!-- Header com título e botão desconectar -->
      <div class="flex justify-between items-start mb-8">
        <div>
          <h1 class="text-2xl md:text-3xl font-semibold text-white mb-2">Perfil</h1>
        </div>
        <LogoutButton />
      </div>

      <!-- Card Principal -->
      <div class="bg-[#1a1919] rounded-lg shadow-sm border border-[#16A249] p-6 mb-6">
        <div class="flex flex-col md:flex-row gap-8">
          <!-- Coluna com ícone -->
          <div class="flex flex-col items-center">
            <div class="relative">
              <div class="w-32 h-32 rounded-full bg-[#0f7a36] overflow-hidden">
                <User2 class="w-full h-full p-6 text-white" />
              </div>
            </div>
          </div>

          <!-- Coluna das Informações -->
          <div class="flex-1">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label class="text-sm text-white block mb-1">Nome Completo</label>
                <div class="flex items-center gap-2">
                  <User2 class="w-5 h-5 text-gray-400" />
                  <span class="text-white">{{ profileData.name }}</span>
                </div>
              </div>

              <div>
                <label class="text-sm text-white block mb-1">Telefone</label>
                <div class="flex items-center gap-2">
                  <Phone class="w-5 h-5 text-gray-400" />
                  <span class="text-white">{{ profileData.phone }}</span>
                </div>
              </div>

              <div>
                <label class="text-sm text-white block mb-1">E-mail</label>
                <div class="flex items-center gap-2">
                  <Mail class="w-5 h-5 text-gray-400" />
                  <span class="text-white">{{ profileData.email }}</span>
                </div>
              </div>

              <div>
                <label class="text-sm text-white block mb-1">Time</label>
                <div class="flex items-center gap-2">
                  <Trophy class="w-5 h-5 text-gray-400" />
                  <span class="text-white">{{ profileData.team }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { User2, Phone, Mail, Trophy } from 'lucide-vue-next'

import LogoutButton from '~/components/perfil/LogoutButton.vue'
import EditButton from '~/components/perfil/EditButton.vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'default',
  //middleware: 'auth'
})

const auth = useAuthStore()
const profileData = computed(() => auth.user)

</script>
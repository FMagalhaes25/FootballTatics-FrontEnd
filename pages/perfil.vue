<template>
    <div class="min-h-screen bg-[#121212] p-4 md:p-6">
        <!-- Header com título e botão desconectar -->
        <div class="flex justify-between items-start mb-8">
            <div>
                <h1 class="text-2xl md:text-3xl font-semibold text-white mb-2">
                Perfil
                </h1>
                <!--<p class="text-gray-600">
                {{ $t('profile.subtitle') }}
                </p>-->
            </div>
            <LogoutButton></LogoutButton>
        </div>

        <!-- Card Principal -->
        <div class="bg-[#1a1919] rounded-lg shadow-sm border border-[#16A249] p-6 mb-6">
            <div class="flex flex-col md:flex-row gap-8">
                <!-- Coluna da Foto -->
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
                        <!-- Nome Completo -->
                        <div>
                        <label class="text-sm text-white block mb-1">
                            Nome Completo
                        </label>
                        <div class="flex items-center gap-2">
                            <User2 class="w-5 h-5 text-gray-400" />
                            <span class="text-white">{{ profileData.name }}</span>
                        </div>
                        </div>

                        <!-- Telefone -->
                        <div>
                        <label class="text-sm text-white block mb-1">
                            Telefone
                        </label>
                        <div class="flex items-center gap-2">
                            <Phone class="w-5 h-5 text-gray-400" />
                            <span class="text-white">{{ profileData.phone }}</span>
                        </div>
                        </div>

                        <!-- E-mail -->
                        <div>
                            <label class="text-sm text-white block mb-1">
                                E-mail
                            </label>
                            <div class="flex items-center gap-2">
                                <Mail class="w-5 h-5 text-gray-400" />
                                <span class="text-white">{{ profileData.email }}</span>
                            </div>
                        </div>

                        <!--Time-->
                        <div>
                            <label class="text-sm text-white block mb-1">
                                Time
                            </label>
                            <div class="flex items-center gap-2">
                                <Trophy  class="w-5 h-5 text-gray-400" />
                                <span class="text-white">{{ profileData.team }}</span>
                            </div>
                        </div>
                    </div>

                    <!-- Botão Editar -->
                    <div class="mt-6 flex justify-end">
                        <EditButton @click="showEditDataModal = true"></EditButton>
                    </div>
            </div>
        </div>
        </div>
        <!-- Modais -->
        <EditDataModal 
        :is-open="showEditDataModal" 
        :user-data="profileData"
        @close="showEditDataModal = false"
        @save="updateUserData"
        />
    </div>
</template>

<script setup>
import { User2, Phone, Mail, FileText, Trophy , LogOut } from 'lucide-vue-next'
import LogoutButton from '~/components/perfil/LogoutButton.vue'
import EditButton from '~/components/perfil/EditButton.vue'
import EditDataModal from '~/components/perfil/EditDataModal.vue'


definePageMeta({
    layout: 'default',
})

// Estados para controlar a exibição dos modais
const showEditDataModal = ref(false)
const showEditInfoModal = ref(false)

// Mock de dados do perfil
const profileData = ref({
  name: 'Lorem ipsum dolor sit',
  phone: '(00) 0123-5678',
  email: 'lorem-ipsum@email.com',
  team: 'Time de Exemplo',
})

const updateUserData = (data) => {
  profileData.value = {
    ...profileData.value,
    phone: data.phone
  }
  console.log('Dados atualizados:', profileData.value)
}

</script>
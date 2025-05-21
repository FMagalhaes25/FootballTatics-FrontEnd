<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-[#1a1919] rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-white">Editar Jogador</h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-white">
            <X class="w-6 h-6" />
          </button>
        </div>

        <form @submit.prevent="handleSubmit">
          <!-- Nome, idade, peso, altura como readonly -->
          <div class="mb-4">
            <label class="block text-sm text-gray-400 mb-1">Nome</label>
            <input type="text" v-model="form.nome" readonly class="w-full bg-[#232323] border border-gray-700 text-white rounded px-3 py-2" />
          </div>
          <!-- Campos editáveis -->
          <div class="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label class="block text-sm text-gray-400 mb-1">Camisa</label>
              <input type="number" v-model.number="form.camisa" class="w-full bg-[#232323] border border-gray-700 text-white rounded px-3 py-2" />
            </div>
            <div>
              <label class="block text-sm text-gray-400 mb-1">Posição</label>
              <input type="text" v-model="form.posicao" class="w-full bg-[#232323] border border-gray-700 text-white rounded px-3 py-2" />
            </div>
          </div>

          <div class="mb-6">
            <h3 class="text-white text-lg mb-3">Atributos</h3>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm text-gray-400 mb-1">Velocidade (0-10)</label>
                <input 
                  v-model.number="form.velocidade" 
                  type="number" 
                  min="0"
                  max="10"
                  class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-1">Chute (0-10)</label>
                <input 
                  v-model.number="form.chute" 
                  type="number" 
                  min="0"
                  max="10"
                  class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-1">Passe (0-10)</label>
                <input 
                  v-model.number="form.passe" 
                  type="number" 
                  min="0"
                  max="10"
                  class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-1">Defesa (0-10)</label>
                <input 
                  v-model.number="form.defesa" 
                  type="number" 
                  min="0"
                  max="10"
                  class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div class="flex justify-end gap-2">
            <button type="button" @click="$emit('close')" class="bg-[#232323] text-white px-4 py-2 rounded-lg">Cancelar</button>
            <button type="submit" class="bg-[#16A249] text-white px-4 py-2 rounded-lg">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { X } from 'lucide-vue-next'

const props = defineProps({
  isOpen: Boolean,
  playerData: Object
})

const emit = defineEmits(['close', 'save'])

const form = ref({})

watch(() => props.playerData, (data) => {
  if (data) form.value = { ...data }
}, { immediate: true })

const handleSubmit = () => emit('save', { ...form.value })
</script>

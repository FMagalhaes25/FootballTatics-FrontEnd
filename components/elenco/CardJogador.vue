<template>
  <div class="bg-[#232323] rounded-lg overflow-hidden border border-gray-700 hover:border-[#16A249] transition-colors">
    <!-- Cabeçalho -->
    <div class="bg-[#16A249] p-3 flex justify-between items-center">
      <div class="flex items-center gap-2">
        <span class="bg-white text-[#16A249] font-bold rounded-full w-6 h-6 flex items-center justify-center">
          {{ jogador.camisa }}
        </span>
        <h3 class="text-white font-medium truncate">{{ jogador.nome }}</h3>
      </div>
      <div class="flex gap-1">
        <button @click.stop="$emit('edit', jogador)" class="text-white hover:text-gray-200 p-1">
          <Edit2 class="w-4 h-4" />
        </button>
        <button @click.stop="$emit('delete', jogador)" class="text-white hover:text-gray-200 p-1">
          <Trash2 class="w-4 h-4" />
        </button>
      </div>
    </div>

    <!-- Informações do Jogador -->
    <div class="p-4">
      <div class="flex mb-4">
        <div class="w-20 h-20 bg-gray-700 rounded-full flex items-center justify-center mr-3">
          <User2 class="w-12 h-12 text-gray-500" />
        </div>
        <div class="flex-1">
          <div class="text-gray-400 text-sm mb-1">Posição</div>
          <div class="text-white mb-2">{{ jogador.posicao || '-' }}</div>

          <div class="grid grid-cols-3 gap-2 text-center">
            <div class="bg-[#2a2a2a] rounded p-1">
              <div class="text-xs text-gray-400">Idade</div>
              <div class="text-white text-sm">{{ jogador.idade || '-' }}</div>
            </div>
            <div class="bg-[#2a2a2a] rounded p-1">
              <div class="text-xs text-gray-400">Altura</div>
              <div class="text-white text-sm">{{ jogador.altura ? jogador.altura + 'cm' : '-' }}</div>
            </div>
            <div class="bg-[#2a2a2a] rounded p-1">
              <div class="text-xs text-gray-400">Peso</div>
              <div class="text-white text-sm">{{ jogador.peso ? jogador.peso + 'kg' : '-' }}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Atributos -->
      <div class="grid grid-cols-2 gap-2 text-center mb-2">
        <div class="bg-[#2a2a2a] rounded p-2">
          <div class="text-xs text-gray-400">Velocidade</div>
          <div class="text-white">{{ jogador.velocidade ?? '-' }}/10</div>
        </div>
        <div class="bg-[#2a2a2a] rounded p-2">
          <div class="text-xs text-gray-400">Chute</div>
          <div class="text-white">{{ jogador.chute ?? '-' }}/10</div>
        </div>
        <div class="bg-[#2a2a2a] rounded p-2">
          <div class="text-xs text-gray-400">Passe</div>
          <div class="text-white">{{ jogador.passe ?? '-' }}/10</div>
        </div>
        <div class="bg-[#2a2a2a] rounded p-2">
          <div class="text-xs text-gray-400">Defesa</div>
          <div class="text-white">{{ jogador.defesa ?? '-' }}/10</div>
        </div>
      </div>

      <!-- Perna Boa -->
      <div class="bg-opacity-20 border border-[#16A249] rounded p-2 text-center mb-2">
        <div class="text-[#16A249] font-medium">Perna Boa</div>
        <div class="text-white text-sm">{{ jogador.perna_boa || '-' }}</div>
      </div>

      <!-- Goleiro -->
      <div
        v-if="jogador.goleiro"
        class="bg-[#16A249] bg-opacity-20 border border-[#16A249] rounded p-2 text-center"
      >
        <div class="text-[#16A249] font-medium">Goleiro</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { User2, Edit2, Trash2 } from 'lucide-vue-next'

defineProps({
  jogador: {
    type: Object,
    required: true
  }
})

defineEmits(['edit', 'delete'])
</script>

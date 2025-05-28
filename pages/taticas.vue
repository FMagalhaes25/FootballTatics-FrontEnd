<template>
  <div class="min-h-screen bg-[#f5f5f5] dark:bg-[#121212]">
    <div class="container mx-auto px-4 py-6">

      <!-- Cabeçalho -->
      <div class="bg-white dark:bg-[#1a1919] rounded-xl shadow-sm p-6 mb-6">
        <h2 class="text-2xl font-bold text-gray-800 dark:text-white">Táticas de Jogo</h2>
        <p class="text-gray-600 dark:text-gray-300">Escolha e analise diferentes táticas para aplicar em seu time.</p>
        <div class="mt-4 flex items-center space-x-3">
          <div class="h-8 w-8 rounded-full bg-[#16A249] flex items-center justify-center text-white font-bold text-xs">{{ teamInitials }}</div>
          <span class="font-medium text-gray-700 dark:text-gray-200">{{ teamName }}</span>
        </div>
      </div>

      <!-- Cards de Táticas -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="(tatic, index) in taticas"
          :key="index"
          class="bg-white dark:bg-[#1a1919] rounded-xl shadow-md p-8 hover:shadow-lg transition-shadow flex flex-col justify-between"
        >
          <img
            v-if="tatic.imagem"
            :src="tatic.imagem"
            :alt="tatic.nome"
            class="w-full max-h-20 object-contain rounded-lg mb-4"
          >
          <div>
            <h3 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">{{ tatic.nome }}</h3>
            <p class="text-gray-600 dark:text-gray-300">{{ tatic.descricao }}</p>
          </div>
          <button
            class="mt-6 w-full px-4 py-2 bg-gray-100 dark:bg-[#252525] hover:bg-[#16A249] hover:text-white dark:hover:bg-[#16A249] text-gray-800 dark:text-white font-medium rounded-lg transition-colors"
            @click="saibaMais(tatic)"
          >
            Saiba Mais
          </button>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useAuthStore } from '~/stores/auth'

definePageMeta({
  layout: 'default',
})

const auth = useAuthStore()
const teamName = computed(() => auth.user?.team || 'Time Desconhecido')
const teamInitials = computed(() =>
  teamName.value
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
)

const taticas = [
  {
    nome: 'Tiki Taka',
    descricao: 'Um estilo de jogo baseado em posse de bola. Atletas sentem-se confortáveis com a bola em todo o campo e utilizam passes curtos e alternam posições à procura de atacantes que encontrem espaços entre as linhas da defesa adversária.',
    imagem: new URL('@/components/taticas/imagens/tikitaka2.png', import.meta.url).href
  },
  {
    nome: 'Jogada pelas Pontas',
    descricao: 'Usa toda a largura do campo quando estiver com a posse de bola, levando a bola para atletas nas pontas rapidamente e usando a ultrapassagem de laterais para aumentar a força nessas regiões.',
    imagem: new URL('@/components/taticas/imagens/pontas2.png', import.meta.url).href
  },
  {
    nome: 'Contra-Ataque',
    descricao: 'Poucos riscos e linha baixa são necessários para este estilo de jogo. Atletas defendem a grande área e, quando recuperam a bola, chutam para atacantes que se preparam para aproveitar os espaços por trás da linha da defesa adversária.',
    imagem: new URL('@/components/taticas/imagens/contraataque2.png', import.meta.url).href
  },
  {
    nome: 'Pressão',
    descricao: 'A equipe procurará recuperar a bola na área adversária sempre que possível, através da recuperação de posse em zonas que possam criar oportunidades de gol antes que o time adversário se reorganize.',
    imagem: new URL('@/components/taticas/imagens/pressao2.png', import.meta.url).href
  },
  {
    nome: 'Conexão Direta',
    descricao: 'Um estilo de jogo focado na força e na condição física que permite que atletas muitas vezes ignorem o meio-campo, colocando a bola diretamente para atacantes fortes que podem explorar as costas da defesa e lutar por rebotes e erros adversários.',
    imagem: new URL('@/components/taticas/imagens/conexaodireta2.png', import.meta.url).href
  },
  {
    nome: 'Retranca Total',
    descricao: 'Seu time foca principalmente em uma defesa sólida e que não cede espaços. Quando estiver sem a bola, o time sempre mantém a organização e a disciplina, geralmente adotando uma linha muito baixa que reduz as opções do ataque adversário e permite recuperar a bola para construir jogadas.',
    imagem: new URL('@/components/taticas/imagens/retranca2.png', import.meta.url).href
  },
]

function saibaMais(tatica) {
  alert(`Saiba mais sobre: ${tatica.nome}\n\n${tatica.descricao}`)
}
</script>
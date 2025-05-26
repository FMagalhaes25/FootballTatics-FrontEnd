<template>
  <div class="min-h-screen bg-[#121212] p-4 md:p-6">
    <div class="flex justify-between items-start mb-8">
      <h1 class="text-2xl md:text-3xl font-semibold text-white mb-2">Elenco</h1>
    </div>

    <div class="bg-[#1a1919] rounded-lg shadow-sm border border-[#16A249] p-6 mb-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-xl font-semibold text-white">Jogadores</h2>
        <button
          @click="showAddPlayerModal = true"
          class="bg-[#16A249] hover:bg-[#0f7a36] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <PlusCircle class="w-5 h-5" />
          Adicionar Jogador
        </button>
      </div>

      <!-- Jogadores -->
      <div v-if="jogadores.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <CardJogador
          v-for="jogador in jogadores"
          :key="jogador.id"
          :jogador="jogador"
          @edit="editPlayer"
          @delete="confirmDeletePlayer"
        />
      </div>

      <!-- Estado vazio -->
      <div v-else class="flex flex-col items-center justify-center py-12 text-center">
        <Users class="w-16 h-16 text-gray-600 mb-4" />
        <h3 class="text-white text-lg font-medium mb-2">Nenhum jogador no elenco</h3>
        <p class="text-gray-400 mb-6">Adicione jogadores ao seu elenco para visualizá-los aqui.</p>
        <button
          @click="showAddPlayerModal = true"
          class="bg-[#16A249] hover:bg-[#0f7a36] text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
        >
          <PlusCircle class="w-5 h-5" />
          Adicionar Jogador
        </button>
      </div>
    </div>

    <!-- Modais -->
    <AdicionarJogador
      :is-open="showAddPlayerModal"
      @close="closeAddPlayerModal"
      @save="createPlayer"
    />

    <EditarJogador
      :is-open="showEditPlayerModal"
      :player-data="currentPlayer"
      @close="closeEditPlayerModal"
      @save="updatePlayerData"
    />

    <Confirmacao
      :is-open="showDeleteModal"
      title="Excluir Jogador"
      message="Tem certeza que deseja excluir este jogador do elenco? Esta ação não pode ser desfeita."
      @confirm="deletePlayer"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '~/stores/auth'
import { Users, PlusCircle } from 'lucide-vue-next'
import CardJogador from '~/components/elenco/CardJogador.vue'
import AdicionarJogador from '~/components/elenco/AdicionarJogador.vue'
import EditarJogador from '~/components/elenco/EditarJogador.vue'
import Confirmacao from '~/components/elenco/Confirmar.vue'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'default' })

const config = useRuntimeConfig()
const apiUrl = config.public.API_URL
const auth = useAuthStore()

const jogadores = ref([])
const loading = ref(false)
const error = ref(null)

const showAddPlayerModal = ref(false)
const showEditPlayerModal = ref(false)
const showDeleteModal = ref(false)

const currentPlayer = ref({})
const playerToDelete = ref(null)

const fetchPlayers = async () => {
  loading.value = true
  error.value = null
  try {
    const token = auth.token
    const res = await fetch(`${apiUrl}/jogador/`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    if (res.status === 401) {
      auth.logout()
      toast.error('Sessão expirada. Faça login novamente.')
      return
    } 
    if (res.status === 403) {
      toast.error('Você não tem permissão para acessar esta página.')
      return
    }
    if (!res.ok) throw new Error('Erro ao buscar jogadores.')
    jogadores.value = await res.json()
  } catch (err) {
    error.value = 'Erro ao carregar jogadores.'
    console.error(err)
    toast.error('Erro ao carregar jogadores.')
  } finally {
    loading.value = false
  }
}

const createPlayer = async (playerData) => {
  loading.value = true
  try {
    const token = auth.token

    const playerDataWithElenco = {
      ...playerData,
      elenco: auth.user.elenco 
    }

    const res = await fetch(`${apiUrl}/jogador/`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerDataWithElenco)
    })

    if (res.status === 401) {
      auth.logout()
      toast.error('Sessão expirada. Faça login novamente.')
      return
    }

    if (res.status === 400) {
      const data = await res.json()

      if (data?.camisa?.[0] === 'Já existe um jogador com esse número nesse elenco.') {
        toast.error('Número da camisa já está em uso neste elenco.')
      } else {
        const erro = Object.values(data)[0]?.[0] || 'Erro de validação.'
        toast.error(erro)
      }

      return
    }

    if (!res.ok) throw new Error('Erro ao criar jogador.')

    await fetchPlayers()
    showAddPlayerModal.value = false
    toast.success('Jogador adicionado com sucesso!')
  } catch (err) {
    console.error(err)
    toast.error('Erro ao criar jogador.')
  } finally {
    loading.value = false
  }
}

const updatePlayerData = async (playerData) => {

  loading.value = true
  try {
    const token = auth.token
    const res = await fetch(`${apiUrl}/jogador/${playerData.id}/`, {
      method: 'PATCH',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(playerData)
    })
    toast.info('Atualizando jogador...')

    setTimeout(() => {
      toast.success('Jogador atualizado com sucesso!')
    }, 3000)

    if (res.status === 400) {
      const data = await res.json()

      if (data?.camisa?.[0] === 'Já existe um jogador com esse número nesse elenco.') {
        toast.error('Número da camisa já está em uso neste elenco.')
      } else {
        const erro = Object.values(data)[0]?.[0] || 'Erro de validação.'
        toast.error(erro)
      }

      return
    }

    if (!res.ok) throw new Error('Erro ao atualizar jogador.')
    await fetchPlayers()
    showEditPlayerModal.value = false
    currentPlayer.value = {}
  } catch (err) {
    console.error(err)
  } finally {
    loading.value = false
  }
}

const deletePlayer = async () => {
  try {
    const token = auth.token
    const res = await fetch(`${apiUrl}/jogador/${playerToDelete.value.id}/`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    if (!res.ok) throw new Error('Erro ao deletar jogador.')
    await fetchPlayers()
  } catch (err) {
    console.error(err)
  } finally {
    showDeleteModal.value = false
    playerToDelete.value = null
  }
}

const editPlayer = (jogador) => {
  currentPlayer.value = { ...jogador }
  showEditPlayerModal.value = true
}

const confirmDeletePlayer = (jogador) => {
  playerToDelete.value = jogador
  showDeleteModal.value = true
}

const closeAddPlayerModal = () => {
  showAddPlayerModal.value = false
}

const closeEditPlayerModal = () => {
  showEditPlayerModal.value = false
  currentPlayer.value = {}
}

onMounted(fetchPlayers)
</script>

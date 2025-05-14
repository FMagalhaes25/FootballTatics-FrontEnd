<template>
  <div class="min-h-screen bg-[#121212] p-4 md:p-6">
    <!-- Header with title and logout button -->
    <div class="flex justify-between items-start mb-8">
        <div>
            <h1 class="text-2xl md:text-3xl font-semibold text-white mb-2">
            Elenco
            </h1>
        </div>
    </div>

    <!-- Main Content -->
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

        <!-- jogadores Grid -->
        <div v-if="jogadores.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <CardJogador 
            v-for="jogador in jogadores" 
            :key="jogador.id" 
            :jogador="jogador"
            @edit="editPlayer"
            @delete="confirmDeletePlayer"
            />
        </div>
      
        <!-- Empty State -->
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

    <!-- Modal para adicionar jogador -->
    <AdicionarJogador 
      :is-open="showAddPlayerModal"
      :edit-mode="editMode"
      :jogador-data="currentPlayer"
      @close="closeAddPlayerModal"
      @save="savePlayer"
    />

    <!-- Modal para confirmação de exclusão -->
    <Confirmacao
      :is-open="showDeleteModal"
      :title="'Excluir Jogador'"
      :message="'Tem certeza que deseja excluir este jogador do elenco? Esta ação não pode ser desfeita.'"
      @confirm="deletePlayer"
      @cancel="showDeleteModal = false"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Users, PlusCircle } from 'lucide-vue-next';
import CardJogador from '~/components/elenco/CardJogador.vue';
import AdicionarJogador from '~/components/elenco/AdicionarJogador.vue';
import Confirmacao from '~/components/elenco/Confirmar.vue';

definePageMeta({
  layout: 'default',
});


const config = useRuntimeConfig();
const apiUrl = config.public.API_URL;


const jogadores = ref([]);
const loading = ref(false);
const error = ref(null);
const showAddPlayerModal = ref(false);
const showDeleteModal = ref(false);
const editMode = ref(false);
const currentPlayer = ref({});
const playerToDelete = ref(null);

//Chamada para API
const fetchPlayers = async () => {
  loading.value = true;
  error.value = null;
  let mockPlayers = null;
  
  try {
    const response = await fetch(`${apiUrl}/jogador/`);
    if (!response.ok) {
      throw new Error(`Erro ao buscar jogadores: ${response.status}`);
    }
    const data = await response.json();
    jogadores.value = data;
  } catch (err) {
    console.error('Error fetching players:', err);
    error.value = 'Não foi possível carregar os jogadores. Por favor, tente novamente.';
    
    //Dado mockado
    if (process.env.NODE_ENV === 'development') {
      mockPlayers = [
        {
          id: 1,
          nome: 'Carlos Silva',
          posicao: 'ATA',
          camisa: 10,
          idade: 25,
          altura: '1.80',
          peso: '75',
          perna_boa: 'DIR',
          status: {
            velocidade: 6,
            chute: 3,
            passe: 7,
            defesa: 9,
            goleiro: false, 
          },
          elenco: 0
        },
        {
          id: 2,
          nome: 'Rafael Oliveira',
          posicao: 'GOL',
          camisa: 1,
          idade: 29,
          altura: '1.88',
          peso: '82',
          perna_boa: 'DIR',
          status: {
            velocidade: 6,
            chute: 3,
            passe: 7,
            defesa: 9,
            goleiro: true, 
          },
          elenco: 0
        },
        {
          id: 3,
          nome: 'Lucas Santos',
          posicao: 'ZAG',
          camisa: 4,
          idade: 27,
          altura: '1.85',
          peso: '80',
          perna_boa: 'ESQ',
          status: {
            velocidade: 6,
            chute: 3,
            passe: 7,
            defesa: 9,
            goleiro: false, 
          },
          elenco: 0
        }
      ];
      jogadores.value = mockPlayers;
    }
  } finally {
    loading.value = false;
  }
};

/* Modal states
const showAddPlayerModal = ref(false);
const showDeleteModal = ref(false);
const editMode = ref(false);
const currentPlayer = ref({});
const playerToDelete = ref(null);
*/
/* Methods
const closeAddPlayerModal = () => {
  showAddPlayerModal.value = false;
  editMode.value = false;
  currentPlayer.value = {};
};

const editPlayer = (jogador) => {
  currentPlayer.value = { ...jogador };
  editMode.value = true;
  showAddPlayerModal.value = true;
};

const confirmDeletePlayer = (jogador) => {
  playerToDelete.value = jogador;
  showDeleteModal.value = true;
};

const deletePlayer = () => {
  jogadores.value = jogadores.value.filter(p => p.id !== playerToDelete.value.id);
  showDeleteModal.value = false;
  playerToDelete.value = null;
};

const savePlayer = (playerData) => {
  if (editMode.value) {
    // Update existing jogador
    const index = jogadores.value.findIndex(p => p.id === playerData.id);
    if (index !== -1) {
      jogadores.value[index] = { ...playerData };
    }
  } else {
    // Add new jogador
    const newId = jogadores.value.length > 0 
      ? Math.max(...jogadores.value.map(p => p.id)) + 1 
      : 1;
    
    jogadores.value.push({
      ...playerData,
      id: newId
    });
  }
  
  closeAddPlayerModal();
};
*/


//Chamada para cadastrar novo jogador
const createPlayer = async (playerData) => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await fetch(`${apiUrl}/jogador/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao criar jogador: ${response.status}`);
    }
    
    const data = await response.json();
    await fetchPlayers(); 
    return data;
  } catch (err) {
    console.error('Error creating player:', err);
    error.value = 'Não foi possível adicionar o jogador. Por favor, tente novamente.';
    throw err;
  } finally {
    loading.value = false;
  }
};

//Atualizar informações do jogador
const updatePlayer = async (id, playerData) => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await fetch(`${apiUrl}/jogador/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(playerData),
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao atualizar jogador: ${response.status}`);
    }
    
    const data = await response.json();
    await fetchPlayers(); 
    return data;
  } catch (err) {
    console.error('Error updating player:', err);
    error.value = 'Não foi possível atualizar o jogador. Por favor, tente novamente.';
    throw err;
  } finally {
    loading.value = false;
  }
};

//Excluir jogador
const removePlayer = async (id) => {
  loading.value = true;
  error.value = null;
  
  try {
    const response = await fetch(`${apiUrl}/jogador/${id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) {
      throw new Error(`Erro ao excluir jogador: ${response.status}`);
    }
    
    await fetchPlayers();
  } catch (err) {
    console.error('Error deleting player:', err);
    error.value = 'Não foi possível excluir o jogador. Por favor, tente novamente.';
    throw err;
  } finally {
    loading.value = false;
  }
};


const closeAddPlayerModal = () => {
  showAddPlayerModal.value = false;
  editMode.value = false;
  currentPlayer.value = {};
};

const editPlayer = (player) => {
  currentPlayer.value = { ...player };
  editMode.value = true;
  showAddPlayerModal.value = true;
};

const confirmDeletePlayer = (player) => {
  playerToDelete.value = player;
  showDeleteModal.value = true;
};

const deletePlayer = async () => {
  try {
    await removePlayer(playerToDelete.value.id);
    showDeleteModal.value = false;
    playerToDelete.value = null;
  } catch (err) {
    console.error('Erro ao deletar jogador:', err);
  }
};

const savePlayer = async (playerData) => {
  try {
    if (editMode.value) {
      await updatePlayer(playerData.id, playerData);
    } else {
      await createPlayer(playerData);
    }
    
    closeAddPlayerModal();
  } catch (err) {

  }
};


onMounted(() => {
  fetchPlayers();
});
</script>
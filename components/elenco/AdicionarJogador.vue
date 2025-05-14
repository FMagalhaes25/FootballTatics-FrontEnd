<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-[#1a1919] rounded-lg shadow-lg w-full max-w-md max-h-[90vh] overflow-y-auto">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-white">
            {{ editMode ? 'Editar Jogador' : 'Adicionar Jogador' }}
          </h2>
          <button @click="$emit('close')" class="text-gray-400 hover:text-white">
            <X class="w-6 h-6" />
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit">
          
          <div class="mb-6">
            <h3 class="text-white text-lg mb-3">Informações Básicas</h3>
            
            <div class="grid grid-cols-1 gap-4">
              <div>
                <label class="block text-sm text-gray-400 mb-1">Nome Completo</label>
                <input 
                  v-model="form.name" 
                  type="text" 
                  class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                  required
                />
              </div>
              
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm text-gray-400 mb-1">Camisa</label>
                  <input 
                    v-model.number="form.camisa" 
                    type="number" 
                    min="1" 
                    max="99"
                    class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm text-gray-400 mb-1">Posição</label>
                  <select 
                    v-model="form.posicao" 
                    class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                    required
                  >
                    <option value="Goleiro">Goleiro</option>
                    <option value="Zagueiro">Zagueiro</option>
                    <option value="Lateral-esquerdo">Lateral Esquerdo</option>
                    <option value="Lateral-direito">Lateral Direito</option>
                    <option value="Volante">Volante</option>
                    <option value="Meia-Central">Meia-Central</option>
                    <option value="Meia-Atacante">Meia-Atacante</option>
                    <option value="Ponta-esquerda">Ponta Esquerda</option>
                    <option value="Ponta-direita">Ponta Direita</option>
                    <option value="Centroavante">Centroavante</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm text-gray-400 mb-1">Perna Boa</label>
                  <select 
                    v-model="form.perna" 
                    class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                    required
                  >
                    <option value="Esquerda">Esquerda</option>
                    <option value="Direita">Direita</option>
                  </select>
                </div>
              </div>
              
              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm text-gray-400 mb-1">Idade</label>
                  <input 
                    v-model.number="form.idade" 
                    type="number" 
                    min="15" 
                    max="50"
                    class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm text-gray-400 mb-1">Altura (cm)</label>
                  <input 
                    v-model.number="form.altura" 
                    type="number" 
                    min="150" 
                    max="220"
                    class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label class="block text-sm text-gray-400 mb-1">Peso (kg)</label>
                  <input 
                    v-model.number="form.peso" 
                    type="number" 
                    min="50" 
                    max="120"
                    class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                    required
                  />
                </div>
              </div>
            </div>
          </div>
          
          
          <div class="mb-6">
            <h3 class="text-white text-lg mb-3">Atributos</h3>
            
            <div class="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label class="block text-sm text-gray-400 mb-1">Velocidade (0-10)</label>
                <input 
                  v-model.number="form.status.velocidade" 
                  type="number" 
                  min="0"
                  max="10"
                  class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-1">Chute (0-10)</label>
                <input 
                  v-model.number="form.status.chute" 
                  type="number" 
                  min="0"
                  max="10"
                  class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-1">Passe (0-10)</label>
                <input 
                  v-model.number="form.status.passe" 
                  type="number" 
                  min="0"
                  max="10"
                  class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                />
              </div>
              <div>
                <label class="block text-sm text-gray-400 mb-1">Defesa (0-10)</label>
                <input 
                  v-model.number="form.status.defesa" 
                  type="number" 
                  min="0"
                  max="10"
                  class="w-full bg-[#232323] border border-gray-700 rounded-lg px-3 py-2 text-white focus:border-[#16A249] focus:outline-none"
                />
              </div>
            </div>
            
            <div>
              <label class="flex items-center gap-2 text-gray-400">
                <input 
                  v-model="form.status.goleiro" 
                  type="checkbox"
                  class="w-4 h-4 accent-[#16A249]"
                />
                <span>Goleiro</span>
              </label>
            </div>
          </div>
          
          <div class="flex justify-end gap-3">
            <button 
              type="button" 
              @click="$emit('close')"
              class="bg-[#232323] hover:bg-[#2a2a2a] text-white px-4 py-2 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit"
              class="bg-[#16A249] hover:bg-[#0f7a36] text-white px-4 py-2 rounded-lg transition-colors"
            >
              {{ editMode ? 'Salvar Alterações' : 'Adicionar Jogador' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { User2, X } from 'lucide-vue-next';

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  editMode: {
    type: Boolean,
    default: false
  },
  playerData: {
    type: Object,
    default: () => ({})
  }
});

const emit = defineEmits(['close', 'save']);


const form = ref({
  name: '',
  posicao: 'Centroavante',
  perna: 'Direita',
  camisa: 1,
  idade: 25,
  altura: 180,
  peso: 75,
  status: {
    velocidade: 5,
    chute: 5,
    passe: 5,
    defesa: 5,
    goleiro: false
  }
});


watch(() => props.playerData, (newValue) => {
  if (props.editMode && Object.keys(newValue).length > 0) {
    form.value = {
      ...newValue,
      status: { ...newValue.status }
    };
  }
}, { immediate: true });


watch(() => props.isOpen, (isOpen) => {
  if (!isOpen && !props.editMode) {
    form.value = {
      name: '',
      posicao: 'Centroavante',
      perna: 'Direita',
      camisa: 1,
      idade: 25,
      altura: 180,
      peso: 75,
      status: {
        velocidade: 5,
        chute: 5,
        passe: 5,
        defesa: 5,
        goleiro: false
      }
    };
  }
});

const handleSubmit = () => {
  emit('save', { ...form.value });
};
</script>
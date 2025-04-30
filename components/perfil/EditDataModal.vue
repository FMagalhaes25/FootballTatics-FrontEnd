<template>
    <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-[#1a1919] rounded-lg p-6 w-full max-w-md">
        <h2 class="text-xl font-semibold mb-4 text-white">Editar Perfil</h2>
        <form @submit.prevent="handleSubmit">
          <div class="space-y-4">
            <div>
              <label for="phone" class="block text-md font-medium text-white">Telefone</label>
              <input
                id="phone"
                v-model="form.phone"
                type="tel"
                class="mt-2 block w-full border-gray-300 shadow-sm focus:border-[#16A249]"
                required
              />
            </div>
            <div>
              <label for="phone" class="block text-md font-medium text-white">Time</label>
              <input
                id="phone"
                v-model="form.team"
                type="team"
                class="mt-2 block w-full border-gray-300 shadow-sm focus:border-[#16A249]"
                required
              />
            </div>
          </div>
          <div class="mt-6 flex justify-end space-x-3">
            <button
              type="button"
              @click="close"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-white hover:bg-[#0f7a36]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#16A249] hover:bg-[#0f7a36] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#E4A853]"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
</template>
  
<script setup>
import { ref, watch } from 'vue'


const props = defineProps({
    isOpen: Boolean,
    initialData: Object,
})

const emit = defineEmits(['update', 'close'])

const form = ref({
    phone: '',
    team: ''
})

watch(() => props.initialData, (newData) => {
    if (newData) {
        form.value = { ...newData }
    }
    }, { immediate: true })

    const handleSubmit = () => {
        emit('update', form.value)
        close()
    }

    const close = () => {
        emit('close')
    }
</script>
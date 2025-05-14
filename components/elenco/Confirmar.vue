<template>
  <div v-if="isOpen" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
    <div class="bg-[#1a1919] rounded-lg shadow-lg w-full max-w-md">
      <div class="p-6">
        <h2 class="text-xl font-semibold text-white mb-4">{{ title }}</h2>
        <p class="text-gray-300 mb-6">{{ message }}</p>
        
        <div class="flex justify-end gap-3">
          <button 
            @click="$emit('cancel')"
            class="bg-[#232323] hover:bg-[#2a2a2a] text-white px-4 py-2 rounded-lg transition-colors"
          >
            Cancelar
          </button>
          <button 
            @click="$emit('confirm')"
            class="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    default: false
  },
  title: {
    type: String,
    required: true
  },
  message: {
    type: String,
    required: true
  }
});

defineEmits(['confirm', 'cancel']);
</script>
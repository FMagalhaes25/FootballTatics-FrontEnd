<template>
    <div class="text-white">
        <button @click="logout"
            class="flex items-center w-full px-4 py-3 text-base rounded-lg bg-[#16A249] hover:bg-[#0f7a36] transition-colors mt-2">
            <LogOut class="w-6 h-6 mr-3 opacity-70" />
            <span class="font-medium">Sair</span>
        </button>
    </div>
</template>

<script setup>
import {LogOut} from 'lucide-vue-next'


</script>
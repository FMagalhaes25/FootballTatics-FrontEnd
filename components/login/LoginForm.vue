<template>
  <div class="w-full max-w-md">
    <!-- Form Header -->
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-white mb-2">Bem-vindo de volta</h2>
      <p class="text-gray-400">Entre com suas credenciais para acessar sua conta</p>
    </div>
    
    <!-- Login Form -->
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Alert for errors -->
      <div v-if="error" class="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
        {{ error }}
      </div>
      
      <!-- Email Field -->
      <div>
        <label for="email" class="block text-sm text-gray-400 mb-1">E-mail</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail class="h-5 w-5 text-gray-500" />
          </div>
          <input
            id="email"
            v-model="form.email"
            type="email"
            autocomplete="email"
            required
            class="w-full bg-[#232323] border border-gray-700 rounded-lg pl-10 pr-3 py-2 text-white focus:border-[#16A249] focus:outline-none focus:ring-1 focus:ring-[#16A249] transition-colors"
            :class="{ 'border-red-500': validationErrors.email }"
          />
        </div>
        <p v-if="validationErrors.email" class="mt-1 text-sm text-red-400">{{ validationErrors.email }}</p>
      </div>
      
      <!-- Password Field -->
      <div>
        <div class="flex justify-between items-center mb-1">
          <label for="password" class="block text-sm text-gray-400">Senha</label>
          <button 
            type="button" 
            @click="$emit('forgot-password')" 
            class="text-xs text-[#16A249] hover:text-[#0f7a36] transition-colors"
          >
            Esqueceu a senha?
          </button>
        </div>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock class="h-5 w-5 text-gray-500" />
          </div>
          <input
            id="password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="current-password"
            required
            class="w-full bg-[#232323] border border-gray-700 rounded-lg pl-10 pr-10 py-2 text-white focus:border-[#16A249] focus:outline-none focus:ring-1 focus:ring-[#16A249] transition-colors"
            :class="{ 'border-red-500': validationErrors.password }"
          />
          <button 
            type="button"
            @click="showPassword = !showPassword" 
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
          >
            <Eye v-if="showPassword" class="h-5 w-5" />
            <EyeOff v-else class="h-5 w-5" />
          </button>
        </div>
        <p v-if="validationErrors.password" class="mt-1 text-sm text-red-400">{{ validationErrors.password }}</p>
      </div>
      
      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-[#16A249] hover:bg-[#0f7a36] text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
        :class="{ 'opacity-70 cursor-not-allowed': loading }"
      >
        <Loader2 v-if="loading" class="animate-spin mr-2 h-5 w-5" />
        <span>{{ loading ? 'Entrando...' : 'Entrar' }}</span>
      </button>
    </form>
    
    <!-- Register Link -->
    <div class="text-center mt-6">
      <p class="text-gray-400 text-sm">
        Não tem uma conta?
        <button 
          type="button" 
          @click="$emit('switch-to-register')" 
          class="text-[#16A249] hover:text-[#0f7a36] font-medium transition-colors"
        >
          Registre-se
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { Mail, Lock, Eye, EyeOff, Loader2 } from 'lucide-vue-next';

const emit = defineEmits(['login-success', 'login-error', 'switch-to-register', 'forgot-password']);

// Form state
const form = reactive({
  email: '',
  password: '',
});

// UI state
const loading = ref(false);
const error = ref('');
const showPassword = ref(false);
const validationErrors = reactive({
  email: '',
  password: ''
});

// Validate form
const validateForm = () => {
  let isValid = true;
  validationErrors.email = '';
  validationErrors.password = '';
  
  // Email validation
  if (!form.email) {
    validationErrors.email = 'E-mail é obrigatório';
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    validationErrors.email = 'E-mail inválido';
    isValid = false;
  }
  
  // Password validation
  if (!form.password) {
    validationErrors.password = 'Senha é obrigatória';
    isValid = false;
  } else if (form.password.length < 6) {
    validationErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    isValid = false;
  }
  
  return isValid;
};

// Handle form submission
const handleSubmit = async () => {
  if (!validateForm()) return;
  
  loading.value = true;
  error.value = '';
  
  try {
    // Replace with your actual API call
    // const response = await fetch(`${apiUrl}/auth/login`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     email: form.email,
    //     password: form.password
    //   }),
    // });
    
    // if (!response.ok) {
    //   const errorData = await response.json();
    //   throw new Error(errorData.message || 'Falha ao fazer login');
    // }
    
    // const data = await response.json();
    
    // Simulate API call for demo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, check if email contains "error" to simulate an error
    if (form.email.includes('error')) {
      throw new Error('Credenciais inválidas');
    }
    
    // Success - emit event with user data
    emit('login-success', { 
      email: form.email,
      // Include any other user data from the response
    });
    
    // Reset form
    // form.email = '';
    // form.password = '';
    
  } catch (err) {
    console.error('Login error:', err);
    error.value = err.message || 'Ocorreu um erro ao fazer login. Tente novamente.';
    emit('login-error', err);
  } finally {
    loading.value = false;
  }
};

// Handle social login
const socialLogin = (provider) => {
  // Implement social login logic here
  console.log(`Social login with ${provider}`);
  // This would typically redirect to the OAuth provider
};
</script>
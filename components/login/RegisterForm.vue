<template>
  <div class="w-full max-w-md">
    <!-- Form Header -->
    <div class="text-center mb-8">
      <h2 class="text-2xl font-bold text-white mb-2">Crie sua conta</h2>
      <p class="text-gray-400">Preencha os dados abaixo para começar</p>
    </div>
    
    <!-- Register Form -->
    <form @submit.prevent="handleSubmit" class="space-y-5">
      <!-- Alert for errors -->
      <div v-if="error" class="bg-red-500 bg-opacity-20 border border-red-500 rounded-lg p-3 text-red-300 text-sm">
        {{ error }}
      </div>
      
      <!-- Name Field -->
      <div>
        <label for="name" class="block text-sm text-gray-400 mb-1">Nome Completo</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <User class="h-5 w-5 text-gray-500" />
          </div>
          <input
            id="name"
            v-model="form.name"
            type="text"
            autocomplete="name"
            required
            class="w-full bg-[#232323] border border-gray-700 rounded-lg pl-10 pr-3 py-2 text-white focus:border-[#16A249] focus:outline-none focus:ring-1 focus:ring-[#16A249] transition-colors"
            :class="{ 'border-red-500': validationErrors.name }"
          />
        </div>
        <p v-if="validationErrors.name" class="mt-1 text-sm text-red-400">{{ validationErrors.name }}</p>
      </div>
      
      <!-- Email Field -->
      <div>
        <label for="register-email" class="block text-sm text-gray-400 mb-1">E-mail</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Mail class="h-5 w-5 text-gray-500" />
          </div>
          <input
            id="register-email"
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
      
      <!-- Phone Field -->
      <div>
        <label for="phone" class="block text-sm text-gray-400 mb-1">Telefone</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Phone class="h-5 w-5 text-gray-500" />
          </div>
          <input
            id="phone"
            v-model="form.phone"
            type="tel"
            autocomplete="tel"
            required
            class="w-full bg-[#232323] border border-gray-700 rounded-lg pl-10 pr-3 py-2 text-white focus:border-[#16A249] focus:outline-none focus:ring-1 focus:ring-[#16A249] transition-colors"
            :class="{ 'border-red-500': validationErrors.phone }"
          />
        </div>
        <p v-if="validationErrors.phone" class="mt-1 text-sm text-red-400">{{ validationErrors.phone }}</p>
      </div>
      
      <!-- Password Field -->
      <div>
        <label for="register-password" class="block text-sm text-gray-400 mb-1">Senha</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock class="h-5 w-5 text-gray-500" />
          </div>
          <input
            id="register-password"
            v-model="form.password"
            :type="showPassword ? 'text' : 'password'"
            autocomplete="new-password"
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
      
      <!-- Confirm Password Field -->
      <div>
        <label for="confirm-password" class="block text-sm text-gray-400 mb-1">Confirmar Senha</label>
        <div class="relative">
          <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Lock class="h-5 w-5 text-gray-500" />
          </div>
          <input
            id="confirm-password"
            v-model="form.confirmPassword"
            :type="showConfirmPassword ? 'text' : 'password'"
            autocomplete="new-password"
            required
            class="w-full bg-[#232323] border border-gray-700 rounded-lg pl-10 pr-10 py-2 text-white focus:border-[#16A249] focus:outline-none focus:ring-1 focus:ring-[#16A249] transition-colors"
            :class="{ 'border-red-500': validationErrors.confirmPassword }"
          />
          <button 
            type="button"
            @click="showConfirmPassword = !showConfirmPassword" 
            class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white transition-colors"
          >
            <Eye v-if="showConfirmPassword" class="h-5 w-5" />
            <EyeOff v-else class="h-5 w-5" />
          </button>
        </div>
        <p v-if="validationErrors.confirmPassword" class="mt-1 text-sm text-red-400">{{ validationErrors.confirmPassword }}</p>
      </div>
      
      <!-- Terms and Conditions -->
      <div class="flex items-start">
        <div class="flex items-center h-5">
          <input
            id="terms"
            v-model="form.acceptTerms"
            type="checkbox"
            required
            class="h-4 w-4 accent-[#16A249] bg-[#232323] border-gray-700 rounded"
            :class="{ 'border-red-500': validationErrors.acceptTerms }"
          />
        </div>
        <div class="ml-3 text-sm">
          <label for="terms" class="text-gray-400">
            Eu concordo com os 
            <a href="#" class="text-[#16A249] hover:text-[#0f7a36] transition-colors">Termos de Serviço</a>
            e 
            <a href="#" class="text-[#16A249] hover:text-[#0f7a36] transition-colors">Política de Privacidade</a>
          </label>
          <p v-if="validationErrors.acceptTerms" class="mt-1 text-sm text-red-400">{{ validationErrors.acceptTerms }}</p>
        </div>
      </div>
      
      <!-- Submit Button -->
      <button
        type="submit"
        :disabled="loading"
        class="w-full bg-[#16A249] hover:bg-[#0f7a36] text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
        :class="{ 'opacity-70 cursor-not-allowed': loading }"
      >
        <Loader2 v-if="loading" class="animate-spin mr-2 h-5 w-5" />
        <span>{{ loading ? 'Registrando...' : 'Criar Conta' }}</span>
      </button>
    </form>
    
    <!-- Login Link -->
    <div class="text-center mt-6">
      <p class="text-gray-400 text-sm">
        Já tem uma conta?
        <button 
          type="button" 
          @click="$emit('switch-to-login')" 
          class="text-[#16A249] hover:text-[#0f7a36] font-medium transition-colors"
        >
          Faça login
        </button>
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { User, Mail, Phone, Lock, Eye, EyeOff, Loader2 } from 'lucide-vue-next';

const emit = defineEmits(['register-success', 'register-error', 'switch-to-login']);

// Form state
const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
});

// UI state
const loading = ref(false);
const error = ref('');
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const validationErrors = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: ''
});

// Validate form
const validateForm = () => {
  let isValid = true;
  
  // Reset validation errors
  Object.keys(validationErrors).forEach(key => {
    validationErrors[key] = '';
  });
  
  // Name validation
  if (!form.name) {
    validationErrors.name = 'Nome é obrigatório';
    isValid = false;
  } else if (form.name.length < 3) {
    validationErrors.name = 'Nome deve ter pelo menos 3 caracteres';
    isValid = false;
  }
  
  // Email validation
  if (!form.email) {
    validationErrors.email = 'E-mail é obrigatório';
    isValid = false;
  } else if (!/^\S+@\S+\.\S+$/.test(form.email)) {
    validationErrors.email = 'E-mail inválido';
    isValid = false;
  }
  
  // Phone validation
  if (!form.phone) {
    validationErrors.phone = 'Telefone é obrigatório';
    isValid = false;
  } else if (!/^$$\d{2}$$ \d{4,5}-\d{4}$/.test(form.phone) && !/^\d{10,11}$/.test(form.phone)) {
    validationErrors.phone = 'Telefone inválido. Use o formato (99) 99999-9999';
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
  
  // Confirm password validation
  if (!form.confirmPassword) {
    validationErrors.confirmPassword = 'Confirmação de senha é obrigatória';
    isValid = false;
  } else if (form.password !== form.confirmPassword) {
    validationErrors.confirmPassword = 'As senhas não coincidem';
    isValid = false;
  }
  
  // Terms validation
  if (!form.acceptTerms) {
    validationErrors.acceptTerms = 'Você deve aceitar os termos e condições';
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
    // const response = await fetch(`${apiUrl}/auth/register`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     name: form.name,
    //     email: form.email,
    //     phone: form.phone,
    //     password: form.password
    //   }),
    // });
    
    // if (!response.ok) {
    //   const errorData = await response.json();
    //   throw new Error(errorData.message || 'Falha ao registrar');
    // }
    
    // const data = await response.json();
    
    // Simulate API call for demo
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // For demo purposes, check if email contains "error" to simulate an error
    if (form.email.includes('error')) {
      throw new Error('Este e-mail já está em uso');
    }
    
    // Success - emit event with user data
    emit('register-success', { 
      name: form.name,
      email: form.email,
      phone: form.phone
      // Include any other user data from the response
    });
    
    // Reset form
    // Object.keys(form).forEach(key => {
    //   form[key] = key === 'acceptTerms' ? false : '';
    // });
    
  } catch (err) {
    console.error('Registration error:', err);
    error.value = err.message || 'Ocorreu um erro ao registrar. Tente novamente.';
    emit('register-error', err);
  } finally {
    loading.value = false;
  }
};

// Handle social registration
const socialRegister = (provider) => {
  // Implement social registration logic here
  console.log(`Social registration with ${provider}`);
  // This would typically redirect to the OAuth provider
};
</script>
<template>
  <div class="min-h-screen bg-[#121212] flex flex-col justify-center items-center p-4 md:p-6">
    <div class="w-full max-w-6xl flex flex-col lg:flex-row rounded-xl overflow-hidden shadow-2xl">
      
      <div class="w-full lg:w-1/2 bg-gradient-to-br from-[#16A249] to-[#0f7a36] p-6 md:p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
 
        <div class="relative z-10">
          <div class="flex items-center mb-6 md:mb-8">
            <Trophy class="w-8 h-8 md:w-10 md:h-10 text-white" />
            <h1 class="text-white text-2xl md:text-3xl font-bold ml-3">Football Tactics</h1>
          </div>
          
          <h2 class="text-white text-2xl md:text-3xl lg:text-4xl font-bold mb-3 md:mb-4">
            {{ isLogin ? 'Bem-vindo de volta!' : 'Junte-se a nós!' }}
          </h2>
          <p class="text-green-100 text-base md:text-lg mb-6 md:mb-8 max-w-md">
            {{ isLogin 
              ? 'Gerencie seu time, acompanhe o desempenho dos jogadores e organize seus treinos em um só lugar.' 
              : 'Crie sua conta e comece a gerenciar seu elenco de forma eficiente e profissional.' 
            }}
          </p>
        </div>
        
        
        <div class="relative z-10 mb-6 md:mb-8 mx-auto w-full max-w-sm">
          <div class="bg-black bg-opacity-20 backdrop-blur-sm rounded-lg p-5 shadow-lg">
            <div class="flex justify-between items-center mb-4">
              <h3 class="text-white font-bold text-lg flex items-center">
                <Quote class="w-5 h-5 mr-2" />
                Inspiração de Campeões
              </h3>
              <div class="flex space-x-2">
                <button 
                  @click="prevQuote" 
                  class="w-8 h-8 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
                >
                  <ChevronLeft class="w-5 h-5 text-white" />
                </button>
                <button 
                  @click="nextQuote" 
                  class="w-8 h-8 rounded-full bg-white bg-opacity-10 flex items-center justify-center hover:bg-opacity-20 transition-colors"
                >
                  <ChevronRight class="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
            
            <!-- Notas de Jogadores Antigos  -->
            <div class="relative h-[180px] overflow-hidden">
              <transition-group 
                name="quote-slide" 
                tag="div" 
                class="absolute inset-0"
              >
                <div 
                  v-for="(quote, index) in quotes" 
                  :key="quote.id"
                  v-show="currentQuoteIndex === index"
                  class="h-full flex flex-col justify-between"
                >
                  <div>
                    <p class="text-white text-lg italic mt-4 mb-4">{{ quote.text }}</p>
                  </div>
                  
                  <div class="flex items-center">
                    <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center mr-3">
                      <User class="w-6 h-6 text-[#16A249]" />
                    </div>
                    <div>
                      <p class="text-white font-medium">{{ quote.author }}</p>
                      <p class="text-green-200 text-sm">{{ quote.role }}</p>
                    </div>
                  </div>
                </div>
              </transition-group>
              
            </div>
          </div>
        </div>
        
        
        <div class="relative z-10 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
          <div class="flex items-center">
            <CheckCircle class="w-5 h-5 text-white mr-2 flex-shrink-0" />
            <span class="text-white text-sm md:text-base">Gerenciamento de elenco</span>
          </div>
          <div class="flex items-center">
            <CheckCircle class="w-5 h-5 text-white mr-2 flex-shrink-0" />
            <span class="text-white text-sm md:text-base">Estatísticas de jogadores</span>
          </div>
          <div class="flex items-center">
            <CheckCircle class="w-5 h-5 text-white mr-2 flex-shrink-0" />
            <span class="text-white text-sm md:text-base">Calendário de jogos</span>
          </div>
          <div class="flex items-center">
            <CheckCircle class="w-5 h-5 text-white mr-2 flex-shrink-0" />
            <span class="text-white text-sm md:text-base">Relatórios detalhados</span>
          </div>
        </div>
      </div>
      
      <!-- Modais de Login e Cadastro -->
      <div class="w-full lg:w-1/2 bg-[#1a1919] p-6 md:p-8 lg:p-10 flex items-center justify-center">
        <transition 
          name="fade" 
          mode="out-in"
        >
          <LoginForm 
            v-if="isLogin" 
            @login-success="handleLoginSuccess"
            @login-error="handleLoginError"
            @switch-to-register="switchToRegister"
            @forgot-password="handleForgotPassword"
          />
          <RegisterForm 
            v-else 
            @register-success="handleRegisterSuccess"
            @register-error="handleRegisterError"
            @switch-to-login="switchToLogin"
          />
        </transition>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="mt-6 md:mt-8 text-center text-gray-500 text-xs md:text-sm">
      &copy; {{ new Date().getFullYear() }} TeamManager. Todos os direitos reservados.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { Trophy, CheckCircle, User, ChevronRight, ChevronLeft, Quote } from 'lucide-vue-next'
import LoginForm from '~/components/login/LoginForm.vue'
import RegisterForm from '~/components/login/RegisterForm.vue'
import { toast } from 'vue-sonner'

definePageMeta({ layout: 'auth' })

const isLogin = ref(true)
const currentQuoteIndex = ref(0)

const quotes = [
  {
    id: 1,
    text: 'O talento ganha jogos, mas trabalho em equipe e inteligência ganham campeonatos.',
    author: 'Di Stefano',
    role: 'Lenda do Futebol'
  },
  {
    id: 2,
    text: 'A diferença entre o impossível e o possível reside na determinação de uma pessoa.',
    author: 'George Best',
    role: 'Lenda do Futebol'
  },
  {
    id: 3,
    text: 'O sucesso não é um acidente. É trabalho duro, perseverança, aprendizado e, acima de tudo, amor pelo que você está fazendo.',
    author: 'Pelé',
    role: 'Lenda do Futebol'
  },
  {
    id: 4,
    text: 'Você não pode colocar um limite em nada. Quanto mais você sonha, mais longe você chega.',
    author: 'Cristiano Ronaldo',
    role: 'Jogador de Futebol'
  },
  {
    id: 5,
    text: 'A melhor maneira de prever o futuro é criá-lo.',
    author: 'Johan Cruyff',
    role: 'Lenda do Futebol'
  },
  {
    id: 6,
    text: 'Não é só o jogo em si. O futebol é uma batalha psicológica, o aspecto humano desempenha um papel significativo',
    author: 'Sócrates',
    role: 'Lenda do Futebol e do Corinthians'
  }
]

const nextQuote = () => {
  currentQuoteIndex.value = (currentQuoteIndex.value + 1) % quotes.length
}

const prevQuote = () => {
  currentQuoteIndex.value = (currentQuoteIndex.value - 1 + quotes.length) % quotes.length
}

onMounted(() => {
  setInterval(nextQuote, 10000)
})

const handleLoginSuccess = () => {
  toast.success('Login realizado com sucesso!')
}

const handleLoginError = (error) => {
  toast.error('Erro ao fazer login. Verifique os dados.')
  console.error('Login error', error)
}

const handleRegisterSuccess = () => {
  toast.success('Cadastro realizado com sucesso! Faça login para continuar.')
  isLogin.value = true
}

const handleRegisterError = (error) => {
  toast.error('Erro ao registrar. Verifique os dados.')
  console.error('Registration error', error)
}

const handleForgotPassword = () => {
  toast.info('Funcionalidade de recuperação em desenvolvimento.')
}

const switchToRegister = () => {
  isLogin.value = false
}

const switchToLogin = () => {
  isLogin.value = true
}
</script>


<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
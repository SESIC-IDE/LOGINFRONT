<template>
  <div class="min-h-screen w-screen flex items-center justify-center p-6 font-sans"
       style="background-image: url('/img/PNC2.jpg'); background-size: cover; background-position: center;">

    <div class="bg-white/80 border border-gray-300 backdrop-blur-md rounded-2xl p-8 w-full max-w-md text-blue-900 space-y-6 shadow-md">
      
      <!-- 🚀 Logo SIPER arriba del título -->
      <img src="/img/siper-logo1.png" alt="SIPER Logo" class="mx-auto mb-4" />
      
      <h2 class="text-3xl font-bold text-center text-blue-900">INICIO DE SESIÓN</h2>

      <div v-if="!user">
        
        <form v-if="activeForm === 'login'" @submit.prevent="login" class="space-y-4 mt-6">
          <input v-model="loginForm.email" type="email" placeholder="Email"
                 list="emails"
                 class="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-blue-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition">
          <datalist id="emails">
            <option v-for="email in previousEmails" :key="email" :value="email"></option>
          </datalist>
          <input v-model="loginForm.password" type="password" placeholder="Password"
                 class="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-blue-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition">
          <button class="w-full bg-blue-900 hover:bg-blue-700 p-3 rounded-lg text-white font-semibold transition">
            Iniciar Sesión
          </button>
        </form>

        <form v-if="activeForm === 'register'" @submit.prevent="register" class="space-y-4 mt-6">
          <input v-model="registerForm.name" type="text" placeholder="Nombre"
                 class="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-blue-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition">
          <input v-model="registerForm.email" type="email" placeholder="Email"
                 class="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-blue-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition">
          <input v-model="registerForm.password" type="password" placeholder="Password"
                 class="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-blue-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition">
          <input v-model="registerForm.password_confirmation" type="password" placeholder="Confirmar Password"
                 class="w-full p-3 rounded-lg bg-gray-50 border border-gray-300 text-blue-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition">
          <button class="w-full bg-yellow-400 hover:bg-yellow-500 p-3 rounded-lg text-blue-900 font-semibold transition">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'
import Swal from 'sweetalert2'

const router = useRouter()
const api = 'http://localhost:8000/api'

const user = ref(null)
const activeForm = ref('login')

const loginForm = ref({
  email: '',
  password: ''
})

const registerForm = ref({
  name: '',
  email: '',
  password: '',
  password_confirmation: ''
})

const previousEmails = ref([])

// Cargar emails guardados al iniciar
if (localStorage.getItem('previousEmails')) {
  previousEmails.value = JSON.parse(localStorage.getItem('previousEmails'))
}

const login = async () => {
  try {
    const response = await axios.post(`${api}/login`, loginForm.value)
    user.value = response.data.user
    localStorage.setItem('token', response.data.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

    if (!previousEmails.value.includes(loginForm.value.email)) {
      previousEmails.value.push(loginForm.value.email)
      localStorage.setItem('previousEmails', JSON.stringify(previousEmails.value))
    }

    await Swal.fire({
      icon: 'success',
      title: 'Bienvenido',
      text: `Hola ${user.value.name}, sesión iniciada exitosamente`,
      confirmButtonColor: '#003366',
      background: '#f9fafb',
      color: '#003366'
    })

    router.push('/calculadora')
  } catch (err) {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.response?.data?.message || 'Error en login',
      confirmButtonColor: '#003366',
      background: '#f9fafb',
      color: '#003366'
    })
  }
}

const register = async () => {
  try {
    const response = await axios.post(`${api}/register`, registerForm.value)
    user.value = response.data.user
    localStorage.setItem('token', response.data.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

    await Swal.fire({
      icon: 'success',
      title: 'Registro exitoso',
      text: `Bienvenido ${user.value.name}`,
      confirmButtonColor: '#003366',
      background: '#f9fafb',
      color: '#003366'
    })

    router.push('/calculadora')
  } catch (err) {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.response?.data?.message || 'Error en registro',
      confirmButtonColor: '#003366',
      background: '#f9fafb',
      color: '#003366'
    })
  }
}

const logout = async () => {
  try {
    await axios.post(`${api}/logout`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    user.value = null
    localStorage.removeItem('token')

    await Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente',
      confirmButtonColor: '#003366',
      background: '#f9fafb',
      color: '#003366'
    })

    router.push('/auth')
  } catch (err) {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo cerrar sesión',
      confirmButtonColor: '#003366',
      background: '#f9fafb',
      color: '#003366'
    })
  }
}

// Auto cargar user si hay token
if (localStorage.getItem('token')) {
  axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`
  axios.get(`${api}/user`).then(res => {
    user.value = res.data.user
  }).catch(() => {
    localStorage.removeItem('token')
  })
}
</script>

<style scoped>
input:focus, button:focus {
  outline: none;
}
</style>

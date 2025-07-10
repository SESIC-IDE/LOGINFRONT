<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-700 to-indigo-900 p-6">
    <div class="bg-white/10 backdrop-blur-lg rounded-2xl p-8 w-full max-w-md text-gray-100 space-y-6 shadow-2xl">
      <h2 class="text-3xl font-bold text-center">Auth Demo</h2>

      <div v-if="!user">
        <div class="space-y-4">
          <button @click="activeForm = 'login'" 
                  :class="activeForm === 'login' ? 'bg-purple-500' : 'bg-gray-700'"
                  class="px-4 py-2 rounded-xl w-full">Login</button>
          <button @click="activeForm = 'register'" 
                  :class="activeForm === 'register' ? 'bg-purple-500' : 'bg-gray-700'"
                  class="px-4 py-2 rounded-xl w-full">Registro</button>
        </div>

        <form v-if="activeForm === 'login'" @submit.prevent="login" class="space-y-4 mt-6">
          <input v-model="loginForm.email" type="email" placeholder="Email" class="w-full p-3 rounded-lg bg-gray-800 text-white">
          <input v-model="loginForm.password" type="password" placeholder="Password" class="w-full p-3 rounded-lg bg-gray-800 text-white">
          <button class="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg">Iniciar Sesión</button>
        </form>

        <form v-if="activeForm === 'register'" @submit.prevent="register" class="space-y-4 mt-6">
          <input v-model="registerForm.name" type="text" placeholder="Nombre" class="w-full p-3 rounded-lg bg-gray-800 text-white">
          <input v-model="registerForm.email" type="email" placeholder="Email" class="w-full p-3 rounded-lg bg-gray-800 text-white">
          <input v-model="registerForm.password" type="password" placeholder="Password" class="w-full p-3 rounded-lg bg-gray-800 text-white">
          <input v-model="registerForm.password_confirmation" type="password" placeholder="Confirmar Password" class="w-full p-3 rounded-lg bg-gray-800 text-white">
          <button class="w-full bg-purple-600 hover:bg-purple-700 p-3 rounded-lg">Registrarse</button>
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
const message = ref('')
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

const login = async () => {
  try {
    const response = await axios.post(`${api}/login`, loginForm.value)
    user.value = response.data.user
    localStorage.setItem('token', response.data.token)
    axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`

    // 🚀 Mostrar alerta SweetAlert2
    await Swal.fire({
      icon: 'success',
      title: 'Bienvenido',
      text: `Hola ${user.value.name}, sesión iniciada exitosamente`
    })

    router.push('/calculadora')
  } catch (err) {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.response?.data?.message || 'Error en login'
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
      text: `Bienvenido ${user.value.name}`
    })

    router.push('/calculadora')
  } catch (err) {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.response?.data?.message || 'Error en registro'
    })
  }
}

const logout = async () => {
  try {
    await axios.post(`${api}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    user.value = null
    localStorage.removeItem('token')

    await Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente'
    })

    router.push('/auth')
  } catch (err) {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo cerrar sesión'
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

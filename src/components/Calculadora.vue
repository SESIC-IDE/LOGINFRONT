<template>
  <div class="min-h-screen flex items-center justify-center p-4 font-sans"
    style="background: linear-gradient(135deg, #003366, #1976d2, #e6eff7);">

    <!-- 🚀 Vista móvil -->
    <div v-if="isMobile" class="bg-white/90 border border-gray-200 rounded-xl p-6 w-full max-w-sm text-center text-blue-900 shadow-lg">
      <h2 class="text-2xl font-bold mb-4 tracking-wide text-blue-800">
        CALCULADORA MÓVIL
      </h2>

      <div class="space-y-4 mb-6">
        <input type="number" v-model.number="a" placeholder="Número A"
          class="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-700 transition"/>
        <input type="number" v-model.number="b" placeholder="Número B"
          class="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-700 transition"/>
      </div>

      <div class="flex flex-col space-y-3 mb-4">
        <button @click="sumar" class="bg-blue-900 hover:bg-blue-700 px-4 py-2 rounded text-white font-semibold transition">Sumar</button>
        <button @click="restar" class="bg-blue-800 hover:bg-blue-600 px-4 py-2 rounded text-white font-semibold transition">Restar</button>
        <button @click="multiplicar" class="bg-blue-700 hover:bg-blue-600 px-4 py-2 rounded text-white font-semibold transition">Multiplicar</button>
        <button @click="dividir" class="bg-blue-600 hover:bg-blue-500 px-4 py-2 rounded text-white font-semibold transition">Dividir</button>
        <button @click="potencia" class="bg-green-700 hover:bg-green-600 px-4 py-2 rounded text-white font-semibold transition">Potencia (API)</button>
        <button @click="raiz" class="bg-green-600 hover:bg-green-500 px-4 py-2 rounded text-white font-semibold transition">Raíz (API)</button>
        <button @click="logaritmo" class="bg-purple-700 hover:bg-purple-600 px-4 py-2 rounded text-white font-semibold transition">Log (API)</button>
        <button @click="seno" class="bg-pink-700 hover:bg-pink-600 px-4 py-2 rounded text-white font-semibold transition">Seno (API)</button>
        <button @click="coseno" class="bg-pink-600 hover:bg-pink-500 px-4 py-2 rounded text-white font-semibold transition">Coseno (API)</button>
        <button @click="tangente" class="bg-pink-500 hover:bg-pink-400 px-4 py-2 rounded text-white font-semibold transition">Tangente (API)</button>
      </div>

      <button @click="logout" class="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-lg text-blue-900 font-semibold transition">
        Cerrar sesión
      </button>
    </div>

    <!-- 🚀 Vista PC -->
    <div v-else class="bg-white/90 border border-gray-200 rounded-2xl p-12 w-full max-w-3xl text-blue-900 space-y-8 shadow-lg">
      <h2 class="text-4xl font-extrabold tracking-wide text-blue-800 text-center">CALCULADORA PRO</h2>

      <div class="grid grid-cols-2 gap-8">
        <div class="relative">
          <input type="number" v-model.number="a" placeholder="Número A"
            class="w-full bg-gray-50 border border-gray-300 rounded-lg px-6 py-4 pl-14 text-blue-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-700 transition"/>
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700 text-xl font-semibold">A</span>
        </div>
        <div class="relative">
          <input type="number" v-model.number="b" placeholder="Número B"
            class="w-full bg-gray-50 border border-gray-300 rounded-lg px-6 py-4 pl-14 text-blue-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-700 transition"/>
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700 text-xl font-semibold">B</span>
        </div>
      </div>

      <div class="grid grid-cols-5 gap-4 mt-8">
        <button @click="sumar" class="bg-blue-900 hover:bg-blue-700 px-6 py-4 rounded-lg text-white font-semibold transition">Sumar</button>
        <button @click="restar" class="bg-blue-800 hover:bg-blue-600 px-6 py-4 rounded-lg text-white font-semibold transition">Restar</button>
        <button @click="multiplicar" class="bg-blue-700 hover:bg-blue-600 px-6 py-4 rounded-lg text-white font-semibold transition">Multiplicar</button>
        <button @click="dividir" class="bg-blue-600 hover:bg-blue-500 px-6 py-4 rounded-lg text-white font-semibold transition">Dividir</button>
        <button @click="potencia" class="bg-green-700 hover:bg-green-600 px-6 py-4 rounded-lg text-white font-semibold transition">Potencia (API)</button>
        <button @click="raiz" class="bg-green-600 hover:bg-green-500 px-6 py-4 rounded-lg text-white font-semibold transition">Raíz (API)</button>
        <button @click="logaritmo" class="bg-purple-700 hover:bg-purple-600 px-6 py-4 rounded-lg text-white font-semibold transition">Log (API)</button>
        <button @click="seno" class="bg-pink-700 hover:bg-pink-600 px-6 py-4 rounded-lg text-white font-semibold transition">Seno (API)</button>
        <button @click="coseno" class="bg-pink-600 hover:bg-pink-500 px-6 py-4 rounded-lg text-white font-semibold transition">Coseno (API)</button>
        <button @click="tangente" class="bg-pink-500 hover:bg-pink-400 px-6 py-4 rounded-lg text-white font-semibold transition">Tangente (API)</button>
      </div>

      <div class="flex justify-center mt-6">
        <button @click="logout" class="bg-yellow-400 hover:bg-yellow-500 px-8 py-3 rounded-lg text-blue-900 font-semibold transition">
          Cerrar sesión
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useRouter } from 'vue-router'
import { useDevice } from '@/composables/useDevice'

const { isMobile } = useDevice()
const router = useRouter()
const api = 'http://localhost:8000/api'

const a = ref(null)
const b = ref(null)

const formatNumber = (num) => {
  const rounded = parseFloat(num.toFixed(4))
  return rounded % 1 === 0 ? parseInt(rounded) : rounded
}

const showAlert = (msg) => Swal.fire({
  icon: 'warning', title: 'Atención', text: msg,
  confirmButtonColor: '#003366', background: '#f9fafb', color: '#003366'
})

const showResult = (msg) => Swal.fire({
  icon: 'success', title: 'Resultado',
  html: `<div style="font-size:2rem; color:#003366;">${msg}</div>`,
  confirmButtonColor: '#003366', background: '#f9fafb', color: '#003366'
})

const checkAB = () => {
  if (a.value === null || b.value === null || isNaN(a.value) || isNaN(b.value)) {
    showAlert('Por favor ingresa ambos números.')
    return false
  }
  return true
}

const sumar = () => {
  if (!checkAB()) return
  showResult(formatNumber(parseFloat(a.value) + parseFloat(b.value)))
}

const restar = () => {
  if (!checkAB()) return
  showResult(formatNumber(parseFloat(a.value) - parseFloat(b.value)))
}

const multiplicar = () => {
  if (!checkAB()) return
  showResult(formatNumber(parseFloat(a.value) * parseFloat(b.value)))
}

const dividir = () => {
  if (!checkAB()) return
  if (parseFloat(b.value) === 0) return showAlert('No se puede dividir por cero.')
  showResult(formatNumber(parseFloat(a.value) / parseFloat(b.value)))
}

// Llamadas API
const potencia = () => {
  if (!checkAB()) return
  axios.post(`${api}/potencia`, { base: a.value, exponente: b.value })
    .then(r => showResult(r.data.operacion))
    .catch(() => showAlert('Error al calcular potencia'))
}

const raiz = () => {
  if (a.value === null || a.value < 0) return showAlert('Ingresa un número positivo para raíz.')
  axios.post(`${api}/raiz`, { numero: a.value })
    .then(r => showResult(r.data.operacion))
    .catch(() => showAlert('Error al calcular raíz'))
}

const logaritmo = () => {
  if (a.value === null || a.value < 1) return showAlert('Ingresa un número mayor o igual a 1 para log.')
  axios.post(`${api}/logaritmo`, { numero: a.value })
    .then(r => showResult(r.data.operacion))
    .catch(() => showAlert('Error al calcular logaritmo'))
}

const seno = () => {
  if (a.value === null) return showAlert('Ingresa un ángulo en grados.')
  axios.post(`${api}/seno`, { angulo: a.value })
    .then(r => showResult(r.data.operacion))
    .catch(() => showAlert('Error al calcular seno'))
}

const coseno = () => {
  if (a.value === null) return showAlert('Ingresa un ángulo en grados.')
  axios.post(`${api}/coseno`, { angulo: a.value })
    .then(r => showResult(r.data.operacion))
    .catch(() => showAlert('Error al calcular coseno'))
}

const tangente = () => {
  if (a.value === null) return showAlert('Ingresa un ángulo en grados.')
  axios.post(`${api}/tangente`, { angulo: a.value })
    .then(r => showResult(r.data.operacion))
    .catch(() => showAlert('Error al calcular tangente'))
}

const logout = async () => {
  localStorage.removeItem('token')
  await Swal.fire({
    icon: 'info', title: 'Sesión cerrada', text: 'Has cerrado sesión correctamente',
    confirmButtonColor: '#003366', background: '#f9fafb', color: '#003366'
  })
  router.push('/auth')
}
</script>


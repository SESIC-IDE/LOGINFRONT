<template>
  <div class="min-h-screen flex items-center justify-center p-4 font-sans bg-gradient-to-br from-[#000428] via-[#004e92] to-[#000428]">

    <!-- Vista Móvil -->
    <div
      v-if="isMobile"
      class="mobile-glow border border-blue-400/30 bg-white/10 backdrop-blur-md text-white p-6 w-full max-w-sm rounded-2xl shadow-2xl space-y-6 transition duration-300 ease-in-out hover:shadow-blue-400/40"
    >
      <h2 class="text-2xl font-bold tracking-wide text-center text-blue-100">CALCULADORA MÓVIL</h2>

      <input type="number" v-model.number="a" placeholder="Número A"
        class="w-full bg-blue-100/10 border border-blue-300 text-white placeholder-blue-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
      <input type="number" v-model.number="b" placeholder="Número B"
        class="w-full bg-blue-100/10 border border-blue-300 text-white placeholder-blue-200 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500" />

      <div class="grid grid-cols-2 gap-3">
        <button @click="sumar" class="btn-glow">+</button>
        <button @click="restar" class="btn-glow">−</button>
        <button @click="multiplicar" class="btn-glow">×</button>
        <button @click="dividir" class="btn-glow">÷</button>
        <button @click="potencia" class="btn-glow">^</button>
        <button @click="raiz" class="btn-glow">√</button>
        <button @click="logaritmo" class="btn-glow">log</button>
        <button @click="seno" class="btn-glow">sin</button>
        <button @click="coseno" class="btn-glow">cos</button>
        <button @click="tangente" class="btn-glow">tan</button>
      </div>

      <button @click="logout" class="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 rounded transition">Cerrar sesión</button>
    </div>

    <!-- Vista PC -->
    <div
      v-else
      class="desktop-glow border border-cyan-400/20 bg-white/10 backdrop-blur-lg text-white p-12 w-full max-w-4xl rounded-3xl shadow-xl space-y-10 transition duration-300 ease-in-out hover:shadow-cyan-400/50"
    >
      <h2 class="text-4xl font-extrabold tracking-wide text-center text-cyan-100">CALCULADORA PRO</h2>

      <div class="grid grid-cols-2 gap-6">
        <input type="number" v-model.number="a" placeholder="Número A"
          class="w-full bg-blue-100/10 border border-cyan-300 text-white placeholder-cyan-200 rounded px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
        <input type="number" v-model.number="b" placeholder="Número B"
          class="w-full bg-blue-100/10 border border-cyan-300 text-white placeholder-cyan-200 rounded px-6 py-4 focus:outline-none focus:ring-2 focus:ring-cyan-500" />
      </div>

      <div class="grid grid-cols-5 gap-4">
        <button @click="sumar" class="btn-glow">+</button>
        <button @click="restar" class="btn-glow">−</button>
        <button @click="multiplicar" class="btn-glow">×</button>
        <button @click="dividir" class="btn-glow">÷</button>
        <button @click="potencia" class="btn-glow">^</button>
        <button @click="raiz" class="btn-glow">√</button>
        <button @click="logaritmo" class="btn-glow">log</button>
        <button @click="seno" class="btn-glow">sin</button>
        <button @click="coseno" class="btn-glow">cos</button>
        <button @click="tangente" class="btn-glow">tan</button>
      </div>

      <div class="flex justify-center">
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

const router = useRouter()
const { isMobile } = useDevice()
const a = ref(null)
const b = ref(null)

const mostrarResultado = (valor) => {
  const limpio = Number.isInteger(valor) ? valor : parseFloat(valor.toFixed(4))
  Swal.fire({
    icon: 'success',
    title: 'Resultado',
    html: `<div style="font-size:2rem; color:#00ffff;">${limpio}</div>`,
    background: '#0f172a',
    color: '#00ffff',
    confirmButtonColor: '#00bcd4'
  })
}

const checkInputs = () => {
  if (a.value === null || b.value === null) {
    Swal.fire({
      icon: 'warning',
      title: 'Faltan datos',
      text: 'Debes ingresar ambos números.',
      confirmButtonColor: '#00bcd4',
      background: '#0f172a',
      color: '#00ffff'
    })
    return false
  }
  return true
}

const apiCall = async (url, payload) => {
  try {
    const response = await axios.post(`http://localhost:8000/api/${url}`, payload)
    mostrarResultado(response.data.resultado)
  } catch (err) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: err.response?.data?.message || 'Ocurrió un error',
      background: '#0f172a',
      color: '#ff4f4f',
      confirmButtonColor: '#00bcd4'
    })
  }
}

const sumar = () => checkInputs() && mostrarResultado(a.value + b.value)
const restar = () => checkInputs() && mostrarResultado(a.value - b.value)
const multiplicar = () => checkInputs() && mostrarResultado(a.value * b.value)
const dividir = () => checkInputs() && mostrarResultado(b.value !== 0 ? a.value / b.value : '∞')
const potencia = () => checkInputs() && apiCall('potencia', { base: a.value, exponente: b.value })
const raiz = () => a.value !== null && apiCall('raiz', { numero: a.value })
const logaritmo = () => a.value !== null && apiCall('logaritmo', { numero: a.value })
const seno = () => a.value !== null && apiCall('seno', { angulo: a.value })
const coseno = () => a.value !== null && apiCall('coseno', { angulo: a.value })
const tangente = () => a.value !== null && apiCall('tangente', { angulo: a.value })

const logout = async () => {
  localStorage.removeItem('token')
  await Swal.fire({
    icon: 'info',
    title: 'Sesión cerrada',
    text: 'Vuelve pronto',
    confirmButtonColor: '#00bcd4',
    background: '#0f172a',
    color: '#00ffff'
  })
  router.push('/auth')
}
</script>

<style scoped>
.btn-glow {
  background: linear-gradient(to bottom, #0ff, #0cc);
  color: #002b36;
  font-weight: bold;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  border: 2px solid #00e0ff;
  box-shadow:
    inset 0 0 8px rgba(255, 255, 255, 0.2),
    0 6px 10px rgba(0, 255, 255, 0.3),
    0 0 12px rgba(0, 255, 255, 0.6);
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(255, 255, 255, 0.3);
}
.btn-glow:hover {
  background: linear-gradient(to bottom, #00ffff, #00c6ff);
  transform: translateY(-2px);
  box-shadow:
    inset 0 0 10px rgba(255, 255, 255, 0.3),
    0 10px 15px rgba(0, 255, 255, 0.6),
    0 0 20px rgba(0, 255, 255, 0.8);
}

.desktop-glow, .mobile-glow {
  transition: box-shadow 0.4s ease;
}
.desktop-glow:hover, .mobile-glow:hover {
  box-shadow: 0 0 20px 5px rgba(0, 255, 255, 0.4);
}
</style>

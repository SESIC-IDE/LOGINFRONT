<template>
  <div class="min-h-screen flex items-center justify-center p-4 font-sans"
     style="background: linear-gradient(135deg, #e0ecf8, #d0e2f5, #f8fafc);">


    <!-- 🚀 Vista móvil -->
    <div v-if="isMobile" class="bg-white border border-gray-200 rounded-xl p-6 w-full max-w-sm text-center text-blue-900 shadow-sm">
      <h2 class="text-2xl font-bold mb-4 tracking-wide text-blue-800">
        CALCULADORA MÓVIL
      </h2>

      <div class="space-y-4 mb-6">
        <input 
          type="number" v-model.number="a" placeholder="Número A"
          class="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
        />
        <input 
          type="number" v-model.number="b" placeholder="Número B"
          class="w-full bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
        />
      </div>

      <div class="flex flex-col space-y-3 mb-4">
        <button @click="sumar" class="bg-blue-900 hover:bg-blue-700 px-4 py-2 rounded font-semibold text-white transition">
          Sumar (API)
        </button>
        <button @click="restar" class="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded font-semibold text-white transition">
          Restar
        </button>
        <button @click="multiplicar" class="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded font-semibold text-white transition">
          Multiplicar
        </button>
        <button @click="dividir" class="bg-blue-700 hover:bg-blue-800 px-4 py-2 rounded font-semibold text-white transition">
          Dividir
        </button>
      </div>

      <button @click="logout" class="bg-yellow-400 hover:bg-yellow-500 px-6 py-2 rounded-lg text-blue-900 font-semibold transition">
        Cerrar sesión
      </button>
    </div>

    <!-- 🚀 Vista PC / escritorio -->
    <div v-else class="bg-white border border-gray-200 rounded-2xl p-12 w-full max-w-3xl text-blue-900 space-y-8 shadow-sm">
      <h2 class="text-4xl font-extrabold tracking-wide text-blue-800 text-center">
        CALCULADORA PRO
      </h2>

      <div class="grid grid-cols-2 gap-8">
        <div class="relative">
          <input 
            type="number" v-model.number="a" placeholder="Número A"
            class="w-full bg-gray-50 border border-gray-300 rounded-lg px-6 py-4 pl-14 text-blue-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
          />
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700 text-xl font-semibold">A</span>
        </div>
        <div class="relative">
          <input 
            type="number" v-model.number="b" placeholder="Número B"
            class="w-full bg-gray-50 border border-gray-300 rounded-lg px-6 py-4 pl-14 text-blue-900 placeholder-gray-500 focus:ring-2 focus:ring-blue-700 focus:border-blue-700 transition"
          />
          <span class="absolute left-4 top-1/2 -translate-y-1/2 text-blue-700 text-xl font-semibold">B</span>
        </div>
      </div>

      <div class="grid grid-cols-4 gap-6 mt-8">
        <button @click="sumar" class="bg-blue-900 hover:bg-blue-700 px-6 py-4 rounded-lg font-semibold text-white transition">
          Sumar
        </button>
        <button @click="restar" class="bg-blue-700 hover:bg-blue-800 px-6 py-4 rounded-lg font-semibold text-white transition">
          Restar
        </button>
        <button @click="multiplicar" class="bg-blue-700 hover:bg-blue-800 px-6 py-4 rounded-lg font-semibold text-white transition">
          Multiplicar
        </button>
        <button @click="dividir" class="bg-blue-700 hover:bg-blue-800 px-6 py-4 rounded-lg font-semibold text-white transition">
          Dividir
        </button>
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
import { useRouter } from 'vue-router'
import { useDevice } from '@/composables/useDevice'

const { isMobile } = useDevice()
const router = useRouter()

const a = ref(null)
const b = ref(null)

const checkInputs = () => {
  if (a.value === null || b.value === null || a.value === '' || b.value === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacíos',
      text: 'Por favor ingresa ambos números antes de continuar.',
      confirmButtonColor: '#003366',
      background: '#f9fafb',
      color: '#003366'
    })
    return false
  }
  return true
}

const mostrarResultado = (valor) => {
  Swal.fire({
    icon: 'success',
    title: 'Resultado',
    html: `<div style="font-size:2rem; color:#003366;">${valor}</div>`,
    confirmButtonColor: '#003366',
    background: '#f9fafb',
    color: '#003366'
  })
}

const sumar = () => {
  if (!checkInputs()) return
  mostrarResultado(a.value + b.value)
}

const restar = () => {
  if (!checkInputs()) return
  mostrarResultado(a.value - b.value)
}

const multiplicar = () => {
  if (!checkInputs()) return
  mostrarResultado(a.value * b.value)
}

const dividir = () => {
  if (!checkInputs()) return
  mostrarResultado(b.value !== 0 ? (a.value / b.value) : 'No se puede dividir por cero')
}

const logout = async () => {
  try {
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
</script>

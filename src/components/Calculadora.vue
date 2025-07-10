<template>
  <div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] p-4 font-sans">
    <div class="bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl p-8 w-full max-w-md text-center text-gray-100">
      <h2 class="text-3xl font-bold mb-6 tracking-wider text-purple-400 drop-shadow-lg">
        CALCULADORA MASTER
      </h2>

      <div class="flex flex-wrap justify-center gap-4 mb-8">
        <input 
          type="number"
          v-model.number="a"
          placeholder="Número A"
          class="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-5 py-3 w-32 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
        <input 
          type="number"
          v-model.number="b"
          placeholder="Número B"
          class="bg-white/20 backdrop-blur-md border border-white/30 rounded-xl px-5 py-3 w-32 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
        />
      </div>

      <div class="flex flex-wrap justify-center gap-4 mb-6">
        <button @click="sumar" class="px-5 py-3 rounded-xl font-bold bg-purple-600 shadow-lg hover:shadow-purple-700/80 hover:scale-105 transition">
          Sumar (API)
        </button>
        <button @click="restar" class="px-5 py-3 rounded-xl font-bold bg-cyan-600 shadow-lg hover:shadow-cyan-700/80 hover:scale-105 transition">
          Restar
        </button>
        <button @click="multiplicar" class="px-5 py-3 rounded-xl font-bold bg-green-600 shadow-lg hover:shadow-green-700/80 hover:scale-105 transition">
          Multiplicar
        </button>
        <button @click="dividir" class="px-5 py-3 rounded-xl font-bold bg-pink-600 shadow-lg hover:shadow-pink-700/80 hover:scale-105 transition">
          Dividir
        </button>
      </div>

      <button @click="logout" class="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-xl">
        Cerrar sesión
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'

const router = useRouter()
const api = 'http://localhost:8000/api'

const a = ref(null)
const b = ref(null)

const checkInputs = () => {
  if (a.value === null || b.value === null || a.value === '' || b.value === '') {
    Swal.fire({
      icon: 'warning',
      title: 'Campos vacíos',
      text: 'Por favor ingresa ambos números antes de continuar.',
      confirmButtonColor: '#7c3aed',
      background: '#1f1f2e',
      color: '#fff'
    })
    return false
  }
  return true
}

const logout = async () => {
  try {
    await axios.post(`${api}/logout`, {}, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    localStorage.removeItem('token')

    await Swal.fire({
      icon: 'info',
      title: 'Sesión cerrada',
      text: 'Has cerrado sesión correctamente',
      confirmButtonColor: '#7c3aed',
      background: '#1f1f2e',
      color: '#fff'
    })

    router.push('/auth') // 👈 regresa al login
  } catch (err) {
    await Swal.fire({
      icon: 'error',
      title: 'Error',
      text: 'No se pudo cerrar sesión',
      confirmButtonColor: '#7c3aed',
      background: '#1f1f2e',
      color: '#fff'
    })
  }
}

const mostrarResultado = (valor) => {
  Swal.fire({
    icon: 'success',
    title: 'Resultado',
    html: `<div style="font-size:2rem; color:#7c3aed; text-shadow:0 0 8px #7c3aed;">
             ${valor}
           </div>`,
    confirmButtonColor: '#7c3aed',
    background: '#1f1f2e',
    color: '#fff'
  })
}

const sumar = () => {
  if (!checkInputs()) return
  axios.post(`${api}/sumar`, { a: a.value, b: b.value })
    .then(res => mostrarResultado(res.data.resultado))
    .catch(() => mostrarResultado('Error al sumar'))
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
</script>

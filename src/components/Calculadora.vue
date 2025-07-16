<template>
  <div class="min-h-screen flex items-center justify-center p-4 font-sans bg-gradient-to-br from-[#000000] via-[#2b97ff] to-[#000000]">

    <!-- Vista Móvil -->
    <div
      v-if="isMobile"
      class="mobile-glow border border-[#2b97ff] bg-white/10 backdrop-blur-md text-white p-6 w-full max-w-sm rounded-2xl shadow-2xl space-y-6 transition duration-300 ease-in-out hover:shadow-[#2b97ff]/40"
    >
      <h2 class="text-2xl font-bold tracking-wide text-center text-[#2cbdff]">CALCULADORA MÓVIL</h2>

      <input type="number" v-model.number="a" placeholder="Número A"
        class="w-full bg-[#1478fc]/10 border border-[#2cbdff] text-white placeholder-[#2cbdff] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2cbdff]" />
      <input type="number" v-model.number="b" placeholder="Número B"
        class="w-full bg-[#1478fc]/10 border border-[#2cbdff] text-white placeholder-[#2cbdff] rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#2cbdff]" />

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

      <button @click="logout" class="w-full mt-4 bg-[#e5d40d] hover:bg-[#c6a708] text-black font-bold py-2 rounded transition">Cerrar sesión</button>
    </div>

    <!-- Vista PC -->
    <div
      v-else
      class="desktop-glow border border-[#2b97ff] bg-white/10 backdrop-blur-lg text-white p-12 w-full max-w-4xl rounded-3xl shadow-xl space-y-10 transition duration-300 ease-in-out hover:shadow-[#2b97ff]/50"
    >
      <h2 class="text-4xl font-extrabold tracking-wide text-center text-[#2cbdff]">CALCULADORA PRO</h2>

      <div class="grid grid-cols-2 gap-6">
        <input type="number" v-model.number="a" placeholder="Número A"
          class="w-full bg-[#1478fc]/10 border border-[#2cbdff] text-white placeholder-[#2cbdff] rounded px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#2cbdff]" />
        <input type="number" v-model.number="b" placeholder="Número B"
          class="w-full bg-[#1478fc]/10 border border-[#2cbdff] text-white placeholder-[#2cbdff] rounded px-6 py-4 focus:outline-none focus:ring-2 focus:ring-[#2cbdff]" />
      </div>

      <div class="grid grid-cols-5 gap-4">
  <button @click="sumar" class="btn-institucional bg-[#11b873] hover:bg-[#0ea765]">+</button>
  <button @click="restar" class="btn-institucional bg-[#2b97ff] hover:bg-[#1478fc]">−</button>
  <button @click="multiplicar" class="btn-institucional bg-[#e5d40d] hover:bg-[#c6a708]">×</button>
  <button @click="dividir" class="btn-institucional bg-[#f01212] hover:bg-[#ff3131]">÷</button>
  <button @click="potencia" class="btn-institucional bg-[#2cbdff] hover:bg-[#2b97ff]">^</button>
  <button @click="raiz" class="btn-institucional bg-[#b0b0b0] hover:bg-[#888888]">√</button>
  <button @click="logaritmo" class="btn-institucional bg-[#c6a708] hover:bg-[#e5d40d]">log</button>
  <button @click="seno" class="btn-institucional bg-[#1478fc] hover:bg-[#2b97ff]">sin</button>
  <button @click="coseno" class="btn-institucional bg-[#11b873] hover:bg-[#0ea765]">cos</button>
  <button @click="tangente" class="btn-institucional bg-[#ff3131] hover:bg-[#f01212]">tan</button>
</div>

      <div class="flex justify-center">
        <button @click="logout" class="bg-[#e5d40d] hover:bg-[#c6a708] px-8 py-3 rounded-lg text-black font-semibold transition">
          Cerrar sesión
        </button>
      </div>
      <!-- Paleta de Colores Institucionales -->
<div class="w-full text-center my-12">
  <h2 class="text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-[#11b873] via-[#2b97ff] to-[#ff3131] drop-shadow-xl">
    PALETA DE COLORES INSTITUCIONALES
  </h2>
</div>

<div class="w-full max-w-5xl space-y-8 mb-16">
  <!-- Grupo de colores (ejemplo para cada grupo) -->
  <div class="space-y-4">
    <!-- Verdes -->
    <div class="text-white font-semibold text-lg">Verdes</div>
    <div class="space-y-2">
      <div class="color-bar bg-[#11b873]" title="#11b873"></div>
      <div class="code-display">#11b873</div>
      <div class="color-bar bg-[#11b873] opacity-80" title="#11b873 (500)"></div>
      <div class="code-display">#11b873</div>
    </div>

    <!-- Amarillos -->
    <div class="text-white font-semibold text-lg mt-4">Amarillos</div>
    <div class="space-y-2">
      <div class="color-bar bg-[#c6a708]" title="#c6a708"></div>
      <div class="code-display">#c6a708</div>
      <div class="color-bar bg-[#e5d40d]" title="#e5d40d"></div>
      <div class="code-display">#e5d40d</div>
    </div>

    <!-- Azules -->
    <div class="text-white font-semibold text-lg mt-4">Azules</div>
    <div class="space-y-2">
      <div class="color-bar bg-[#1478fc]" title="#1478fc"></div>
      <div class="code-display">#1478fc</div>
      <div class="color-bar bg-[#2b97ff]" title="#2b97ff"></div>
      <div class="code-display">#2b97ff</div>
      <div class="color-bar bg-[#2cbdff]" title="#2cbdff"></div>
      <div class="code-display">#2cbdff</div>
    </div>

    <!-- Rojos -->
    <div class="text-white font-semibold text-lg mt-4">Rojos</div>
    <div class="space-y-2">
      <div class="color-bar bg-[#f01212]" title="#f01212"></div>
      <div class="code-display">#f01212</div>
      <div class="color-bar bg-[#ff3131]" title="#ff3131"></div>
      <div class="code-display">#ff3131</div>
    </div>

    <!-- Grises -->
    <div class="text-white font-semibold text-lg mt-4">Grises</div>
    <div class="space-y-2">
      <div class="color-bar bg-[#888888]" title="#888888"></div>
      <div class="code-display">#888888</div>
      <div class="color-bar bg-[#b0b0b0]" title="#b0b0b0"></div>
      <div class="code-display">#b0b0b0</div>
    </div>

    <!-- Negro -->
    <div class="text-white font-semibold text-lg mt-4">Negro</div>
    <div class="space-y-2">
      <div class="color-bar bg-[#000000]" title="#000000"></div>
      <div class="code-display">#000000</div>
    </div>

    <!-- Blanco -->
    <div class="text-white font-semibold text-lg mt-4">Blanco</div>
    <div class="space-y-2">
      <div class="color-bar bg-[#ffffff] border border-gray-300" title="#ffffff"></div>
      <div class="code-display">#ffffff</div>
    </div>
  </div>
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
.btn-institucional {
  color: #ffffff;
  font-weight: bold;
  padding: 0.75rem 1.25rem;
  border-radius: 0.5rem;
  border: 2px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
}
.btn-institucional:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
}
.color-bar {
  height: 3rem;
  border-radius: 0.5rem;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
}
.color-bar:hover {
  transform: scale(1.02);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.4), 0 0 10px currentColor;
}
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

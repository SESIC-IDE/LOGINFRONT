import { createRouter, createWebHistory } from 'vue-router'
import AuthView from '../components/AuthView.vue'
import Calculadora from '../components/Calculadora.vue'

const routes = [
    { path: '/auth', component: AuthView },
    { path: '/calculadora', component: Calculadora },
    { path: '/', redirect: '/calculadora' }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// ✅ proteger la ruta de Calculadora
router.beforeEach((to, from, next) => {
    const token = localStorage.getItem('token')
    if (to.path === '/calculadora' && !token) {
        next('/auth')
    } else {
        next()
    }
})

export default router


import { ref, onMounted, onUnmounted } from 'vue'

export function useDevice() {
    const isMobile = ref(window.innerWidth < 768)

    const updateSize = () => {
        isMobile.value = window.innerWidth < 768
    }

    onMounted(() => {
        window.addEventListener('resize', updateSize)
    })

    onUnmounted(() => {
        window.removeEventListener('resize', updateSize)
    })

    return { isMobile }
}

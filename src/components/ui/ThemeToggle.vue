<script setup>
import { ref, onMounted } from 'vue'
import { PhMoon, PhSun } from '@phosphor-icons/vue'

const isDark = ref(false)

const toggleTheme = () => {
  isDark.value = !isDark.value
  const html = document.documentElement
  if (isDark.value) {
    html.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    html.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
}

onMounted(() => {
  const theme = localStorage.getItem('theme')
  if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
})
</script>

<template>
  <button 
    @click="toggleTheme" 
    class="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition"
    aria-label="Toggle Theme"
  >
    <PhMoon v-if="!isDark" :size="20" />
    <PhSun v-else :size="20" />
  </button>
</template>

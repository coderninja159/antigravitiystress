<script setup>
import { onMounted, ref } from 'vue'
import { useUserStore } from './stores/user'
import Navbar from './components/layout/Navbar.vue'

const userStore = useUserStore()

onMounted(() => {
  userStore.loadUserFromStorage()
})
</script>

<template>
  <div class="min-h-screen flex flex-col transition-colors duration-300 bg-light-bg dark:bg-dark-bg text-light-text dark:text-dark-text">
    <Navbar />
    
    <main class="flex-grow w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(10px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>

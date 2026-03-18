<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const logout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<template>
  <div class="max-w-6xl mx-auto w-full flex-grow py-8 px-4 flex flex-col items-center justify-center relative">
    <div class="absolute top-8 right-4">
      <button @click="logout" class="bg-destructive/10 text-destructive rounded-lg px-4 py-2 hover:bg-destructive hover:text-white transition font-medium">
        Chiqish
      </button>
    </div>
    
    <div class="text-center p-12 bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border max-w-2xl w-full">
      <div class="w-20 h-20 bg-sage/20 rounded-full flex items-center justify-center mx-auto mb-6">
        <span class="text-3xl text-sage">🛡️</span>
      </div>
      <h1 class="text-3xl font-bold text-light-text dark:text-dark-text mb-4">Admin Dashboard</h1>
      <p class="text-lg text-light-muted dark:text-dark-muted mb-8">Bu sahifa tayyorlanmoqda. Tez orada admin paneli funksiyalari qo'shiladi.</p>
      <div class="grid grid-cols-2 gap-4 text-left">
        <div class="p-4 border border-gray-100 dark:border-dark-border rounded-xl">
          <div class="text-sm text-light-muted dark:text-dark-muted mb-1">Jami foydalanuvchilar</div>
          <div class="text-2xl font-bold">1,317</div>
        </div>
        <div class="p-4 border border-gray-100 dark:border-dark-border rounded-xl">
          <div class="text-sm text-light-muted dark:text-dark-muted mb-1">Bugungi testlar</div>
          <div class="text-2xl font-bold">42</div>
        </div>
      </div>
    </div>
  </div>
</template>

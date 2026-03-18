<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = useRouter()
const userStore = useUserStore()

const login = ref('')
const password = ref('')
const error = ref('')

const handleLogin = () => {
  if (login.value === 'admin' && password.value === 'admin123') {
    userStore.setAdmin(true)
    router.push('/admin')
  } else {
    error.value = 'Noto\'g\'ri login yoki parol'
  }
}
</script>

<template>
  <div class="flex-grow flex items-center justify-center p-4">
    <div class="w-full max-w-md bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border p-8">
      <h2 class="text-2xl font-bold text-center mb-6 text-light-text dark:text-dark-text">Admin Panel</h2>
      
      <div v-if="error" class="bg-destructive/10 text-destructive p-3 rounded-lg mb-4 text-sm font-medium">
        {{ error }}
      </div>
      
      <div class="space-y-4">
        <div>
          <label class="block text-sm font-medium mb-1 dark:text-gray-300 text-gray-700">Login</label>
          <input v-model="login" type="text" class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-sage focus:outline-none dark:bg-[#1f242b] dark:border-gray-600 dark:text-white" />
        </div>
        <div>
          <label class="block text-sm font-medium mb-1 dark:text-gray-300 text-gray-700">Parol</label>
          <input v-model="password" type="password" class="w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-sage focus:outline-none dark:bg-[#1f242b] dark:border-gray-600 dark:text-white" />
        </div>
        <button @click="handleLogin" class="w-full bg-sage text-white rounded-lg px-4 py-3 font-medium hover:bg-opacity-90 mt-4 transition shadow-md shadow-sage/30">
          Kirish
        </button>
      </div>
    </div>
  </div>
</template>

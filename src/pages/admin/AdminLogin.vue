<script setup>
import { useRouter } from 'vue-router'
import { PhLockKey, PhWarningCircle } from '@phosphor-icons/vue'
import Button from '../../components/ui/Button.vue'
import { ref } from 'vue'
import { useUserStore } from '../../stores/user'

const router = useRouter()
const userStore = useUserStore()

const payload = ref({ username: '', password: '' })
const errorStr = ref('')

const handleAdminLogin = () => {
  errorStr.value = ''
  if(payload.value.username === 'admin' && payload.value.password === 'admin123') {
    userStore.login('admin', 'admin123')
    router.push('/admin/dashboard')
  } else {
    errorStr.value = 'Ruxsat etilmagan!'
  }
}
</script>

<template>
  <div class="flex-grow flex items-center justify-center px-4 py-12">
    <div class="bg-white dark:bg-dark-card w-full max-w-sm rounded-3xl shadow-lg border border-light-border dark:border-dark-border p-8 text-center relative overflow-hidden">
      <div class="absolute top-0 left-0 w-full h-1 bg-destructive"></div>
      
      <div class="w-16 h-16 bg-destructive/10 text-destructive rounded-2xl mx-auto flex items-center justify-center mb-6">
        <PhLockKey :size="32" weight="duotone" />
      </div>
      
      <h2 class="text-2xl font-bold tracking-tight mb-8">Admin Panel</h2>

       <div v-if="errorStr" class="bg-destructive/10 text-destructive p-3 rounded-xl text-sm font-medium flex gap-2 items-center mb-6">
          <PhWarningCircle :size="20" />
          {{ errorStr }}
        </div>

      <div class="space-y-4 text-left">
        <div>
          <label class="block text-sm font-medium text-light-muted dark:text-dark-muted mb-1.5">Username</label>
          <input v-model="payload.username" type="text" placeholder="admin" class="w-full rounded-xl border border-light-border dark:border-dark-border px-4 py-3 focus:ring-2 focus:ring-destructive focus:border-transparent outline-none bg-transparent transition" />
        </div>
        <div>
          <label class="block text-sm font-medium text-light-muted dark:text-dark-muted mb-1.5">Password</label>
          <input v-model="payload.password" type="password" placeholder="••••••••" class="w-full rounded-xl border border-light-border dark:border-dark-border px-4 py-3 focus:ring-2 focus:ring-destructive focus:border-transparent outline-none bg-transparent transition" />
        </div>
        
        <Button class="w-full mt-4 bg-dark-bg hover:bg-gray-800 dark:bg-white dark:text-dark-bg dark:hover:bg-gray-200" @click="handleAdminLogin">
          Tizimga kirish
        </Button>
      </div>
    </div>
  </div>
</template>

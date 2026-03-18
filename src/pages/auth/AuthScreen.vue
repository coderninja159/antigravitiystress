<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import Button from '../../components/ui/Button.vue'
import { PhWarningCircle, PhGraduationCap } from '@phosphor-icons/vue'

const router = useRouter()
const userStore = useUserStore()

const tab = ref('login') // login, register
const email = ref('')
const password = ref('')
const schoolCode = ref('')
const errorStr = ref('')

const handleAction = () => {
  errorStr.value = ''
  if (!email.value || !password.value) {
    errorStr.value = "Barcha majburiy maydonlarni to'ldiring."
    return
  }

  // If registering, direct to onboarding with pre-filled basics potentially, 
  // but for now we authenticate directly using the mock function
  const success = userStore.login(email.value, password.value)
  if (success) {
    router.push('/dashboard')
  } else {
    // If not matching mock admins, fallback as generic user registering/logging in
    if (tab.value === 'register') {
      userStore.setUser({ 
        name: email.value.split('@')[0], 
        role: schoolCode.value ? 'student' : 'user',
        schoolCode: schoolCode.value
      })
      router.push('/onboarding')
    } else {
      errorStr.value = "Noto'g'ri login parollar yoki foydalanuvchi topilmadi."
    }
  }
}
</script>

<template>
  <div class="flex-grow flex items-center justify-center px-4 py-12">
    <div class="bg-white dark:bg-dark-card w-full max-w-md rounded-3xl shadow-lg border border-light-border dark:border-dark-border overflow-hidden">
      
      <!-- Tabs -->
      <div class="flex border-b border-light-border dark:border-dark-border">
        <button 
          @click="tab = 'login'" 
          class="flex-1 py-4 text-center font-semibold transition-colors relative"
          :class="tab === 'login' ? 'text-sage' : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'"
        >
          Kirish
          <span v-if="tab === 'login'" class="absolute bottom-0 left-0 w-full h-0.5 bg-sage"></span>
        </button>
        <button 
          @click="tab = 'register'" 
          class="flex-1 py-4 text-center font-semibold transition-colors relative"
          :class="tab === 'register' ? 'text-sage' : 'text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'"
        >
          Ro'yxatdan o'tish
          <span v-if="tab === 'register'" class="absolute bottom-0 left-0 w-full h-0.5 bg-sage"></span>
        </button>
      </div>

      <!-- Form -->
      <div class="p-8 space-y-5">
        
        <div v-if="errorStr" class="bg-destructive/10 text-destructive p-3 rounded-xl text-sm font-medium flex gap-2 items-center">
          <PhWarningCircle :size="20" />
          {{ errorStr }}
        </div>

        <div>
          <label class="block text-sm font-medium mb-1.5 text-light-text dark:text-dark-text">Email yoki Telefon</label>
          <input v-model="email" type="text" placeholder="misol@gmail.com" class="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-4 py-3 focus:ring-2 focus:ring-sage focus:outline-none dark:text-white transition" />
        </div>

        <div>
          <label class="block text-sm font-medium mb-1.5 text-light-text dark:text-dark-text">Parol</label>
          <input v-model="password" type="password" placeholder="••••••••" class="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent px-4 py-3 focus:ring-2 focus:ring-sage focus:outline-none dark:text-white transition" />
        </div>

        <div v-if="tab === 'register'">
          <label class="flex items-center gap-2 text-sm font-medium mb-1.5 text-light-text dark:text-dark-text">
            <span>Maktab kodi</span>
            <span class="text-xs text-light-muted dark:text-dark-muted font-normal">(ixtiyoriy, o'quvchilar uchun)</span>
          </label>
          <div class="relative">
            <PhGraduationCap :size="20" class="absolute left-3 top-1/2 -translate-y-1/2 text-light-muted dark:text-dark-muted" />
            <input v-model="schoolCode" type="text" placeholder="1234" class="w-full rounded-xl border border-light-border dark:border-dark-border bg-transparent pl-10 pr-4 py-3 focus:ring-2 focus:ring-sage focus:outline-none dark:text-white transition" />
          </div>
        </div>

        <Button class="w-full mt-4" @click="handleAction">
          {{ tab === 'login' ? 'Tizimga kirish' : 'Davom etish' }}
        </Button>

      </div>
    </div>
  </div>
</template>

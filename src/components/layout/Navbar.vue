<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../../stores/user'
import LanguageSwitcher from '../ui/LanguageSwitcher.vue'
import ThemeToggle from '../ui/ThemeToggle.vue'
import { PhSignOut, PhUserCircle } from '@phosphor-icons/vue'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const isLoggedIn = computed(() => userStore.isLoggedIn)
const role = computed(() => userStore.role)
const user = computed(() => userStore.user)

const navLinks = computed(() => {
  const links = [{ name: t('landing.home'), path: '/' }]
  if (isLoggedIn.value) {
    links.push({ name: t('landing.test'), path: '/test-select' })
    if (role.value === 'admin') {
      links.push({ name: t('landing.admin'), path: '/admin/dashboard' })
    } else if (role.value === 'parent') {
      links.push({ name: t('landing.cabinet'), path: '/parent' })
    } else if (role.value === 'school_psychologist') {
      links.push({ name: t('landing.cabinet'), path: '/school/dashboard' })
    } else if (role.value === 'professional_psychologist') {
      links.push({ name: t('landing.cabinet'), path: '/psychologist/dashboard' })
    } else {
      links.push({ name: t('landing.cabinet'), path: '/dashboard' })
    }
  }
  return links
})

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<template>
  <header class="sticky top-0 z-40 w-full backdrop-blur-md bg-white/70 dark:bg-dark-bg/70 border-b border-light-border dark:border-dark-border transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
      
      <!-- Logo -->
      <router-link to="/" class="flex items-center gap-2 group">
        <div class="w-8 h-8 bg-sage rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:rotate-12 transition-transform">
          S
        </div>
        <span class="text-xl font-bold text-light-text dark:text-dark-text tracking-tight">Stress<span class="text-sage">Test</span></span>
      </router-link>

      <!-- Center Nav -->
      <nav class="hidden md:flex items-center gap-8">
        <router-link 
          v-for="link in navLinks" 
          :key="link.path" 
          :to="link.path"
          class="text-sm font-medium transition-colors hover:text-sage relative group"
          :class="$route.path === link.path ? 'text-sage' : 'text-light-muted dark:text-dark-muted'"
        >
          {{ link.name }}
          <span class="absolute -bottom-1 left-0 w-full h-0.5 bg-sage scale-x-0 group-hover:scale-x-100 transition-transform origin-left" :class="{ 'scale-x-100': $route.path === link.path }"></span>
        </router-link>
      </nav>

      <!-- Right Actions -->
      <div class="flex items-center gap-4">
        <LanguageSwitcher />
        <ThemeToggle />
        
        <template v-if="!isLoggedIn">
          <router-link to="/auth" class="hidden sm:inline-flex items-center justify-center rounded-lg bg-sage text-white px-5 py-2 text-sm font-medium hover:bg-opacity-90 transition shadow-sm hover:shadow-md hover:-translate-y-0.5 active:scale-95">
            {{ t('landing.login') }}
          </router-link>
        </template>
        
        <template v-else>
          <div class="hidden sm:flex items-center gap-3">
            <div class="flex items-center gap-2 text-sm font-medium text-light-text dark:text-dark-text bg-gray-100 dark:bg-dark-card px-3 py-1.5 rounded-full border border-gray-200 dark:border-dark-border group cursor-default">
              <PhUserCircle :size="20" class="text-sage" />
              <span>{{ user.name }}</span>
            </div>
            <button @click="handleLogout" class="p-2 text-light-muted hover:text-destructive dark:text-dark-muted dark:hover:text-destructive transition" title="Chiqish">
              <PhSignOut :size="20" />
            </button>
          </div>
        </template>
      </div>

    </div>
  </header>
</template>

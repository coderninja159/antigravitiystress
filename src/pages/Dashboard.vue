<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../stores/user'
import { PhFire, PhLightbulb, PhTrash } from '@phosphor-icons/vue'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const user = computed(() => userStore.user)
const history = computed(() => userStore.history)
const streak = computed(() => userStore.streak)
const tip = computed(() => userStore.dailyTip || userStore.getDailyTip())

const retake = () => {
  userStore.answers = {}
  router.push('/test')
}

const formatDate = (isoString) => {
  const d = new Date(isoString)
  return d.toLocaleString() // simple format
}

const deleteItem = (index) => {
  userStore.history.splice(index, 1)
  userStore.saveToStorage()
}

// Simple CSS based swipe isn't completely functional without complex touch event listeners,
// but we will implement a basic "hover to delete" pattern as an alternative for mouse,
// while mobile can tap.
</script>

<template>
  <div class="max-w-4xl mx-auto w-full flex-grow py-8 px-4">
    <div class="mb-10">
      <h1 class="text-3xl font-bold text-light-text dark:text-dark-text mb-2">
        {{ t('dashboard.welcome', { name: user?.name || 'Foydalanuvchi' }) }}
      </h1>
      <p class="text-light-muted dark:text-dark-muted">{{ t('dashboard.subtitle') }}</p>
    </div>

    <!-- Stats Row -->
    <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
      <div class="bg-gradient-to-br from-[#D4875A] to-[#C97C5D] rounded-2xl p-6 text-white shadow-md relative overflow-hidden group">
        <PhFire :size="120" weight="duotone" class="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 transition-transform duration-500" />
        <div class="relative z-10 flex items-center gap-3">
          <PhFire :size="32" weight="fill" />
          <h3 class="text-xl font-semibold">{{ t('dashboard.streak') }}</h3>
        </div>
        <div class="relative z-10 mt-4">
          <span class="text-4xl font-bold">{{ streak }}</span>
          <span class="text-lg ml-2 opacity-90">kun ketma-ket</span>
        </div>
      </div>

      <div class="bg-sage rounded-2xl p-6 text-white shadow-md relative overflow-hidden group">
        <PhLightbulb :size="120" weight="duotone" class="absolute -right-6 -bottom-6 opacity-20 group-hover:scale-110 transition-transform duration-500" />
        <div class="relative z-10 flex items-center gap-3">
          <PhLightbulb :size="32" weight="fill" />
          <h3 class="text-xl font-semibold">Kundalik tavsiya</h3>
        </div>
        <p class="relative z-10 mt-4 text-lg font-medium opacity-95">
          "{{ tip }}"
        </p>
      </div>
    </div>

    <div class="flex justify-between items-center mb-6">
      <h2 class="text-2xl font-bold text-light-text dark:text-dark-text">Testlar tarixi</h2>
      <button @click="retake" class="bg-sage text-white rounded-lg px-6 py-2 hover:bg-opacity-90 transition font-medium text-sm sm:text-base">
        {{ t('dashboard.retake') }}
      </button>
    </div>

    <div v-if="history.length > 0" class="space-y-4">
      <div v-for="(item, idx) in history" :key="idx" 
           class="group relative bg-white dark:bg-dark-card rounded-xl border border-gray-100 dark:border-dark-border shadow-sm hover:shadow-md transition-all overflow-hidden">
        
        <div class="p-6 pr-16">
          <div class="text-sm text-light-muted dark:text-dark-muted mb-2 font-medium">
            {{ formatDate(item.timestamp) }}
          </div>
          <div class="text-lg font-semibold text-light-text dark:text-dark-text mb-1 flex items-center gap-2">
            <span class="w-3 h-3 rounded-full" :class="item.stressValue > 70 ? 'bg-destructive' : (item.stressValue > 40 ? 'bg-accent' : 'bg-sage')"></span>
            {{ item.summary }}
          </div>
          <div class="text-sm text-light-muted dark:text-dark-muted line-clamp-1">
            Kuchli jihatlar: {{ item.strengths.join(', ') || 'Muvozanatda' }}
          </div>
        </div>

        <button @click="deleteItem(idx)" class="absolute right-0 top-0 bottom-0 w-14 bg-destructive/10 hover:bg-destructive text-destructive hover:text-white flex justify-center items-center transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100 cursor-pointer border-l border-gray-100 dark:border-dark-border" title="O'chirish">
          <PhTrash :size="24" />
        </button>

      </div>
    </div>
    
    <div v-else class="text-center py-16 bg-white dark:bg-dark-card rounded-2xl border border-dashed border-gray-300 dark:border-gray-600">
      <p class="text-light-muted dark:text-dark-muted text-lg">{{ t('dashboard.no_history') }}</p>
      <button @click="retake" class="mt-6 border-2 border-sage text-sage rounded-lg px-6 py-2 hover:bg-sage hover:text-white transition font-medium">
        Birinchi testni topshirish
      </button>
    </div>

  </div>
</template>

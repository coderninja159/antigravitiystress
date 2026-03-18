<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../../stores/user'
import { PhBriefcase, PhUsers, PhTrendUp, PhChartPolar, PhFolderOpen, PhCaretRight } from '@phosphor-icons/vue'

const router = useRouter()
const userStore = useUserStore()

const stats = [
  { label: 'Jami mijozlar', value: '45', icon: PhUsers, color: 'text-sage', bg: 'bg-sage/10' },
  { label: 'Oylik  o\'sish', value: '+12%', icon: PhTrendUp, color: 'text-accent', bg: 'bg-accent/10' },
  { label: 'O\'tkazilgan testlar', value: '128', icon: PhChartPolar, color: 'text-sage', bg: 'bg-sage/10' }
]

const recentClients = [
  { id: 1, name: 'Anvar Tursunov', lastSession: 'Bugun', status: 'Yaxshi', next: 'Ertaga, 14:00' },
  { id: 2, name: 'Sarvinoz Oripova', lastSession: '12 Mart', status: 'Stressli', next: '19 Mart, 10:00' },
]
</script>

<template>
  <div class="max-w-6xl mx-auto w-full flex-grow py-8 px-4 flex flex-col pt-12 text-light-text dark:text-dark-text">
    
    <div class="mb-12">
      <h1 class="text-3xl font-extrabold mb-2 flex items-center gap-3">
        <PhBriefcase :size="32" class="text-sage" weight="duotone" />
        Professional Psixolog Paneli
      </h1>
      <p class="text-light-muted dark:text-dark-muted text-lg">Mijozlar portfeli va ularning test dinamikasi nazorati.</p>
    </div>

    <!-- Stats -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
      <div v-for="stat in stats" :key="stat.label" class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm flex items-center gap-5 group hover:shadow-md transition">
        <div :class="[stat.bg, stat.color, 'w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform']">
          <component :is="stat.icon" :size="28" />
        </div>
        <div>
          <p class="text-sm font-semibold text-light-muted dark:text-dark-muted mb-1">{{ stat.label }}</p>
          <p class="text-2xl font-bold">{{ stat.value }}</p>
        </div>
      </div>
    </div>

    <!-- Clients List -->
    <div class="bg-white dark:bg-dark-card rounded-3xl border border-light-border dark:border-dark-border shadow-sm overflow-hidden flex flex-col">
      <div class="p-6 border-b border-light-border dark:border-dark-border flex justify-between items-center bg-gray-50 dark:bg-dark-bg/50">
        <h2 class="text-lg font-bold flex items-center gap-2">
          <PhFolderOpen :size="24" class="text-sage" />
          Faol Mijozlar
        </h2>
        <button class="text-sage text-sm font-semibold hover:text-[#6B8A78] transition">Barchasi</button>
      </div>
      <div class="divide-y divide-light-border dark:divide-dark-border">
        <div v-for="client in recentClients" :key="client.id" class="p-6 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-dark-bg transition cursor-pointer group">
          <div class="flex items-center gap-4">
            <div class="w-12 h-12 bg-gray-100 dark:bg-dark-bg rounded-full flex items-center justify-center font-bold text-sage shrink-0">{{ client.name.charAt(0) }}</div>
            <div>
              <p class="font-bold text-lg mb-0.5">{{ client.name }}</p>
              <div class="flex gap-3 text-sm text-light-muted dark:text-dark-muted">
                <span>So'nggi test: {{ client.lastSession }}</span>
                <span class="w-1 h-1 rounded-full bg-light-border dark:bg-dark-border self-center"></span>
                <span>Navbatdagi: {{ client.next }}</span>
              </div>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <span class="px-3 py-1 text-xs font-bold rounded" :class="client.status === 'Stressli' ? 'bg-destructive/10 text-destructive' : 'bg-sage/10 text-sage'">
              {{ client.status }}
            </span>
            <PhCaretRight :size="20" class="text-light-muted dark:text-dark-muted group-hover:text-sage transition-colors group-hover:translate-x-1" />
          </div>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../../stores/user'
import { PhUsersThree, PhDownloadSimple, PhEye, PhShieldCheck } from '@phosphor-icons/vue'

const router = useRouter()
const userStore = useUserStore()

const admin = computed(() => userStore.user)

// Mock school aggregated data
const schoolStats = [
  { class: '8-A', students: 25, tested: 20, highStress: 3, mood: 'Yaxshi' },
  { class: '9-B', students: 30, tested: 28, highStress: 8, mood: 'Xavotirli' },
  { class: '10-A', students: 22, tested: 22, highStress: 5, mood: 'O\'rtacha' },
]

const recentFlags = [
  { id: 1, name: 'Ali Valiyev', class: '9-B', type: 'Stress', level: 'Yuqori', date: 'Bugun, 10:30' },
  { id: 2, name: 'Malika Karimova', class: '10-A', type: 'Portret', level: 'Diqqat qiling', date: 'Kecha, 14:15' },
]
</script>

<template>
  <div class="max-w-6xl mx-auto w-full flex-grow py-8 px-4 flex flex-col pt-12 text-light-text dark:text-dark-text">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
      <div>
        <h1 class="text-3xl font-extrabold mb-2 flex items-center gap-3">
          <PhShieldCheck :size="32" class="text-sage" weight="duotone" />
          Maktab Psixologi Paneli
        </h1>
        <p class="text-light-muted dark:text-dark-muted text-lg">Maktab bo'yicha umumiy holat va qizil zonalar monitoringi.</p>
      </div>
      <button class="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:border-sage hover:text-sage transition shadow-sm">
        <PhDownloadSimple :size="18" />
        Umumiy hisobot
      </button>
    </div>

    <!-- Stats Overview -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm">
        <p class="text-light-muted dark:text-dark-muted text-sm font-semibold mb-2">Jami o'quvchilar</p>
        <p class="text-3xl font-bold">1245</p>
      </div>
      <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm">
        <p class="text-light-muted dark:text-dark-muted text-sm font-semibold mb-2">Test topshirganlar</p>
        <p class="text-3xl font-bold text-sage">892</p>
      </div>
       <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm">
        <p class="text-light-muted dark:text-dark-muted text-sm font-semibold mb-2">Qizil zonadagilar</p>
        <p class="text-3xl font-bold text-destructive">41</p>
      </div>
      <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm">
        <p class="text-light-muted dark:text-dark-muted text-sm font-semibold mb-2">Umumiy muhit</p>
        <p class="text-xl font-bold mt-1.5 flex items-center gap-2"><span class="w-3 h-3 rounded-full bg-sage"></span> Qoniqarli</p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
      
      <!-- Classes Table -->
      <div class="bg-white dark:bg-dark-card rounded-3xl border border-light-border dark:border-dark-border shadow-sm overflow-hidden flex flex-col">
        <div class="p-6 border-b border-light-border dark:border-dark-border bg-gray-50 dark:bg-dark-bg/50">
          <h2 class="text-lg font-bold flex items-center gap-2">
            <PhUsersThree :size="24" class="text-sage" />
            Sinflar bo'limida
          </h2>
        </div>
        <div class="p-0 overflow-x-auto">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-light-border dark:border-dark-border text-sm text-light-muted dark:text-dark-muted">
                <th class="p-4 font-semibold">Sinf</th>
                <th class="p-4 font-semibold">Qamrov</th>
                <th class="p-4 font-semibold">Stress holati</th>
                <th class="p-4 font-semibold">Baholash</th>
              </tr>
            </thead>
            <tbody class="text-sm">
              <tr v-for="c in schoolStats" :key="c.class" class="border-b border-light-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg transition">
                <td class="p-4 font-bold">{{ c.class }}</td>
                <td class="p-4">{{ c.tested }}/{{ c.students }}</td>
                <td class="p-4">
                  <span class="px-2 py-1 rounded text-xs font-bold" :class="c.highStress > 5 ? 'bg-destructive/10 text-destructive' : 'bg-sage/10 text-sage'">
                    {{ c.highStress }} ta yuqori
                  </span>
                </td>
                <td class="p-4 font-medium">{{ c.mood }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <!-- Alerts -->
      <div class="bg-white dark:bg-dark-card rounded-3xl border border-light-border dark:border-dark-border shadow-sm overflow-hidden flex flex-col">
        <div class="p-6 border-b border-light-border dark:border-dark-border bg-destructive/5">
          <h2 class="text-lg font-bold flex items-center gap-2 text-destructive">
            <span class="relative flex h-3 w-3">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-destructive opacity-75"></span>
              <span class="relative inline-flex rounded-full h-3 w-3 bg-destructive"></span>
            </span>
            E'tibor talab qiluvchilar
          </h2>
        </div>
        <div class="p-4 space-y-4">
          <div v-for="flag in recentFlags" :key="flag.id" class="p-4 border border-light-border dark:border-dark-border rounded-xl flex items-center justify-between hover:border-destructive/30 transition shadow-sm">
            <div>
              <p class="font-bold mb-1">{{ flag.name }} <span class="text-xs text-light-muted dark:text-dark-muted font-normal ml-2">Sinf: {{ flag.class }}</span></p>
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded">{{ flag.type }}</span>
                <span class="text-xs font-bold bg-destructive/10 text-destructive px-2 py-0.5 rounded">{{ flag.level }}</span>
                <span class="text-xs text-light-muted dark:text-dark-muted">{{ flag.date }}</span>
              </div>
            </div>
            <button class="w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 flex items-center justify-center text-light-muted hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text transition">
              <PhEye :size="20" />
            </button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>

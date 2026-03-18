<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../stores/user'
import Chart from 'chart.js/auto'
import gsap from 'gsap'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const chartCanvas = ref(null)
const result = ref(null)
const emoji = ref('🌿')

onMounted(() => {
  if (!userStore.lastResult) {
    router.push('/dashboard')
    return
  }

  result.value = userStore.lastResult

  if (result.value.stressValue > 70) emoji.value = '⛈️'
  else if (result.value.stressValue > 40) emoji.value = '⛅'
  else emoji.value = '🌿'

  // Animate elements
  gsap.fromTo('.res-item', 
    { y: 30, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }
  )

  // Chart
  setTimeout(() => {
    if (chartCanvas.value) {
      new Chart(chartCanvas.value, {
        type: 'radar',
        data: {
          labels: ['Kreativlik', 'Energiya', 'Vazminlik', 'Intuitsiya', 'Ambitsiya', 'Empatiya'],
          datasets: [{
            label: 'Sizning natijangiz',
            data: [
              result.value.traitScores.creativity,
              result.value.traitScores.energy,
              result.value.traitScores.calmness,
              result.value.traitScores.intuition,
              result.value.traitScores.ambition,
              result.value.traitScores.empathy
            ],
            fill: true,
            backgroundColor: 'rgba(124, 158, 138, 0.2)', // sage with opacity
            borderColor: '#7C9E8A', // sage
            pointBackgroundColor: '#7C9E8A',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: '#7C9E8A'
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              angleLines: { color: 'rgba(156, 163, 175, 0.2)' },
              grid: { color: 'rgba(156, 163, 175, 0.2)' },
              pointLabels: {
                color: document.documentElement.classList.contains('dark') ? '#ADBAC7' : '#6B7280',
                font: { family: 'Inter', size: 12 }
              },
              ticks: { display: false, min: 0, max: 100 }
            }
          },
          plugins: {
            legend: { display: false }
          }
        }
      })
    }
  }, 100)
})

const goDashboard = () => router.push('/dashboard')
const retake = () => {
  userStore.answers = {}
  router.push('/test')
}

const formatTrait = (key) => {
  const map = {
    creativity: "Kreativlik",
    energy: "Energiya",
    calmness: "Vazminlik",
    intuition: "Intuitsiya",
    ambition: "Ambitsiya",
    empathy: "Empatiya"
  }
  return map[key] || key
}
</script>

<template>
  <div v-if="result" class="max-w-5xl mx-auto w-full flex-grow py-8 px-4">
    <!-- Header Summary -->
    <div class="res-item text-center mb-12">
      <div class="text-6xl mb-4">{{ emoji }}</div>
      <h1 class="text-3xl sm:text-4xl font-bold mb-4 text-light-text dark:text-dark-text">{{ result.summary }}</h1>
      <p class="text-lg text-light-muted dark:text-dark-muted max-w-2xl mx-auto">
        Javoblaringiz asosida yaratilgan psixologik portretingiz. Tahlil yosh va jins bo'yicha maxsus koeffitsiyentlar yordamida hisoblangan.
      </p>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
      <!-- Chart -->
      <div class="res-item bg-white dark:bg-dark-card rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-dark-border flex flex-col justify-center items-center min-h-[400px]">
        <h3 class="text-xl font-semibold mb-6 text-light-text dark:text-dark-text w-full text-left">Psixologik xususiyatlar (Radar)</h3>
        <div class="w-full max-w-[350px] aspect-square relative">
          <canvas ref="chartCanvas"></canvas>
        </div>
      </div>

      <!-- Strengths and Improvements -->
      <div class="flex flex-col gap-8">
        <div class="res-item bg-sage/10 dark:bg-sage/5 rounded-2xl p-6 border border-sage/20 dark:border-sage/10">
          <h3 class="text-xl font-semibold mb-4 text-sage flex items-center gap-2">
            <template v-if="result.strengths.length > 0">
              ⚡ {{ t('result.strengths') }}
            </template>
            <template v-else>
              Barcha xususiyatlar muvozanatda
            </template>
          </h3>
          <ul v-if="result.strengths.length > 0" class="space-y-3">
            <li v-for="s in result.strengths" :key="s" class="flex flex-col bg-white dark:bg-dark-card p-3 rounded-xl shadow-sm cursor-help transition hover:-translate-y-1">
              <span class="font-semibold text-light-text dark:text-dark-text">{{ formatTrait(s) }}</span>
              <span class="text-sm text-light-muted dark:text-dark-muted">{{ result.traitScores[s] }}% ko'rsatkich</span>
            </li>
          </ul>
        </div>

        <div class="res-item bg-accent/10 dark:bg-accent/5 rounded-2xl p-6 border border-accent/20 dark:border-accent/10">
          <h3 class="text-xl font-semibold mb-4 text-accent flex items-center gap-2">
            🌱 {{ t('result.improvements') }}
          </h3>
          <ul v-if="result.improvements.length > 0" class="space-y-3">
            <li v-for="i in result.improvements" :key="i" class="flex flex-col bg-white dark:bg-dark-card p-3 rounded-xl shadow-sm cursor-help transition hover:-translate-y-1">
              <span class="font-semibold text-light-text dark:text-dark-text">{{ formatTrait(i) }}</span>
              <span class="text-sm text-light-muted dark:text-dark-muted">{{ result.traitScores[i] }}% ko'rsatkich</span>
            </li>
          </ul>
          <p v-else class="text-light-muted dark:text-dark-muted bg-white dark:bg-dark-card p-3 rounded-xl shadow-sm">
            Rivojlantirish uchun alohida e'tibor talab qiladigan past ko'rsatkichlar yo'q.
          </p>
        </div>
      </div>
    </div>

    <!-- Recommendations -->
    <div class="res-item bg-white dark:bg-dark-card rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-dark-border mb-12">
      <h3 class="text-2xl font-bold mb-6 text-light-text dark:text-dark-text flex items-center gap-3">
        💡 {{ t('result.recommendations') }}
      </h3>
      <ul class="space-y-4">
        <li v-for="(rec, index) in result.recommendations" :key="index" class="flex items-start gap-4">
          <div class="w-8 h-8 rounded-full bg-sage/20 text-sage flex items-center justify-center font-bold shrink-0 mt-0.5">
            {{ index + 1 }}
          </div>
          <p class="text-lg text-light-muted dark:text-dark-muted">{{ rec }}</p>
        </li>
      </ul>
    </div>

    <!-- Actions -->
    <div class="res-item flex flex-col sm:flex-row gap-4 justify-center items-center pb-12">
      <button @click="retake" class="px-8 py-3 rounded-xl border-2 border-sage text-sage font-medium hover:bg-sage hover:text-white transition w-full sm:w-auto text-center">
        {{ t('result.retake') }}
      </button>
      <button @click="goDashboard" class="px-8 py-3 rounded-xl bg-sage text-white font-medium hover:bg-opacity-90 shadow-lg shadow-sage/30 transition w-full sm:w-auto text-center">
        {{ t('result.dashboard') }}
      </button>
    </div>
  </div>
</template>

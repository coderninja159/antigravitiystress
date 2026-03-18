<script setup>
import { useRoute, useRouter } from 'vue-router'
import { PhArrowLeft, PhChartPolar, PhGauge, PhCalendarBlank } from '@phosphor-icons/vue'
import Button from '../../../components/ui/Button.vue'
import RadarChart from '../../../components/charts/RadarChart.vue'

const route = useRoute()
const router = useRouter()
// Mock dynamic fetch
const childName = route.params.id === '1' ? 'Ali Valiyev' : 'Malika Valiyeva'

const traits = {
  optimistic: 85,
  creative: 70,
  calm: 50,
  ambitious: 60,
  social: 75,
  analytical: 65
}

const goBack = () => router.push('/parent')
</script>

<template>
  <div class="max-w-5xl mx-auto w-full flex-grow py-8 px-4 flex flex-col pt-12 text-light-text dark:text-dark-text">
    
    <div class="mb-10 flex items-center gap-4">
      <button @click="goBack" class="w-12 h-12 rounded-xl bg-white dark:bg-dark-card border border-light-border dark:border-dark-border flex items-center justify-center hover:bg-gray-50 dark:hover:bg-gray-800 transition shadow-sm">
        <PhArrowLeft :size="24" class="text-light-muted dark:text-dark-muted" />
      </button>
      <div>
        <h1 class="text-3xl font-extrabold">{{ childName }}</h1>
        <p class="text-light-muted dark:text-dark-muted flex items-center gap-2 mt-1">
          <PhCalendarBlank :size="16" />
          So'nggi yangilanish: Bugun
        </p>
      </div>
    </div>

    <!-- Quick Overview -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm flex items-center gap-5">
        <div class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0">
          <PhGauge :size="28" class="text-accent" />
        </div>
        <div>
          <h3 class="text-sm font-semibold text-light-muted dark:text-dark-muted mb-1 uppercase tracking-wide">Stress Holati</h3>
          <p class="text-2xl font-bold text-accent">O'rtacha (45%)</p>
        </div>
      </div>
      <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm flex items-center gap-5 relative overflow-hidden">
        <div class="absolute -right-6 -top-6 w-32 h-32 bg-sage/5 rounded-full scale-110"></div>
        <div class="w-14 h-14 bg-sage/10 rounded-2xl flex items-center justify-center shrink-0 z-10">
          <PhChartPolar :size="28" class="text-sage" />
        </div>
        <div class="z-10">
           <h3 class="text-sm font-semibold text-light-muted dark:text-dark-muted mb-1 uppercase tracking-wide">Asosiy xususiyat</h3>
           <p class="text-2xl font-bold text-sage">Optimistik & Sotsial</p>
        </div>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-5 gap-8">
      
       <!-- Radar Side -->
      <div class="lg:col-span-2">
         <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm h-full flex flex-col">
           <h3 class="text-lg font-bold mb-4">Portret chizgisi</h3>
           <RadarChart :traits="traits" class="h-[300px] w-full mt-auto" />
         </div>
      </div>

       <!-- Data Side -->
      <div class="lg:col-span-3 space-y-6">
        <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm">
          <h3 class="text-xl font-bold mb-4">Kuchli tomonlari</h3>
          <div class="flex flex-wrap gap-2">
            <span class="px-4 py-2 border border-sage/20 bg-sage/5 text-sage font-semibold rounded-lg text-sm">Optimistik qadam sobit</span>
            <span class="px-4 py-2 border border-sage/20 bg-sage/5 text-sage font-semibold rounded-lg text-sm">Do'stlari bilan faol muloqotda</span>
          </div>
        </div>
        
        <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm">
          <h3 class="text-xl font-bold mb-4 border-b border-light-border dark:border-dark-border pb-4">Ota-onaga tavsiyalar</h3>
          <ul class="space-y-4">
            <li class="flex gap-4">
              <span class="text-sage font-bold text-lg mt-0.5">1.</span>
              <p class="text-base text-light-muted dark:text-dark-muted font-medium">Farzandingizda hozir biroz o'qish bosimi darajasi ortganini sezishingiz mumkin. Uni biroz tanaffus qilishiga ruxsat bering.</p>
            </li>
            <li class="flex gap-4">
              <span class="text-sage font-bold text-lg mt-0.5">2.</span>
              <p class="text-base text-light-muted dark:text-dark-muted font-medium">Faolligini tushirmasliklari uchun birgalikda kino ko'rish yoki muloqot qilish vaqtlarini ko'paytiring.</p>
            </li>
          </ul>
        </div>
      </div>

    </div>

  </div>
</template>

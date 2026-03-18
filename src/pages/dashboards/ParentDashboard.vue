<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../../stores/user'
import { useI18n } from 'vue-i18n'
import Button from '../../components/ui/Button.vue'
import { PhUsers, PhArrowRight, PhChartPolar, PhGauge, PhWarningCircle } from '@phosphor-icons/vue'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()
const user = computed(() => userStore.user)

const children = [
  { id: 1, name: 'Ali Valiyev', age: 14, lastTestDate: '15 Mart, 2026', recentLevel: 'medium', unread: true },
  { id: 2, name: 'Malika Valiyeva', age: 12, lastTestDate: '10 Mart, 2026', recentLevel: 'low', unread: false }
]

const goChild = (id) => {
  router.push(`/parent/child/${id}`)
}
</script>

<template>
  <div class="max-w-4xl mx-auto w-full flex-grow py-8 px-4 flex flex-col pt-12 text-light-text dark:text-dark-text">
    
    <div class="mb-12">
      <h1 class="text-3xl font-extrabold mb-2 flex items-center gap-3">
        <PhUsers :size="32" class="text-sage" weight="duotone" />
        Oila Paneli
      </h1>
      <p class="text-light-muted dark:text-dark-muted text-lg">Farzandlaringizning ruhiy holati va natijalari kuzatuvi.</p>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      
      <div 
        v-for="child in children" 
        :key="child.id"
        class="bg-white dark:bg-dark-card rounded-3xl p-6 border border-light-border dark:border-dark-border shadow-sm hover:shadow-md hover:border-sage/40 transition-all cursor-pointer group flex flex-col relative"
        @click="goChild(child.id)"
      >
        <div v-if="child.unread" class="absolute -top-2 -right-2 w-5 h-5 bg-destructive rounded-full border-2 border-white dark:border-dark-card animate-pulse"></div>
        
        <div class="flex items-center gap-4 mb-6">
          <div class="w-16 h-16 rounded-full bg-gray-100 dark:bg-dark-bg flex items-center justify-center text-xl font-bold text-sage shrink-0 group-hover:scale-105 transition-transform">
            {{ child.name.charAt(0) }}
          </div>
          <div>
            <h2 class="text-xl font-bold">{{ child.name }}</h2>
            <p class="text-light-muted dark:text-dark-muted text-sm">{{ child.age }} yosh</p>
          </div>
        </div>

        <div class="bg-gray-50 dark:bg-dark-bg p-4 rounded-2xl flex-grow mb-6 border border-light-border dark:border-dark-border">
          <p class="text-xs font-semibold text-light-muted dark:text-dark-muted mb-2 uppercase tracking-wide">So'nggi test</p>
          <div class="flex items-center gap-2 mb-1">
            <PhGauge :size="20" :class="child.recentLevel === 'high' ? 'text-destructive' : (child.recentLevel === 'medium' ? 'text-accent' : 'text-sage')" />
            <span class="font-bold text-sm">Stress Testi</span>
          </div>
          <p class="text-sm font-medium" :class="child.recentLevel === 'high' ? 'text-destructive' : (child.recentLevel === 'medium' ? 'text-accent' : 'text-sage')">
            Hamma narsa joyida, 
            <span v-if="child.recentLevel === 'medium'">o'rtacha charchoq bor.</span>
            <span v-else>xotirjamlik yaxshi.</span>
          </p>
          <p class="text-xs text-light-muted dark:text-dark-muted mt-2">{{ child.lastTestDate }}</p>
        </div>

        <div class="flex items-center justify-between text-sage font-semibold group-hover:text-[#6B8A78] transition-colors mt-auto">
          <span>Batafsil ko'rish</span>
          <PhArrowRight :size="20" class="group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

    </div>

    <!-- Recommendations -->
    <div class="mt-12 bg-white dark:bg-dark-card rounded-3xl p-8 border border-light-border dark:border-dark-border shadow-sm flex gap-6">
      <div class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center shrink-0">
         <PhWarningCircle :size="28" class="text-accent" weight="duotone" />
      </div>
      <div>
        <h3 class="text-xl font-bold mb-2">Umumiy maslahat</h3>
        <p class="text-light-muted dark:text-dark-muted leading-relaxed">
          Farzandlaringiz bilan tez-tez ochiq muloqot qilib turing. Ularning maktabdagi holati haqida qiziqib, ba'zan dam olishlari uchun ko'proq sharoit yarating.
        </p>
      </div>
    </div>

  </div>
</template>

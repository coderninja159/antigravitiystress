<script setup>
import { onMounted, ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import gsap from 'gsap'
import Button from '../components/ui/Button.vue'
import { PhUsersThree, PhShieldCheck, PhChartLineUp, PhUserPlus, PhListChecks, PhPencil, PhSparkle } from '@phosphor-icons/vue'

const router = useRouter()
const { t } = useI18n()
const counterValue = ref(0)

onMounted(() => {
  gsap.from('.hero-elem', { y: 30, opacity: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" })
  gsap.from('.feature-card', { y: 40, opacity: 0, duration: 0.8, stagger: 0.2, delay: 0.4, ease: "power2.out" })
  gsap.from('.step-item', { x: -30, opacity: 0, duration: 0.8, stagger: 0.2, delay: 0.8, ease: "power2.out" })
  
  const obj = { val: 0 }
  gsap.to(obj, {
    val: 1317,
    duration: 2.5,
    delay: 0.5,
    ease: "power2.out",
    onUpdate: () => { counterValue.value = Math.floor(obj.val) }
  })
})

const startTest = () => {
  router.push('/onboarding')
}

const completedTestsText = computed(() => {
  const txt = t('landing.completed_tests', { count: '' })
  return txt.replace('{count}', '').replace('+', '').trim()
})
</script>

<template>
  <div class="w-full flex flex-col gap-24 py-12">
    
    <!-- Hero Section -->
    <section class="max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
      <h1 class="hero-elem text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-light-text dark:text-dark-text leading-tight mb-6">
        {{ t('landing.title') }}
      </h1>
      <p class="hero-elem text-lg sm:text-xl text-light-muted dark:text-dark-muted max-w-2xl mb-10">
        {{ t('landing.tagline') }}
      </p>
      
      <div class="hero-elem mb-12">
        <Button size="lg" class="px-10 py-4 text-xl" @click="startTest">
          {{ t('landing.start_test') }}
        </Button>
      </div>

      <div class="hero-elem flex flex-col items-center">
        <div class="text-5xl font-extrabold text-accent mb-2">{{ counterValue }}+</div>
        <div class="text-lg text-light-muted dark:text-dark-muted font-medium">{{ completedTestsText }}</div>
      </div>
    </section>

    <!-- Features Bento Grid -->
    <section class="max-w-6xl mx-auto px-4 w-full">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="feature-card bg-white dark:bg-dark-card p-8 rounded-3xl border border-light-border dark:border-dark-border shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
          <div class="w-14 h-14 bg-sage/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <PhUsersThree :size="32" class="text-sage" />
          </div>
          <h3 class="text-2xl font-bold mb-3 text-light-text dark:text-dark-text">Loyiha maqsadi</h3>
          <p class="text-light-muted dark:text-dark-muted leading-relaxed">O'quvchilar, xodimlar va har qanday shaxsning yashirin salohiyatini ochish, ruhiy holatini yaxshilashda yordam berish.</p>
        </div>
        
        <div class="feature-card bg-white dark:bg-dark-card p-8 rounded-3xl border border-light-border dark:border-dark-border shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-accent/40 transition-all duration-300 group">
          <div class="w-14 h-14 bg-accent/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <PhShieldCheck :size="32" class="text-accent" />
          </div>
          <h3 class="text-2xl font-bold mb-3 text-light-text dark:text-dark-text">Maxfiylik</h3>
          <p class="text-light-muted dark:text-dark-muted leading-relaxed">Barcha ma'lumotlar va natijalaringiz xavfsiz saqlanadi. Maqsadimiz faqat sizga yordam berish.</p>
        </div>

        <div class="feature-card bg-white dark:bg-dark-card p-8 rounded-3xl border border-light-border dark:border-dark-border shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-sage/40 transition-all duration-300 group">
          <div class="w-14 h-14 bg-sage/10 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <PhChartLineUp :size="32" class="text-sage" />
          </div>
          <h3 class="text-2xl font-bold mb-3 text-light-text dark:text-dark-text">Natija ko'rinishi</h3>
          <p class="text-light-muted dark:text-dark-muted leading-relaxed">Oddiy ballar emas, balki chuqur tahlil qilingan radar diagrammalar va shaxsiy tavsiyalar.</p>
        </div>
      </div>
    </section>

    <!-- How it Works -->
    <section class="max-w-6xl mx-auto px-4 w-full mb-12">
      <h2 class="text-3xl font-bold text-center mb-12 text-light-text dark:text-dark-text">Qanday ishlaydi?</h2>
      
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <div class="step-item flex flex-col items-center text-center group cursor-default">
          <div class="w-20 h-20 rounded-full bg-white dark:bg-dark-card border-2 border-light-border dark:border-dark-border flex items-center justify-center mb-6 shadow-sm group-hover:border-sage group-hover:shadow-md transition-all">
            <PhUserPlus :size="32" class="text-light-muted dark:text-dark-muted group-hover:text-sage transition-colors" />
          </div>
          <h4 class="text-lg font-bold text-light-text dark:text-dark-text mb-2">Roʻyxatdan oʻting</h4>
          <p class="text-sm text-light-muted dark:text-dark-muted">Qisqacha ma'lumotlarni kiriting.</p>
        </div>

        <div class="step-item flex flex-col items-center text-center group cursor-default relative">
          <div class="hidden lg:block absolute top-10 -left-1/2 w-full h-[2px] bg-light-border dark:bg-dark-border -z-10 group-hover:bg-sage/30 transition-colors"></div>
          <div class="w-20 h-20 rounded-full bg-white dark:bg-dark-card border-2 border-light-border dark:border-dark-border flex items-center justify-center mb-6 shadow-sm group-hover:border-sage group-hover:shadow-md transition-all">
            <PhListChecks :size="32" class="text-light-muted dark:text-dark-muted group-hover:text-sage transition-colors" />
          </div>
          <h4 class="text-lg font-bold text-light-text dark:text-dark-text mb-2">Testni tanlang</h4>
          <p class="text-sm text-light-muted dark:text-dark-muted">O'zingizga kerakli yonalishni tanlang.</p>
        </div>

        <div class="step-item flex flex-col items-center text-center group cursor-default relative">
          <div class="hidden lg:block absolute top-10 -left-1/2 w-full h-[2px] bg-light-border dark:bg-dark-border -z-10 group-hover:bg-sage/30 transition-colors"></div>
          <div class="w-20 h-20 rounded-full bg-white dark:bg-dark-card border-2 border-light-border dark:border-dark-border flex items-center justify-center mb-6 shadow-sm group-hover:border-sage group-hover:shadow-md transition-all">
            <PhPencil :size="32" class="text-light-muted dark:text-dark-muted group-hover:text-sage transition-colors" />
          </div>
          <h4 class="text-lg font-bold text-light-text dark:text-dark-text mb-2">Savollarga javob bering</h4>
          <p class="text-sm text-light-muted dark:text-dark-muted">Samimiy va ochiq javob bering.</p>
        </div>

        <div class="step-item flex flex-col items-center text-center group cursor-default relative">
          <div class="hidden lg:block absolute top-10 -left-1/2 w-full h-[2px] bg-light-border dark:bg-dark-border -z-10 group-hover:bg-accent/30 transition-colors"></div>
          <div class="w-20 h-20 rounded-full bg-white dark:bg-dark-card border-2 border-light-border dark:border-dark-border flex items-center justify-center mb-6 shadow-sm group-hover:border-accent group-hover:shadow-md transition-all">
            <PhSparkle :size="32" class="text-light-muted dark:text-dark-muted group-hover:text-accent transition-colors" />
          </div>
          <h4 class="text-lg font-bold text-light-text dark:text-dark-text mb-2">Portretni oling</h4>
          <p class="text-sm text-light-muted dark:text-dark-muted">Tahlil va tavsiyalar tayyor!</p>
        </div>
      </div>
    </section>

  </div>
</template>

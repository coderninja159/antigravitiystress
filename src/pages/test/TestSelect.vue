<script setup>
import { useRouter } from 'vue-router'
import { PhGauge, PhUserCircle, PhArrowRight } from '@phosphor-icons/vue'
import Button from '../../components/ui/Button.vue'

const router = useRouter()

const goTest = (type) => {
  router.push(`/test/${type}`)
}
</script>

<template>
  <div class="flex-grow flex flex-col items-center justify-center p-4">
    <div class="max-w-4xl w-full">
      <h1 class="text-3xl sm:text-4xl font-extrabold text-light-text dark:text-dark-text mb-4 text-center tracking-tight">Testni tanlang</h1>
      <p class="text-lg text-light-muted dark:text-dark-muted mb-12 text-center max-w-2xl mx-auto">Sizga ayni paytda qanday tahlil kerakligini hal qiling. Keyin istalgancha o'zgartirishingiz mumkin.</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        <div class="bg-white dark:bg-dark-card rounded-3xl p-8 border border-light-border dark:border-dark-border shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-accent transition-all group flex flex-col">
          <div class="w-16 h-16 bg-accent/10 text-accent rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <PhGauge :size="32" weight="duotone" />
          </div>
          <h2 class="text-2xl font-bold mb-3 text-light-text dark:text-dark-text">Stress darajasi testi</h2>
          <p class="text-light-muted dark:text-dark-muted mb-8 leading-relaxed flex-grow">
            Kunlik mashg'ulotlar, asab va xotirjamlik darajangizni o'lchovchi qisqa va aniq savolnoma. 
          </p>
          <Button @click="goTest('stress')" class="w-full flex justify-between items-center group-hover:bg-accent group-hover:shadow-accent/30 group-hover:shadow-lg transition-all border-none bg-accent/90 text-white">
            <span>Boshlash</span>
            <PhArrowRight :size="20" class="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        <div class="bg-white dark:bg-dark-card rounded-3xl p-8 border border-light-border dark:border-dark-border shadow-sm hover:shadow-xl hover:-translate-y-2 hover:border-sage transition-all group flex flex-col">
          <div class="w-16 h-16 bg-sage/10 text-sage rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <PhUserCircle :size="32" weight="duotone" />
          </div>
          <h2 class="text-2xl font-bold mb-3 text-light-text dark:text-dark-text">Psixologik portret testi</h2>
          <p class="text-light-muted dark:text-dark-muted mb-8 leading-relaxed flex-grow">
            Ichki kechinmalaringiz, kuchli tomonlaringiz va qanday xususiyatlaringizni rivojlantirish mumkinligini o'rganishuchun keng qamrovli test.
          </p>
          <Button @click="goTest('portrait')" class="w-full flex justify-between items-center border-none bg-sage hover:bg-[#6B8A78] text-white">
            <span>Boshlash</span>
            <PhArrowRight :size="20" class="group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

      </div>
    </div>
  </div>
</template>

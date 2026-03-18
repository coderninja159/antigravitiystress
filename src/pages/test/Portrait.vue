<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePortraitStore } from '../../../stores/portrait'
import gsap from 'gsap'
import Button from '../../../components/ui/Button.vue'
import { PhArrowLeft, PhArrowRight } from '@phosphor-icons/vue'

const router = useRouter()
const { t } = useI18n()
const store = usePortraitStore()

const currentQIndex = ref(0)
const selectedOption = ref(null)
const questionContainer = ref(null)

const currentQuestion = computed(() => {
  if (store.questions.length === 0) return null
  return store.questions[currentQIndex.value]
})

const totalQuestions = computed(() => store.questions.length)
const allowNext = computed(() => selectedOption.value !== null)

onMounted(async () => {
  await store.fetchTestData()
  animateQuestion()
})

const animateQuestion = () => {
  if (!questionContainer.value) return
  gsap.fromTo(questionContainer.value, 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
  )
  
  gsap.fromTo('.option-btn', 
    { x: -20, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "power2.out" }
  )
}

const selectOption = (optId) => {
  selectedOption.value = optId
}

const prevQuestion = () => {
  if (currentQIndex.value > 0) {
    gsap.to(questionContainer.value, { 
      x: 30, opacity: 0, duration: 0.3, 
      onComplete: () => {
        currentQIndex.value--
        // Retrieve previously selected answer if it exists
        selectedOption.value = store.answers[currentQuestion.value.id] || null
        
        gsap.fromTo(questionContainer.value, 
          { x: -30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        )
      }
    })
  }
}

const nextOrFinish = async () => {
  if (!allowNext.value) return
  
  store.addAnswer(currentQuestion.value.id, selectedOption.value)
  
  if (currentQIndex.value < totalQuestions.value - 1) {
    gsap.to(questionContainer.value, { 
      x: -30, opacity: 0, duration: 0.3, 
      onComplete: () => {
        currentQIndex.value++
        selectedOption.value = store.answers[currentQuestion.value.id] || null
        
        gsap.fromTo(questionContainer.value, 
          { x: 30, opacity: 0 },
          { x: 0, opacity: 1, duration: 0.4, ease: "power2.out" }
        )
        // options will stagger due to mounted logic if we rebind or just fade
        gsap.fromTo('.option-btn', 
          { opacity: 0 }, { opacity: 1, duration: 0.3, stagger: 0.1 }
        )
      }
    })
  } else {
    store.loading = true
    await store.generateResult()
    store.loading = false
    router.push('/result/portrait')
  }
}

const getLetter = (index) => String.fromCharCode(65 + index)
</script>

<template>
  <div class="max-w-3xl mx-auto w-full flex-grow flex flex-col justify-center py-8 px-4 relative">
    
    <div v-show="store.loading" class="absolute inset-0 z-50 flex flex-col items-center justify-center bg-light-bg/80 dark:bg-dark-bg/80 backdrop-blur-sm">
      <div class="animate-spin rounded-full h-16 w-16 border-b-4 border-sage mb-4"></div>
      <p class="text-lg font-medium text-light-text dark:text-dark-text animate-pulse">Natijalar tahlil qilinmoqda...</p>
    </div>

    <div v-if="currentQuestion && !store.loading" class="w-full">
      <!-- Progress Bar -->
      <div class="mb-10">
        <div class="flex justify-between items-center mb-3 text-sm font-medium text-light-muted dark:text-dark-muted">
          <span>{{ t('test.question', { current: currentQIndex + 1, total: totalQuestions }) }}</span>
          <span>{{ Math.round(((currentQIndex) / totalQuestions) * 100) }}%</span>
        </div>
        <div class="w-full bg-light-border dark:bg-dark-border rounded-full h-3 overflow-hidden">
          <div class="bg-sage h-3 rounded-full transition-all duration-500 ease-out" :style="{ width: `${((currentQIndex) / totalQuestions) * 100}%` }"></div>
        </div>
      </div>

      <div ref="questionContainer" class="bg-white dark:bg-dark-card rounded-3xl shadow-lg border border-light-border dark:border-dark-border p-8 sm:p-12 relative">
        <h2 class="text-2xl sm:text-3xl font-bold mb-10 text-light-text dark:text-dark-text leading-snug">
          {{ currentQuestion.text }}
        </h2>

        <div class="flex flex-col gap-4">
          <button 
            v-for="(opt, idx) in currentQuestion.options" 
            :key="opt.id"
            @click="selectOption(opt.id)"
            class="option-btn text-left p-5 text-lg rounded-2xl border-2 transition-all duration-200 flex items-center gap-5 group"
            :class="selectedOption === opt.id ? 'border-sage bg-sage/5 dark:bg-sage/10 shadow-sm' : 'border-light-border dark:border-dark-border hover:border-sage/50 dark:hover:border-sage/40 hover:bg-gray-50 dark:hover:bg-gray-800/50'"
          >
            <div class="w-10 h-10 rounded-xl flex items-center justify-center font-bold text-base shrink-0 transition-colors"
                 :class="selectedOption === opt.id ? 'bg-sage text-white shadow-md shadow-sage/30' : 'bg-gray-100 text-light-muted dark:bg-[#1f242b] dark:text-dark-muted group-hover:bg-sage/20 group-hover:text-sage'">
              {{ getLetter(idx) }}
            </div>
            <span class="font-medium text-light-text dark:text-dark-text">{{ opt.text }}</span>
          </button>
        </div>

        <div class="mt-12 flex justify-between items-center">
          <Button variant="ghost" @click="prevQuestion" :disabled="currentQIndex === 0" class="pl-2 pr-4" :class="{'invisible': currentQIndex === 0}">
            <PhArrowLeft :size="20" />
            Orqaga
          </Button>
          <Button @click="nextOrFinish" :disabled="!allowNext">
            {{ currentQIndex === totalQuestions - 1 ? t('test.finish') : t('test.next') }}
            <PhArrowRight v-if="currentQIndex !== totalQuestions - 1" :size="20" />
            <PhSparkle v-else :size="20" />
          </Button>
        </div>
      </div>
    </div>

  </div>
</template>

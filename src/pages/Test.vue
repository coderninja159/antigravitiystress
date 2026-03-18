<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../stores/user'
import gsap from 'gsap'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const currentQIndex = ref(0)
const selectedOption = ref(null)

const questionContainer = ref(null)
const allowNext = computed(() => selectedOption.value !== null)

onMounted(async () => {
  await userStore.fetchQuestions()
  animateQuestion()
})

const currentQuestion = computed(() => {
  if (userStore.questions.length === 0) return null
  return userStore.questions[currentQIndex.value]
})

const totalQuestions = computed(() => userStore.questions.length)

const animateQuestion = () => {
  if (!questionContainer.value) return
  gsap.fromTo(questionContainer.value, 
    { y: 30, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.6, ease: "power2.out" }
  )
  
  // Stagger options
  gsap.fromTo('.option-btn', 
    { x: -20, opacity: 0 },
    { x: 0, opacity: 1, duration: 0.4, stagger: 0.1, delay: 0.2, ease: "power2.out" }
  )
}

const selectOption = (optId) => {
  selectedOption.value = optId
}

const nextOrFinish = async () => {
  if (!allowNext.value) return
  
  userStore.addAnswer(currentQuestion.value.id, selectedOption.value)
  
  if (currentQIndex.value < totalQuestions.value - 1) {
    // animate out
    gsap.to(questionContainer.value, { 
      y: -30, opacity: 0, duration: 0.3, 
      onComplete: () => {
        currentQIndex.value++
        selectedOption.value = null
        animateQuestion()
      }
    })
  } else {
    // finish
    await userStore.generateProfile()
    router.push('/result')
  }
}

const getLetter = (index) => {
  return String.fromCharCode(65 + index)
}
</script>

<template>
  <div class="max-w-3xl mx-auto w-full flex-grow flex flex-col justify-center py-8">
    
    <div v-if="currentQuestion" class="w-full">
      <!-- Progress Bar -->
      <div class="mb-10">
        <div class="flex justify-between items-center mb-2 text-sm font-medium text-light-muted dark:text-dark-muted">
          <span>{{ t('test.question', { current: currentQIndex + 1, total: totalQuestions }) }}</span>
          <span>{{ Math.round(((currentQIndex) / totalQuestions) * 100) }}%</span>
        </div>
        <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
          <div class="bg-sage h-2.5 rounded-full transition-all duration-300" :style="{ width: `${((currentQIndex) / totalQuestions) * 100}%` }"></div>
        </div>
      </div>

      <div ref="questionContainer" class="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border p-8 sm:p-12 relative">
        <h2 class="text-2xl sm:text-3xl font-semibold mb-10 text-light-text dark:text-dark-text leading-tight">
          {{ currentQuestion.text }}
        </h2>

        <div class="flex flex-col gap-4">
          <button 
            v-for="(opt, idx) in currentQuestion.options" 
            :key="opt.id"
            @click="selectOption(opt.id)"
            class="option-btn text-left p-5 rounded-xl border-2 transition-all duration-200 flex items-center gap-4"
            :class="selectedOption === opt.id ? 'border-sage bg-sage/5 dark:bg-sage/10' : 'border-gray-200 dark:border-gray-700 hover:border-sage/50 dark:hover:border-sage/50 hover:bg-gray-50 dark:hover:bg-[#343b44]'"
          >
            <div class="w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shrink-0 transition-colors"
                 :class="selectedOption === opt.id ? 'bg-sage text-white' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'">
              {{ getLetter(idx) }}
            </div>
            <span class="text-lg text-gray-800 dark:text-gray-200">{{ opt.text }}</span>
          </button>
        </div>

        <div class="mt-12 flex justify-end">
          <button 
            @click="nextOrFinish" 
            :disabled="!allowNext"
            class="bg-sage text-white rounded-lg px-8 py-3 font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-sage/30 active:scale-95"
          >
            {{ currentQIndex === totalQuestions - 1 ? t('test.finish') : t('test.next') }}
          </button>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="flex justify-center items-center py-20">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-sage"></div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useStressStore } from '../../stores/stress'
import Button from '../../components/ui/Button.vue'
import { PhArrowCounterClockwise, PhHouseLine, PhWarningCircle, PhCheckCircle, PhInfo } from '@phosphor-icons/vue'
import gsap from 'gsap'

const router = useRouter()
const { t } = useI18n()
const store = useStressStore()

const result = computed(() => store.lastResult)
const showContent = ref(false)

onMounted(() => {
  if (!result.value) {
    router.push('/test-select')
    return
  }
  
  setTimeout(() => {
    showContent.value = true
    setTimeout(() => {
      gsap.fromTo('.res-elem', 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "power2.out" }
      )
      
      // Animate progress circle
      gsap.to('.progress-circle', {
        strokeDasharray: `${result.value.percentage}, 100`,
        duration: 1.5,
        ease: "power2.out",
        delay: 0.5
      })

      const obj = { val: 0 }
      gsap.to(obj, {
        val: result.value.percentage,
        duration: 1.5,
        delay: 0.5,
        ease: "power2.out",
        onUpdate: () => {
          const el = document.getElementById('stress-val')
          if (el) el.innerText = Math.round(obj.val) + '%'
        }
      })
    }, 100)
  }, 300)
})

const goDashboard = () => router.push('/dashboard')
const retake = () => {
  store.lastResult = null
  router.push('/test/stress')
}

const colorClass = computed(() => {
  if (!result.value) return ''
  if (result.value.level === 'high') return 'text-destructive'
  if (result.value.level === 'medium') return 'text-accent'
  return 'text-sage'
})
const bgClass = computed(() => {
  if (!result.value) return ''
  if (result.value.level === 'high') return 'bg-destructive/10 border-destructive/20'
  if (result.value.level === 'medium') return 'bg-accent/10 border-accent/20'
  return 'bg-sage/10 border-sage/20'
})
</script>

<template>
  <div class="max-w-3xl mx-auto w-full flex-grow py-12 px-4 flex flex-col items-center justify-center text-light-text dark:text-dark-text">
    
    <div v-if="result && showContent" class="w-full">
      <div class="bg-white dark:bg-dark-card rounded-3xl border border-light-border dark:border-dark-border shadow-xl p-8 sm:p-12 text-center res-elem relative overflow-hidden">
        
        <h1 class="text-3xl sm:text-4xl font-extrabold mb-10">Stress Darajasi</h1>

        <!-- Circular Progress -->
        <div class="relative w-48 h-48 mx-auto mb-10">
          <svg class="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
            <!-- Background Circle -->
            <path
              class="text-gray-100 dark:text-gray-800"
              stroke-width="3"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
            <!-- Progress Circle -->
            <path
              class="progress-circle transition-all duration-1000 ease-out"
              :class="colorClass"
              stroke-dasharray="0, 100"
              stroke-width="3"
              stroke-linecap="round"
              stroke="currentColor"
              fill="none"
              d="M18 2.0845
                a 15.9155 15.9155 0 0 1 0 31.831
                a 15.9155 15.9155 0 0 1 0 -31.831"
            />
          </svg>
          <div class="absolute inset-0 flex flex-col items-center justify-center">
            <span id="stress-val" class="text-4xl font-black" :class="colorClass">0%</span>
          </div>
        </div>

        <div class="p-6 rounded-2xl border mb-10 res-elem" :class="bgClass">
          <div class="flex items-center justify-center gap-2 mb-3" :class="colorClass">
            <PhWarningCircle v-if="result.level === 'high'" :size="28" weight="fill" />
            <PhInfo v-else-if="result.level === 'medium'" :size="28" weight="fill" />
            <PhCheckCircle v-else :size="28" weight="fill" />
            <h3 class="text-xl font-bold uppercase tracking-wider">{{ result.level === 'high' ? "Yuqori stress" : (result.level === 'medium' ? "O'rtacha stress" : "Past stress") }}</h3>
          </div>
          <p class="text-lg leading-relaxed opacity-90 font-medium">{{ result.summary }}</p>
        </div>

        <div class="flex flex-wrap justify-center gap-4 res-elem">
          <Button variant="outline" @click="retake">
            <PhArrowCounterClockwise :size="20" />
            Qayta topshirish
          </Button>
          <Button @click="goDashboard" class="bg-accent hover:bg-[#C0764A] shadow-accent/30 text-white border-none">
            <PhHouseLine :size="20" />
            Kabinetga o'tish
          </Button>
        </div>

      </div>
    </div>
  </div>
</template>

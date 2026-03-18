<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { usePortraitStore } from '../../stores/portrait'
import RadarChart from '../../components/charts/RadarChart.vue'
import Button from '../../components/ui/Button.vue'
import { PhArrowCounterClockwise, PhHouseLine, PhStar, PhTrendUp } from '@phosphor-icons/vue'
import gsap from 'gsap'

const router = useRouter()
const { t } = useI18n()
const store = usePortraitStore()

const result = computed(() => store.lastResult)
const traits = computed(() => result.value?.traitScores || {})
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
    }, 100)
  }, 300)
})

const goDashboard = () => router.push('/dashboard')
const retake = () => {
  store.lastResult = null
  router.push('/test/portrait')
}

const traitNames = {
  optimistic: 'Optimistik',
  creative: 'Kreativlik',
  calm: 'Xotirjamlik',
  ambitious: 'Ambitsiya',
  social: 'Sotsiallik',
  analytical: 'Tahliliy'
}
</script>

<template>
  <div class="max-w-5xl mx-auto w-full flex-grow py-8 px-4 flex flex-col pt-12 text-light-text dark:text-dark-text">
    
    <div v-if="result && showContent">
      <div class="text-center mb-12 res-elem">
        <h1 class="text-3xl md:text-5xl font-extrabold mb-4">{{ t('result.title') }}</h1>
        <p class="text-lg md:text-xl text-light-muted dark:text-dark-muted max-w-2xl mx-auto">{{ result.summary }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-12">
        
        <!-- Radar Chart Side -->
        <div class="lg:col-span-2 res-elem">
          <RadarChart :traits="traits" class="h-[400px] w-full" />
        </div>

        <!-- Breakdown Side -->
        <div class="lg:col-span-3 space-y-6 flex flex-col justify-center">
          
          <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm res-elem">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-sage/10 text-sage flex items-center justify-center">
                <PhStar weight="fill" :size="20" />
              </div>
              <h3 class="text-xl font-bold">{{ t('result.strengths') }}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="s in result.strengths" :key="s" class="px-4 py-2 bg-sage/10 text-sage font-semibold rounded-lg text-sm">
                {{ traitNames[s] }} ({{ traits[s] }}%)
              </span>
            </div>
          </div>

          <div v-if="result.improvements.length > 0" class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm res-elem">
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-xl bg-accent/10 text-accent flex items-center justify-center">
                <PhTrendUp :size="20" />
              </div>
              <h3 class="text-xl font-bold">{{ t('result.improvements') }}</h3>
            </div>
            <div class="flex flex-wrap gap-2">
              <span v-for="i in result.improvements" :key="i" class="px-4 py-2 bg-accent/10 text-accent font-semibold rounded-lg text-sm">
                {{ traitNames[i] }} ({{ traits[i] }}%)
              </span>
            </div>
          </div>

        </div>
      </div>

      <!-- Recommendations -->
      <div class="bg-sage/5 dark:bg-sage/10 p-8 rounded-3xl border border-sage/20 mb-12 res-elem">
        <h3 class="text-2xl font-bold mb-6 flex items-center gap-3">
          <span class="w-2 h-8 bg-sage rounded-full"></span>
          {{ t('result.recommendations') }}
        </h3>
        <ul class="space-y-4">
          <li v-for="(rec, idx) in result.recommendations" :key="idx" class="flex gap-4">
            <span class="text-sage font-bold text-lg mt-0.5">{{ idx + 1 }}.</span>
            <p class="text-lg leading-relaxed dark:text-gray-200">{{ rec }}</p>
          </li>
        </ul>
      </div>

      <!-- Actions -->
      <div class="flex flex-wrap justify-center gap-4 res-elem">
        <Button variant="outline" @click="retake">
          <PhArrowCounterClockwise :size="20" />
          {{ t('result.retake') }}
        </Button>
        <Button @click="goDashboard">
          <PhHouseLine :size="20" />
          {{ t('result.dashboard') }}
        </Button>
      </div>

    </div>
  </div>
</template>

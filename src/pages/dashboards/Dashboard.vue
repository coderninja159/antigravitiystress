<script setup>
import { computed, ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../../../stores/user'
import Button from '../../../components/ui/Button.vue'
import { PhFire, PhLightbulb, PhTrash, PhArrowRight, PhClockCounterClockwise, PhChartPolar, PhGauge } from '@phosphor-icons/vue'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const user = computed(() => userStore.user)
const streak = computed(() => userStore.streak)
const history = computed(() => userStore.history)

const dailyTip = ref('')

onMounted(() => {
  dailyTip.value = userStore.getDailyTip()
})

const startTest = () => {
  router.push('/test-select')
}

const formatDate = (isoString) => {
  const d = new Date(isoString)
  return d.toLocaleDateString('uz-UZ', { day: 'numeric', month: 'long', year: 'numeric' })
}

// Swipe to delete logic
const activeSwipeId = ref(null)
const startX = ref(0)
const currentX = ref(0)

const onTouchStart = (e, id) => {
  activeSwipeId.value = id
  startX.value = e.touches[0].clientX
  currentX.value = startX.value
}

const onTouchMove = (e) => {
  if (activeSwipeId.value === null) return
  const x = e.touches[0].clientX
  const diff = x - startX.value
  // Only allow swiping left
  if (diff < 0) {
    currentX.value = diff
  }
}

const onTouchEnd = (id) => {
  if (activeSwipeId.value === id) {
    if (currentX.value < -80) {
      // Trigger delete
      deleteHistoryItem(id)
    }
    // Reset state
    activeSwipeId.value = null
    currentX.value = 0
  }
}

const deleteHistoryItem = (id) => {
  userStore.history = userStore.history.filter(h => h.id !== id)
  userStore.saveToStorage()
}
</script>

<template>
  <div class="max-w-4xl mx-auto w-full flex-grow py-8 px-4 flex flex-col pt-12 text-light-text dark:text-dark-text">
    
    <!-- Header Summary -->
    <div class="mb-12">
      <h1 class="text-3xl font-extrabold mb-2">{{ t('dashboard.welcome', { name: user?.name || '' }) }}</h1>
      <p class="text-light-muted dark:text-dark-muted text-lg">{{ t('dashboard.subtitle') }}</p>
    </div>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
      
      <!-- Streak -->
      <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm flex items-center gap-6">
        <div class="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center shrink-0">
          <PhFire :size="32" class="text-accent" weight="fill" />
        </div>
        <div>
          <p class="text-sm font-semibold text-light-muted dark:text-dark-muted mb-1">{{ t('dashboard.streak') }}</p>
          <p class="text-2xl font-bold flex items-baseline gap-2">
            {{ streak }} <span class="text-sm font-medium text-light-muted dark:text-dark-muted">kun ketma-ket</span>
          </p>
        </div>
      </div>

      <!-- Tip -->
      <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm flex items-start gap-6 relative overflow-hidden group">
        <div class="absolute -right-4 -top-4 w-24 h-24 bg-sage/5 rounded-full group-hover:scale-150 transition-transform duration-500"></div>
        <div class="w-12 h-12 rounded-xl bg-sage/10 flex items-center justify-center shrink-0 z-10 mt-1">
          <PhLightbulb :size="24" class="text-sage" weight="fill" />
        </div>
        <div class="z-10">
          <p class="text-sm font-semibold text-light-muted dark:text-dark-muted mb-1">{{ t('dashboard.daily_tip') }}</p>
          <p class="font-medium text-sm leading-snug">{{ dailyTip }}</p>
        </div>
      </div>

    </div>

    <!-- History Section -->
    <div class="flex items-center justify-between mb-6">
      <h2 class="text-2xl font-bold flex items-center gap-2">
        <PhClockCounterClockwise :size="28" class="text-sage" />
        Tarix
      </h2>
      <Button variant="outline" class="py-2 px-4 text-sm font-semibold h-auto" @click="startTest">
        Yangi test
        <PhArrowRight :size="16" />
      </Button>
    </div>

    <div v-if="history.length === 0" class="bg-white dark:bg-dark-card p-12 text-center rounded-3xl border border-dashed border-light-border dark:border-dark-border flex flex-col items-center">
      <div class="w-16 h-16 rounded-full bg-gray-100 dark:bg-dark-bg flex items-center justify-center mb-4">
        <PhChartPolar :size="32" class="text-light-muted dark:text-dark-muted" />
      </div>
      <p class="text-light-muted dark:text-dark-muted text-lg mb-6">{{ t('dashboard.no_history') }}</p>
      <Button @click="startTest">{{ t('landing.start_test') }}</Button>
    </div>

    <div v-else class="space-y-4">
      <div 
        v-for="item in history" 
        :key="item.id" 
        class="relative overflow-hidden rounded-2xl bg-destructive"
      >
        <!-- Background delete reveal -->
        <div class="absolute inset-y-0 right-0 w-24 flex items-center justify-center max-w-full">
          <PhTrash :size="24" weight="fill" class="text-white" />
        </div>

        <!-- Foreground content card -->
        <div 
          class="bg-white dark:bg-dark-card p-5 border border-light-border dark:border-dark-border rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4 transition-transform relative z-10 shadow-sm will-change-transform"
          :style="activeSwipeId === item.id ? { transform: `translateX(${Math.max(-100, currentX)}px)` } : { transform: 'translateX(0)', transition: 'transform 0.3s ease' }"
          @touchstart="(e) => onTouchStart(e, item.id)"
          @touchmove="onTouchMove"
          @touchend="() => onTouchEnd(item.id)"
        >
          <div class="flex items-start gap-4 flex-grow cursor-default">
            
            <div class="w-12 h-12 shrink-0 rounded-xl flex items-center justify-center mt-1"
                 :class="item.type === 'portrait' ? 'bg-sage/10 text-sage' : 'bg-accent/10 text-accent'">
              <PhChartPolar v-if="item.type === 'portrait'" :size="24" />
              <PhGauge v-else :size="24" />
            </div>
            
            <div>
              <div class="flex items-center gap-3 mb-1">
                <h3 class="font-bold text-lg">{{ item.type === 'portrait' ? 'Psixologik Portret' : 'Stress Testi' }}</h3>
                <span class="text-xs font-medium px-2 py-0.5 rounded border border-light-border dark:border-dark-border text-light-muted dark:text-dark-muted">
                  {{ formatDate(item.timestamp) }}
                </span>
              </div>
              <p class="text-sm text-light-muted dark:text-dark-muted line-clamp-2">{{ item.summary }}</p>

               <!-- Specific result chips -->
              <div class="flex gap-2 mt-3" v-if="item.type === 'portrait' && item.strengths">
                <span v-for="s in item.strengths.slice(0, 2)" :key="s" class="text-xs font-semibold px-2 py-1 bg-sage/10 text-sage border border-sage/20 rounded">
                  {{ s }}
                </span>
              </div>
              <div class="flex gap-2 mt-3" v-if="item.type === 'stress'">
                <span class="text-xs font-semibold px-2 py-1 bg-accent/10 text-accent border border-accent/20 rounded">
                  Qoldiq: {{ item.percentage }}%
                </span>
              </div>

            </div>
          </div>

          <!-- Desktop delete button (hidden on pure mobile touch) -->
          <div class="hidden md:flex shrink-0">
             <button @click="deleteHistoryItem(item.id)" class="p-3 text-light-muted hover:text-destructive dark:text-dark-muted dark:hover:text-destructive hover:bg-destructive/10 rounded-xl transition-colors">
               <PhTrash :size="20" />
             </button>
          </div>

        </div>
      </div>
    </div>

  </div>
</template>

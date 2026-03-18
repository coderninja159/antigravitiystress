<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../../../stores/user'
import { PhArrowRight, PhArrowLeft } from '@phosphor-icons/vue'
import Button from '../../../components/ui/Button.vue'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const step = ref(1)

const form = ref({
  name: userStore.user?.name || '',
  surname: userStore.user?.surname || '',
  age: userStore.user?.age || '',
  gender: userStore.user?.gender || '',
  field: userStore.user?.field || '',
  mood: userStore.user?.mood || '',
  about: userStore.user?.about || '',
  problemArea: userStore.user?.problemArea || ''
})

const isStep1Valid = computed(() => {
  return form.value.name.trim() !== '' && 
         form.value.surname.trim() !== '' && 
         form.value.age >= 1 && form.value.age <= 120 && 
         form.value.gender !== ''
})

const nextStep = () => {
  if (step.value === 1 && !isStep1Valid.value) return
  if (step.value < 3) {
    step.value++
  }
}

const prevStep = () => {
  if (step.value > 1) {
    step.value--
  }
}

const finishOnboarding = () => {
  userStore.setUser({ 
    ...userStore.user,
    ...form.value 
  })
  router.push('/test-select')
}

const selectMood = (m) => {
  form.value.mood = m
}
</script>

<template>
  <div class="max-w-2xl mx-auto w-full flex-grow flex flex-col justify-center py-12 px-4">
    
    <!-- Progress Bar -->
    <div class="mb-10">
      <div class="flex justify-between items-center mb-3 text-sm font-medium text-light-muted dark:text-dark-muted">
        <span>Qadam {{ step }} / 3</span>
        <span>{{ Math.round((step / 3) * 100) }}%</span>
      </div>
      <div class="w-full bg-light-border dark:bg-dark-border rounded-full h-3 overflow-hidden">
        <div class="bg-accent h-3 rounded-full transition-all duration-500 ease-out" :style="{ width: `${(step / 3) * 100}%` }"></div>
      </div>
    </div>

    <div class="bg-white dark:bg-dark-card rounded-3xl shadow-lg border border-light-border dark:border-dark-border p-8 sm:p-12 relative overflow-hidden transition-all duration-300">
      
      <!-- Step 1 -->
      <transition name="fade" mode="out-in">
        <div v-if="step === 1" key="step1">
          <h2 class="text-3xl font-bold mb-8 text-light-text dark:text-dark-text tracking-tight">{{ t('onboarding.step1.title') }}</h2>
          <div class="space-y-6 flex flex-col">
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label class="block text-sm font-medium mb-1.5 text-light-text dark:text-dark-text">{{ t('onboarding.step1.name') }} *</label>
                <input v-model="form.name" type="text" placeholder="Masalan: Ali" class="w-full rounded-xl border border-light-border dark:border-dark-border px-4 py-3 focus:ring-2 focus:ring-sage focus:outline-none dark:bg-[#1f242b] dark:text-white transition" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-1.5 text-light-text dark:text-dark-text">{{ t('onboarding.step1.surname') }} *</label>
                <input v-model="form.surname" type="text" placeholder="Masalan: Valiyev" class="w-full rounded-xl border border-light-border dark:border-dark-border px-4 py-3 focus:ring-2 focus:ring-sage focus:outline-none dark:bg-[#1f242b] dark:text-white transition" />
              </div>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1.5 text-light-text dark:text-dark-text">{{ t('onboarding.step1.age') }} *</label>
              <input v-model.number="form.age" type="number" min="1" max="120" placeholder="25" class="w-full rounded-xl border border-light-border dark:border-dark-border px-4 py-3 focus:ring-2 focus:ring-sage focus:outline-none dark:bg-[#1f242b] dark:text-white transition" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2.5 text-light-text dark:text-dark-text">{{ t('onboarding.step1.gender') }} *</label>
              <div class="flex gap-4">
                <label class="flex-1 flex items-center justify-center gap-2 p-4 border rounded-xl cursor-pointer transition-colors" :class="form.gender === 'Erkak' ? 'border-sage bg-sage/10 text-sage' : 'border-light-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg'">
                  <input type="radio" value="Erkak" v-model="form.gender" class="hidden" />
                  <span class="font-semibold">{{ t('onboarding.step1.male') }}</span>
                </label>
                <label class="flex-1 flex items-center justify-center gap-2 p-4 border rounded-xl cursor-pointer transition-colors" :class="form.gender === 'Ayol' ? 'border-sage bg-sage/10 text-sage' : 'border-light-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg'">
                  <input type="radio" value="Ayol" v-model="form.gender" class="hidden" />
                  <span class="font-semibold">{{ t('onboarding.step1.female') }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="mt-10 flex justify-end">
            <Button @click="nextStep" :disabled="!isStep1Valid">
              {{ t('onboarding.step1.next') }}
              <PhArrowRight :size="20" />
            </Button>
          </div>
        </div>

        <!-- Step 2 -->
        <div v-else-if="step === 2" key="step2">
          <h2 class="text-3xl font-bold mb-2 text-light-text dark:text-dark-text tracking-tight">{{ t('onboarding.step2.title') }}</h2>
          <p class="text-light-muted dark:text-dark-muted mb-8 text-lg">{{ t('onboarding.step2.subtitle') }}</p>
          <div class="space-y-8 flex flex-col">
            <div>
              <label class="block text-sm font-medium mb-2 text-light-text dark:text-dark-text">{{ t('onboarding.step2.field') }}</label>
              <select v-model="form.field" class="w-full rounded-xl border border-light-border dark:border-dark-border px-4 py-3 focus:ring-2 focus:ring-sage focus:outline-none dark:bg-[#1f242b] dark:text-white transition appearance-none">
                <option value="">{{ t('onboarding.step2.select') }}</option>
                <option value="Talaba">{{ t('onboarding.step2.fields.student') }}</option>
                <option value="Ishchi">{{ t('onboarding.step2.fields.worker') }}</option>
                <option value="Tadbirkor">{{ t('onboarding.step2.fields.entrepreneur') }}</option>
                <option value="Uyda">{{ t('onboarding.step2.fields.home') }}</option>
                <option value="Boshqa">{{ t('onboarding.step2.fields.other') }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-3 text-light-text dark:text-dark-text">{{ t('onboarding.step2.mood') }}</label>
              <div class="flex flex-wrap gap-3">
                <button v-for="(label, key) in { great: t('onboarding.step2.moods.great'), good: t('onboarding.step2.moods.good'), average: t('onboarding.step2.moods.average'), tired: t('onboarding.step2.moods.tired'), hard: t('onboarding.step2.moods.hard') }" 
                  :key="key"
                  @click="selectMood(key)"
                  class="px-5 py-2.5 border-2 rounded-full text-sm font-semibold transition-colors active:scale-95"
                  :class="form.mood === key ? 'border-accent bg-accent/10 text-accent' : 'border-light-border dark:border-dark-border hover:bg-gray-50 dark:hover:bg-dark-bg text-light-muted dark:text-dark-muted hover:text-light-text dark:hover:text-dark-text'"
                >
                  {{ label }}
                </button>
              </div>
            </div>
          </div>
          <div class="mt-12 flex justify-between items-center">
            <Button variant="ghost" @click="prevStep" class="pl-2 pr-4">
              <PhArrowLeft :size="20" />
              {{ t('onboarding.step2.back') }}
            </Button>
            <Button @click="nextStep">
              {{ t('onboarding.step2.continue') }}
              <PhArrowRight :size="20" />
            </Button>
          </div>
        </div>

        <!-- Step 3 -->
        <div v-else key="step3">
          <h2 class="text-3xl font-bold mb-2 text-light-text dark:text-dark-text tracking-tight">{{ t('onboarding.step3.title') }}</h2>
          <p class="text-light-muted dark:text-dark-muted mb-8 text-lg">{{ t('onboarding.step3.subtitle') }}</p>
          <div class="space-y-8 flex flex-col">
            <div>
              <label class="block text-sm font-medium mb-2 text-light-text dark:text-dark-text">{{ t('onboarding.step3.about') }}</label>
              <textarea v-model="form.about" :placeholder="t('onboarding.step3.about_placeholder')" rows="4" class="w-full rounded-xl border border-light-border dark:border-dark-border px-4 py-3 focus:ring-2 focus:ring-sage focus:outline-none dark:bg-[#1f242b] dark:text-white transition resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 text-light-text dark:text-dark-text">{{ t('onboarding.step3.problem_area') }}</label>
              <select v-model="form.problemArea" class="w-full rounded-xl border border-light-border dark:border-dark-border px-4 py-3 focus:ring-2 focus:ring-sage focus:outline-none dark:bg-[#1f242b] dark:text-white transition appearance-none">
                <option value="">{{ t('onboarding.step2.select') }}</option>
                <option value="Stress">{{ t('onboarding.step3.problems.stress') }}</option>
                <option value="Uyqu">{{ t('onboarding.step3.problems.sleep') }}</option>
                <option value="Xavotir">{{ t('onboarding.step3.problems.anxiety') }}</option>
                <option value="Kayfiyat">{{ t('onboarding.step3.problems.mood') }}</option>
                <option value="Munosabat">{{ t('onboarding.step3.problems.relationship') }}</option>
                <option value="Ish">{{ t('onboarding.step3.problems.work') }}</option>
                <option value="Boshqa">{{ t('onboarding.step3.problems.other') }}</option>
              </select>
            </div>
          </div>
          <div class="mt-12 flex justify-between items-center">
            <Button variant="ghost" @click="prevStep" class="pl-2 pr-4">
              <PhArrowLeft :size="20" />
              {{ t('onboarding.step3.back') }}
            </Button>
            <Button @click="finishOnboarding">
              {{ t('onboarding.step3.start') }}
              <PhArrowRight :size="20" />
            </Button>
          </div>
        </div>
      </transition>
    </div>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}
.fade-enter-from { opacity: 0; transform: translateX(20px); }
.fade-leave-to { opacity: 0; transform: translateX(-20px); }
</style>

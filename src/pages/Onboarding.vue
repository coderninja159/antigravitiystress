<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useUserStore } from '../stores/user'
import { PhArrowRight, PhArrowLeft } from '@phosphor-icons/vue'

const router = useRouter()
const { t } = useI18n()
const userStore = useUserStore()

const step = ref(1)

const form = ref({
  name: '',
  surname: '',
  age: '',
  gender: '',
  field: '',
  mood: '',
  about: '',
  problemArea: ''
})

const isStep1Valid = computed(() => {
  return form.value.name.trim() !== '' && 
         form.value.surname.trim() !== '' && 
         form.value.age >= 10 && form.value.age <= 99 && 
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

const startTest = async () => {
  userStore.setUser({ ...form.value })
  await router.push('/test')
}

const selectMood = (m) => {
  form.value.mood = m
}

</script>

<template>
  <div class="max-w-2xl mx-auto w-full flex-grow flex flex-col justify-center py-8">
    
    <!-- Progress Bar -->
    <div class="mb-8">
      <div class="flex justify-between items-center mb-2 text-sm font-medium text-light-muted dark:text-dark-muted">
        <span>Qadam {{ step }} / 3</span>
        <span>{{ Math.round((step / 3) * 100) }}%</span>
      </div>
      <div class="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden">
        <div class="bg-sage h-2.5 rounded-full transition-all duration-300" :style="{ width: `${(step / 3) * 100}%` }"></div>
      </div>
    </div>

    <div class="bg-white dark:bg-dark-card rounded-2xl shadow-sm border border-gray-100 dark:border-dark-border p-6 sm:p-10 relative overflow-hidden transition-all">
      
      <!-- Step 1 -->
      <transition name="fade" mode="out-in">
        <div v-if="step === 1" key="step1">
          <h2 class="text-2xl sm:text-3xl font-bold mb-6 text-light-text dark:text-dark-text">{{ t('onboarding.step1.title') }}</h2>
          <div class="space-y-5 flex flex-col">
            <div>
              <label class="block text-sm font-medium mb-1 dark:text-gray-300 text-gray-700">{{ t('onboarding.step1.name') }} *</label>
              <input v-model="form.name" type="text" placeholder="Masalan: Ali" class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-sage focus:border-sage focus:outline-none dark:bg-[#1f242b] dark:border-gray-600 dark:text-white transition" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 dark:text-gray-300 text-gray-700">{{ t('onboarding.step1.surname') }} *</label>
              <input v-model="form.surname" type="text" placeholder="Masalan: Valiyev" class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-sage focus:border-sage focus:outline-none dark:bg-[#1f242b] dark:border-gray-600 dark:text-white transition" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 dark:text-gray-300 text-gray-700">{{ t('onboarding.step1.age') }} *</label>
              <input v-model.number="form.age" type="number" min="10" max="99" placeholder="25" class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-sage focus:border-sage focus:outline-none dark:bg-[#1f242b] dark:border-gray-600 dark:text-white transition" />
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">{{ t('onboarding.step1.gender') }} *</label>
              <div class="flex gap-4">
                <label class="flex-1 flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition" :class="form.gender === 'Erkak' ? 'border-sage bg-sage/10 text-sage' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'">
                  <input type="radio" value="Erkak" v-model="form.gender" class="hidden" />
                  <span class="font-medium">{{ t('onboarding.step1.male') }}</span>
                </label>
                <label class="flex-1 flex items-center justify-center gap-2 p-3 border rounded-lg cursor-pointer transition" :class="form.gender === 'Ayol' ? 'border-sage bg-sage/10 text-sage' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-800'">
                  <input type="radio" value="Ayol" v-model="form.gender" class="hidden" />
                  <span class="font-medium">{{ t('onboarding.step1.female') }}</span>
                </label>
              </div>
            </div>
          </div>
          <div class="mt-8 flex justify-end">
            <button @click="nextStep" :disabled="!isStep1Valid" class="flex items-center gap-2 bg-sage text-white rounded-lg px-6 py-3 font-medium hover:bg-opacity-90 transition disabled:opacity-50 disabled:cursor-not-allowed">
              {{ t('onboarding.step1.next') }}
              <PhArrowRight :size="20" />
            </button>
          </div>
        </div>

        <!-- Step 2 -->
        <div v-else-if="step === 2" key="step2">
          <h2 class="text-2xl sm:text-3xl font-bold mb-2 text-light-text dark:text-dark-text">{{ t('onboarding.step2.title') }}</h2>
          <p class="text-light-muted dark:text-dark-muted mb-6">{{ t('onboarding.step2.subtitle') }}</p>
          <div class="space-y-6 flex flex-col">
            <div>
              <label class="block text-sm font-medium mb-1 dark:text-gray-300 text-gray-700">{{ t('onboarding.step2.field') }}</label>
              <select v-model="form.field" class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-sage focus:outline-none dark:bg-[#1f242b] dark:border-gray-600 dark:text-white transition appearance-none">
                <option value="">{{ t('onboarding.step2.select') }}</option>
                <option value="Talaba">{{ t('onboarding.step2.fields.student') }}</option>
                <option value="Ishchi">{{ t('onboarding.step2.fields.worker') }}</option>
                <option value="Tadbirkor">{{ t('onboarding.step2.fields.entrepreneur') }}</option>
                <option value="Uyda">{{ t('onboarding.step2.fields.home') }}</option>
                <option value="Boshqa">{{ t('onboarding.step2.fields.other') }}</option>
              </select>
            </div>
            <div>
              <label class="block text-sm font-medium mb-2 dark:text-gray-300 text-gray-700">{{ t('onboarding.step2.mood') }}</label>
              <div class="flex flex-wrap gap-2 sm:gap-3">
                <button v-for="(label, key) in { great: t('onboarding.step2.moods.great'), good: t('onboarding.step2.moods.good'), average: t('onboarding.step2.moods.average'), tired: t('onboarding.step2.moods.tired'), hard: t('onboarding.step2.moods.hard') }" 
                  :key="key"
                  @click="selectMood(key)"
                  class="px-4 py-2 border rounded-full text-sm font-medium transition"
                  :class="form.mood === key ? 'border-sage bg-sage text-white' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800'"
                >
                  {{ label }}
                </button>
              </div>
            </div>
          </div>
          <div class="mt-10 flex justify-between items-center">
            <button @click="prevStep" class="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition dark:text-gray-300 dark:hover:bg-gray-800">
              <PhArrowLeft :size="20" />
              {{ t('onboarding.step2.back') }}
            </button>
            <button @click="nextStep" class="flex items-center gap-2 bg-sage text-white rounded-lg px-6 py-3 font-medium hover:bg-opacity-90 transition">
              {{ t('onboarding.step2.continue') }}
              <PhArrowRight :size="20" />
            </button>
          </div>
        </div>

        <!-- Step 3 -->
        <div v-else key="step3">
          <h2 class="text-2xl sm:text-3xl font-bold mb-2 text-light-text dark:text-dark-text">{{ t('onboarding.step3.title') }}</h2>
          <p class="text-light-muted dark:text-dark-muted mb-6">{{ t('onboarding.step3.subtitle') }}</p>
          <div class="space-y-6 flex flex-col">
            <div>
              <label class="block text-sm font-medium mb-1 dark:text-gray-300 text-gray-700">{{ t('onboarding.step3.about') }}</label>
              <textarea v-model="form.about" :placeholder="t('onboarding.step3.about_placeholder')" rows="4" class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-sage focus:outline-none dark:bg-[#1f242b] dark:border-gray-600 dark:text-white transition resize-none"></textarea>
            </div>
            <div>
              <label class="block text-sm font-medium mb-1 dark:text-gray-300 text-gray-700">{{ t('onboarding.step3.problem_area') }}</label>
              <select v-model="form.problemArea" class="w-full rounded-lg border border-gray-300 px-4 py-3 focus:ring-2 focus:ring-sage focus:outline-none dark:bg-[#1f242b] dark:border-gray-600 dark:text-white transition appearance-none">
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
          <div class="mt-10 flex justify-between items-center">
            <button @click="prevStep" class="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition dark:text-gray-300 dark:hover:bg-gray-800">
              <PhArrowLeft :size="20" />
              {{ t('onboarding.step3.back') }}
            </button>
            <button @click="startTest" class="flex items-center gap-2 bg-sage text-white rounded-lg px-8 py-3 font-medium hover:bg-opacity-90 shadow-md shadow-sage/30 hover:shadow-lg transition">
              {{ t('onboarding.step3.start') }}
              <PhArrowRight :size="20" />
            </button>
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

.fade-enter-from {
  opacity: 0;
  transform: translateX(20px);
}
.fade-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>

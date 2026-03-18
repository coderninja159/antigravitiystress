<script setup>
import { ref, onMounted } from 'vue'
import { PhX, PhCheckCircle, PhWarning } from '@phosphor-icons/vue'

const props = defineProps({
  message: { type: String, required: true },
  type: { type: String, default: 'success' }, // success, error, info
  duration: { type: Number, default: 3000 }
})

const isVisible = ref(true)

onMounted(() => {
  setTimeout(() => {
    close()
  }, props.duration)
})

const close = () => {
  isVisible.value = false
}
</script>

<template>
  <transition name="toast">
    <div v-if="isVisible" class="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 rounded-xl shadow-xl border bg-white dark:bg-dark-card border-gray-200 dark:border-dark-border">
      <div 
        class="flex-shrink-0"
        :class="{
          'text-success': type === 'success',
          'text-destructive': type === 'error',
          'text-sage': type === 'info'
        }"
      >
        <PhCheckCircle v-if="type === 'success'" :size="24" weight="fill" />
        <PhWarning v-else-if="type === 'error'" :size="24" weight="fill" />
        <PhCheckCircle v-else :size="24" weight="fill" />
      </div>
      <p class="text-sm font-medium text-light-text dark:text-dark-text pr-4">{{ message }}</p>
      
      <button @click="close" class="text-light-muted hover:text-light-text dark:text-dark-muted dark:hover:text-dark-text transition">
        <PhX :size="16" />
      </button>
    </div>
  </transition>
</template>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.toast-enter-from {
  opacity: 0;
  transform: translate(-50%, 100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translate(-50%, 100%);
}
</style>

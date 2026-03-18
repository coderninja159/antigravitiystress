<script setup>
import { computed } from 'vue'

const props = defineProps({
  variant: {
    type: String,
    default: 'primary' // 'primary', 'secondary', 'outline', 'ghost', 'destructive'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  type: {
    type: String,
    default: 'button'
  }
})

const emit = defineEmits(['click'])

const baseClasses = "inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-all duration-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100"

const variantClasses = computed(() => {
  switch (props.variant) {
    case 'primary':
      return "bg-sage text-white hover:bg-[#6B8A78] shadow-md shadow-sage/30 hover:shadow-lg hover:-translate-y-0.5"
    case 'secondary':
      return "bg-gray-100 text-light-text border border-gray-200 dark:bg-gray-800 dark:text-dark-text dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-700 hover:-translate-y-0.5"
    case 'outline':
      return "border-2 border-sage text-sage hover:bg-sage hover:text-white"
    case 'ghost':
      return "text-light-muted dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-light-text dark:hover:text-dark-text"
    case 'destructive':
      return "bg-destructive text-white hover:bg-opacity-90 shadow-md hover:-translate-y-0.5"
    default:
      return "bg-sage text-white"
  }
})

const handleClick = (e) => {
  if (!props.disabled) {
    emit('click', e)
  }
}
</script>

<template>
  <button 
    :type="type" 
    :disabled="disabled" 
    :class="[baseClasses, variantClasses]" 
    @click="handleClick"
  >
    <slot></slot>
  </button>
</template>

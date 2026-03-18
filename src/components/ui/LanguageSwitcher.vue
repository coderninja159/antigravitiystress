<script setup>
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()

const changeLanguage = (e) => {
  const lang = e.target.value
  locale.value = lang
  localStorage.setItem('locale', lang)
}
</script>

<template>
  <select 
    @change="changeLanguage" 
    :value="locale"
    class="bg-transparent border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-sage"
  >
    <option value="uz" class="dark:bg-dark-card">O'zbek</option>
    <option value="uz_cyr" class="dark:bg-dark-card">Ўзбек</option>
    <option value="ru" class="dark:bg-dark-card">Русский</option>
  </select>
</template>

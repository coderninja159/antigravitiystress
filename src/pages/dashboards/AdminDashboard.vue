<script setup>
import { PhDatabase, PhUsers, PhGearSix, PhDownloadSimple } from '@phosphor-icons/vue'
</script>

<template>
  <div class="max-w-7xl mx-auto w-full flex-grow py-8 px-4 flex flex-col pt-12 text-light-text dark:text-dark-text">
    
    <div class="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
      <div>
        <h1 class="text-3xl font-extrabold mb-2 flex items-center gap-3">
          Tizim Boshqaruvi
        </h1>
        <p class="text-light-muted dark:text-dark-muted text-lg">Platforma metrikalari va Google Sheets (MCP) ulanishi holati.</p>
      </div>
      <div class="flex gap-4">
        <button class="bg-white dark:bg-dark-card border border-light-border dark:border-dark-border px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:bg-gray-50 dark:hover:bg-dark-bg transition shadow-sm">
          <PhGearSix :size="18" />
          Sozlamalar
        </button>
        <button class="bg-dark-bg text-white dark:bg-white dark:text-dark-bg px-5 py-2.5 rounded-xl font-medium text-sm flex items-center gap-2 hover:opacity-90 transition shadow-sm">
          <PhDownloadSimple :size="18" />
          Ma'lumotlar bazasi
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm">
        <p class="text-light-muted dark:text-dark-muted font-semibold mb-2">Jami foydalanuvchilar</p>
        <p class="text-3xl font-bold flex items-center gap-3">
          1,317 <span class="text-sm px-2 py-0.5 bg-sage/10 text-sage rounded">+12</span>
        </p>
      </div>
      <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm">
        <p class="text-light-muted dark:text-dark-muted font-semibold mb-2">O'tkazilgan testlar</p>
        <p class="text-3xl font-bold flex items-center gap-3">
          5,024 <span class="text-sm px-2 py-0.5 bg-sage/10 text-sage rounded">+140</span>
        </p>
      </div>
      <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm">
        <p class="text-light-muted dark:text-dark-muted font-semibold mb-2">Google Sheets ulangan</p>
        <p class="text-xl font-bold text-sage mt-2 flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-sage animate-pulse"></span>
          Avtosinzron
        </p>
      </div>
      <div class="bg-white dark:bg-dark-card p-6 rounded-3xl border border-light-border dark:border-dark-border shadow-sm">
        <p class="text-light-muted dark:text-dark-muted font-semibold mb-2">Platforma Yuklamasi</p>
        <p class="text-xl font-bold text-accent mt-2 flex items-center gap-2">
           Normal (24%)
        </p>
      </div>
    </div>

    <!-- Active Tables Config -->
    <div class="bg-white dark:bg-dark-card rounded-3xl border border-light-border dark:border-dark-border shadow-sm overflow-hidden flex flex-col">
       <div class="p-6 border-b border-light-border dark:border-dark-border bg-gray-50 dark:bg-dark-bg/50">
        <h2 class="text-lg font-bold flex items-center gap-2">
          <PhDatabase :size="24" class="text-sage" />
          Jadvallar tarkibi tuzilishi
        </h2>
      </div>
      <div class="p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="border border-light-border dark:border-dark-border p-5 rounded-2xl bg-gray-50/50 dark:bg-dark-bg/20">
          <h3 class="font-bold flex items-center justify-between mb-4">
            Questions (Savollar)
            <span class="text-xs font-semibold bg-sage/10 text-sage px-2 py-1 rounded">2 Jadval</span>
          </h3>
          <p class="text-sm text-light-muted dark:text-dark-muted font-mono leading-loose">
            ID | turi | Matni | Variant_1 | V_1_Ball ...
          </p>
        </div>
        <div class="border border-light-border dark:border-dark-border p-5 rounded-2xl bg-gray-50/50 dark:bg-dark-bg/20">
          <h3 class="font-bold flex items-center justify-between mb-4">
            Coefficients (Koeffitsientlar)
            <span class="text-xs font-semibold bg-sage/10 text-sage px-2 py-1 rounded">1 Jadval</span>
          </h3>
          <p class="text-sm text-light-muted dark:text-dark-muted font-mono leading-loose">
            yosh_guruhi | jins | xususiyat | qiymat
          </p>
        </div>
        <div class="border border-light-border dark:border-dark-border p-5 rounded-2xl bg-gray-50/50 dark:bg-dark-bg/20">
          <h3 class="font-bold flex items-center justify-between mb-4">
            Answers (Javoblar)
            <span class="text-xs font-semibold bg-sage/10 text-sage px-2 py-1 rounded">Logs</span>
          </h3>
          <p class="text-sm text-light-muted dark:text-dark-muted font-mono leading-loose">
            User_ID | Test_ID | Natija_JSON | Sana
          </p>
        </div>
      </div>
    </div>

  </div>
</template>

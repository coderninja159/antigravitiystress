<script setup>
import { onMounted, ref, watch } from 'vue'
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js'
import { PhChartPolar } from '@phosphor-icons/vue'

Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend)

const props = defineProps({
  traits: {
    type: Object,
    required: true
  }
})

const canvasRef = ref(null)
let chartInstance = null

const renderChart = () => {
  if (!canvasRef.value) return
  if (chartInstance) chartInstance.destroy()

  const isDark = document.documentElement.classList.contains('dark')

  chartInstance = new Chart(canvasRef.value, {
    type: 'radar',
    data: {
      labels: ['Optimistik', 'Kreativlik', 'Xotirjamlik', 'Ambitsiya', 'Sotsiallik', 'Tahliliy'],
      datasets: [{
        label: 'Sizning ko\'rsatkichingiz',
        data: [
          props.traits.optimistic || 0,
          props.traits.creative || 0,
          props.traits.calm || 0,
          props.traits.ambitious || 0,
          props.traits.social || 0,
          props.traits.analytical || 0
        ],
        fill: true,
        backgroundColor: 'rgba(124, 158, 138, 0.25)', // sage
        borderColor: '#7C9E8A',
        pointBackgroundColor: '#7C9E8A',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: '#7C9E8A'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: isDark ? 'rgba(173, 186, 199, 0.1)' : 'rgba(107, 114, 128, 0.1)' },
          grid: { color: isDark ? 'rgba(173, 186, 199, 0.1)' : 'rgba(107, 114, 128, 0.1)' },
          pointLabels: {
            color: isDark ? '#E6EDF3' : '#1F2937',
            font: { family: 'Inter', size: 12, weight: '500' }
          },
          ticks: { display: false, min: 0, max: 100 }
        }
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: isDark ? '#2D333B' : '#FFFFFF',
          titleColor: isDark ? '#E6EDF3' : '#1F2937',
          bodyColor: isDark ? '#ADBAC7' : '#6B7280',
          borderColor: isDark ? '#404448' : '#E5E7EB',
          borderWidth: 1,
          padding: 10,
          displayColors: false,
          callbacks: {
            label: (ctx) => `${ctx.raw}%`
          }
        }
      }
    }
  })
}

onMounted(() => {
  renderChart()
})

watch(() => props.traits, () => renderChart(), { deep: true })

// Also watch theme changes to re-render colors
const observer = new MutationObserver((mutations) => {
  mutations.forEach((mutation) => {
    if (mutation.attributeName === 'class') {
      renderChart()
    }
  })
})

onMounted(() => {
  observer.observe(document.documentElement, { attributes: true })
})
</script>

<template>
  <div class="relative w-full h-full flex flex-col items-center justify-center p-6 bg-white dark:bg-dark-card rounded-2xl border border-light-border dark:border-dark-border shadow-sm group hover:shadow-lg transition-all">
    <div class="absolute top-4 right-4 text-light-muted dark:text-dark-muted opacity-50 group-hover:opacity-100 transition-opacity">
      <PhChartPolar :size="24" />
    </div>
    <div class="w-full max-w-[350px] aspect-square relative z-10">
      <canvas ref="canvasRef"></canvas>
    </div>
  </div>
</template>

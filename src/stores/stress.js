import { defineStore } from 'pinia'
import { mcp } from '../services/mcp'
import { useUserStore } from './user'

export const useStressStore = defineStore('stress', {
  state: () => ({
    questions: [],
    answers: {},
    lastResult: null,
    loading: false
  }),
  actions: {
    async fetchTestData() {
      if (this.questions.length > 0) return
      this.loading = true
      try {
        this.questions = await mcp.getStressQuestions()
      } catch (err) {
        console.error("Error fetching stress test data", err)
      } finally {
        this.loading = false
      }
    },
    addAnswer(questionId, optionId) {
      this.answers[questionId] = optionId
    },
    async generateResult() {
      const userStore = useUserStore()
      
      let totalStressScore = 0
      let maxPossibleInfo = this.questions.length * 3 // assuming max score 3 per q

      for (const [qId, optId] of Object.entries(this.answers)) {
        const q = this.questions.find(x => x.id === qId)
        if (!q) continue
        const opt = q.options.find(x => x.id === optId)
        if (!opt) continue
        totalStressScore += (opt.score || 0)
      }

      let percentage = (totalStressScore / maxPossibleInfo) * 100
      let summary = ''
      let level = ''
      
      if (percentage > 70) {
        summary = "Sizda yuqori darajada stress kuzatilmoqda. Mutaxassis bilan maslahatlashish tavsiya etiladi."
        level = 'high'
      } else if (percentage > 40) {
        summary = "Sizda o'rtacha stress darajasi mavjud. Dam olishga ko'proq vaqt ajrating."
        level = 'medium'
      } else {
        summary = "Stress darajangiz past. Ruhiy xolatingiz yaxshi."
        level = 'low'
      }

      const res = {
        id: Date.now(),
        type: 'stress',
        timestamp: new Date().toISOString(),
        percentage: Math.round(percentage),
        level,
        summary
      }

      this.lastResult = res
      userStore.addHistoryItem({
        id: res.id,
        type: res.type,
        timestamp: res.timestamp,
        summary: res.summary,
        percentage: res.percentage
      })

      await mcp.saveResult({
        userId: userStore.user?.id || 'guest',
        testId: 'stress',
        answers: this.answers,
        result: res
      })

      this.answers = {}
    }
  }
})

import { defineStore } from 'pinia'
import { mcp } from '../services/mcp'
import { useUserStore } from './user'

export const usePortraitStore = defineStore('portrait', {
  state: () => ({
    questions: [],
    coefficients: [],
    rules: [],
    answers: {},
    lastResult: null,
    loading: false
  }),
  actions: {
    async fetchTestData() {
      if (this.questions.length > 0) return
      this.loading = true
      try {
        const [qs, coeffs, rls] = await Promise.all([
          mcp.getPortraitQuestions(),
          mcp.getCoefficients(),
          mcp.getSpecialRules()
        ])
        this.questions = qs
        this.coefficients = coeffs
        this.rules = rls
      } catch (err) {
        console.error("Error fetching portrait test data", err)
      } finally {
        this.loading = false
      }
    },
    addAnswer(questionId, optionId) {
      this.answers[questionId] = optionId
    },
    calculateTraits() {
      const userStore = useUserStore()
      const user = userStore.user
      
      // Map base traits
      let baseScores = { optimistic: 0, creative: 0, calm: 0, ambitious: 0, social: 0, analytical: 0 }
      let maxPossible = { optimistic: 0, creative: 0, calm: 0, ambitious: 0, social: 0, analytical: 0 }
      
      for (const [qId, optId] of Object.entries(this.answers)) {
        const q = this.questions.find(x => x.id === qId)
        if (!q) continue
        
        // Calculate max possible logically... (simplified by assuming max points per question)
        for (const trait in maxPossible) { maxPossible[trait] += 2 }

        const opt = q.options.find(x => x.id === optId)
        if (!opt) continue
        for (const trait in opt.traits) {
          if (baseScores[trait] !== undefined) {
             baseScores[trait] += opt.traits[trait]
          }
        }
      }

      // Apply Coefficients based on demographic
      let finalScores = {}
      for (const t in baseScores) {
        let score = (baseScores[t] / maxPossible[t]) * 100
        
        if (user && user.age && user.gender) {
          const ageGroup = user.age < 18 ? 'teen' : (user.age < 30 ? 'youth' : 'adult')
          const gender = user.gender.toLowerCase()
          const coeffRule = this.coefficients.find(c => c.trait === t && c.ageGroup === ageGroup && c.gender === gender)
          if (coeffRule) {
            score = score * coeffRule.coefficient
          }
        }
        finalScores[t] = Math.min(100, Math.round(score))
      }
      return finalScores
    },
    async generateResult() {
      const userStore = useUserStore()
      const traits = this.calculateTraits()
      
      // Analyze strengths and weaknesses
      let sortedTraits = Object.entries(traits).sort((a,b) => b[1] - a[1])
      let strengths = sortedTraits.slice(0, 3).map(x => x[0])
      let improvements = sortedTraits.slice(-2).map(x => x[0]).filter(k => traits[k] < 50)
      
      // Build Template
      let summary = "Siz analiz va mantiqqa tayanasiz."
      if (strengths.includes('creative') && strengths.includes('optimistic')) {
        summary = "Siz juda faol va ijodkor insonsiz, har qanday qiyinchilikda ijobiy yechim topa olasiz."
      } else if (strengths.includes('calm') && strengths.includes('analytical')) {
        summary = "Siz xotirjam va tahliliy ongga ega insonsiz. Qaror qabul qilishda mantiqqa tayanib ish ko'rasiz."
      }

      const recTable = {
        optimistic: "Ba'zida realistik qarashlarni ham o'rganish foydali.",
        creative: "Yangi loyihalarga qo'shiling va ijodiy erkinlikni his eting.",
        calm: "Stressli vaziyatlarda meditatsiya bilan shug'ullaning.",
        ambitious: "Kichik yutuqlaringizni ham nishonlashni unutmang.",
        social: "Odamlar bilan ko'proq muloqot qilishga harakat qiling.",
        analytical: "Faqat mantiqqa emas, balki intuitsiyangizga ham ishonishni sinab ko'ring."
      }

      let recommendations = improvements.map(i => recTable[i] || "O'zingizga ko'proq vaqt ajrating.")
      if (recommendations.length === 0) recommendations = ["Siz ayni vaqtda juda muvozanatlisiz."]

      const res = {
        id: Date.now(),
        type: 'portrait',
        timestamp: new Date().toISOString(),
        summary,
        traitScores: traits,
        strengths,
        improvements,
        recommendations
      }

      this.lastResult = res
      userStore.addHistoryItem({
        id: res.id,
        type: res.type,
        timestamp: res.timestamp,
        summary: res.summary,
        strengths: res.strengths
      })

      // Send to MCP
      await mcp.saveResult({
        userId: userStore.user?.id || 'guest',
        testId: 'portrait',
        answers: this.answers,
        traitScores: traits,
        result: res
      })

      this.answers = {}
    }
  }
})

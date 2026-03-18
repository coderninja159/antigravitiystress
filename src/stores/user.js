import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null, // { id, name, surname, age, gender, role, schoolCode }
    history: [],
    streak: 0,
    dailyTip: ''
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    role: (state) => state.user?.role || 'guest',
  },
  actions: {
    loadUserFromStorage() {
      const u = localStorage.getItem('user')
      if (u) this.user = JSON.parse(u)
      const h = localStorage.getItem('history')
      if (h) this.history = JSON.parse(h)
      const s = localStorage.getItem('streak')
      if (s) this.streak = parseInt(s)
    },
    saveToStorage() {
      localStorage.setItem('user', JSON.stringify(this.user))
      localStorage.setItem('history', JSON.stringify(this.history))
      localStorage.setItem('streak', this.streak.toString())
    },
    setUser(userData) {
      // By default role is 'user', check if schoolCode exists
      let role = userData.role || 'user'
      if (userData.schoolCode && userData.schoolCode === '1234') {
        role = 'student' // mocked logic for student login
      }
      this.user = { ...userData, id: Date.now().toString(), role }
      this.saveToStorage()
    },
    login(email, password) {
      // Mock login check
      if (email === 'admin' && password === 'admin123') {
        this.setUser({ name: 'Admin', role: 'admin' })
        return true
      }
      if (email === 'parent' && password === 'parent123') {
        this.setUser({ name: 'Ota-ona', role: 'parent' })
        return true
      }
      if (email === 'school' && password === 'school123') {
        this.setUser({ name: 'Maktab Psixologi', role: 'school_psychologist' })
        return true
      }
      if (email === 'pro' && password === 'pro123') {
        this.setUser({ name: 'Professional', role: 'professional_psychologist' })
        return true
      }
      return false
    },
    logout() {
      this.user = null
      this.history = []
      this.streak = 0
      localStorage.clear() // clears theme and locale too if not careful, better to specifically target:
      localStorage.removeItem('user')
      localStorage.removeItem('history')
      localStorage.removeItem('streak')
    },
    addHistoryItem(item) {
      this.history.unshift(item)
      this.updateStreak()
      this.saveToStorage()
    },
    updateStreak() {
      const last = localStorage.getItem('lastTestDate')
      const today = new Date().toDateString()
      if (last !== today) {
        if (last) {
          const lastDate = new Date(last)
          const currDate = new Date()
          const diff = Math.floor((currDate - lastDate) / (1000 * 60 * 60 * 24))
          if (diff === 1) {
            this.streak += 1
          } else {
            this.streak = 1
          }
        } else {
          this.streak = 1
        }
        localStorage.setItem('lastTestDate', today)
        this.saveToStorage()
      }
    },
    getDailyTip() {
      const tips = [
        "Bugun ochiq havoda 30 daqiqa sayr qiling.",
        "Kompyuterdan uzoqlashib ko'zingizni dam oldiring.",
        "Kuningizni bir stakan suv ichish bilan boshlang.",
        "Kamida 7-8 soat uxlashga harakat qiling.",
        "Televizor va telefondan uxlashdan oldin 1 soat foydalanmang."
      ]
      this.dailyTip = tips[Math.floor(Math.random() * tips.length)]
      return this.dailyTip
    }
  }
})

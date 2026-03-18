export const api = {
  async getQuestions() {
    // Mock fetching from Google Sheets
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 'q1',
            text: "Osmon degan so'zni eshitsangiz, nima xayolingizga keladi?",
            options: [
              { id: 'o1', text: "Erkinlik va parvoz", traits: { creativity: 2, intuition: 1, energy: 1, ambition: 1, calmness: 0, empathy: 0 } },
              { id: 'o2', text: "Osoyishtalik va bulutlar", traits: { calmness: 2, empathy: 1, intuition: 1, energy: 0, creativity: 0, ambition: 0 } },
              { id: 'o3', text: "Yulduzlar va noma'lumlik", traits: { intuition: 2, creativity: 1, ambition: 1, energy: 0, calmness: 0, empathy: 0 } },
              { id: 'o4', text: "Koinot va imkoniyatlar", traits: { ambition: 2, energy: 1, creativity: 1, intuition: 0, calmness: 0, empathy: 0 } }
            ]
          },
          {
            id: 'q2',
            text: "Notanish joyda adashib qolsangiz, birinchi nima qilasiz?",
            options: [
              { id: 'o1', text: "Odamlardan yo'l so'rayman", traits: { empathy: 2, energy: 1, creativity: 1, intuition: 0, calmness: 0, ambition: 0 } },
              { id: 'o2', text: "Xaritani ochib o'zim qidiraman", traits: { calmness: 2, ambition: 1, intuition: 1, energy: 0, creativity: 0, empathy: 0 } },
              { id: 'o3', text: "Tasodifiy yo'ldan ketaveraman", traits: { energy: 2, creativity: 1, intuition: 1, calmness: 0, empathy: 0, ambition: 0 } },
              { id: 'o4', text: "Vaziyatni tahlil qilib reja tuzaman", traits: { ambition: 2, calmness: 1, creativity: 1, energy: 0, intuition: 0, empathy: 0 } }
            ]
          },
          {
            id: 'q3',
            text: "Jamoada ishlash jarayonida qanday rolni ma'qul ko'rasiz?",
            options: [
              { id: 'o1', text: "G'oyalar generatori", traits: { creativity: 2, energy: 1, intuition: 1, calmness: 0, empathy: 0, ambition: 0 } },
              { id: 'o2', text: "Lider, hammaga vazifa beraman", traits: { ambition: 2, energy: 1, calmness: 1, creativity: 0, intuition: 0, empathy: 0 } },
              { id: 'o3', text: "Tinchgina o'z ishimni qiladigan qatnashchi", traits: { calmness: 2, empathy: 1, intuition: 1, creativity: 0, energy: 0, ambition: 0 } },
              { id: 'o4', text: "Boshqalarni qo'llab-quvvatlovchi yordamchi", traits: { empathy: 2, energy: 1, calmness: 1, creativity: 0, intuition: 0, ambition: 0 } }
            ]
          },
          {
            id: 'q4',
            text: "Bo'sh vaqtingizda nima bilan shug'ullanishni yoqtirasiz?",
            options: [
              { id: 'o1', text: "Sport yoki faol dam olish", traits: { energy: 2, ambition: 1, creativity: 1, calmness: 0, intuition: 0, empathy: 0 } },
              { id: 'o2', text: "Kitob o'qish yoki kino ko'rish", traits: { calmness: 2, intuition: 1, empathy: 1, energy: 0, creativity: 0, ambition: 0 } },
              { id: 'o3', text: "Ijodiy ishlar (rassomchilik, musiqa)", traits: { creativity: 2, intuition: 1, energy: 1, calmness: 0, empathy: 0, ambition: 0 } },
              { id: 'o4', text: "Do'stlar bilan muloqot", traits: { empathy: 2, energy: 1, calmness: 1, creativity: 0, intuition: 0, ambition: 0 } }
            ]
          },
          {
            id: 'q5',
            text: "Qiyin vaziyatda qanday qaror qabul qilasiz?",
            options: [
              { id: 'o1', text: "Ichki sezgimga (intuitsiya) ko'ra", traits: { intuition: 2, creativity: 1, energy: 1, calmness: 0, empathy: 0, ambition: 0 } },
              { id: 'o2', text: "Faqat mantiqiy faktlarga tayanib", traits: { calmness: 2, ambition: 1, intuition: 1, energy: 0, creativity: 0, empathy: 0 } },
              { id: 'o3', text: "Boshqalarning maslahatini olib", traits: { empathy: 2, calmness: 1, energy: 1, creativity: 0, intuition: 0, ambition: 0 } },
              { id: 'o4', text: "Tezkor va tavakkal qaror", traits: { energy: 2, ambition: 1, creativity: 1, calmness: 0, intuition: 0, empathy: 0 } }
            ]
          }
        ])
      }, 500)
    })
  },
  async saveUser(payload) {
    // Mock save
    console.log("Mock saving user to sheets:", payload)
    return { success: true }
  },
  async saveAnswers(payload) {
    // Mock save
    console.log("Mock saving answers to sheets:", payload)
    return { success: true }
  }
}

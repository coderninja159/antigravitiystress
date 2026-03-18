// MCP service wrapper for Google Sheets.
// For now, this will mock responses structured exactly how the query would return them.
// The actual queries are represented as comments documenting what Antigravity would do via MCP.

export const mcp = {
  async getPortraitQuestions() {
    // MCP QUERY: await mcp.query("SELECT * FROM Questions WHERE type='portrait'")
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 'p1',
            text: "Osmon degan so'zni eshitsangiz, nima xayolingizga keladi?",
            options: [
              { id: 'o1', text: "Erkinlik va parvoz", traits: { creative: 2, optimistic: 1, social: 1, ambitious: 1, calm: 0, analytical: 0 } },
              { id: 'o2', text: "Osoyishtalik va bulutlar", traits: { calm: 2, social: 1, optimistic: 1, creative: 0, ambitious: 0, analytical: 0 } },
              { id: 'o3', text: "Yulduzlar va noma'lumlik", traits: { optimistic: 2, creative: 1, ambitious: 1, calm: 0, social: 0, analytical: 0 } },
              { id: 'o4', text: "Koinot va imkoniyatlar", traits: { ambitious: 2, optimistic: 1, creative: 1, calm: 0, social: 0, analytical: 0 } }
            ]
          },
          {
            id: 'p2',
            text: "Notanish joyda adashib qolsangiz, birinchi nima qilasiz?",
            options: [
              { id: 'o1', text: "Odamlardan yo'l so'rayman", traits: { social: 2, optimistic: 1, creative: 1, calm: 0, ambitious: 0, analytical: 0 } },
              { id: 'o2', text: "Xaritani ochib o'zim qidiraman", traits: { calm: 2, ambitious: 1, analytical: 2, optimistic: 0, creative: 0, social: 0 } },
              { id: 'o3', text: "Tasodifiy yo'ldan ketaveraman", traits: { optimistic: 2, creative: 1, social: 1, calm: 0, ambitious: 0, analytical: 0 } },
              { id: 'o4', text: "Vaziyatni tahlil qilib reja tuzaman", traits: { ambitious: 2, calm: 1, analytical: 2, creative: 1, social: 0, optimistic: 0 } }
            ]
          }
        ])
      }, 500)
    })
  },

  async getStressQuestions() {
    // MCP QUERY: await mcp.query("SELECT * FROM Questions WHERE type='stress'")
    return new Promise(resolve => {
      setTimeout(() => {
        resolve([
          {
            id: 's1',
            text: "Ko'pincha sababsiz asabiylashasizmi?",
            options: [
              { id: 'o1', text: "Hech qachon", score: 0 },
              { id: 'o2', text: "Ba'zan", score: 1 },
              { id: 'o3', text: "Ko'pincha", score: 2 },
              { id: 'o4', text: "Har doim", score: 3 }
            ]
          },
          {
            id: 's2',
            text: "Uyqungiz qanday?",
            options: [
              { id: 'o1', text: "Juda yaxshi, tez uxlab qolaman", score: 0 },
              { id: 'o2', text: "Yaxshi", score: 1 },
              { id: 'o3', text: "Yomon, kechasi ko'p uyg'onaman", score: 2 },
              { id: 'o4', text: "Juda yomon, uxlay olmayman", score: 3 }
            ]
          }
        ])
      }, 500)
    })
  },

  async getCoefficients() {
     // MCP QUERY: await mcp.query("SELECT * FROM Coefficients")
     return [
       { trait: 'optimistic', ageGroup: 'teen', gender: 'erkak', coefficient: 1.2 },
       { trait: 'optimistic', ageGroup: 'teen', gender: 'ayol', coefficient: 1.1 },
       { trait: 'creative', ageGroup: 'teen', gender: 'erkak', coefficient: 1.05 },
       { trait: 'creative', ageGroup: 'teen', gender: 'ayol', coefficient: 1.15 }
       // Extendable...
     ]
  },

  async getSpecialRules() {
    // MCP QUERY: await mcp.query("SELECT * FROM SpecialRules")
    return [
      { questionId: 'p2', optionId: 'o3', ageMin: 10, ageMax: 18, gender: 'erkak', text: "Diqqatliroq bo'lish tavsiya etiladi." }
    ]
  },

  async saveResult(payload) {
    // MCP QUERY: await mcp.insert("Answers", payload)
    console.log("Mock saving results to Google Sheets via MCP:", payload)
    return { success: true }
  }
}

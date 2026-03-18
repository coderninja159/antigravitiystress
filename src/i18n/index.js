import { createI18n } from 'vue-i18n'
import uz from './uz'
import uz_cyr from './uz_cyr'
import ru from './ru'

const messages = {
  uz,
  uz_cyr,
  ru
}

const i18n = createI18n({
  legacy: false,
  locale: localStorage.getItem('locale') || 'uz',
  fallbackLocale: 'uz',
  messages,
})

export default i18n

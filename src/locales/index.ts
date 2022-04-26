import { Platform, 
  NativeModules 
} from 'react-native'

// Translation
import I18n from 'i18n-js'

//en_US Strings
import en_us from './en-US' 

//pt_BR Strings
import pt_br from './pt-BR' 

// Normalize the language code received by getLanguageByDevice
interface NormalizeTranslate { 
  [key: string]: string 
} 

const normalizeTranslate: NormalizeTranslate = {
  'en_US': 'en_US',
  'pt_BR': 'pt_BR',
  'en': 'en_US',
  'pt_US': 'pt_BR',
}

//Get device language
const getLanguageByDevice = () :string => {
  return Platform.OS === 'ios'
    ? NativeModules.SettingsManager.settings.AppleLocale
    : NativeModules.I18nManager.localeIdentifier
}

//Supported languages
I18n.translations = {
  'en_US': en_us,
  'pt_BR': pt_br,
}

//Check if device language is supported, otherwise use 'en_US'
const setLanguageToI18n = () => {
  const language = getLanguageByDevice()
  const translateNormalize = normalizeTranslate[language];
  const iHaveThisLanguage = I18n.translations.hasOwnProperty(translateNormalize)
  iHaveThisLanguage
    ? I18n.locale = translateNormalize
    : I18n.locale = 'en_US'
}

setLanguageToI18n()

export const translate = (key:string) => I18n.t(key)

import { NativeModules } from 'react-native'

export const getSystemLocale = () => {
  let locale
  // iOS
  if (
    NativeModules.SettingsManager
    && NativeModules.SettingsManager.settings
    && NativeModules.SettingsManager.settings.AppleLanguages
  ) {
    // eslint-disable-next-line prefer-destructuring
    locale = NativeModules.SettingsManager.settings.AppleLanguages[0]
    // Android
  } else if (NativeModules.I18nManager) {
    locale = NativeModules.I18nManager.localeIdentifier
  }

  if (typeof locale === 'undefined') {
    console.log('Couldnt get locale')
    return 'en'
  }

  return locale
}

// const getKilobyteSize = ({ str }) => {
//   const byteLength = new Blob([str]).size
//   const kilobytes = (byteLength / 1024).toFixed(2)
//   return `${kilobytes}KB`
// }

// function to merge two JSON objects
export const mergeJsonObjects = (obj1, obj2) => {
  const result = { ...obj1 }
  Object.keys(obj2).forEach((key) => {
    if (typeof obj2[key] === 'object' && !Array.isArray(obj2[key])) {
      result[key] = mergeJsonObjects(obj1[key] || {}, obj2[key])
    } else {
      result[key] = obj2[key]
    }
  })
  return result
}

// This function can be a risk for untested input
export const convertHexToRGBA = (hexCode, opacity = 1) => {
  if (hexCode == null) return null
  if (hexCode.includes('rgba')) return hexCode
  if (hexCode.includes('rgb')) return hexCode.replace('rgb', 'rgba').replace(')', `,${opacity})`)
  if (!hexCode.includes('#')) return null

  let hex = hexCode.replace('#', '')

  if (hex.length === 3) {
    hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`
  }

  const r = parseInt(hex.substring(0, 2), 16)
  const g = parseInt(hex.substring(2, 4), 16)
  const b = parseInt(hex.substring(4, 6), 16)

  /* Backward compatibility for whole number based opacity values. */
  const op = opacity > 1 && opacity <= 100 ? opacity / 100 : opacity

  // console.log(hexCode, `rgba(${r},${g},${b},${op})`)
  return `rgba(${r},${g},${b},${op})`
}

// Doesn't seem to work as expected
// To be tested later
export async function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms)
  })
}

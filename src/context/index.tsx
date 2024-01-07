import { createContext } from 'react'
import { User } from 'firebase/auth'

export interface UserData extends User {
  isOnboard: boolean
  // add other properties here
}

export type UserDataContextType = {
  userData: UserData | null
}

export const UserDataContext = createContext<UserDataContextType>({userData: null})

export interface Preferences {
  setThemePreference: (themePref: string) => void
  setUseCustomColor: (value: boolean) => void
  useCustomColor: boolean
  setThemeCustomColor: (color: string) => void
  themePreference: string
  themeCustomColor: string
  isDark: boolean
  showRenderCounter: boolean
  setShowRenderCounter: (show: boolean) => void
}

export type PreferencesContextType = {
  preferences: Preferences | null
}

export const PreferencesContext = createContext<PreferencesContextType>({preferences: null})

export const HomeTitleContext = createContext({
  title: 'Find Assistance: Discover, Connect, Thrive.',
  setTitle: () => {},
})

import { createContext } from 'react'

export const PreferencesContext = createContext()
export const UserDataContext = createContext()
export const HomeTitleContext = createContext({
  title: 'Find Assistance: Discover, Connect, Thrive.',
  setTitle: () => {},
})

import { createContext } from 'react'

const PreferencesContext = createContext()

// const PreferencesContextProvider = (props, value) => {
//   const [themePreference, setThemePreference] = useState()
//   const { children } = props

//   return (
//     <PreferencesContext.Provider
//       value={{
//         themePreference, setThemePreference,
//       }}
//     >
//       {children}
//     </PreferencesContext.Provider>
//   )
// }

// PreferencesContextProvider.propTypes = {
//   children: PropTypes.node.isRequired,
// }

// export { PreferencesContext, PreferencesContextProvider }
export default PreferencesContext

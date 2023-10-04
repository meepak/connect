import React, { useState, createContext, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import PropTypes from 'prop-types'

const ColorSchemeContext = createContext()

const ColorSchemeContextProvider = (props) => {
  const { children } = props
  const colorScheme = useColorScheme()
  const [scheme, setScheme] = useState(colorScheme)

  useEffect(() => {
    setScheme(colorScheme)
  }, [colorScheme])

  return (
    <ColorSchemeContext.Provider
      value={{
        scheme, setScheme,
      }}
    >
      {children}
    </ColorSchemeContext.Provider>
  )
}

ColorSchemeContextProvider.protoTypes = {
  children: PropTypes.node.isRequired,
}

export { ColorSchemeContext, ColorSchemeContextProvider }

import React, { useState, createContext, useEffect } from 'react'
import { useColorScheme } from 'react-native'
import PropTypes from 'prop-types'

export const ColorSchemeContext = createContext()

export const ColorSchemeContextProvider = (props) => {
  const colorScheme = useColorScheme()
  const [scheme, setScheme] = useState(colorScheme)
  const { children } = props

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

ColorSchemeContext.protoTypes = {
  children: PropTypes.node.isRequired,
}

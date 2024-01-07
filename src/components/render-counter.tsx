/* eslint-disable react/prop-types */
import React, { useContext, useRef } from 'react'
import { Text } from 'react-native-paper'
import { PreferencesContext } from '../context'

const RenderCounter = ({ title = '' }) => {
  const renderCounter = useRef(0)
  const { showRenderCounter } = useContext(PreferencesContext)
  renderCounter.current += 1
  return (showRenderCounter
    ? <Text variant="bodySmall" style={{ color: '#FFFF00' }}>[ R: {renderCounter.current} {title}]</Text>
    : <></>)
}

export default RenderCounter

/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import { Text } from 'react-native-paper'

const RenderCounter = ({ title = '' }) => {
  const renderCounter = useRef(0)
  renderCounter.current += 1
  return <Text>Renders: {renderCounter.current}, {title}</Text>
}

export default RenderCounter

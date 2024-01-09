/* eslint-disable react/prop-types */
import React, { useRef } from 'react'
import { Text } from 'react-native-paper'
import { useAuthUser } from '@/context'

const RenderCounter = ({ title = '' }) => {
  const renderCounter = useRef(0)
  const { authUser } = useAuthUser()
  renderCounter.current += 1
  return (authUser?.preferences?.debug
    ? <Text variant="bodySmall" style={{ color: '#FFFF00' }}>[ R: {renderCounter.current} {title}]</Text>
    : <></>)
}

export default RenderCounter
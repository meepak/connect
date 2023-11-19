import React, { useRef, useState } from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import ModalTemplate from '../../components/modal-template'
import Header from './components/Header'
import Recent from './components/Recent'
import Temp from './components/Template'

const Settings = () => {
  const paddingVertical = 20
  const [searchQuery, setSearchQuery] = useState('')
  const ref = useRef(null)

  const setSearchQueryValue = (value) => {
    setSearchQuery(value)
    if (ref?.current) {
      setTimeout(() => ref.current.focus(), 50)
    }
  }

  return (
    <ModalTemplate
      header={<Header ref={ref} searchQuery={searchQuery} onSearchQueryChange={(value) => setSearchQueryValue(value)} />}
      subHeader={<Text style={{ top: -7, left: 20 }} variant="headlineSmall">Option: Everywhere</Text>}
      content={(
        <>
          <Recent onSelected={(value) => setSearchQueryValue(value)} />
          <View style={{ paddingVertical }} />
          <Temp id={1} />
          <View style={{ paddingVertical }} />
          <Temp id={2} />
          <View style={{ paddingVertical }} />
          <Temp id={3} />
          <View style={{ paddingVertical }} />
          <Temp id={4} />
          <View style={{ paddingVertical }} />
          <Temp id={5} />
          <View style={{ paddingVertical }} />
          <Temp id={6} />
          <View style={{ paddingVertical }} />
          <Temp id={7} />
          {/* <View style={{ paddingVertical }} />
          <View style={{ paddingVertical }} />
          <View style={{ paddingVertical }} /> */}
        </>
      )}
    />
  )
}

export default Settings

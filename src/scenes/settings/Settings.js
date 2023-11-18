import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import ModalTemplate from '../../components/ModalTemplate'
import Header from './components/Header'
import Account from './components/Account'
import Display from './components/Display'
import Temp from './components/Template'

const Settings = () => {
  const marginVertical = 20
  return (
    <ModalTemplate
      header={<Header />}
      subHeader={<Text style={{ top: -12, left: 20 }} variant="headlineLarge">Settings</Text>}
      content={(
        <>
          <Account />
          <View style={{ marginVertical }} />
          <Display />
          <View style={{ marginVertical }} />
          <Temp id={1} />
          <View style={{ marginVertical }} />
          <Temp id={2} />
          <View style={{ marginVertical }} />
          <Temp id={3} />
          <View style={{ marginVertical }} />
          <Temp id={4} />
          <View style={{ marginVertical }} />
          <Temp id={5} />
          <View style={{ marginVertical }} />
          <Temp id={6} />
          <View style={{ marginVertical }} />
          <Temp id={7} />
        </>
      )}
    />
  )
}

export default Settings

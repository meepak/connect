import React from 'react'
import { View } from 'react-native'
import { Text } from 'react-native-paper'
import { ModalTemplate } from '@/components/template'
import Header from './components/header'
import Account from './components/account'
import Display from './components/display'
import Temp from './components/template'
import Developer from './components/developer'
import Privacy from './components/privacy'

const Settings = () => {
  const marginVertical = 20
  return (
    <ModalTemplate
      header={<Header />}
      subHeader={<Text style={{ top: -12, left: 20 }} variant="headlineMedium">Settings</Text>}
      content={(
        <>
          <Account />
          <View style={{ marginVertical }} />
          <Display />
          <View style={{ marginVertical }} />
          <Developer />
          <View style={{ marginVertical }} />
          <Privacy />
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

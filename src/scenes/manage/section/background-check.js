import React from 'react'
import { Text } from 'react-native-paper'
import { ModalTemplate } from '../../../components/templates'
import Temp from '../components/template'
import Header from '../components/header'

const ManageBackgroundCheck = () => (
  <ModalTemplate
    header={<Header />}
    subHeader={<Text style={{ top: -7, left: 20 }} variant="headlineSmall">Manage Background Checks</Text>}
    content={(
      <>
        <Temp id={1} />
        <Temp id={2} />
        <Temp id={3} />
        {/* <View style={{ paddingVertical }} />
          <View style={{ paddingVertical }} />
          <View style={{ paddingVertical }} /> */}
      </>
      )}
  />
)

export default ManageBackgroundCheck

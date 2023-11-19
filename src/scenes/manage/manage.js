import React from 'react'
import { Text } from 'react-native-paper'
import ModalTemplate from '../../components/modal-template'
import Temp from './components/template'

// From this page you can manage everything, but not sure if there will be need to display this page directly
// If so, this page will have all the link to other stuff in manage/sections
const Manage = () => (
  <ModalTemplate
    header={<></>}
    subHeader={<Text style={{ top: -7, left: 20 }} variant="headlineSmall">Manage Everything</Text>}
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

export default Manage

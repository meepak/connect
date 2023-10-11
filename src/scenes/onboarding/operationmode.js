import React, { useState } from 'react'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
import CheckboxGroup from '../../components/CheckboxGroup'

import styles from './styles'


const operationModes = ['Online', 'Offline']
// TODO -- geolocation autocomplete
const SelectOperationMode = ({
  businessOperationMode, onBusinessOperationModeChanged,
}) => {
  const [operationMode, setOperationMode] = useState(businessOperationMode)
  return (
      <Surface style={styles.card}>
        <Text style={styles.greetingMessage}>
          What is the mode of operation of your business?
        </Text>

        <Divider style={styles.divider} />

        <CheckboxGroup
          reverse
          items={operationModes.map((item, index) => ({
            id: index + 1,
            text: item,
            value: item,
            checked: '',
          }))}
      // textColor={colorScheme.text} // TODO: Move textColor within component (decide from there)
          onChecked={(value) => {
            console.log(value)
          }}
          maxSelect={operationModes.length}
        />
      </Surface>
  )
}

export default SelectOperationMode

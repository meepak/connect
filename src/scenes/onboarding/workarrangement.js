import React from 'react'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
import CheckboxGroup from '../../components/CheckboxGroup'
import styles from './styles'

const workArrangementPreferences = ['Remote', 'On-site']

const SelectWorkArrangementPreference = ({
  onWorkArrangementPreferenceChanged,
}) => (
  <Surface style={styles.card}>
    <Text style={styles.greetingMessage}>
      How do you prefer to work?
    </Text>

    <Divider style={styles.divider} />

    <CheckboxGroup
      reverse
      items={workArrangementPreferences.map((item, index) => ({
        id: index + 1,
        text: item,
        value: item,
        checked: '',
      }))}
      onChecked={(value) => {
        if (onWorkArrangementPreferenceChanged) onWorkArrangementPreferenceChanged(value)
        console.log(value)
      }}
      maxSelect={workArrangementPreferences.length}
    />
  </Surface>
)

export default SelectWorkArrangementPreference

import React from 'react'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
import RadioButtonGroup from '../../components/RadioButtonGroup'

import styles from './styles'

const educationLevels = [
  'Don\'t care',
  'Certificate',
  'Diploma',
  'Associate\'s degree',
  'Bachelor\'s degree',
  'Master\'s Degree',
  'Doctoral Degree',
]

const SelectEducation = ({
  onEducationChanged,
}) => (
  <Surface style={styles.card}>

    <Text style={styles.greetingMessage}>
      What is the minimum education level you seek in a partner?
    </Text>

    <Divider style={styles.divider} />

    <RadioButtonGroup
      reverse
      items={educationLevels.map((stage, index) => ({
        id: index + 1,
        text: stage,
        value: stage,
        checked: '',
      }))}
      onChecked={(value) => {
        onEducationChanged(value)
      }}
    />
  </Surface>
)

export default SelectEducation

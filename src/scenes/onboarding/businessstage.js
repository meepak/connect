import React from 'react'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
import RadioButtonGroup from '../../components/RadioButtonGroup'

import styles from './styles'

const businessStages = [
  'Idea',
  'Startup',
  'Growth',
  'Established',
  'Scaling',
  'Exit',
]

const SelectBusinessStage = ({
  businessStage, onBusinessStageChanged,
}) => (
  <Surface style={styles.card}>

    <Text style={styles.greetingMessage}>
      What stage is your business in?
    </Text>

    <Divider style={styles.divider} />

    <RadioButtonGroup
      reverse
      items={businessStages.map((stage, index) => ({
        id: index + 1,
        text: stage,
        value: stage,
        checked: businessStage === stage,
      }))}
      // textColor={colorScheme.text} // TODO: Move textColor within component (decide from there)
      onChecked={(value) => {
        onBusinessStageChanged(value)
      }}
    />
  </Surface>
)

export default SelectBusinessStage

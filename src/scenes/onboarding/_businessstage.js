import React from 'react'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
import RadioButtonGroup from '../../components/RadioButtonGroup'
import CheckboxGroup from '../../components/CheckboxGroup'

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
  onBusinessStageChanged, question, allSelect,
}) => (
  <Surface style={styles.card}>

    <Text style={styles.question}>
      {question || 'What stage is your business in?'}
    </Text>

    <Divider style={styles.divider} />

    {
  allSelect
    ? (
      <CheckboxGroup
        items={businessStages.map((stage, index) => ({
          id: stage + 1,
          text: stage,
          value: stage,
          checked: '',
        }))}
        maxSelect={businessStages.length}
        onChecked={(value) => {
          onBusinessStageChanged(value)
        }}
        reverse
      />
    )
    : (
      <RadioButtonGroup
        reverse
        items={businessStages.map((stage, index) => ({
          id: index + 1,
          text: stage,
          value: stage,
          checked: '',
        }))}
        onChecked={(value) => {
          onBusinessStageChanged(value)
        }}
      />
    )
    }
  </Surface>
)

export default SelectBusinessStage

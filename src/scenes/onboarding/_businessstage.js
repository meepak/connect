import React from 'react'
import {
  Surface, Text, Divider, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import RadioButtonGroup from '../../components/core/RadioButtonGroup'
import CheckboxGroup from '../../components/core/CheckboxGroup'

import Styles from './Styles'

const businessStages = [
  'Idea',
  'Startup',
  'Growth',
  'Established',
  'Scaling',
  'Exit',
]

const SelectBusinessStage = ({
  onBusinessStageChanged, question, allSelect, initialValues, error, onLayout,
}) => {
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
  return (
    <Surface style={styles.card} onLayout={onLayout}>

      <Text style={styles.question}>
        {question || 'What stage is your business in?'}
        {
        error
          ? <Text style={styles.error}> *Required</Text>
          : null
        }
      </Text>

      <Divider style={styles.divider} />

      {
  allSelect
    ? (
      <CheckboxGroup
        items={businessStages.map((stage, index) => ({
          id: index + 1,
          text: stage,
          value: stage,
          checked: initialValues?.includes(stage),
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
          checked: initialValues === stage,
        }))}
        onChecked={(value) => {
          onBusinessStageChanged(value)
        }}
      />
    )
    }
    </Surface>
  )
}

SelectBusinessStage.propTypes = {
  question: PropTypes.string,
  allSelect: PropTypes.bool,
  onBusinessStageChanged: PropTypes.func.isRequired,
  initialValues: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.string), PropTypes.string]),
  error: PropTypes.bool,
  onLayout: PropTypes.func.isRequired,
}

SelectBusinessStage.defaultProps = {
  question: null,
  allSelect: false,
  initialValues: null,
  error: false,
}

export default SelectBusinessStage

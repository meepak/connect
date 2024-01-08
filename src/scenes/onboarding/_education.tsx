import React from 'react'
import {
  Surface, Text, Divider, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import RadioButtonGroup from '@/components/core/radio-button-group'
import Styles from './styles'

const educationLevels = [
  'None',
  'High School',
  'Certificate',
  'Diploma',
  'Associate\'s degree',
  'Bachelor\'s degree',
  'Master\'s Degree',
  'Doctoral Degree',
]

const SelectEducation = ({
  onEducationChanged, question, initialValue, error, onLayout,
}) => {
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
  return (
    <Surface style={styles.card} onLayout={onLayout}>

      <Text style={styles.question}>
        { question || 'What is the minimum education level you seek in a partner?' }
        {
        error
          ? <Text style={styles.error}> *Required</Text>
          : null
        }
      </Text>

      <Divider style={styles.divider} />

      <RadioButtonGroup
        reverse
        items={educationLevels.map((stage, index) => ({
          id: index + 1,
          text: stage,
          value: stage,
          checked: initialValue === stage,
        }))}
        onChecked={(value) => {
          onEducationChanged(value)
        }}
      />
    </Surface>
  )
}

SelectEducation.propTypes = {
  question: PropTypes.string,
  onEducationChanged: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  error: PropTypes.bool,
  onLayout: PropTypes.func.isRequired,
}

SelectEducation.defaultProps = {
  question: null,
  initialValue: '',
  error: false,
}

export default SelectEducation

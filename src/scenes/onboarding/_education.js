import React from 'react'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import RadioButtonGroup from '../../components/RadioButtonGroup'
import styles from './styles'

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
  onEducationChanged, question,
}) => (
  <Surface style={styles.card}>

    <Text style={styles.question}>
      { question || 'What is the minimum education level you seek in a partner?' }
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

SelectEducation.propTypes = {
  question: PropTypes.string,
  onEducationChanged: PropTypes.func.isRequired,
}

SelectEducation.defaultProps = {
  question: null,
}

export default SelectEducation

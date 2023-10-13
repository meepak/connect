import React, { useState } from 'react'
import {
  Surface, Text, Divider, SegmentedButtons,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import styles from './styles'

const SelectWorkArrangementPreference = ({
  onWorkArrangementPreferenceChanged,
}) => {
  const [answer, setAnswer] = useState()

  return (
    <Surface style={styles.card}>
      <Text style={styles.question}>
        How do you prefer to work?
      </Text>

      <Divider style={styles.divider} />

      <SegmentedButtons
        style={styles.segmentedButtons}
        value={answer}
        onValueChange={(value) => {
          setAnswer(value)
          if (onWorkArrangementPreferenceChanged) onWorkArrangementPreferenceChanged(value)
        }}
        buttons={[
          {
            value: 'remote',
            label: 'Remote',
          },
          {
            value: 'onsite',
            label: 'On-Site',
          },
          {
            value: 'hybrid',
            label: 'Hybrid',
          },
        ]}
      />
    </Surface>
  )
}

SelectWorkArrangementPreference.propTypes = {
  onWorkArrangementPreferenceChanged: PropTypes.func.isRequired,
}

export default SelectWorkArrangementPreference

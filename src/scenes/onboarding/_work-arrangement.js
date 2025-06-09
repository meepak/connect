import React, { useState } from 'react'
import {
  Surface, Text, Divider, SegmentedButtons, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import Styles from './styles'

const SelectWorkArrangementPreference = ({
  onWorkArrangementPreferenceChanged, initialValue, error, onLayout,
}) => {
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
  const [answer, setAnswer] = useState(initialValue)

  return (
    <Surface style={styles.card} onLayout={onLayout}>
      <Text style={styles.question}>
        How do you prefer to work?
        {
        error
          ? <Text style={styles.error}> *Required</Text>
          : null
        }
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
  initialValue: PropTypes.string,
  error: PropTypes.bool,
  onLayout: PropTypes.func.isRequired,
}

SelectWorkArrangementPreference.defaultProps = {
  initialValue: '',
  error: false,
}

export default SelectWorkArrangementPreference

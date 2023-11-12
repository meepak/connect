import React, { useState } from 'react'
import {
  Surface, Text, Divider, SegmentedButtons, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import Styles from './Styles'

const SelectOperationMode = ({
  onBusinessOperationModeChanged, question, initialValue, error, onLayout,
}) => {
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
  const [answer, setAnswer] = useState(initialValue)
  return (
    <Surface style={styles.card} onLayout={onLayout}>
      <Text style={styles.question}>
        {question || 'How does your business primarily operate?' }
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
          if (onBusinessOperationModeChanged) onBusinessOperationModeChanged(value)
        }}
        buttons={[
          {
            value: 'online',
            label: 'Online',
          },
          {
            value: 'offline',
            label: 'Offline',
          },
          {
            value: 'both',
            label: 'Both',
          },
        ]}
      />

    </Surface>
  )
}

SelectOperationMode.propTypes = {
  question: PropTypes.string,
  onBusinessOperationModeChanged: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
  error: PropTypes.bool,
  onLayout: PropTypes.func.isRequired,
}

SelectOperationMode.defaultProps = {
  question: null,
  initialValue: '',
  error: false,
}

export default SelectOperationMode

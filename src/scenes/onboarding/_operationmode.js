import React, { useState } from 'react'
import {
  Surface, Text, Divider, SegmentedButtons, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import Styles from './Styles'

const SelectOperationMode = ({
  onBusinessOperationModeChanged, question, initialValue,
}) => {
  const { fonts } = useTheme()
  const styles = Styles(fonts)
  const [answer, setAnswer] = useState(initialValue)
  return (
    <Surface style={styles.card}>
      <Text style={styles.question}>
        {question || 'How does your business primarily operate?' }
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
}

SelectOperationMode.defaultProps = {
  question: null,
  initialValue: '',
}

export default SelectOperationMode

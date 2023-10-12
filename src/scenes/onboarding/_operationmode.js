import React, { useState } from 'react'
import {
  Surface, Text, Divider, SegmentedButtons,
} from 'react-native-paper'
import styles from './styles'

const SelectOperationMode = ({
  onBusinessOperationModeChanged, question,
}) => {
  const [answer, setAnswer] = useState()

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

export default SelectOperationMode

import React, { useState } from 'react'
import {
  Surface, Text, Divider, SegmentedButtons,
} from 'react-native-paper'

import styles from './styles'

const SelectYesNo = ({
  OnYesNoSelected, question,
}) => {
  const [answer, setAnswer] = useState()
  return (
    <Surface style={styles.card}>

      <Text style={styles.question}>
        {question}
      </Text>

      <Divider style={styles.divider} />

      <SegmentedButtons
        style={styles.segmentedButtons}
        value={answer}
        onValueChange={(value) => {
          setAnswer(value)
          OnYesNoSelected(value)
        }}
        buttons={[
          {
            value: 'yes',
            label: 'Yes',
          },
          {
            value: 'no',
            label: 'No',
          },
          {
            value: 'maybe',
            label: 'May Be',
          },
        ]}
      />

    </Surface>
  )
}

export default SelectYesNo

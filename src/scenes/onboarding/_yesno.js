import React, { useState } from 'react'
import {
  Surface, Text, Divider, SegmentedButtons, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import Styles from './Styles'

const SelectYesNo = ({
  OnYesNoSelected, question, initialValue,
}) => {
  const { fonts } = useTheme()
  const styles = Styles(fonts)
  const [answer, setAnswer] = useState(initialValue)
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

SelectYesNo.propTypes = {
  question: PropTypes.string.isRequired,
  OnYesNoSelected: PropTypes.func.isRequired,
  initialValue: PropTypes.string,
}

SelectYesNo.defaultProps = {
  initialValue: null,
}

export default SelectYesNo

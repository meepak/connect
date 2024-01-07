import React, { useState } from 'react'
import {
  Surface, Text, Divider, SegmentedButtons, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import Styles from './styles'

const SelectYesNo = ({
  OnYesNoSelected, question, initialValue, error, onLayout,
}) => {
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
  const [answer, setAnswer] = useState(initialValue)
  return (
    <Surface style={styles.card} onLayout={onLayout}>

      <Text style={styles.question}>
        {question}
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
  error: PropTypes.bool,
  onLayout: PropTypes.func.isRequired,
}

SelectYesNo.defaultProps = {
  initialValue: null,
  error: false,
}

export default SelectYesNo

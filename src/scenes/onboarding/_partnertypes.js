import React from 'react'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import CheckboxGroup from '../../components/core/CheckboxGroup'
import styles from './styles'

const operationModes = ['Investor', 'Active partner', 'Advisory partner']

const SelectPartnerTypes = ({
  onPartnerTypesChanged, question,
}) => (
  <Surface style={styles.card}>
    <Text style={styles.question}>
      {question || 'What type of partner(s) are you looking for?'}
    </Text>

    <Divider style={styles.divider} />

    <CheckboxGroup
      reverse
      items={operationModes.map((item, index) => ({
        id: index + 1,
        text: item,
        value: item,
        checked: '',
      }))}
      // textColor={colorScheme.text} // TODO: Move textColor within component (decide from there)
      onChecked={(value) => {
        if (onPartnerTypesChanged) onPartnerTypesChanged(value)
        console.log(value)
      }}
      maxSelect={operationModes.length}
    />
  </Surface>
)

SelectPartnerTypes.propTypes = {
  question: PropTypes.string,
  onPartnerTypesChanged: PropTypes.func.isRequired,
}

SelectPartnerTypes.defaultProps = {
  question: null,
}

export default SelectPartnerTypes

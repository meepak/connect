import React from 'react'
import {
  Surface, Text, Divider, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import CheckboxGroup from '../../components/core/checkbox-group'
import Styles from './styles'

const operationModes = ['Investor', 'Active partner', 'Advisory partner']

const SelectPartnerTypes = ({
  onPartnerTypesChanged, question, initialValues, error, onLayout,
}) => {
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
  return (
    <Surface style={styles.card} onLayout={onLayout}>
      <Text style={styles.question}>
        {question || 'What type of partner(s) are you looking for?'}
        {
        error
          ? <Text style={styles.error}> *Required</Text>
          : null
        }
      </Text>

      <Divider style={styles.divider} />

      <CheckboxGroup
        reverse
        items={operationModes.map((item, index) => ({
          id: index + 1,
          text: item,
          value: item,
          checked: initialValues.includes(item),
        }))}
      // textColor={colorScheme.text} // TODO: Move textColor within component (decide from there)
        onChecked={(value) => {
          if (onPartnerTypesChanged) onPartnerTypesChanged(value)
        }}
        maxSelect={operationModes.length}
      />
    </Surface>
  )
}

SelectPartnerTypes.propTypes = {
  question: PropTypes.string,
  onPartnerTypesChanged: PropTypes.func.isRequired,
  initialValues: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.bool,
  onLayout: PropTypes.func.isRequired,
}

SelectPartnerTypes.defaultProps = {
  question: null,
  initialValues: [],
  error: false,
}

export default SelectPartnerTypes

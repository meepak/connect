import React from 'react'
import {
  Surface, Text, Divider, useTheme,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import CheckboxGroup from '../../components/core/CheckboxGroup'
import Styles from './Styles'

const industries = [
  'Agriculture and Agribusiness',
  'Manufacturing',
  'Energy and Utilities',
  'Information Technology (IT) and Software',
  'Healthcare and Pharmaceuticals',
  'Financial Services and Banking',
  'Transportation and Logistics',
  'Retail and Consumer Goods',
  'Real Estate and Construction',
  'Education and Training',
]

const SelectIndustries = ({
  maxSelect, onChecked, question, initialValues, error, onLayout,
}) => {
  const { colors, fonts } = useTheme()
  const styles = Styles(colors, fonts)
  return (
    <Surface style={styles.card} onLayout={onLayout}>
      <Text style={styles.question}>
        {question || `Select up to ${maxSelect} related industries.`}
        {
        error
          ? <Text style={styles.error}> *Required</Text>
          : null
        }
      </Text>
      <Divider style={styles.divider} />
      <CheckboxGroup
        items={industries.map((industry, index) => ({
          id: index + 1,
          text: industry,
          value: industry,
          checked: initialValues.includes(industry),
        }))}
        maxSelect={maxSelect}
        onChecked={onChecked || (() => {})}
        reverse
        initialValues={initialValues}
      />
    </Surface>
  )
}

SelectIndustries.propTypes = {
  question: PropTypes.string,
  maxSelect: PropTypes.number.isRequired,
  onChecked: PropTypes.func.isRequired,
  initialValues: PropTypes.arrayOf(PropTypes.string),
  error: PropTypes.bool,
  onLayout: PropTypes.func.isRequired,
}

SelectIndustries.defaultProps = {
  question: null,
  initialValues: [],
  error: false,
}

export default SelectIndustries

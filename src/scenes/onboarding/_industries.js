import React from 'react'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import CheckboxGroup from '../../components/CheckboxGroup'
import styles from './styles'

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
  maxSelect, onChecked, question,
}) => (
  <Surface style={styles.card}>
    <Text style={styles.question}>
      {question || `Select up to ${maxSelect} related industries.`}
    </Text>
    <Divider style={styles.divider} />
    <CheckboxGroup
      items={industries.map((industry, index) => ({
        id: index + 1,
        text: industry,
        value: industry,
        checked: '',
      }))}
      maxSelect={maxSelect}
      onChecked={onChecked || (() => {})}
      reverse
    />
  </Surface>
)

SelectIndustries.propTypes = {
  question: PropTypes.string,
  maxSelect: PropTypes.number.isRequired,
  onChecked: PropTypes.func.isRequired,
}

SelectIndustries.defaultProps = {
  question: null,
}

export default SelectIndustries

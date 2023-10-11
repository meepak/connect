import React from 'react'
import {
  Surface, Text, Divider,
} from 'react-native-paper'
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
  maxSelect = 3, onChecked, checked,
}) => (
  <Surface style={styles.card}>
    <Text style={styles.greetingMessage}>
      {maxSelect > 1 ? `Select up to ${maxSelect} related industries.` : 'Select your industry.'}
    </Text>
    <Divider style={styles.divider} />
    <CheckboxGroup
      items={industries.map((industry, index) => ({
        id: index + 1,
        text: industry,
        value: industry,
        checked: checked && checked.isArray() ? checked.includes(industry) : false,
      }))}
      maxSelect={maxSelect}
      // textColor={colorScheme.text}
      onChecked={onChecked || (() => {})}
      reverse
    />
  </Surface>
)

export default SelectIndustries

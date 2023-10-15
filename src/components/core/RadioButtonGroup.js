import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

import {
  RadioButton,
} from 'react-native-paper'

import PropTypes from 'prop-types'
import { layout } from '../../theme'

const styles = StyleSheet.create({
  container: {
    // paddingVertical: 8,
    // marginTop: layout.marginTop,

  },
  row: {
    marginLeft: layout.marginLeft,
    marginRight: layout.marginRight,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: 1,
  },
  labelStyle: {
    // fontSize: fontSize.middle,
  },
})

/*
const items = [
  {
    id: '1',
    text: 'Option 1 label text for radio button',
    value: 'option1',
    checked: true
  },
  ...
]
*/
export default function RadioButtonGroup(props) {
  const {
    items, onChecked, reverse,
  } = props

  const checkedItem = items.find((item) => item.checked && item.checked === true)

  const [value, setValue] = useState(checkedItem ? checkedItem.value : null)

  const handleCheckChange = (newValue) => {
    setValue(newValue)
    onChecked(newValue)
  }

  const flexStyle = reverse ? { flexDirection: 'row-reverse', alignSelf: 'flex-start' } : { flexDirection: 'row' }
  return (
    <RadioButton.Group style={styles.container} onValueChange={(newValue) => handleCheckChange(newValue)} value={value}>
      {items.map((item) => (
        <RadioButton.Item mode="android" key={item.id} style={[styles.row, flexStyle]} labelStyle={styles.labelStyle} label={item.text} value={item.value} />
      ))}
    </RadioButton.Group>
  )
}

RadioButtonGroup.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onChecked: PropTypes.func.isRequired,
  reverse: PropTypes.bool,
}

RadioButtonGroup.defaultProps = {
  reverse: false,
}

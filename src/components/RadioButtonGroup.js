import React, { useState } from 'react'
import { StyleSheet } from 'react-native'

import {
  RadioButton,
} from 'react-native-paper'

import PropTypes from 'prop-types'
import { layout, fontSize, colors } from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    marginTop: layout.marginTop,
  },
  row: {
    marginLeft: layout.marginLeft,
    marginRight: layout.marginRight,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
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
    items, onChecked, textColor,
  } = props

  const checkedItem = items.find((item) => item.checked && item.checked === true)

  const [value, setValue] = useState(checkedItem ? checkedItem.value : null)

  const handleCheckChange = (newValue) => {
    setValue(newValue)
    onChecked(newValue)
  }

  return (
    <RadioButton.Group style={styles.container} onValueChange={(newValue) => handleCheckChange(newValue)} value={value}>
      {items.map((item) => (
        <RadioButton.Item key={item.id} style={styles.row} /*labelStyle={{ color: textColor }}*/ label={item.text} value={item.value} />
      ))}
    </RadioButton.Group>
  )
}

// RadioButton.propTypes = {
//   items: PropTypes.func.isRequired,
//   onChecked: PropTypes.func.isRequired,
//   textColor: PropTypes.string.isRequired,
// }

import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Checkbox from './Checkbox'

export default function CheckboxGroup(props) {
  const {
    items, maxSelect, onChecked, reverse,
  } = props

  const [checkedValues, setCheckedValues] = useState([])

  useEffect(() => {
    onChecked(checkedValues)
  }, [checkedValues, onChecked])

  const handleCheckboxChange = (value, isChecked) => {
    if (isChecked && checkedValues.length < maxSelect) {
      setCheckedValues([...checkedValues, value])
    } else if (!isChecked) {
      setCheckedValues(checkedValues.filter((item) => item !== value))
    }
  }

  return (
    <View>
      {items.map((item) => (
        <Checkbox
          key={item.id}
          label={item.text}
          checked={checkedValues.includes(item.value)}
          onChecked={(isChecked) => {
            if (checkedValues.length < maxSelect || checkedValues.includes(item.value)) {
              handleCheckboxChange(item.value, isChecked)
            }
          }}
          disabled={checkedValues.length >= maxSelect && !checkedValues.includes(item.value)}
          reverse={reverse ?? true}
        />
      ))}
    </View>
  )
}

CheckboxGroup.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
  })).isRequired,
  maxSelect: PropTypes.number.isRequired,
  onChecked: PropTypes.func.isRequired,
  reverse: PropTypes.bool,
}

CheckboxGroup.defaultProps = {
  reverse: false,
}

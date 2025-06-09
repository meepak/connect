import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import PropTypes from 'prop-types'
import Checkbox from './checkbox'

export default function CheckboxGroup(props) {
  const {
    items, maxSelect, onChecked, reverse,
  } = props

  // get array of item.value from items array where item.checked is true
  const initialValues = items.filter((item) => item.checked && item.checked === true).map((item) => item.value)

  const [checkedValues, setUserDataLoadedValues] = useState(initialValues)

  useEffect(() => {
    onChecked(checkedValues)
  }, [checkedValues, onChecked])

  const handleCheckboxChange = (value, isChecked) => {
    if (isChecked && checkedValues.length < maxSelect) {
      setUserDataLoadedValues([...checkedValues, value])
    } else if (!isChecked) {
      setUserDataLoadedValues(checkedValues.filter((item) => item !== value))
    }
  }

  return (
    <View>
      {items.map((item) => (
        <Checkbox
          key={item.id}
          label={item.text}
          checked={item.checked}
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

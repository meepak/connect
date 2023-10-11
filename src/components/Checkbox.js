import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import {
  Checkbox as SystemCheckBox,
  Paragraph,
  TouchableRipple,
} from 'react-native-paper'
import PropTypes from 'prop-types'
import { layout } from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  row: {
    marginLeft: layout.marginLeft + 15,
    marginRight: layout.marginRight + 15,
    marginTop: layout.marginTop - 10,
    marginBottom: layout.marginBottom - 5,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default function Checkbox(props) {
  const {
    label, checked, disabled, onChecked, reverse,
  } = props
  const [isChecked, setIsChecked] = useState(checked)

  const handleCheckChange = () => {
    const newCheckedState = !isChecked
    setIsChecked(newCheckedState)
    if (onChecked) {
      onChecked(newCheckedState)
    }
  }

  const flexStyle = reverse ? { flexDirection: 'row-reverse', alignSelf: 'flex-start' } : { flexDirection: 'row' }
  return (
    <TouchableRipple onPress={handleCheckChange} disabled={disabled}>
      <View style={[styles.row, flexStyle]}>
        <Paragraph>
          {label}
        </Paragraph>
        <View pointerEvents="none">
          <SystemCheckBox status={isChecked ? 'checked' : 'unchecked'} disabled={disabled} />
        </View>
      </View>
    </TouchableRipple>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onChecked: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  reverse: PropTypes.bool,
}

Checkbox.defaultProps = {
  checked: false,
  disabled: false,
  reverse: false,
}

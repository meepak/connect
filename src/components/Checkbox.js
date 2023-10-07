import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'

import {
  Checkbox as SystemCheckBox,
  Paragraph,
  TouchableRipple,
} from 'react-native-paper'

import PropTypes from 'prop-types'
import { layout, fontSize, colors } from '../theme'

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
  },
  row: {
    marginLeft: layout.marginLeft,
    marginRight: layout.marginRight,
    marginTop: layout.marginTop,
    marginBottom: layout.marginBottom,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
})

export default function Checkbox(props) {
  const {
    label, checked, disable, onCheckChanged, textColor,
  } = props
  const [isChecked, setIsChecked] = useState(checked)

  const handleCheckChange = () => {
    const newCheckedState = !isChecked
    setIsChecked(newCheckedState)
    if (onCheckChanged) {
      onCheckChanged(newCheckedState)
    }
  }

  return (
    <TouchableRipple onPress={handleCheckChange}>
      <View style={styles.row}>
        <Paragraph style={{ color: textColor }}>{label}</Paragraph>
        <View pointerEvents="none">
          {disable
            ? <SystemCheckBox status={isChecked ? 'checked' : 'unchecked'} disabled />
            : <SystemCheckBox status={isChecked ? 'checked' : 'unchecked'} />}
        </View>
      </View>
    </TouchableRipple>
  )
}

Checkbox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onCheckChanged: PropTypes.func.isRequired,
  textColor: PropTypes.string.isRequired,
  disable: PropTypes.bool,
}

Checkbox.defaultProps = {
  checked: false,
  disable: false,
}

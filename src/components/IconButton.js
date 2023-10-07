import React from 'react'
import { TouchableOpacity } from 'react-native'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import PropTypes from 'prop-types'

const IconButton = (props) => {
  const {
    icon, onPress, color, size, containerStyle,
  } = props

  return (
    <TouchableOpacity
      onPress={onPress}
      style={containerStyle}
    >
      <FontIcon
        name={icon}
        color={color}
        size={size}
      />
    </TouchableOpacity>
  )
}

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  size: PropTypes.number.isRequired,
  // containerStyle: ViewPropTypes.isRequired,
}

export default IconButton

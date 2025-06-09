import React from 'react'
import { IconButton, useTheme } from 'react-native-paper'
import PropTypes from 'prop-types'
import { convertHexToRGBA } from '../utils/functions'

const PencilIconButton = ({
  onPress, top, right, bgColor, bgAlpha,
}) => {
  const { colors } = useTheme()
  const backgroundColor = convertHexToRGBA(bgColor ?? colors.onBackground, bgAlpha)
  return (
    <IconButton
      icon="pencil"
      size={22}
      iconColor={colors.onBackground}
      style={{
        position: 'absolute',
        top,
        right,
        backgroundColor,
        borderRadius: 20,
        width: 33,
        height: 33,
      }}
      onPress={onPress}
    />
  )
}

PencilIconButton.propTypes = {
  onPress: PropTypes.func.isRequired,
  top: PropTypes.number,
  right: PropTypes.number,
  bgColor: PropTypes.string,
  bgAlpha: PropTypes.number,
}

PencilIconButton.defaultProps = {
  top: 30,
  right: 10,
  bgColor: null,
  bgAlpha: 0.1,
}

export default PencilIconButton

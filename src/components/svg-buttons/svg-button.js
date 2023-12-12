import React from 'react'
import { TouchableHighlight } from 'react-native'
import PropTypes from 'prop-types'
import Animated, {
  useSharedValue, withRepeat, withSequence, withTiming,
} from 'react-native-reanimated'
import { TouchableOpacity } from 'react-native'

const SvgButton = ({
  size, color, onPress, children,
}) => {
  const initialSize = useSharedValue(size)
  const TIME = 200
  const handlePress = () => {
    initialSize.value = withSequence(
      withRepeat(withTiming(size * 1.5, { duration: TIME }), 2, true),
      withTiming(size, { duration: TIME }),
    )
    console.log('pressed social login..')
    // delay
    onPress()
  }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={{
        width: size + 20,
        height: size + 20,
        borderRadius: ((size + 20) / 2),
        borderWidth: 1,
        borderColor: color,
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: color,
        activeOpacity: 0.5,
      }}
    >
      <Animated.View style={{
        width: initialSize,
        height: initialSize,
      }}
      >
        {children}
      </Animated.View>
    </TouchableOpacity>
  )
}

SvgButton.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}
export default SvgButton

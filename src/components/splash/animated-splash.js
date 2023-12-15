import React from 'react'
import { Dimensions, StyleSheet, View } from 'react-native'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withRepeat,
} from 'react-native-reanimated'
import PropTypes from 'prop-types'
import SvgLogo from '../svg-animation/svg-logo'
import SvgFind from '../svg-animation/svg-find'
import SvgAssociate from '../svg-animation/svg-associate'

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height,
  },
  fixed: {
    position: 'absolute', 
    left: 0, 
    top: 0,
  },
  logo: {
    width: 150, // to 150
    height: 150, // to 150
  },
  find: {
    width: 100,
    height: 60,
  },
  associate: {
    width: 225,
    height: 60,
  },
})

const initialLogoScale = 0.1
const initialLogoOffset = 0
const initialFindOffset = -width/2-100
const initialAssociateOffset = width/2+132

const AnimatedSplash = ({ onLoaded }) => {
  const scaleLogo = useSharedValue(initialLogoScale)
  const offsetLogo = useSharedValue(initialLogoOffset)
  const offsetFind = useSharedValue(initialFindOffset)
  const offsetAssociate = useSharedValue(initialAssociateOffset)

  const animatedLogoStyles = useAnimatedStyle(() => ({
    transform: [{ translateY: offsetLogo.value}, { scale: scaleLogo.value}],
  }))
  const animatedFindStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetFind.value }],
  }))
  const animatedAssociateStyles = useAnimatedStyle(() => ({
    transform: [{ translateX: offsetAssociate.value }],
  }))

  React.useEffect(() => {
    // first scale logo by 15
    scaleLogo.value = withSpring(1)

    // if(scaleLogo.value >= 1) { // only move after scaling done, probably withSequence can do this better
    // highlight-next-line
        offsetLogo.value = withSpring(-100)
      if(offsetLogo.value > -90) {
        offsetFind.value = withSpring(-110)
        offsetAssociate.value = withSpring(62)
      }
    }, [])

  React.useEffect(() => {
    if (onLoaded) onLoaded(true)
  }, [])
  return (
  <><View  pointerEvents="none" style={{ ...styles.container, ...styles.fixed, zIndex: 200 }}>
      <Animated.View  pointerEvents="none" style={[styles.logo, animatedLogoStyles,]}>
        <SvgLogo />
      </Animated.View>
    </View><View style={{ ...styles.container, ...styles.fixed, zIndex: 100 }}>
      </View><View  pointerEvents="none" style={{ ...styles.container, position: 'absolute', left: 0, top: 0 }}>
        <Animated.View  pointerEvents="none" style={[styles.find, animatedFindStyles]}>
          <SvgFind />
        </Animated.View>
      </View><View  pointerEvents="none" style={{ ...styles.container, ...styles.fixed, zIndex: 100 }}>
        <Animated.View  pointerEvents="none" style={[styles.associate, animatedAssociateStyles]}>
          <SvgAssociate />
        </Animated.View>
      </View></>
  )
}
AnimatedSplash.propTypes = {
  onLoaded: PropTypes.func,
}

AnimatedSplash.defaultProps = {
  onLoaded: null,
}

export default AnimatedSplash

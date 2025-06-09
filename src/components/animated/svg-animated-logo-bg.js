import React, {useEffect} from 'react'

import SvgLogo from '../svg/svg-logo'
import { Dimensions, View } from 'react-native'
import Animated, 
{ 
    useSharedValue, 
    withRepeat, 
    withTiming, 
    withSequence, 
    Easing 
} from 'react-native-reanimated'

// TODO -- use reduce motion to disable background animation on slower devices
// reduceMotion: ReduceMotion.System
const SvgAnimatedLogoBg = () => {
    const {width, height} = Dimensions.get('screen')
    const logoWidth = useSharedValue(width * 3)

    useEffect(() => {
        logoWidth.value = withRepeat(withSequence(
                        withTiming(width * 3.5, {duration: 5000, easing: Easing.linear }), 
                        withTiming(width * 3, {duration: 5000, easing: Easing.linear})
                        ), -1, false)
    }, [])

    return (
        <View 
            style={{
                        position: 'absolute', 
                        top: 0, 
                        left: 0, 
                        width: width, 
                        height: height
                    }}>
            <Animated.View 
                style={{
                            opacity: 0.1, 
                            position:'absolute', 
                            width: logoWidth, 
                            height: logoWidth, 
                            bottom: -width*0.7, 
                            right: -width*0.7
                        }}>
                <SvgLogo />
            </Animated.View>
        </View>
    )
}

export default SvgAnimatedLogoBg
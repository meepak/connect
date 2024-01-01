import React from 'react'
import { Text } from 'react-native-paper'
import Animated from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { getGreeting } from '../../../utils/functions'
import AnimatedName from '../../../components/animated/animated-name'

const IntroSceneOne = ({width, height}) => {
    const styles = StyleSheet.create({
        container: {
            width: width,
            height: height,
            flex: 1,
            borderWidth: 5,
            borderColor: 'red'
        },
    })
    return (
    <Animated.View style={styles.container}>
        <AnimatedName />
        <Text variant='titleMedium'>{ getGreeting() + '!'}</Text>
    </Animated.View>
)}

IntroSceneOne.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}

export default IntroSceneOne
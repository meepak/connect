import React from 'react'
import { Text } from 'react-native-paper'
import Animated from 'react-native-reanimated'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const IntroSceneTwo = ({width, height}) => {
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
        <Text variant='titleMedium'>Let's get onboarded</Text>
    </Animated.View>
)}

IntroSceneOne.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
}


export default IntroSceneTwo
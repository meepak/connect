/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react'
import { TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import PropTypes from 'prop-types'

const TypewriterText = ({
  text, variant, style, onFinished, replay,
}) => {
  const [displayText, setDisplayText] = useState('')
  const charIndexRef = useRef(0)
  const intervalIdRef = useRef(null)

  useEffect(() => {
    const startTypingAnimation = () => {
      intervalIdRef.current = setInterval(() => {
        setDisplayText(() => {
          if (charIndexRef.current === text.length) {
            clearInterval(intervalIdRef.current)
            // Typing animation complete
            if (onFinished) onFinished(true)
            return text
          }
          charIndexRef.current += 1
          return text.substring(0, charIndexRef.current)
        })
      }, 100) // Adjust the interval for typing speed
    }

    if (replay) {
      // Reset the state and start typing animation again
      setDisplayText('')
      charIndexRef.current = 0
      clearInterval(intervalIdRef.current)
      startTypingAnimation()
    } else {
      startTypingAnimation()
    }

    return () => clearInterval(intervalIdRef.current) // Cleanup on component unmount
  }, [text, replay])

  return (
    <Text style={style ?? { fontWeight: 300 }} variant={variant ?? 'bodyLarge'}>
      {displayText}
    </Text>
  )
}

TypewriterText.propTypes = {
  text: PropTypes.string.isRequired,
  variant: PropTypes.string,
  style: PropTypes.shape(TextStyle),
  onFinished: PropTypes.func,
  replay: PropTypes.bool,
}

TypewriterText.defaultProps = {
  variant: 'bodyLarge',
  style: { fontWeight: 300 },
  onFinished: null,
  replay: false,
}

export default TypewriterText

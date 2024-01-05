/* eslint-disable react/prop-types */
import React, { useState, useEffect, useRef } from 'react'
import { TextStyle } from 'react-native'
import { Text } from 'react-native-paper'
import PropTypes from 'prop-types'

const TypewriterText = ({
  text, variant, style, onFinished, replay,
}) => {
  const [displayText, setDisplayText] = useState('')
  const [cursorblinkCounter, setCursorBlinkCounter] = useState(0)
  const charIndexRef = useRef(0)
  const intervalIdRef = useRef(null)
  const cursor = '_'
  const delay = 150

  useEffect(() => {
    const startTypingAnimation = () => {
      intervalIdRef.current = setInterval(() => {
          if (charIndexRef.current === text.length) {
            //display cursor blink for 5 times before decoaring all typed'
            // if(cursorblinkCounter < 10) {
            //   setCursorBlinkCounter((count) => count+1)
            //   if(displayText[-1] === '_') return text
            //   else return text + '_'
            // }
            // Typing animation complete
            finishedTypingAnimation()
            setDisplayText(() =>  text)
          } else {
            charIndexRef.current += 1 
            setDisplayText(() => text.substring(0, charIndexRef.current) + cursor)
          }
      }, delay) // Adjust the interval for typing speed

      const finishedTypingAnimation = () => {
        clearInterval(intervalIdRef.current)
        if (onFinished) onFinished(true)
      }
    }


    // if (replay) {
    //   // Reset the state and start typing animation again
    //   setDisplayText('')
    //   charIndexRef.current = 0
    //   clearInterval(intervalIdRef.current)
    //   startTypingAnimation()
    // } else {
      startTypingAnimation()
    // }
    return () => clearInterval(intervalIdRef.current) // Cleanup on component unmount
  }, [text]) //, replay])

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
  // replay: PropTypes.bool,
}

TypewriterText.defaultProps = {
  variant: 'bodyLarge',
  style: { fontWeight: 300 },
  onFinished: null,
  // replay: false,
}

export default TypewriterText

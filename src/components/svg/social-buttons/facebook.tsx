import React from 'react'
import Svg, { Path } from 'react-native-svg'
import PropTypes from 'prop-types'
import SvgButton from './svg-button'

const Facebook = ({ size, color, onPress }) => (
  <SvgButton size={size} color={color} onPress={onPress}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{
        top: -1,
      }}
    >
      <Path
        d="M24 12c0-6.629-5.371-12-12-12S0 5.371 0 12c0 5.629 3.875 10.352 9.102 11.648v-7.98H6.625V12h2.477v-1.582c0-4.082 1.847-5.977 5.859-5.977.758 0 2.07.149 2.605.301v3.324a14.604 14.604 0 0 0-1.382-.046c-1.97 0-2.73.746-2.73 2.683V12h3.921l-.676 3.668h-3.246v8.242C19.395 23.195 24 18.137 24 12"
        style={{
          stroke: 'none',
          fillRule: 'nonzero',
          fill: '#0866ff',
          fillOpacity: 1,
        }}
      />
      <Path
        d="M16.7 15.668 17.374 12h-3.922v-1.297c0-1.937.762-2.683 2.73-2.683.61 0 1.102.015 1.383.046V4.742c-.535-.152-1.847-.3-2.605-.3-4.012 0-5.86 1.894-5.86 5.976V12H6.626v3.668h2.477v7.98a12.218 12.218 0 0 0 4.351.266v-8.246Zm0 0"
        style={{
          stroke: 'none',
          fillRule: 'nonzero',
          fill: '#fff',
          fillOpacity: 1,
        }}
      />
    </Svg>
  </SvgButton>
)

Facebook.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default Facebook

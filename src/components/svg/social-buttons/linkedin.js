import React from 'react'
import Svg, { Path } from 'react-native-svg'
import PropTypes from 'prop-types'
import SvgButton from './svg-button'

const Linkedin = ({ size, color, onPress }) => (
  <SvgButton size={size} color={color} onPress={onPress}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{
        top: -1,
      }}
    >
      <Path
        d="M12 24c6.629 0 12-5.371 12-12S18.629 0 12 0 0 5.371 0 12s5.371 12 12 12Zm0 0"
        style={{
          stroke: 'none',
          fillRule: 'evenodd',
          fill: '#007ebb',
          fillOpacity: 1,
        }}
      />
      <Path
        d="M19.668 19h-3.016v-5.133c0-1.406-.535-2.195-1.648-2.195-1.211 0-1.844.82-1.844 2.195V19h-2.906V9.223h2.906v1.316s.871-1.617 2.95-1.617c2.074 0 3.558 1.27 3.558 3.887ZM6.789 7.941C5.801 7.941 5 7.133 5 6.137s.8-1.805 1.79-1.805c.991 0 1.792.809 1.792 1.805 0 .996-.8 1.804-1.793 1.804ZM5.293 19H8.32V9.223H5.293Zm0 0"
        style={{
          stroke: 'none',
          fillRule: 'evenodd',
          fill: '#fff',
          fillOpacity: 1,
        }}
      />
    </Svg>
  </SvgButton>
)

Linkedin.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default Linkedin

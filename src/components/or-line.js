import React from 'react'
import { Dimensions } from 'react-native'
import {
  Svg, Circle, Line, Text,
} from 'react-native-svg'
import PropTypes from 'prop-types'

const OrLine = ({ color }) => {
  const { width } = Dimensions.get('window')
  const r = 18
  const cx = width / 2
  const s = 1 // stroke

  return (
    <Svg style={{ width: '100%', height: r * 2 + s * 2 }}>
      <Line
        x1={0}
        y1={r + s}
        x2={cx - r}
        y2={r + s}
        stroke={color}
        strokeWidth={1}
      />
      <Circle
        cx={cx}
        cy={r + s}
        r={r}
        stroke={color}
        strokeWidth={s}
        fillOpacity={0}
      />
      <Line
        x1={cx + r}
        y1={r + s}
        x2={width}
        y2={r + s}
        stroke={color}
        strokeWidth={s}
      />
      <Text
        fill={color}
        fontSize="16"
        fontWeight={10}
        x={cx}
        y={r + r / 3 + s}
        textAnchor="middle"
      >
        OR
      </Text>
    </Svg>
  )
}

OrLine.propTypes = {
  color: PropTypes.string.isRequired,
}

export default OrLine

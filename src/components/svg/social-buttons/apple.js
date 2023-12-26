import React from 'react'
import Svg, { Path } from 'react-native-svg'
import PropTypes from 'prop-types'
import SvgButton from './svg-button'

const Google = ({ size, color, onPress }) => (
  <SvgButton size={size} color={color} onPress={onPress}>
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      style={{
        left: 3,
        top: -1,
        zIndex: 100,
      }}
    >
      <Path
        d="M19.793 18.703c-.363.84-.793 1.61-1.293 2.32-.676.97-1.23 1.637-1.66 2.008-.664.61-1.375.922-2.137.942-.547 0-1.207-.157-1.973-.473-.77-.313-1.476-.469-2.125-.469-.68 0-1.406.157-2.183.469-.781.316-1.41.48-1.887.496-.73.031-1.46-.289-2.187-.965-.461-.402-1.043-1.097-1.739-2.078-.746-1.05-1.355-2.265-1.836-3.652C.258 15.8 0 14.35 0 12.949c0-1.61.348-2.996 1.043-4.16A6.15 6.15 0 0 1 3.23 6.58a5.87 5.87 0 0 1 2.954-.833c.582 0 1.34.18 2.285.531.945.356 1.55.532 1.816.532.195 0 .867-.207 2.008-.625 1.078-.391 1.988-.551 2.734-.489 2.02.164 3.536.961 4.543 2.395-1.804 1.094-2.699 2.629-2.68 4.594.016 1.53.57 2.804 1.665 3.816a5.46 5.46 0 0 0 1.66 1.09c-.133.387-.274.758-.422 1.113ZM15.16.48c0 1.2-.437 2.32-1.312 3.36-1.055 1.23-2.328 1.945-3.715 1.832a4.215 4.215 0 0 1-.028-.453c0-1.153.504-2.387 1.395-3.395A5.288 5.288 0 0 1 13.195.551C13.88.215 14.527.03 15.137 0c.015.16.023.32.023.48Zm0 0"
        style={{
          stroke: 'none',
          fillRule: 'nonzero',
          fill: '#b3b3b3',
          fillOpacity: 1,
        }}
      />
    </Svg>
  </SvgButton>
)

Google.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default Google

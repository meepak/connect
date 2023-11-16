import React from 'react'
import {
  Image, StyleSheet, useColorScheme,
} from 'react-native'
import PropTypes from 'prop-types'
import imageAssets from '../../theme/images'

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    alignSelf: 'flex-start',
    marginLeft: 30,
    marginTop: 10,
    marginBottom: 20,
  },
})

export default function Logo({ style }) {
  const scheme = useColorScheme()
  const newStyle = style ?? styles.logo
  return (
    <Image
      style={newStyle} // Merge default styles with the provided style prop
      source={
        scheme === 'dark'
          ? imageAssets.logo_white
          : imageAssets.logo_black
      }
    />
  )
}

Logo.propTypes = {
  style: PropTypes.shape({
    flex: PropTypes.number,
    alignSelf: PropTypes.string,
    marginLeft: PropTypes.number,
    marginTop: PropTypes.number,
    marginBottom: PropTypes.number,
  }),
}

Logo.defaultProps = {
  style: null,
}

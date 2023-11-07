import React from 'react'
import {
  TouchableOpacity, View, Text, StyleSheet,
} from 'react-native'
import { IconButton } from 'react-native-paper'
import PropTypes from 'prop-types'

const IconLink = ({
  marginLeft, icon, text, color, onPress,
}) => {
  const styles = StyleSheet.create({
    iconLink: {
      marginLeft,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    iconLinkLabel: {
      fontSize: 18, // TODO: all font sizes, lineheight must be set in theme param
      color,
      marginLeft: -7,
    },
  })

  return (
    <TouchableOpacity onPress={() => onPress()}>
      <View style={styles.iconLink}>
        <IconButton icon={icon} size={20} iconColor={color} />
        <Text style={styles.iconLinkLabel}>{text}</Text>
      </View>
    </TouchableOpacity>
  )
}
IconLink.propTypes = {
  marginLeft: PropTypes.number.isRequired,
  icon: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
}

export default IconLink

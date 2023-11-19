import React from 'react'
import { Avatar as SystemAvatar } from '@rneui/themed'
import PropTypes from 'prop-types'

const mapNameToColor = (fullName) => {
  // Calculate a hash value for the full name
  let hash = 0
  for (let i = 0; i < fullName.length; i += 1) {
    hash += fullName.charCodeAt(i)
  }

  // Map the hash value to a number between 1 and 7
  const mappedNumber = (Math.abs(hash) % 7)
  const background = ['#401B86', '#2546C9', '#2AD424', '#F0EC25', '#F07537', '#DB3A4C', '#9400D3']
  const text = ['#FFF', '#FFF', '#000', '#000', '#000', '#FFF']
  return { backgroundColor: background[mappedNumber], textColor: text[mappedNumber] }
}

function extractInitials(fullName) {
  const words = fullName.split(' ')
  let initials = ''

  if (words.length === 1) {
    // For 1 word, return first and last character
    const name = words[0].toUpperCase()
    if (name.length >= 2) {
      initials = name.charAt(0) + name.charAt(name.length - 1)
    } else {
      initials = name.charAt(0)
    }
  } else if (words.length > 1) {
    // For more than 1 word, return the initial of the first and last word
    initials = words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase()
  }

  return initials
}

// TODO implement this using AvatarImage & AvatarText from react-native-paper
const Avatar = ({
  rounded, size, width, height, style, fullName, url, onPress, children,
}) => {
  if (url && typeof url === 'string') {
    return (
      <SystemAvatar
        source={{ uri: url }}
        // avatarStyle={style}
        containerStyle={style}
        rounded={rounded ?? true}
        size={size ?? width}
        width={width}
        height={height}
        onPress={onPress ?? null}
      >
        {children ?? null}
      </SystemAvatar>
    )
  } if (fullName) {
    const { backgroundColor, textColor } = mapNameToColor(fullName)
    const initials = extractInitials(fullName)
    return (
      <SystemAvatar
        title={initials}
        containerStyle={[style ?? [], { backgroundColor }]}
        rounded={rounded ?? true}
        size={size ?? width}
        width={width}
        height={height}
        titleStyle={{ color: textColor }}
        onPress={onPress ?? null}
      >
        {children ?? null}
      </SystemAvatar>
    )
  }
  return (<></>)
}

Avatar.propTypes = {
  rounded: PropTypes.bool,
  width: PropTypes.number,
  height: PropTypes.number,
  fullName: PropTypes.string,
  url: PropTypes.string,
  onPress: PropTypes.func,
  children: PropTypes.node,
  size: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  style: PropTypes.shape({
    margin: PropTypes.number,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    borderStyle: PropTypes.string,
  }),
}
Avatar.defaultProps = {
  rounded: true,
  fullName: null,
  url: null,
  onPress: null,
  children: null,
  size: null,
  width: null,
  height: null,
  style: null,
}

export default Avatar

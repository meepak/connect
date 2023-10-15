import React from 'react'
import { Avatar as SystemAvatar } from '@rneui/themed'

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

// TODO implement onError, return error within onEdited
const Avatar = ({
    rounded, width, height, style, fullName, url, onPress, children
}) => {
  if (url) {
    return (
      <SystemAvatar
        source={{ uri: url }}
        avatarStyle={style ?? null}
        rounded={rounded ?? true}
        size={width}
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
        size={width}
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

export default Avatar

import React, { useEffect } from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import PropTypes from 'prop-types'
import { Text } from 'react-native-paper'


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
  
const extractInitials = (fullName) => {
    try {
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
    } catch(e)
    {
        console.log(e)
        return "";
    }
  }

  
const Avatar = ({
    rounded, size, style, fullName, url, onPress, children,
}) => {
    const { backgroundColor, textColor } = mapNameToColor(fullName)

    return (

    <View 
    style={{
      ...style, 
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor,
      elevation: 5, 
      top: 0, 
      width: size, 
      height: size, 
      borderRadius: rounded ? size / 2 : 0,
    }}
    >
        <TouchableOpacity activeOpacity={1} onPress={onPress ??  null}>
    {(url && typeof url === 'string')
    ? (
        // TODO handle image preloading, etc at above
        <Image source={{uri: url}} width={size} height={size} style={{ borderRadius: (rounded ? size / 2 : 0)}} />
    )
    : ( //we must have name then
    fullName 
    ? <Text style={{
      fontSize: size,
      color: textColor,
      alignSelf: 'center',
      padding: (size * 7/120),
      fontWeight: 900}} 
      adjustsFontSizeToFit={true}>
        {extractInitials(fullName)}
    </Text>
    : <></> // TODO implement better way to ensure one of the name or url must be specified
    )
    }
     {children ?? null} 
     </TouchableOpacity>
    </View>
)}

Avatar.propTypes = {
    rounded: PropTypes.bool,
    fullName: PropTypes.string,
    url: PropTypes.string,
    onPress: PropTypes.func,
    children: PropTypes.node,
    size: PropTypes.number,
    style: PropTypes.shape({ // TODO extend to cover all generic ViewStyles
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
    size: 42, // TODO adjust default size
    style: {},
  }
  
  export default Avatar
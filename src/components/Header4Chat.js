import React from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import {
  IconButton, Button, useTheme,
} from 'react-native-paper'
// import { useNavigation } from '@react-navigation/native'
// import AvatarOfAuthUser from './AvatarOfAuthUser'

export default function Header4Chat() {
  // const navigation = useNavigation()
  const { colors } = useTheme()

  const styles = StyleSheet.create({
  // regarding header, rename aptly
    headerContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      color: colors.onBackground,
    },
    button: {
    // marginBottom: layout.marginBottom,
    //  alignSelf: 'flex-start',
      borderRadius: 6,
      width: '75%',
      height: 36,
      alignItems: 'flex-start',
      // marginRight: 10,
    },
    //   buttonLabel: {
    //     fontSize: fontSize.middle,
    //   },
    iconButton: {
    // alignItems: 'flex-end',
      alignSelf: 'flex-end',
    },
  })

  const openManageChat = () => {
    console.log('Lets go to chat')
  }

  return (
    <View style={styles.headerContainer}>
      <Button
        buttonColor={colors.surfaceDisabled}
        textColor={colors.onSurfaceDisabled}
        onPress={() => console.log('go to new window')}
        mode="contained"
        title="Search"
                // marginBottom={layout.marginBottom}
                // labelStyle={styles.buttonLabel}
        style={styles.button}
        icon="comment-search-outline"
      >Search
      </Button>

      <IconButton
        icon="menu"
        color={colors.onBackground}
        size={26}
        alignItems="right"
        alignSelf="flex-end"
        onPress={() => openManageChat()}
      />

    </View>
  )
}

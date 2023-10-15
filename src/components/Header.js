import React from 'react'
import {
  StyleSheet, View, Alert,
} from 'react-native'
import {
  IconButton, Button, useTheme,
} from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import AvatarOfAuthUser from './AvatarOfAuthUser'

const styles = StyleSheet.create({
  // regarding header, rename aptly
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    // marginBottom: layout.marginBottom,
    borderRadius: 6,
    width: '75%',
    height: 36,
    alignItems: 'flex-start',
    marginLeft: 10,
    marginRight: 15,
  },
//   buttonLabel: {
//     fontSize: fontSize.middle,
//   },
//   iconButton: {
//     // alignItems: 'flex-end',
//     // alignSelf: 'flex-end',
//   },
})

const headerButtonPress = () => {
  Alert.alert('Tapped header button')
}

export default function Header() {
  const navigation = useNavigation()
  const { colors } = useTheme()
  return (
    <View style={styles.headerContainer}>
      <AvatarOfAuthUser
        size="small"
        onPress={() => navigation.openDrawer()}
      />
      <Button
        buttonColor={colors.surfaceDisabled}
        textColor={colors.onSurfaceDisabled}
        onPress={() => console.log('go to new window')}
        mode="contained"
        title="Search"
                // marginBottom={layout.marginBottom}
                // labelStyle={styles.buttonLabel}
        style={styles.button}
        icon="text-search"
      >Search
      </Button>

      <IconButton
        icon="bell-outline"
        color={colors.onBackground}
        size={24}
        onPress={() => headerButtonPress()}
      />

    </View>
  )
}

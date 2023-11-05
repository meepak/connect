import React, { useEffect, useState } from 'react'
import {
  StyleSheet,
  View,
} from 'react-native'
import {
  Button,
  IconButton,
  useTheme,
  Badge,
} from 'react-native-paper'

import { useNavigation } from '@react-navigation/native'
// import { TouchableOpacity } from 'react-native-gesture-handler'
import AvatarOfAuthUser from '../AvatarOfAuthUser'

export default function Header() {
  const navigation = useNavigation()
  const { colors } = useTheme()

  // This is temporary measure and actual notification will come from expo-notification package
  const [tempNotificationSimulation, setTempNotificationSimulation] = useState(0)

  const styles = StyleSheet.create({
    headerContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginRight: 20,
    },
    button: {
      borderRadius: 6,
      width: '75%',
      height: 36,
      alignItems: 'flex-start',
      marginLeft: 10,
      marginRight: 15,
    },
  })

  useEffect(() => {
    if (tempNotificationSimulation > 3) {
      setTempNotificationSimulation(0)
    }
  }, [tempNotificationSimulation])

  const openNotification = () => {
    setTempNotificationSimulation(tempNotificationSimulation + 1)
    // console.log(`Lets go to notification window -- ${tempNotificationSimulation}`)
    navigation.navigate('NotificationStack', {
      screen: 'Connect',
    })
  }

  return (
    <View style={styles.headerContainer}>
      {/* <TouchableOpacity // DOESN'T WORK IN IOS
        hitSlop={{
          top: 10, bottom: 10, left: 10, right: 10,
        }}
      > */}
      <AvatarOfAuthUser size="small" onPress={() => navigation.openDrawer()} />
      {/* </TouchableOpacity> */}
      <Button
        title="Search"
        icon="search"
        buttonColor={colors.surfaceDisabled}
        textColor={colors.onSurfaceDisabled}
        onPress={() => console.log('go to new window')}
        mode="contained"
        style={styles.button}
      />
      <View>
        <Badge
          visible={tempNotificationSimulation > 0}
          size={20}
          style={{
            position: 'absolute', top: 8, right: 8, zIndex: 2,
          }}
          onPress={() => openNotification()}
        > {tempNotificationSimulation}
        </Badge>
        {/* Not sure animated Icon is appropriate, leaving it here cuz just because */}
        <IconButton
          icon="bell"
          color={colors.onBackground}
          size={24}
          onPress={() => openNotification()}
        />
      </View>
    </View>
  )
}

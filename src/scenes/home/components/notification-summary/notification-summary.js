/* eslint-disable react/prop-types */
// To be decided on the user object will pass through to here
import React from 'react'
import {
  Alert,
  FlatList, StyleSheet, View,
} from 'react-native'
import {
  Divider,
  IconButton,
  Text,
  TouchableRipple,
  useTheme,
} from 'react-native-paper'
// import PropTypes from 'prop-types'
import { useNavigation } from '@react-navigation/native'
import { convertHexToRGBA, splitName } from '../../../../utils/functions'
import Avatar from '../../../../components/core/avatar'

const NotificationSummary = (props) => {
  const {
    icon, title, dataItems, onIconPress, index,
  } = props
  const { colors } = useTheme()
  const navigation = useNavigation()
  const bgColor = index && index % 2 === 0
    ? colors.primaryContainer
    : colors.tertiaryContainer

  const styles = StyleSheet.create({
    container: {
      // marginTop: 20,
      paddingVertical: 15,
      flexDirection: 'column',
      alignItems: 'flex-start',
      backgroundColor: convertHexToRGBA(bgColor, 0.04),
    },
    header: {
      paddingHorizontal: 15,
      marginLeft: -8,
      marginTop: -12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    leftIcon: {

    },
    notificationTypeIcon: {
      width: 35,
      height: 35,
      borderRadius: 20,
      backgroundColor: convertHexToRGBA(colors.onBackground, 0.1),
    },
    title: {
      paddingLeft: 5,
    },
    scrollView: {
      paddingLeft: 20,
    },
    // renderitem
    block: {
      paddingVertical: 11,
      paddingHorizontal: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start',
    },
    content: {
      marginTop: 5,
      marginLeft: 10,
      flexDirection: 'column',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    action: {
      marginTop: 0,
      flexDirection: 'row',
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    icon: {
      width: 32,
      height: 32,
      borderRadius: 30,
      backgroundColor: '#FFFFFF',
    },
  })

  const openBgCheck = (item) => {
    Alert.alert(item.name, 'Background Check managemnt screen to be implemented')
  }

  const openNda = (item) => {
    Alert.alert(item.name, 'NDA Managemnt screen to be implemented')
  }

  const openProfile = (item) => {
    navigation.navigate('ProfileStack', {
      screen: 'Profile',
      params: { // userId, userFullName, userAvatar, userBannerImage,
        userId: item.key,
        userFullName: item.name,
        userAvatar: item.image,
        userBannerImage: item.banner,
      },
    })
  }

  const navigate = (item) => {
    switch (item.navigateTo) {
      case 'profile':
        openProfile(item)
        break
      case 'nda':
        openNda(item)
        break
      case 'bgCheck':
        openBgCheck(item)
        break
      default:
        break
    }
  }

  const renderItem = ({ item }) => {
    //   const iconBgColor = convertHexToRGBA(colors.onBackground, 0.1)
    const { firstName, lastName } = splitName(item.name)
    return (
      <TouchableRipple
        onPress={() => navigate(item)}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <View style={styles.block}>
          <Avatar rounded={false} size={42} width={42} height={42} fullName={item.name} url={item.image} />
          <View style={styles.content}>
            <Text variant="bodyMedium">{firstName ?? ''}</Text>
            <Text variant="bodyMedium">{lastName ?? ''}</Text>
          </View>
        </View>
      </TouchableRipple>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.leftIcon}>
          <IconButton
            style={styles.notificationTypeIcon}
            icon={icon}
            iconColor={convertHexToRGBA(colors.onBackground, 0.9)}
            size={16}
            onPress={onIconPress || null}
          />
        </View>
        <Text style={styles.title} variant="bodyLarge">{title}</Text>
      </View>
      <FlatList
        data={dataItems.content}
        renderItem={renderItem}
        ItemSeparatorComponent={<Divider style={{ width: 1, height: '100%' }} />}
        contentContainerStyle={styles.scrollView}
        showsVerticalScrollIndicator={false}
        horizontal
        showsHorizontalScrollIndicator={false}
          // ListEmptyComponent={}
        keyExtractor={(item) => item.key}
      />
    </View>
  )
}

export default NotificationSummary

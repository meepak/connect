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
import { convertHexToRGBA, splitName } from '../../../../utils/functions'
import Avatar from '../../../../components/core/avatar'
import RenderCounter from '../../../../components/render-counter'

const styles = StyleSheet.create({
  container: {
    // marginTop: 20,
    paddingVertical: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
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

const NotificationSummary = (props) => {
  const {
    // eslint-disable-next-line react/prop-types
    icon, title, dataItems, onIconPress, onProfilePress,
  } = props
  const { colors } = useTheme()

  const openBgCheck = (item) => {
    Alert.alert(item.name, 'Background Check management screen to be implemented')
  }

  const openNda = (item) => {
    Alert.alert(item.name, 'NDA Management screen to be implemented')
  }

  const openProfile = (item) => {
    onProfilePress(item)
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
    const { firstName, lastName } = splitName(item.name)
    return (
      <TouchableRipple
        onPress={() => navigate(item)}
        rippleColor="rgba(0, 0, 0, .32)"
      >
        <View style={styles.block}>
          <Avatar rounded={false} size={42} fullName={item.name} url={item.image} />
          <View style={styles.content}>
            <Text variant="bodyMedium">{firstName ?? ''}</Text>
            <Text variant="bodyMedium">{lastName ?? ''}</Text>
          </View>
        </View>
      </TouchableRipple>
    )
  }

  return (
    <View style={{ ...styles.container, backgroundColor: convertHexToRGBA(colors.primaryContainer, 0.04) }}>
      <View style={styles.header}>
        <View style={styles.leftIcon}>
          <IconButton
            style={{ ...styles.notificationTypeIcon, backgroundColor: convertHexToRGBA(colors.onBackground, 0.1) }}
            icon={icon}
            iconColor={convertHexToRGBA(colors.onBackground, 0.9)}
            size={16}
            onPress={onIconPress || null}
          />
        </View>
        <Text style={styles.title} variant="bodyLarge">{title}</Text>
        <RenderCounter />
      </View>
      <FlatList
        // eslint-disable-next-line react/prop-types
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

// NotificationSummary.propTypes = {
//   dataItems: PropTypes.shape(
//     PropTypes.shape({
//       key: PropTypes.string.isRequired,
//       name: PropTypes.string.isRequired,
//       image: PropTypes.string, // Image is optional, so not marked as required
//       userId: PropTypes.number.isRequired,
//       navigateTo: PropTypes.string.isRequired,
//     }),
//   ).isRequired,
//   icon: PropTypes.string.isRequired,
//   onIconPress: PropTypes.func.isRequired,
//   onProfilePress: PropTypes.func.isRequired,
//   title: PropTypes.string.isRequired,
// }

export default NotificationSummary

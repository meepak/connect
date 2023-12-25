import React, { useEffect } from 'react'
import {
  View, Text, StyleSheet, Alert,
} from 'react-native'
import { useTheme, IconButton, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

const HeaderProfile = ({
  icon, title, pendingChanges, onSave,
}) => {
  const { colors, fonts } = useTheme()
  const navigation = useNavigation()
  const insets = useSafeAreaInsets()

  useEffect(() => navigation.addListener('beforeRemove', (e) => {
    // if (Keyboard.isVisible()) { // covered in ScreenTemplate ??
    //   Keyboard.dismiss()
    // }
    if (!pendingChanges) return
    const { action } = e.data
    //   console.log(e.data)

    e.preventDefault()

    // TODO check for actual unsaved changes
    // https://reactnavigation.org/docs/preventing-going-back/

    Alert.alert(
      'Discard changes?',
      'You have unsaved changes. Are you sure to discard them and leave the screen?',
      [
        { text: "Don't leave", style: 'cancel', onPress: () => {} },
        {
          text: 'Discard',
          style: 'destructive',
          onPress: () => navigation.dispatch(action),
        },
      ],
      {
        userInterfaceStyle: 'dark',
      },
    )
  }),
  [navigation])

  const styles = StyleSheet.create({
    header: {
      top: insets.top,
      flexDirection: 'row',
      alignItems: 'center', // Center items vertically in the row
      justifyContent: 'space-between', // Space out items horizontally
      alignSelf: 'stretch',
      height: 85,
      paddingBottom: insets.top,
      zIndex: 99,
    },
    cancelButton: {
      // alignSelf: 'flex-start',
    },
    saveButton: {
      width: 85,
      height: 32,
      marginRight: 10,
      backgroundColor: colors.primaryContainer,
      color: colors.onPrimaryContainer,
      iconColor: colors.onPrimaryContainer,
    },
    saveButtonLabel: {
      fontSize: fonts.bodyMediSafeAreaum.fontSize,
      color: colors.onPrimaryContainer,
      lineHeight: 13,
      height: 12,
      // fontWeight: 'bold',
    },
    headerTitle: {
      fontSize: fonts.headlineSmall.fontSize,
      fontWeight: 'bold',
      marginRight: 'auto',
      color: colors.onBackground,
    },
  })

  return (
    <View style={styles.header}>
      <IconButton
        icon={icon ?? 'x'}
        size={24}
        iconColor={colors.onBackground}
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.headerTitle}>{title}</Text>
      {onSave
        ? (
          <Button
            onPress={onSave}
            mode="outlined"
            style={styles.saveButton}
            icon="check"
            textColor={colors.onPrimaryContainer}
          ><Text style={styles.saveButtonLabel}>Save</Text>
          </Button>
        )
        : null}
    </View>
  )
}

HeaderProfile.propTypes = {
  title: PropTypes.string.isRequired,
  onSave: PropTypes.func,
  pendingChanges: PropTypes.bool,
  icon: PropTypes.string,
}

HeaderProfile.defaultProps = {
  onSave: null,
  pendingChanges: false,
  icon: 'x',
}

export default HeaderProfile

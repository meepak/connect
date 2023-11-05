import React, { useEffect } from 'react'
import {
  View, Text, StyleSheet, Alert,
} from 'react-native'
import { useTheme, IconButton, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import PropTypes from 'prop-types'

const Header4Profile = ({ title, changed, onSave }) => {
  const { colors, fonts } = useTheme()
  const navigation = useNavigation()

  useEffect(
    () => navigation.addListener('beforeRemove', (e) => {
      if (!changed) return
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
      )
    }),
    [navigation],
  )

  const styles = StyleSheet.create({
    header: {
      flexDirection: 'row',
      alignItems: 'center', // Center items vertically in the row
      justifyContent: 'space-between', // Space out items horizontally
      alignSelf: 'stretch',
    },
    cancelButton: {
      // alignSelf: 'flex-start',
    },
    saveButton: {
      width: 85,
      height: 32,
      marginRight: 10,
      paddingVertical: 0,
    },
    saveButtonLabel: {
      fontSize: fonts.bodyMedium.fontSize,
      color: colors.onBackground,
      lineHeight: 13,
      height: 12,
      fontWeight: 'bold',
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
        icon="x"
        size={24}
        iconColor={colors.onBackground}
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.headerTitle}>{title}</Text>
      <Button
        onPress={onSave}
        mode="outlined"
        style={styles.saveButton}
        icon="check"
        textColor={colors.onBackground}
      ><Text style={styles.saveButtonLabel}>Save</Text>
      </Button>
    </View>
  )
}

Header4Profile.propTypes = {
  title: PropTypes.string.isRequired,
  onSave: PropTypes.func.isRequired,
  changed: PropTypes.bool.isRequired,
}

export default Header4Profile

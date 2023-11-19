import React, {
  useEffect, useRef, useCallback,
} from 'react'
import {
  View,
} from 'react-native'
import { useTheme, Text } from 'react-native-paper'
import {
  useNavigation,
} from '@react-navigation/native'
import PropTypes from 'prop-types'

import IconLink from '../../components/core/icon-link'
import SheetModal from '../../components/core/sheet-modal'

const ConnectionNotification = ({ show, onClose }) => {
  const addSectionSheetRef = useRef()

  const openMenu = useCallback(() => {
    if (addSectionSheetRef.current) {
      addSectionSheetRef.current.present()
    }
  }, [])

  const closeMenu = useCallback(() => {
    if (addSectionSheetRef.current) {
      addSectionSheetRef.current.close()
    }
  }, [])

  useEffect(() => {
    if (show) {
      openMenu()
    } else {
      closeMenu()
    }
  }, [show])

  const handleDismiss = useCallback(() => {
    onClose()
  }, [])

  const { colors } = useTheme()
  const navigation = useNavigation()

  const menuClicked = (screen) => {
    addSectionSheetRef.current.dismiss()
    setTimeout(() => {
      navigation.navigate(screen, {
        screen,
        //   params: {
        //     data: userData,
        //     from: 'My Profilie',
        //   },
      })
    }, 100)
  }
  return (
    <SheetModal ref={addSectionSheetRef} snapsAt={['75%']} onDismiss={handleDismiss}>
      <View style={{ marginHorizontal: 40, marginVertical: 20 }}>
        <Text>Display all connection requests</Text>
      </View>
    </SheetModal>
  )
}

ConnectionNotification.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ConnectionNotification

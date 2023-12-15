import React, {
  useEffect, useRef, useCallback,
} from 'react'
import {
  View,
} from 'react-native'
import { Text } from 'react-native-paper'
import PropTypes from 'prop-types'

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

import React, {
  useEffect, useRef, useCallback, useContext,
} from 'react'
import {
  ScrollView,
  View,
} from 'react-native'
import PropTypes from 'prop-types'

import SheetModal from '../components/core/sheet-modal'
import ProfileCore from '../scenes/profile/profile-core'
import { UserDataContext } from '../context/user-data-context'
import { BottomSheetScrollView } from '@gorhom/bottom-sheet'

const ProfileSheet = ({ show, onClose }) => {
  const addSectionSheetRef = useRef()
  const { userData } = useContext(UserDataContext) // temporary for testing, pass the props

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

  // userId, userFullName, userAvatar, userBannerImage,
  return (
    <SheetModal ref={addSectionSheetRef} snapsAt={['50%', '75%', '100%']} onDismiss={handleDismiss} allowSwipeToClose={false}>
      <BottomSheetScrollView showsVerticalScrollIndicator={false}>
        <ProfileCore
          userId={userData.id}
          userFullName={userData.fullName}
          userAvatar={userData.avatar}
          userBannerImage={userData.bannerImage}
          showBackButton={false}
        />
      </BottomSheetScrollView>
    </SheetModal>
  )
}

ProfileSheet.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ProfileSheet

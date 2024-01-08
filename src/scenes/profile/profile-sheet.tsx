import React, {
  useEffect, useRef, useCallback,
} from 'react'
import PropTypes from 'prop-types'

import SheetModal from '@/components/core/sheet-modal'
import ProfileCore from './profile-core'

const ProfileSheet = ({ show, onClose, user }) => {
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

  // userId, userFullName, userAvatar, userBannerImage,
  return (
    <SheetModal
      ref={addSectionSheetRef}
      snapsAt={['75%', '100%']}
      onDismiss={handleDismiss}
      // allowSwipeToClose={false}
      title={user?.name ?? ''}
    >
      <ProfileCore
        userId={user?.key ?? ''}
        userFullName={user?.name ?? ''}
        userAvatar={user?.image}
        userBannerImage={user?.banner ?? ''}
        sheetMode
      />
    </SheetModal>
  )
}

ProfileSheet.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  user: PropTypes.shape({
    key: PropTypes.string,
    name: PropTypes.string,
    image: PropTypes.string,
    banner: PropTypes.string,
  }).isRequired,
}

export default ProfileSheet

import React, {
  useEffect, useRef, useCallback,
} from 'react'
import {
  View,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import {
  useNavigation,
} from '@react-navigation/native'
import PropTypes from 'prop-types'

import IconLink from '../../../../components/core/icon-link'
import SheetModal from '../../../../components/core/sheet-modal'

const AddSectionMenu = ({ show, onClose }) => {
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
    <SheetModal ref={addSectionSheetRef} snapsAt={['40%']} onDismiss={handleDismiss} title="Add new section">
      <View style={{ marginHorizontal: 40, marginVertical: 20 }}>
        <IconLink
          marginLeft={-10}
          icon="plus-circle"
          text="Professional Experiences"
          color={colors.onPrimaryContainer}
          onPress={() => { menuClicked('EditExperiences') }}
        />
        <IconLink
          marginLeft={-10}
          icon="plus-circle"
          text="Educational Qualifications"
          color={colors.onPrimaryContainer}
          onPress={() => {
            addSectionSheetRef.current.dismiss()
            // navigation.navigate('EditExperiences', {
            //   screen: 'EditExperiences',
            //   params: {
            //     data: userData,
            //     from: 'My Profilie',
            //   },
            // })
          }}
        />
        <IconLink
          marginLeft={-10}
          icon="plus-circle"
          text="Licenses & Certifications"
          color={colors.onPrimaryContainer}
          onPress={() => {
            navigation.navigate('EditExperiences', {
              screen: 'EditExperiences',
            //   params: {
            //     data: userData,
            //     from: 'My Profilie',
            //   },
            })
          }}
        />
        <IconLink
          marginLeft={-10}
          icon="plus-circle"
          text="Languages"
          color={colors.onPrimaryContainer}
          onPress={() => {
            navigation.navigate('EditExperiences', {
              screen: 'EditExperiences',
            //   params: {
            //     data: userData,
            //     from: 'My Profilie',
            //   },
            })
          }}
        />
      </View>
    </SheetModal>
  )
}

AddSectionMenu.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AddSectionMenu

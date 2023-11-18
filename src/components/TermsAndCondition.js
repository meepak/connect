import React, {
  useEffect, useRef, useCallback,
} from 'react'
import { View } from 'react-native'
import { useTheme, Text, IconButton } from 'react-native-paper'
import PropTypes from 'prop-types'

// import IconLink from '../../../../components/core/IconLink'
import WebView from 'react-native-webview'
import SheetModal from './core/SheetModal'
import tnc from '../../assets/tnc'

const TermsAndCondition = ({ show, onClose }) => {
  const tncSheetRef = useRef()

  const openMenu = useCallback(() => {
    if (tncSheetRef.current) {
      tncSheetRef.current.present()
    }
  }, [])

  const closeMenu = useCallback(() => {
    if (tncSheetRef.current) {
      tncSheetRef.current.close()
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

  const { colors, fonts } = useTheme()

  const html = `<html><head>
                <style>
                  body {
                    font-size: -webkit-xxx-large; 
                    background-color: ${colors.surfaceContainerHigh};
                    color: ${colors.onBackground}
                </style></head>
                <body>${tnc}</body>
                </html`

  return (
    <SheetModal ref={tncSheetRef} snapsAt={['50%', '75%', '100%']} onDismiss={handleDismiss}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginHorizontal: 20,
      }}
      >
        <Text style={{
          fontWeight: 'bold',
          fontSize: fonts.titleMedium.fontSize,
        }}
        >
          Find Associate - Terms and Conditions
        </Text>
        <IconButton
          icon="x"
          onPress={handleDismiss}
        />
      </View>
      <WebView
        style={{
          marginHorizontal: 30,
          marginBottom: 10,
          backgroundColor: colors.transparent,
        }}
        nestedScrollEnabled
        source={{ html }}
      />
    </SheetModal>
  )
}

TermsAndCondition.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default TermsAndCondition

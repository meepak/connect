import React, { useMemo, useCallback } from 'react'
import { StatusBar } from 'react-native'
import { useTheme } from 'react-native-paper'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import PropTypes from 'prop-types'

const SheetModal = React.forwardRef(({ children, snapsAt }, ref) => {
  const { colors } = useTheme()
  // refs
  //   const bottomSheetRef = useRef(null)
  // variables, TODO pass this as props
  const snapPoints = useMemo(() => snapsAt, [snapsAt])

  // #region callbacks
  // if necessary pass this through props later
  const handleChange = useCallback((index) => {
    // eslint-disable-next-line no-console
    // console.log('index', index)
  }, [])
  const handleDismiss = useCallback(() => {
    // eslint-disable-next-line no-console
    // console.log('on dismiss')
  }, [])
  //   const handleDismissPress = useCallback(() => {
  //    bottomSheetRef.current?.dismiss()
  //   }, [])
  //   const handleClosePress = useCallback(() => {
  //    bottomSheetRef.current?.close()
  //   }, [])
  //   const handlePresentPress = useCallback(() => {
  //    bottomSheetRef.current?.present()
  //   }, [])
  // #endregion

  return (
    <BottomSheetModal
      ref={ref}
      snapPoints={snapPoints}
      topInset={+StatusBar.currentHeight}
      enablePanDownToClose
      enableDismissOnClose
      onDismiss={handleDismiss}
      onChange={handleChange}
      backdropComponent={({ animatedIndex, style }) => (
        <BottomSheetBackdrop
          animatedIndex={animatedIndex}
          style={[style, { backgroundColor: colors.background }]}
          disappearsOnIndex={-1}
        />
      )}
      backgroundStyle={{ backgroundColor: colors.surfaceContainerHigh, borderRadius: 40 }}
      handleIndicatorStyle={{ width: '15%', height: 7, backgroundColor: colors.surfaceTint }}
    >
      {children}
    </BottomSheetModal>
  )
})

SheetModal.propTypes = {
  children: PropTypes.node.isRequired,
  snapsAt: PropTypes.arrayOf(PropTypes.string),
}

SheetModal.defaultProps = {
  snapsAt: ['25%', '50%', '75%', '100%'],
}

export default SheetModal

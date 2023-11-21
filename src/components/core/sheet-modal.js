import React, { useMemo, useCallback } from 'react'
import { IconButton, Text, useTheme } from 'react-native-paper'
import {
  BottomSheetModal,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet'
import PropTypes from 'prop-types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { View } from 'react-native'
import { convertHexToRGBA } from '../../utils/functions'

const SheetModal = React.forwardRef(({
  children, snapsAt, onDismiss, allowSwipeToClose, title,
}, ref) => {
  const { colors } = useTheme()
  const insets = useSafeAreaInsets()
  // refs
  //   const bottomSheetRef = useRef(null)
  // variables, TODO pass this as props
  const snapPoints = useMemo(() => snapsAt, [snapsAt])

  // #region callbacks
  // if necessary pass this through props later
  const handleChange = useCallback(() => {
    // eslint-disable-next-line no-console
    // console.log('index', index)
  }, [])
  // const handleDismiss = useCallback(() => {
  // eslint-disable-next-line no-console
  // console.log('on dismiss')
  // }, [])
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
      topInset={+insets.top} // since this only works in android, do not rely on it, use inset provided by safe area view
      enablePanDownToClose={allowSwipeToClose}
      enableDismissOnClose
      onDismiss={onDismiss}
      onChange={handleChange}
      backdropComponent={({ animatedIndex, style }) => (
        <BottomSheetBackdrop
          animatedIndex={animatedIndex}
          style={[style, { backgroundColor: colors.background }]}
          disappearsOnIndex={-1}
        />
      )}
      backgroundStyle={{ backgroundColor: colors.elevation.level3, borderRadius: 20 }}
      handleIndicatorStyle={{ height: 0 }}
      handleComponent={() => (
        <View style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 42,
          backgroundColor: colors.elevation.level5,
          elevation: 5,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          paddingHorizontal: 15,
        }}
        >
          <Text variant="titleLarge" style={{ top: 7, fontWeight: 500 }}>{title}</Text>
          <IconButton
            style={{
              top: 2,
              right: -7,
              alignSelf: 'flex-end',
              backgroundColor: convertHexToRGBA(colors.onBackground, 0.1),
            }}
            icon="x"
            size={18}
            iconColor={colors.onBackground}
            onPress={() => onDismiss()}
          />
        </View>
      )}
    >
      {children}
    </BottomSheetModal>
  )
})

SheetModal.propTypes = {
  children: PropTypes.node.isRequired,
  snapsAt: PropTypes.arrayOf(PropTypes.string),
  onDismiss: PropTypes.func,
  allowSwipeToClose: PropTypes.bool,
  title: PropTypes.string,
}

SheetModal.defaultProps = {
  snapsAt: ['25%', '50%', '75%', '100%'],
  onDismiss: null,
  allowSwipeToClose: true,
  title: '',
}

export default SheetModal

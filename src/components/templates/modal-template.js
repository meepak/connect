import React from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ScreenTemplate from './screen-template'

const Styles = (colors, insets) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    top: insets.top,
  },
  footer: {
    paddingBottom: 30,
  },
  pageTitle: {
    height: 50,
    width: '100%',
  },
  titleText: {
    top: -5,
    left: 20,
  },
  content: {
    left: 0,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: -5,
    zIndex: 3,
    backgroundColor: colors.elevation.level3,
  },
  scrollView: {
    paddingHorizontal: 22,
    paddingTop: 30,
    paddingBottom: 90,
  },
  spinnerView: {
    paddingVertical: 20,
  },

})

const ModalTemplate = (props) => {
  const {
    header, subHeader, content, noScrollView, contentMarginTop,
  } = props
  const insets = useSafeAreaInsets()
  const { colors } = useTheme()
  const styles = Styles(colors, insets)

  const ContainerView = noScrollView ? View : KeyboardAwareScrollView
  const ContainerStyle = noScrollView ? { ...styles.scrollView, flex: 1 } : styles.scrollView
  const ContainerProps = noScrollView
    ? { style: ContainerStyle }
    : { contentContainerStyle: ContainerStyle, showsVerticalScrollIndicator: false }

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        {header}
        <View style={styles.pageTitle}>
          {subHeader}
        </View>
        <View style={{ ...styles.content, marginTop: contentMarginTop }}>
          <ContainerView {...ContainerProps}>
            {content}
          </ContainerView>
        </View>
      </View>
    </ScreenTemplate>
  )
}

ModalTemplate.propTypes = {
  header: PropTypes.node.isRequired,
  subHeader: PropTypes.node,
  content: PropTypes.node.isRequired,
  noScrollView: PropTypes.bool,
  contentMarginTop: PropTypes.number,
}

ModalTemplate.defaultProps = {
  subHeader: null,
  noScrollView: false,
  contentMarginTop: 0,
}

export default ModalTemplate

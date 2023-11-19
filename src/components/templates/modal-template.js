import React from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types'
import ScreenTemplate from './screen-template'

const Styles = (colors) => StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
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
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    elevation: -5,
    zIndex: 3,
    backgroundColor: colors.elevation.level3,
  },
  scrollView: {
    paddingHorizontal: 22,
    paddingTop: 40,
    paddingBottom: 90,
  },
  spinnerView: {
    paddingVertical: 20,
  },

})

const ModalTemplate = (props) => {
  const {
    header, subHeader, content, noScrollView,
  } = props
  const { colors } = useTheme()
  const styles = Styles(colors)

  const ContainerView = noScrollView ? View : KeyboardAwareScrollView

  return (
    <ScreenTemplate>
      <View style={styles.container}>
        {header}
        <View style={styles.pageTitle}>
          {subHeader}
        </View>
        <View style={styles.content}>
          { noScrollView
            ? (
              <View style={{ ...styles.scrollView, flex: 1 }}>
                {content}
              </View>
            )
            : (
              <KeyboardAwareScrollView
                contentContainerStyle={styles.scrollView}
              // overScrollMode="always"
                showsVerticalScrollIndicator={false}
              >
                {content}
              </KeyboardAwareScrollView>
            )}
        </View>
      </View>
      {/* <Spinner
        visible={spinner}
        textStyle={{ color: colors.onSurface }}
        overlayColor="rgba(0,0,0,0.5)"
      /> */}
    </ScreenTemplate>
  )
}

ModalTemplate.propTypes = {
  header: PropTypes.node.isRequired,
  subHeader: PropTypes.node,
  content: PropTypes.node.isRequired,
  noScrollView: PropTypes.bool,
}

ModalTemplate.defaultProps = {
  subHeader: null,
  noScrollView: false,
}

export default ModalTemplate

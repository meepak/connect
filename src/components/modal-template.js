import React from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import { useTheme } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import PropTypes from 'prop-types'
import ScreenTemplate from './screen-template'

const Styles = (colors) => StyleSheet.create({
  footer: {
    paddingBottom: 30,
  },
  pageTitle: {
    // flex:1,
    backgroundColor: colors.elevation.level3,
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
    backgroundColor: colors.background,
    elevation: -5,
    zIndex: 3,
  },
  scrollView: {
    paddingHorizontal: 22,
    paddingTop: 40,
    paddingBottom: 90,
  },
  foundation: {
    backgroundColor: colors.elevation.level3,
  },

  spinnerView: {
    paddingVertical: 20,
  },

})

const ModalTemplate = (props) => {
  const {
    header, subHeader, content,
  } = props
  const { colors } = useTheme()
  const styles = Styles(colors)

  return (
    <ScreenTemplate>
      {header}
      <View style={{ flex: 1 }}>
        <View style={styles.pageTitle}>
          {subHeader}
        </View>
        <View style={styles.foundation}>
          <View style={styles.content}>
            <KeyboardAwareScrollView
              contentContainerStyle={styles.scrollView}
              // overScrollMode="always"
              showsVerticalScrollIndicator={false}
              // pagingEnabled
            >
              {content}
            </KeyboardAwareScrollView>

          </View>
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
}

ModalTemplate.defaultProps = {
  subHeader: null,
}

export default ModalTemplate

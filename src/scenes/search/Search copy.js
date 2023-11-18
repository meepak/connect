import React from 'react'
import {
  StyleSheet, View,
} from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ScreenTemplate from '../../components/ScreenTemplate'
import Header from './components/Header'
import Temp from './components/Template'
import Recent from './components/Recent'

const Styles = (colors) => StyleSheet.create({
  empty: {
    paddingVertical: 20,
  },
  footer: {
    marginBottom: 15,
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
    paddingVertical: 40,
  },
  foundation: {
    backgroundColor: colors.elevation.level3,
  },

  spinnerView: {
    paddingVertical: 20,
  },

})

export default function Search() {
  const { colors } = useTheme()
  const styles = Styles(colors)

  return (
    <ScreenTemplate>
      <Header />
      <View style={{ flex: 1 }}>
        <View style={styles.pageTitle}>
          <Text style={styles.titleText} variant="headlineSmall">Option: Everywhere</Text>
        </View>
        <View style={styles.foundation}>
          <View style={styles.content}>
            <KeyboardAwareScrollView
              style={styles.scrollView}
              // overScrollMode="always"
              showsVerticalScrollIndicator={false}
              // pagingEnabled
            >
              <Recent />
              <View style={styles.empty} />
              <Temp id={1} />
              <View style={styles.empty} />
              <Temp id={2} />
              <View style={styles.empty} />
              <Temp id={3} />
              <View style={styles.empty} />
              <Temp id={4} />
              <View style={styles.empty} />
              <Temp id={5} />
              <View style={styles.empty} />
              <Temp id={6} />
              <Temp id={7} />
              {/*
              TODO -- THE FOOTER ISSUE SEEMS TO BE EVERY WHERE ,
                      FIX IT AN ALSO ADD THE FADE IN EFFECT
                      AT TOP AND BOTTOM IF POSSIBLE
              */}
              <View style={styles.footer} />
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

import React, { useState, useEffect, useContext } from 'react'
import {
  View, StyleSheet, StatusBar, SafeAreaView, ScrollView, Alert,
} from 'react-native'
import {
  Text, Surface, Button, IconButton, useTheme,
} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useRoute, useNavigation } from '@react-navigation/native'
import { fontSize, layout } from 'theme'
import ScreenTemplate from '../../components/ScreenTemplate'
import TextInputBox from '../../components/core/TextInputBox'
// import storage from '../../utils/Storage'
// TODO FIGURE THIS OUT WITH ASYNC-STORAGE & UPDATE UTILS/STORAGE

export default function EditIntro() {
  const route = useRoute()
  const { data, from } = route.params
  const navigation = useNavigation()
  const { colors, fonts } = useTheme()

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight,
    },
    title: {
      fontSize: fontSize.xLarge,
      marginBottom: layout.margin,
      textAlign: 'center',
    },
    field: {
      fontSize: fontSize.middle,
      textAlign: 'center',
    },
    button: {
      marginBottom: layout.marginBottom,
      borderRadius: 15,
      width: 250,
    },
    buttonLabel: {
      fontSize: fontSize.xLarge,
    },
    scrollContent: {
      zIndex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center', // Center items vertically in the row
      justifyContent: 'space-between', // Space out items horizontally
      alignSelf: 'flex-start',
      // height: layout.headerHeight,
    },
    cancelButton: {
      // alignSelf: 'flex-start',
      // You can add additional styles for the cancel button here
    },
    saveButton: {
      alignSelf: 'flex-end',
    },
    headerTitle: {
      fontSize: fontSize.xLarge,
      marginLeft: 10,
      // You can add additional styles for the header title here
    },
    footer: {
      paddingBottom: layout.marginBottom * 1.2,
      paddingTop: layout.marginBottom * 1.2,
    },
    saveBottomButton: {
      borderRadius: 10,
      width: '95%',
      alignSelf: 'center',
    },
    saveButtonLabel: {
      fontSize: fonts.bodyMedium.fontSize,
      color: colors.onPrimary,
      height: 15,
    },
  })

  useEffect(
    () => navigation.addListener('beforeRemove', (e) => {
      const { action } = e.data

      e.preventDefault()

      // TODO check for actual unsaved changes
      // https://reactnavigation.org/docs/preventing-going-back/

      Alert.alert(
        'Discard changes?',
        'You have unsaved changes. Are you sure to discard them and leave the screen?',
        [
          { text: "Don't leave", style: 'cancel', onPress: () => {} },
          {
            text: 'Discard',
            style: 'destructive',
            onPress: () => navigation.dispatch(action),
          },
        ],
      )
    }),
    [navigation],
  )

  return (
    <ScreenTemplate>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <IconButton
            icon="close"
            size={25}
            iconColor={colors.onBackground}
            style={styles.cancelButton}
            onPress={() => navigation.goBack()} // TODO ask confirmation if user wants to really not save the changes
          />
          <Text style={styles.headerTitle}>Edit Intro</Text>
          <IconButton
            icon="close"
            size={25}
            iconColor={colors.onBackground}
            style={styles.saveButton}
            onPress={() => navigation.goBack()} // TODO ask confirmation if user wants to really not save the changes
          />
        </View>
        <KeyboardAwareScrollView
          style={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          enableOnAndroid
        >
          <Surface style={styles.container}>
            <Text style={styles.field}>Post Screen</Text>
            <Text style={styles.title}>{data.email}</Text>
            <Text style={styles.field}>from</Text>
            <Text style={styles.title}>{from}</Text>
            <Text style={styles.field}>Latest save date</Text>
            <Text style={styles.title}>date.date</Text>
          </Surface>
          <View style={styles.container}>
            <Button
              buttonColor={colors.primary}
              // onPress={() => onSavePress()}
              mode="contained"
              marginBottom={layout.marginBottom}
              labelStyle={styles.buttonLabel}
              style={styles.button}
            >Save Date
            </Button>
            <Button
              buttonColor={colors.secondary}
              // onPress={() => onRemovePress()}
              mode="contained"
              labelStyle={styles.buttonLabel}
              style={styles.button}
            >Remove Date
            </Button>
            <Button
              buttonColor={colors.tertiary}
              onPress={() => navigation.navigate('Print')}
              mode="contained"
              labelStyle={styles.buttonLabel}
              style={styles.button}
            >Go to Print
            </Button>
          </View>
          <Surface style={styles.container}>
            <Text style={styles.field}>Post Screen</Text>
            <Text style={styles.title}>{data.email}</Text>
            <Text style={styles.field}>from</Text>
            <Text style={styles.title}>{from}</Text>
            <Text style={styles.field}>Latest save date</Text>
            <Text style={styles.title}>date.date</Text>
          </Surface>
          <Surface style={styles.container}>
            <Text style={styles.field}>Post Screen</Text>
            <Text style={styles.title}>{data.email}</Text>
            <Text style={styles.field}>from</Text>
            <Text style={styles.title}>{from}</Text>
            <Text style={styles.field}>Latest save date</Text>
            <Text style={styles.title}>date.date</Text>
          </Surface>
          <Surface style={styles.container}>
            <Text style={styles.field}>Post Screen</Text>
            <Text style={styles.title}>{data.email}</Text>
            <Text style={styles.field}>from</Text>
            <Text style={styles.title}>{from}</Text>
            <Text style={styles.field}>Latest save date</Text>
            <Text style={styles.title}>date.date</Text>
          </Surface>
          <Surface style={styles.container}>
            <Text style={styles.field}>Post Screen</Text>
            <Text style={styles.title}>{data.email}</Text>
            <Text style={styles.field}>from</Text>
            <Text style={styles.title}>{from}</Text>
            <Text style={styles.field}>Latest save date</Text>
            <Text style={styles.title}>date.date</Text>
          </Surface>
          <Surface style={styles.container}>
            <Text style={styles.field}>Post Screen</Text>
            <Text style={styles.title}>{data.email}</Text>
            <Text style={styles.field}>from</Text>
            <Text style={styles.title}>{from}</Text>
            <Text style={styles.field}>Latest save date</Text>
            <Text style={styles.title}>date.date</Text>
          </Surface>
          <Surface style={styles.container}>
            <Text style={styles.field}>Post Screen</Text>
            <Text style={styles.title}>{data.email}</Text>
            <Text style={styles.field}>from</Text>
            <Text style={styles.title}>{from}</Text>
            <Text style={styles.field}>Latest save date</Text>
            <Text style={styles.title}>date.date</Text>

            <TextInputBox
          // ref={emailTextInput}
              icon="envelope"
              autoFocus
          // placeholder="E-mail"
              label="E-mail"
          // onChangeText={(text) => setEmail(text)}
              autoCapitalize="none"
              value=""
              keyboardType="email-address"
              errorMessage=""
              onEndEditing={() => {
                console.log('blurred email')
              }}
            />

          </Surface>
        </KeyboardAwareScrollView>
        {/* <Surface style={styles.footer}>
          <Button
            buttonColor={colors.primary}
            // onPress={() => onSavePress()}
            mode="contained"
            style={styles.saveBottomButton}
          ><Text style={styles.saveButtonLabel}>Save Date</Text>
          </Button>
        </Surface> */}
      </SafeAreaView>
    </ScreenTemplate>
  )
}

import { StyleSheet } from 'react-native'
import layout from '@/theme'

function Styles(colors, fonts) {
  return StyleSheet.create({
    card: {
      margin: layout.marginLeft,
      padding: layout.marginLeft,
      alignSelf: 'center',
      justifyContent: 'center',
      width: '90%',
    },
    divider: {
      marginBottom: layout.marginBottom,
    },
    headerContainer: {
      margin: layout.marginLeft,
      flexDirection: 'row',
    },
    headerContent: {
      marginLeft: 10,
      justifyContent: 'flex-end',
    },
    headerTextGreeting: {
      fontSize: fonts.titleLarge.fontSize,
    },
    headerTextName: {
      fontSize: fonts.titleLarge.fontSize,
      fontWeight: 'bold',
    },
    greetingNote: {
      marginLeft: layout.marginLeft,
      marginRight: layout.marginRight,
      marginBottom: layout.marginBottom,
      fontSize: fonts.bodyLarge.fontSize,
    // fontStyle: 'italic',
    },
    segmentedButtons: {
      marginLeft: layout.marginLeft,
      marginRight: layout.marginRight,
      marginBottom: layout.marginBottom,
    },
    question: {
      marginLeft: layout.marginLeft,
      marginRight: layout.marginRight,
      marginBottom: layout.marginBottom,
      fontSize: fonts.bodyLarge.fontSize,
    },
    error: {
      color: colors.error,
    },
    answer: {
    // borderBottomWidth: 1,
      marginLeft: layout.marginLeft,
      marginRight: layout.marginRight,
      textAlign: 'center',
    },
    submitButton: {
      backgroundColor: colors.primaryContainer,
      color: colors.onPrimaryContainer,
      marginHorizontal: 30,
      marginTop: 20,
      marginBottom: 30,
    },
    submitButtonText: {
      color: colors.onPrimaryContainer,
    },
    selectButton: {
      backgroundColor: colors.secondaryContainer,
      color: colors.onSecondaryContainer,
      marginHorizontal: 30,
      marginTop: 20,
      marginBottom: 10,
    },
    selectButtonText: {
      color: colors.onSecondaryContainer,
    },

  })
}

export default Styles

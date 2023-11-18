import React, {
  useContext,
} from 'react'
import {
  View, StyleSheet, SafeAreaView,
} from 'react-native'
import {
  useTheme,
} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation } from '@react-navigation/native'

// import { TouchableOpacity } from 'react-native-gesture-handler'
import ScreenTemplate from '../../components/ScreenTemplate'
// import storage from '../../utils/Storage'
// TODO FIGURE THIS OUT WITH ASYNC-STORAGE & UPDATE UTILS/STORAGE
import { UserDataContext } from '../../context/UserDataContext'
// import { isValidName, isValidLength } from '../../utils/validation'
import Header4Profile from '../../components/header/Header4Profile'
import IconLink from '../../components/core/IconLink'

export default function EditExperiences() {
  // const route = useRoute()
  // const { data, from } = route.params
  const navigation = useNavigation()
  const { colors } = useTheme()

  const { userData } = useContext(UserDataContext)
  // const [fullName, setFulName] = useState(userData.fullName)
  // const [fullNameError, setFullNameError] = useState('')

  // refs
  // const bottomSheetRef = useRef(null)
  // const handlePresentPress = useCallback(() => {
  //    bottomSheetRef.current?.present()
  // }, [])

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    content: {
      flex: 1,
      paddingVertical: 10,
      marginLeft: 10,
      marginRight: 10,
    },
    footer: {
      marginVertical: 15,
    },
  })

  /*
 "work": [
      {
        "company": "Your employer name",
        "position": "Your job title",
        "website": "The URL for the employer's website",
        "startDate": "Your start date, in YYYY-MM-DD format",
        "endDate": "Your end date, in YYY-MM-DD format (leave blank for a current position)",
        "summary": "A one-sentence to one-paragraph summary of this employer or position",
        "highlights": [
          "Bullet-point list items that you would like to include along with (or instead of) a summary paragraph."
        ]
      }
    ],
  */

  return (
    <ScreenTemplate>
      <SafeAreaView style={styles.container}>
        <Header4Profile
          icon="chevron-left"
          title="Edit Experiences"
        />
        <IconLink
          marginLeft={15}
          icon="plus-circle"
          text="Add new experience"
          color={colors.primary}
          onPress={() => {
            navigation.navigate('EditExperience', {
              screen: 'EditExperience',
              params: {
                data: userData,
                from: 'My Profilie',
              },
            })
          }}
        />

        <KeyboardAwareScrollView
          style={styles.content}
          keyboardShouldPersistTaps="never"
        >
          {/* Empty space at bottom of page */}
          <View style={styles.footer} />
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </ScreenTemplate>
  )
}

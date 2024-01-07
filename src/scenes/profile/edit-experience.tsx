import React, {
  useState, useContext, useEffect, useRef,
} from 'react'
import {
  View, StyleSheet,
} from 'react-native'
import {
  useTheme, SegmentedButtons, Text,
} from 'react-native-paper'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { useNavigation, useRoute } from '@react-navigation/native'
import { ScreenTemplate } from '../../components/templates'
import TextInputBox from '../../components/core/text-input-box'
import { UserDataContext } from '../../context'
// import { isValidName, isValidLength } from '../../utils/validation'
import { HeaderProfile } from '../../components/header'
import MonthYearPicker from '../../components/month-year-picker'
import Checkbox from '../../components/core/checkbox'

export default function EditExperience() {
  // const route = useRoute()
  // const { data, from } = route.params
  const navigation = useNavigation()
  const route = useRoute()
  const { colors } = useTheme()
  const { userData } = useContext(UserDataContext)
  const endDateRef = useRef(null)

  const [position, setPosition] = useState(userData.fullName)
  const [isCurrentJob, setIsCurrentJob] = useState(false)

  const [currentDate, setCurrentDate] = useState('')
  const dateInit = { month: '', year: 0 }
  const [startDate, setStartDate] = useState(dateInit)
  const [endDate, setEndDate] = useState(dateInit)

  const [dateError, setDateError] = useState()

  const [location, setLocation] = useState()
  const [clearLocation, setClearLocation] = useState(false)

  const [employerName, setEmployerName] = useState('')
  const [highlights, setHighlights] = useState()

  const [dialogVisible, setDialogVisible] = useState(false)
  const [dialogTitle, setDialogTitle] = useState('Select date')

  const showDialog = () => setDialogVisible(() => true)
  const hideDialog = () => setDialogVisible(() => false)

  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

  // const [fullNameError, setFullNameError] = useState('')

  let pendingChanges = true

  function setDate(date) {
    if (currentDate === 'start') {
      setStartDate(date)
    } else {
      setEndDate(date)
    }
  }

  useEffect(() => {
    let error = ''
    if (startDate.year > 0 && endDate.year > 0
    && startDate.month && endDate.month) {
      if (startDate.year > endDate.year) {
        error = 'Error'
      } else if (startDate.year === endDate.year) {
        const startMonth = months.indexOf(startDate.month)
        const endMonth = months.indexOf(endDate.month)
        if (startMonth > endMonth) {
          error = 'Error'
        }
      }
    }
    setDateError(error)
  }, [startDate, endDate])

  useEffect(() => {
    if (clearLocation) {
      setLocation()
    } else if (route.params.selectedAddress) {
      setLocation(route.params.selectedAddress)
    }
  }, [route.params?.selectedAddress, clearLocation])

  useEffect(() => {
    if (endDateRef.current) {
      setDateError('')
      setEndDate({ month: '', year: 0 })
      if (isCurrentJob) {
        endDateRef.current.clear()
        endDateRef.current.setNativeProps({ editable: false, disabled: true })
      } else {
        endDateRef.current.setNativeProps({ editable: true, disabled: false })
      }
    }
  }, [isCurrentJob])

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
      marginVertical: 40,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      alignSelf: 'stretch',
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
      <View style={styles.container}>
        <HeaderProfile
          title="Add Experience"
          pendingChanges={pendingChanges}
          onSave={() => {
            // saved the data
            pendingChanges = false
            navigation.goBack()
            // console.log('saved changes')
            // navigation.navigate('ProfileStack', {
            //   screen: 'EditExperiences',
            //   params: { // userId, userFullName, userAvatar, userBannerImage,
            //     userId: userData.id,
            //     userFullName: userData.fullName,
            //     userAvatar: userData.avatar,
            //     userBannerImage: { uri: userData.bannerImage },
            //   },
            // })
          }}
        />

        <KeyboardAwareScrollView
          style={styles.content}
          keyboardShouldPersistTaps="never"
        >
          <View style={styles.row}>
            <View style={{ width: '45%' }}>
              <TextInputBox
                autoFocus
                bgColor={colors.surface}
                onBgColor={colors.onSurface}
                placeholder=""
                label="Start Date*"
                value={(startDate.year > 0 && startDate.month) ? `${startDate.month}-${startDate.year}` : ''}
                onFocus={() => {
                  // console.log('start date')
                  setDialogTitle('Start Date')
                  setCurrentDate('start')
                  showDialog()
                }}
                onClear={() => {
                  setStartDate(dateInit)
                  setEndDate(dateInit)
                }}
                showKeyboard={false}
                errorMessage={dateError}
                rightIcon="calendar"
              />
            </View>
            <View style={{ width: '45%' }}>
              <TextInputBox
                ref={endDateRef}
                autoFocus
                bgColor={colors.surface}
                onBgColor={colors.onSurface}
                placeholder={isCurrentJob ? '' : 'Month-Year'}
                label={isCurrentJob ? '' : 'End Date*'}
                // eslint-disable-next-line no-nested-ternary
                value={isCurrentJob ? 'Present' : ((endDate.year > 0 && endDate.month) ? `${endDate.month}-${endDate.year}` : '')}
                onFocus={() => {
                  setDialogTitle('End Date')
                  setCurrentDate('end')
                  showDialog()
                }}
                onClear={() => {
                  setStartDate(dateInit)
                  setEndDate(dateInit)
                }}
                showKeyboard={false}
                errorMessage={dateError}
                rightIcon={isCurrentJob ? '' : 'calendar'}
              />
            </View>
          </View>
          <View style={{ alignSelf: 'flex-end', right: -30 }}>
            <Checkbox
              label="I am currently working in this position"
              checked={isCurrentJob}
              onChecked={(isChecked) => { setIsCurrentJob(isChecked) }}
              reverse
            />
          </View>
          <TextInputBox
            autoFocus
            bgColor={colors.surface}
            onBgColor={colors.onSurface}
            label="Position"
            placeholder="Your Position (required)*"
            value={position}
            onChangeText={(text) => setPosition(text)}
            autoCapitalize="words"
            textContentType="telephoneNumber"
            onClear={() => setPosition()}
          />

          <TextInputBox
            autoFocus
            bgColor={colors.surface}
            onBgColor={colors.onSurface}
            label="Employer"
            placeholder="Your employer name (required)*"
            value={employerName}
            onChangeText={(text) => setEmployerName(text)}
          // onChangeText={(text) => setEmail(text)}
            autoCapitalize="words"
            onClear={() => setEmployerName()}
          />

          <TextInputBox
            autoFocus
            bgColor={colors.surface}
            onBgColor={colors.onSurface}
            label="Website"
            placeholder="Your company website"
          // onChangeText={(text) => setEmail(text)}
            autoCapitalize="words"
          />

          <TextInputBox
            autoFocus
            bgColor={colors.surface}
            onBgColor={colors.onSurface}
            label="Location"
            placeholder="Your company address"
            value={location}
            onFocus={() => {
              navigation.navigate('SelectLocation', {
                search: employerName ?? '',
                title: employerName ? `Address of ${employerName}` : 'Employers address',
              })
              setTimeout(() => setClearLocation(false), 100)
            }}
            onClear={() => {
              setClearLocation(location.length > 0)
            }}
            multiline
            showKeyboard={false}
          />

          <Text>Work operation mode</Text>
          <SegmentedButtons
            style={styles.segmentedButtons}
            value=""
            onValueChange={(value) => console.log(value)}
            buttons={[
              {
                value: 'remote',
                label: 'Remote',
              },
              {
                value: 'onsite',
                label: 'Onsite',
              },
              {
                value: 'hybrid',
                label: 'Hybrid',
              },
            ]}
          />

          <TextInputBox
            autoFocus
            multiline
            label="Highlights"
            placeholder="Resposibilities and achievements"
            value={highlights}
            onChangeText={(text) => setHighlights(text)}
            autoCapitalize="sentences"
            maxLength={20}
          />
          {/* Empty space at bottom of page */}
          <View style={styles.footer} />
        </KeyboardAwareScrollView>
        <MonthYearPicker
          onClose={hideDialog}
          visible={dialogVisible}
          title={dialogTitle}
          initialMonth={currentDate === 'start' ? startDate.month : endDate.month}
          initialYear={currentDate === 'start' ? startDate.year : endDate.year}
          onChange={(val) => setDate(val)}
        />
      </View>
    </ScreenTemplate>
  )
}

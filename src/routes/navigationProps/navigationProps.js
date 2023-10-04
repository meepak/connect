import { colors } from 'theme'
import { Platform } from 'react-native'

const headerTintColor = 'white'
const fontSize = 18
const headerMode = 'float'

const labelSize = Platform.select({
  ios: 14,
  android: 12,
})

const lightProps = {
  headerTintColor,
  headerStyle: {
    backgroundColor: colors.darkPurple,
  },
  headerTitleStyle: { fontSize },
  headerMode,
}

const darkProps = {
  headerTintColor,
  headerStyle: {
    backgroundColor: colors.dark,
  },
  headerTitleStyle: { fontSize },
  headerMode,
}

const screenOptions = {
  tabBarLabelStyle: {
    fontSize: labelSize,
  },
  tabBarActiveTintColor: colors.purple,
  tabBarInactiveTintColor: colors.lightPurple,
  tabBarShowLabel: true,
}

export { lightProps, darkProps, screenOptions }

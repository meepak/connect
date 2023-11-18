import React, { useContext, useEffect, useState } from 'react'
import { View, StatusBar } from 'react-native'
import {
  Text, Card, useTheme, SegmentedButtons, Switch, Button, Menu,
} from 'react-native-paper'
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Constants from 'expo-constants'
import PreferencesContext from '../../../context/PreferencesContext'

const Display = () => {
  const CUSTOM_COLOR_PALETTE = Constants.expoConfig.display.palette
  const { colors } = useTheme()
  const preferences = useContext(PreferencesContext)
  const [menuVisible, setMenuVisible] = useState(false)

  return (
    <Card
      mode="contained"
    >
      {/* <Card.Cover source={userData.avatar} /> */}
      <Card.Title
        title="Display"
        titleVariant="headlineSmall"
        left={() => (
          <MatIcon
            name="monitor-edit"
            size={40}
            color={colors.onBackground}
          />
        )}
      />
      <Card.Content>
        <Text variant="bodyLarge" style={{ marginBottom: 5 }}>
          Theme option
        </Text>
        <SegmentedButtons
          value={preferences.themePreference}
          onValueChange={(value) => {
            preferences.setThemePreference(value)
          }}
          buttons={[
            {
              value: 'dark',
              label: 'Dark',
            },
            {
              value: 'light',
              label: 'Light',
            },
            {
              value: 'system',
              label: 'System',
            },
          ]}
        />
        <View style={{
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          flexWrap: 'nowrap',
          justifyContent: 'space-between',
          marginBottom: 5,
          marginTop: 10,
        }}
        >
          <Text variant="bodyLarge">
            Use custom color
          </Text>
          <Switch
            value={preferences.useCustomColor}
            onValueChange={(value) => {
              preferences.setUseCustomColor(value)
            }}
            color={colors.tertiary}
          />
        </View>

        {
          preferences.useCustomColor
            ? (
              <>
                <View style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  flexWrap: 'nowrap',
                  justifyContent: 'space-between',
                  marginBottom: 5,
                  marginTop: 10,
                }}
                >
                  <Text variant="bodyLarge">
                    Select custom color
                  </Text>
                  <Button
                    visible={false}
                    width={50}
                    height={35}
                    onPress={() => setMenuVisible(true)}
                    mode="outlined"
                    style={{
                      backgroundColor: preferences.themeCustomColor,
                    }}
                  >
                    <Text
                      style={{ color: colors.inverseBackground }}
                      variant="bodyMedium"
                    >
                      {' '}
                    </Text>
                  </Button>
                </View>
                <Menu
                  visible={menuVisible}
                  onDismiss={() => setMenuVisible(false)}
                  anchor={{ x: 5, y: StatusBar.currentHeight ?? 5 }}
                >
                  {CUSTOM_COLOR_PALETTE.map((color) => (
                    <Menu.Item
                      key={color}
                      style={{ backgroundColor: color }}
                      onPress={() => {
                        setMenuVisible(false)
                        preferences.setThemeCustomColor(color)
                      }}
                      title={color}
                    />
                  ))}
                </Menu>
              </>
            )
            : <></>
          }
      </Card.Content>
    </Card>
  )
}

export default Display

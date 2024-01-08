import * as React from 'react'
import { useWindowDimensions } from 'react-native'
import { Text, useTheme } from 'react-native-paper'
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'
import { ChatRecent, ChatConnections } from '.'
import { ModalTemplate } from '@/components/template'
import Header from './components/header'

const renderScene = SceneMap({
  recent: ChatRecent,
  connections: ChatConnections,
})

const ChatTabs = () => {
  const layout = useWindowDimensions()
  const { colors } = useTheme()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'recent', title: 'Recent' },
    { key: 'connections', title: 'Connections' },
  ])

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      indicatorStyle={{ backgroundColor: colors.onBackground }}
      labelStyle={{ color: colors.onBackground }}
      style={{ backgroundColor: colors.elevation.level3 }}
    />
  )

  return (
    <ModalTemplate
      noScrollView
      header={<Header />}
      subHeader={<Text style={{ top: -12, left: 20 }} variant="headlineMedium">Chat</Text>}
      content={(
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          renderTabBar={renderTabBar}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width }}
          // style={{backgroundColor: 'green'}}
        />
)}
    />
  )
}
export default ChatTabs

import * as React from 'react'
import { useWindowDimensions } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { ChatRecent, ChatConnections } from '../../scenes/chat-main'

const renderScene = SceneMap({
  recent: ChatRecent,
  connections: ChatConnections,
})

const ChatTabs = () => {
  const layout = useWindowDimensions()

  const [index, setIndex] = React.useState(0)
  const [routes] = React.useState([
    { key: 'recent', title: 'Recent' },
    { key: 'connections', title: 'Connections' },
  ])

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
    />
  )
}
export default ChatTabs

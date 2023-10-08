import React, { useEffect, useState } from 'react'
import {
  StyleSheet, ScrollView,
} from 'react-native'
import axios from 'axios'
import ScreenTemplate from '../../components/ScreenTemplate'
import RenderItem from './RenderItem'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    width: '100%',
  },
})

export default function Print() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const { responseData } = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setData(responseData)
    } catch (e) {
      console.log('message error', e)
      setIsError(true)
    } finally {
      console.log(`response data -- ${JSON.stringify(data)}`)
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
    console.log(data)
  }, [])

  return (
    <ScreenTemplate isLoading={isLoading} isError={isError}>
      <ScrollView style={styles.main}>
        {data.map((item, i) => (
          <RenderItem item={item} key={item.id} index={i} />
        ))}
      </ScrollView>
    </ScreenTemplate>
  )
}

import React, { useEffect, useState } from 'react'
import {
  StyleSheet, ScrollView,
} from 'react-native'
import axios from 'axios'
import { ScreenTemplate } from '../../components/templates'
import RenderItem from './render-item'
import layout from '../../theme'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  main: {
    flex: 1,
    width: '100%',
    margin: layout.marginLeft,
  },
})

export default function Print() {
  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)

  const fetchData = async () => {
    try {
      setIsLoading(true)
      const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
      setData(response.data)
    } catch (e) {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
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

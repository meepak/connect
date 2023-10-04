import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AppIntroSlider from 'react-native-app-intro-slider'
import ScreenTemplate from '../../components/ScreenTemplate'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  },
  titleStyle: {
    padding: 10,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  paragraphStyle: {
    padding: 20,
    textAlign: 'center',
    fontSize: 16,
  },
  introImageStyle: {
    width: 200,
    height: 200,
  },
  introTextStyle: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 30,
  },
  introTitleStyle: {
    fontSize: 25,
    color: 'white',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
})

const slides = [
  {
    key: 's1',
    title: 'FIND ASSOCIATE',
    text: 'Business partners at fingertip!',
    image: {
      uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
    },
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'Discover, Connect, Thrive',
    text: 'Meet like minded for sake of growth!',
    image: {
      uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'FIND ASSOCIATE',
    text: 'Business partners at fingertip!',
    image: {
      uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
    },
    backgroundColor: '#22bcb5',
  },
  {
    key: 's4',
    title: 'Discover, Connect, Thrive',
    text: 'Meet like minded for sake of growth!',
    image: {
      uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_best_deals.png',
    },
    backgroundColor: '#3395ff',
  },
  {
    key: 's5',
    title: 'FIND ASSOCIATE',
    text: 'Business partners at fingertip!',
    image: {
      uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_bus_ticket_booking.png',
    },
    backgroundColor: '#f6437b',
  },
  {
    key: 's6',
    title: 'Discover, Connect, Thrive',
    text: 'Meet like minded for sake of growth!',
    image: {
      uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_train_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
]

const Intro = () => {
  const navigation = useNavigation()
  const onDone = () => {
    navigation.navigate('LoginStack', {
      screen: 'Sign Up',
    })
  }

  const onSkip = () => {
    navigation.navigate('LoginStack', {
      screen: 'Login',
    })
  }

  const RenderItem = ({ item }) => (
    <View
      style={{
        flex: 1,
        backgroundColor: item.backgroundColor,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingBottom: 100,
      }}
    >
      <Text style={styles.introTitleStyle}>{item.title}</Text>
      <Image style={styles.introImageStyle} source={item.image} />
      <Text style={styles.introTextStyle}>{item.text}</Text>
    </View>
  )

  return (
    <ScreenTemplate>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={onDone}
        showSkipButton
        onSkip={onSkip}
      />
    </ScreenTemplate>
  )
}

export default Intro

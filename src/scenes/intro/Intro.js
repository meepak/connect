import React from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
} from 'react-native'
import PropTypes from 'prop-types'
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
  dotStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: 'rgba(196, 2, 240, 0.5)',
    marginBottom: 60,
  },

  activeDotStyle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 5,
    marginRight: 10,
    backgroundColor: 'rgba(2, 232, 240, 0.5)',
    borderColor: 'rgba(151, 173, 173, 0.8)',
    marginBottom: 60,
  },
})

const CustomPaginationDot = ({ active }) => {
  if (active) {
    return (
      <View style={styles.activeDot}>
        <View style={styles.innerDot} />
      </View>
    );
  } else {
    return (
      <View style={styles.inactiveDot} />
    );
  }
};


const slides = [
  {
    key: 's1',
    title: 'DISCOVER',
    text: 'Business partners at fingertip!',
    image: {
      uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_mobile_recharge.png',
    },
    backgroundColor: '#20d2bb',
  },
  {
    key: 's2',
    title: 'CONNECT',
    text: 'Meet like minded for sake of growth!',
    image: {
      uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_flight_ticket_booking.png',
    },
    backgroundColor: '#febe29',
  },
  {
    key: 's3',
    title: 'THRIVE',
    text: 'Business partners at fingertip!',
    image: {
      uri:
            'https://raw.githubusercontent.com/AboutReact/sampleresource/master/intro_discount.png',
    },
    backgroundColor: '#f6437b',
  },
]

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

RenderItem.propTypes = {
  item: PropTypes.arrayOf.isRequired, // TODO break array for further validation
}

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

  return (
    <ScreenTemplate>
      <AppIntroSlider
        data={slides}
        renderItem={RenderItem}
        onDone={onDone}
        showSkipButton
        showNextButton={false}
        onSkip={onSkip}
        skipLabel="Already signed up? Login"
        doneLabel="Sign Up"
        bottomButton
        dotStyle={styles.dotStyle}
        activeDotStyle={styles.activeDotStyle}
        dotClickEnabled
      />
    </ScreenTemplate>
  )
}

export default Intro

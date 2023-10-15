import React from 'react'
import { AirbnbRating } from 'react-native-ratings'
// import Slider from '@react-native-community/slider'
import { colors } from '../theme'

// const ratingCompleted = (rating) => {
//   console.log(`Rating is: ${rating}`)
// }

export default function QuestionRating() {
  return (
    <AirbnbRating
      count={3}
      reviews={['Not Important', 'Important but willing to compromise', 'Very Important']}
      defaultRating={3}
      size={25}
      style={{ paddingVertical: 20 }}
      showRating
      selectedColor={colors.primary}
      reviewColor={colors.tertiary}
    />

  // <Slider
  //   // style={{ width: 200, height: 40 }}
  //   minimumValue={1}
  //   maximumValue={3}
  //   step={1}
  //   value={3}
  //   tapToSeek
  //   vertical
  //   // minimumTrackTintColor="#FFFFFF"
  //   // maximumTrackTintColor="#000000"
  // />
  )
}

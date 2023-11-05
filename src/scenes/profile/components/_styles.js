import { StyleSheet } from 'react-native'

const Styles = (colors, fonts) => StyleSheet.create({
  sectionHeading: {
    fontSize: fonts.headlineSmall.fontSize,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  sectionSubHeading: {
    fontSize: fonts.titleMedium.fontSize,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  sectionContent: {
    fontSize: fonts.titleMedium.fontSize,
    // fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  surfaceView: {
    marginBottom: 20,
    marginTop: 30,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center', // Center items vertically in the row
    justifyContent: 'space-between', // Space out items horizontally
    alignSelf: 'stretch',
  },
})

export default Styles

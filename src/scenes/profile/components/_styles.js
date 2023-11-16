import { StyleSheet } from 'react-native'

const Styles = (colors) => StyleSheet.create({
  sectionHeading: {
    color: colors.onBackground,
    // fontSize: fonts.headlineSmall.fontSize,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  sectionSubHeading: {
    color: colors.onBackground,
    // fontSize: fonts.titleMedium.fontSize,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  sectionContent: {
    color: colors.onBackground,
    // fontSize: fonts.titleMedium.fontSize,
    // fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  surfaceView: {
    marginBottom: 20,
    marginTop: 30,
    padding: 20,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'stretch',
  },
  list: {
    paddingTop: 20,
    marginLeft: 10,
    // fontSize: fonts.titleMedium.fontSize,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemText: {
    // fontSize: fonts.titleMedium.fontSize,
    color: colors.onBackground,
  },
})

export default Styles

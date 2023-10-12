import {
  StyleSheet,
} from 'react-native'
import { layout, fontSize } from '../../theme'

const styles = StyleSheet.create({
  card: {
    margin: layout.marginLeft,
    padding: layout.marginLeft,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '90%',
  },
  divider: {
    marginBottom: layout.marginBottom,
  },
  headerContainer: {
    margin: layout.marginLeft,
    flexDirection: 'row',
  },
  headerContent: {
    marginLeft: 10,
    justifyContent: 'flex-end',
  },
  headerTextGreeting: {
    fontSize: fontSize.xLarge,
  },
  headerTextName: {
    fontSize: fontSize.xxLarge,
    fontWeight: 'bold',
  },
  greetingNote: {
    marginLeft: layout.marginLeft,
    marginRight: layout.marginRight,
    marginBottom: layout.marginBottom,
    fontSize: fontSize.large,
    fontStyle: 'italic',
  },
  segmentedButtons: {
    marginLeft: layout.marginLeft,
    marginRight: layout.marginRight,
    marginBottom: layout.marginBottom,
  },
  greetingMessage: {
    marginLeft: layout.marginLeft,
    marginRight: layout.marginRight,
    marginBottom: layout.marginBottom,
    fontSize: fontSize.xLarge,
  },

})

export default styles

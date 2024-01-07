import React from 'react'
import { StyleSheet } from 'react-native'
import { Button, Text, useTheme } from 'react-native-paper'
import FontIcon from 'react-native-vector-icons/FontAwesome5'
import PropTypes from 'prop-types'

const SocialButtons = ({ label }) => {
  const { colors } = useTheme()
  const styles = StyleSheet.create({
    socialButton: {
    // backgroundColor: colors.primaryContainer,
      color: colors.onPrimaryContainer,
      marginHorizontal: 40,
      marginBottom: 20,
    },
    socialButtonText: {
      color: colors.onPrimaryContainer,
    },
  })
  return (
    <>
      <Button
        onPress={() => console.log('pressed')}
        mode="outlined"
        style={styles.socialButton}
        textColor={colors.onBackground}
        icon={() => (
          <FontIcon
            name="google"
            size={18}
            color={colors.onBackground}
          />
        )}
      >
        <Text style={styles.socialButtonText}>{label} with Google</Text>
      </Button>
      <Button
        onPress={() => console.log('pressed')}
        mode="outlined"
        style={styles.socialButton}
        textColor={colors.onBackground}
        icon={() => (
          <FontIcon
            name="linkedin"
            size={18}
            color={colors.onBackground}
          />
        )}
      >
        <Text style={styles.socialButtonText}>{label} with Linkedin</Text>
      </Button>
      <Button
        onPress={() => console.log('pressed')}
        mode="outlined"
        style={styles.socialButton}
        textColor={colors.onBackground}
        icon={() => (
          <FontIcon
            name="facebook"
            size={18}
            color={colors.onBackground}
          />
        )}
      >
        <Text style={styles.socialButtonText}>{label} with Facebook</Text>
      </Button>
    </>
  )
}

SocialButtons.propTypes = {
  label: PropTypes.string.isRequired,
}

export default SocialButtons

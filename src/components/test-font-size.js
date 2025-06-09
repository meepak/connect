import React from 'react'
import { StyleSheet } from 'react-native'
import { Surface, Text, useTheme } from 'react-native-paper'
import Avatar from './core/avatar'

const TestFontsize = () => {
  const theme = useTheme()
  //   console.log(JSON.stringify(theme))

  const styles = StyleSheet.create({
    avatarStyle: {
    //   borderWidth: 1,
    //   borderColor: theme.colors.shadow,
    //   borderStyle: 'solid',
      margin: 0,
    },
    content: {
      padding: 20,
      borderRadius: 5,
      marginTop: 30,
      marginLeft: 30,
      marginRight: 30,
    },
    main: {
      flex: 1,
      width: '100%',
    },
    title: {
      color: theme.colors.primary,
      fontSize: theme.fonts.displayMedium.fontSize,
      marginBottom: 20,
      textAlign: 'center',
    },
    field: {
      color: theme.colors.secondary,
      textAlign: 'center',
      fontSize: theme.fonts.displaySmall.fontSize,
    },
    level1: {
      color: theme.colors.tertiary,
      textAlign: 'center',
      fontSize: theme.fonts.headlineSmall.fontSize,
    },
    level2: {
      color: theme.colors.error,
      textAlign: 'center',
      fontSize: theme.fonts.titleMedium.fontSize,
    },
    level3: {
      color: theme.colors.inverseSurface,
      textAlign: 'center',
      fontSize: theme.fonts.labelSmall.fontSize,
    },
    level4: {
      color: theme.colors.inversePrimary,
      textAlign: 'center',
      fontSize: theme.fonts.bodySmall.fontSize,
    },
    level5: {
      color: theme.colors.scrim,
      textAlign: 'center',
      fontSize: theme.fonts.default.fontSize,
    },
  })

  return (

    <>
      <Surface style={styles.content}>
        <Avatar fullName="Dpk Mht" style={styles.avatarStyle} width={70} height={70} rounded={false} />
        <Text style={styles.field}>Full Name</Text>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.level1}>More Information</Text>
        <Text style={styles.level2}>Some More Information</Text>
        <Text style={styles.level3}>Send Connection Request</Text>
        <Text style={styles.level4}>View Profile</Text>
        <Text style={styles.level5}>Block User</Text>
      </Surface>
      <Surface style={styles.content}>
        <Avatar
          rounded={false}
          style={styles.avatarStyle}
          url="https://img.freepik.com/free-photo/portrait-young-beautiful-woman-with-smoky-eyes-makeup-pretty-young-adult-girl-posing-studio-closeup-attractive-female-face_186202-4439.jpg?w=826&t=st=1697367198~exp=1697367798~hmac=5122a4ab19efc2b8376790f030efef8c1ebad69a4f808cf6ab7e2d8e32b04385"
          width={70}
          height={70}
        />
        <Text style={styles.field}>Full Name</Text>
        <Text style={styles.title}>Email</Text>
        <Text style={styles.level1}>More Information</Text>
        <Text style={styles.level2}>Some More Information</Text>
        <Text style={styles.level3}>Send Connection Request</Text>
        <Text style={styles.level4}>View Profile</Text>
        <Text style={styles.level5}>Block User</Text>
      </Surface>
    </>
  )
}

export default TestFontsize

import React, { useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Card, Chip } from 'react-native-paper'
import PropTypes from 'prop-types'

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    paddingHorizontal: 12,
  },
  fullWidthChip: {
    marginVertical: 4,
    marginHorizontal: 12,
  },
  customBorderRadius: {
    borderRadius: 16,
  },
})

const Recent = ({ onSelected }) => {
// TODO get this from database, last 5 searches
  const recentSearchItems = ['Software Engineer Adelaide',
    'Ramen Noodle', 'Good on ya', 'Amazing', 'Rock', 'Paper',
    'Scissor', 'Find Associate', 'Jive', 'Focus']
  const [recentSearches, setRecentSearches] = useState(recentSearchItems)

  return (
    <Card
      mode="contained"
    >
      {/* <Card.Cover source={userData.avatar} /> */}
      <Card.Title
        title="Recent Searches"
        titleVariant="titleLarge"
      />
      <Card.Content>
        <View style={styles.row}>
          {
          recentSearches.map((item) => (
            <Chip
              key={item}
              compact={false}
              elevated
              style={{ marginRight: 10, marginBottom: 10 }}
              onPress={() => { onSelected(item) }}
              onClose={() => {
                const newSearchItems = recentSearches.filter((val) => val !== item)
                // simulating list being appened from db
                const appendedFromDb = [...newSearchItems, `replace${'d'.repeat(Math.floor(Math.random() * 10))} ${Math.floor(Math.random() * 1000)}`]
                setRecentSearches(appendedFromDb)
              }}
            >
              {item}
            </Chip>
          ))
        }
        </View>
      </Card.Content>
    </Card>
  )
}

Recent.propTypes = {
  onSelected: PropTypes.func.isRequired,
}

export default Recent

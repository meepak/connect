function generateRandomName() {
  // Create a list of first names and last names.
  const firstNames = ['Alice', 'Bob', 'Carol', 'Dave', 'Eve', 'Frank', 'George', 'Hannah', 'Isaac', 'Jack', 'Kate']
  const lastNames = ['Smith', 'Jones', 'Williams', 'Brown', 'Johnson', 'Davis', 'Miller', 'Wilson', 'Taylor', 'Anderson', 'Thomas']

  // Choose a random first name and last name from the lists.
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

  // Return the full name.
  return `${firstName} ${lastName}`
}

const images = [
  'https://images.pexels.com/photos/2218786/pexels-photo-2218786.jpeg?auto=compress&cs=tinysrgb&w=200&dpr=1',
  'https://images.pexels.com/photos/2906635/pexels-photo-2906635.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/989200/pexels-photo-989200.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/1804514/pexels-photo-1804514.jpeg?auto=compress&cs=tinysrgb&w=200',
  'https://images.pexels.com/photos/3797438/pexels-photo-3797438.jpeg?auto=compress&cs=tinysrgb&w=1600',
]

const bannerImages = [
  { uri: 'https://images.pexels.com/photos/818261/pexels-photo-818261.jpeg?auto=compress&cs=tinysrgb&w=400' },
  { uri: 'https://images.freeimages.com/variants/k1wQB7egQotJ7Hr3ZBPP1S5c/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=550' },
  { uri: 'https://images.freeimages.com/variants/YSotMxjHEvoFiBGaZkkJv5K8/f4a36f6589a0e50e702740b15352bc00e4bfaf6f58bd4db850e167794d05993d?fmt=webp&w=500' },
  { uri: 'https://images.freeimages.com/images/large-previews/e78/family-1421593.jpg?fmt=webp&w=550' },
]

// Define the data generation function
const generateDummyData = (startIndex, itemCount) => {
  const dummyData = []

  for (let index = startIndex; index < startIndex + itemCount; index += 1) {
    const name = `${index} ${generateRandomName()}`
    const image = index % 2 === 0 ? images[Math.floor(index / 2)] : null
    const banner = bannerImages[Math.floor(Math.random() * bannerImages.length)]

    const userItem = {
      key: `ss${index}`,
      name,
      image,
      banner,
      occupation: 'Full Stack Engineer - Frontend Focus',
      industry: 'Jeeve Solutions Australia',
      location: 'Australia (Remote)',
      rate: 'A$100/hr-A$110/hr',
      isPromoted: true,
      onPress: () => {
        // Your navigation logic here
        // console.log('Going to profile')
      },
    }

    dummyData.push(userItem)
  }

  return dummyData
}

export default generateDummyData

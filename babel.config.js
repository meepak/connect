module.exports = (api) => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      ['module-resolver', {
        alias: {
          components: './src/components',
          scenes: './src/scenes',
          theme: './src/theme',
          utils: './src/utils',
          context: './src/context',
          navigation: './src/navigation',
        },
      }],
      'expo-router/babel',
      'react-native-reanimated/plugin',
    ],

  }
}

module.exports = (api) => {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module:react-native-dotenv', {
          moduleName: '@env',
          path: '.env',
          blacklist: null,
          whitelist: null,
          safe: false,
          allowUndefined: true,
        },
      ],
      'react-native-reanimated/plugin',
      [
        'module-resolver',
        {
          alias: {
            components: './src/components',
            scenes: './src/scenes',
            theme: './src/theme',
            utils: './src/utils',
            // slices: './src/slices',
          },
        },
      ],
    ],
  }
}

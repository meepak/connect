const { getDefaultConfig } = require('expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname)

module.exports = {
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    minifierPath: 'metro-minify-esbuild',
  },
}

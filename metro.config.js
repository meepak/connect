const { getDefaultConfig } = require('expo/metro-config')

const defaultConfig = getDefaultConfig(__dirname)

defaultConfig.transformer.minifierConfig = {
  // ESBuild options...
};

module.exports = {
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    minifierPath: 'metro-minify-esbuild',
  },
}

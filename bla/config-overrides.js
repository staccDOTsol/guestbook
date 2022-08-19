/* config-overrides.js */
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = function override(config, env) {
  //do stuff with the webpack config...
  config.resolve.fallback = {
    "path" :require.resolve("path-browserify") ,
    "crypto-browserify": require.resolve('crypto-browserify'), //if you want to use this module also don't forget npm i crypto-browserify 
  } 
  config.resolve.alias = {
'URL': 'url'
  }
  config.plugins [
    new NodePolyfillPlugin()
]
  return config;
}
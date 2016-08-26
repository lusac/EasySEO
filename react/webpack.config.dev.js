'use strict';

var path = require('path');
var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  debug: true,

  entry: {
    dev: [
      'webpack-dev-server/client?http://localhost:8080',
      'webpack/hot/only-dev-server',
      './src/main'
    ]
  },

  output: {
    path: path.resolve(__dirname, 'dev'),
    publicPath: '/static/',
    filename: 'bundle.js'
  },

  module: {
    loaders: []
  },

  resolve: {
    extensions: ['', '.js']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

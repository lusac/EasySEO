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
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: [
          'react-hot',
          'babel?presets[]=es2015&presets[]=react'
        ],
        exclude: /node_modules/
      },
      {
          test: /\.scss$/,
          loaders: ['style', 'css', 'sass']
      }
    ]
  },

  sassLoader: {
    includePaths: [path.resolve(__dirname, "dev")]
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
      'src'
    ],
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};

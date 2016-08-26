var webpack = require('webpack');

module.exports = {
  cache: false,
  context: __dirname + '/src',
  devtool: 'source-map',
  entry: './main.js',
  output: {
    path: './dist',
    publicPath: '/dist/',
    filename: 'easyseo.js',
    library: 'easyseo',
    libraryTarget: 'umd'
  },
  module: {
    loaders: []
  },
  resolve: {
    modulesDirectories: [
      'node_modules',
      'src'
    ],
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};

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

  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },

  module: {
    loaders: [
      {
        test: /\.js|\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
            presets: ['es2015', 'react']
        }
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  },

  resolve: {
    modulesDirectories: [
      'node_modules',
      'src'
    ],
    extensions: ['', '.js', '.jsx']
  },

  plugins: [
    new webpack.DefinePlugin({
        'process.env': {
          'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    })
  ]
};

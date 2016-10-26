const path = require('path');
const webpack = require('webpack');
const CompressionPlugin = require('compression-webpack-plugin');

const baseConfig = require('./base');
const defaultSettings = require('./defaults');

// Add needed plugins here
const config = Object.assign({}, baseConfig, {
  entry: path.join(__dirname, '../src/index'),
  cache: false,
  devtool: '',
  // devtool: 'sourcemap',
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': '"production"'
    }),
    new webpack.optimize.UglifyJsPlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.NoErrorsPlugin(),
    new CompressionPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: /\.js$|\.html$/,
            threshold: 10240,
            minRatio: 0.8
        })
  ],
  module: defaultSettings.getDefaultModules()
});

// Add needed loaders to the defaults here
config.module.loaders.push({
  test: /\.js$|\.jsx$/,
  loader: 'babel-loader',
  // Reason why we put this here instead of babelrc
  // https://github.com/gaearon/react-transform-hmr/issues/5#issuecomment-142313637
  query: {
    presets: ['es2015', 'react', 'stage-0'],
    plugins: ['transform-decorators-legacy']
  },
  include: [].concat(
    config.additionalPaths,
    [path.join(__dirname, '/../src')]
  )
});

module.exports = config;

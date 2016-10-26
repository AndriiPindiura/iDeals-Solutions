const path = require('path');

const srcPath = path.join(__dirname, '/../src');
const dfltPort = 8086;
function getDefaultModules() {
  return {
    preLoaders: [{
        test: /\.(js|jsx)$/,
        include: srcPath,
        loader: 'eslint-loader'
      }],
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css?module&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader'
      },
      {
        test: /\.scss$/,
        loader: 'style!css?module&localIdentName=[name]__[local]___[hash:base64:5]!sass!postcss-loader'
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|eot|ttf)$/,
        loader: 'url',
        query: {
            name: '[hash].[ext]',
            limit: 10000,
        }
      }
    ]
  };
}
module.exports = {
  srcPath: srcPath,
  publicPath: '/assets/',
  port: dfltPort,
  getDefaultModules: getDefaultModules,
  postcss: function () {
    return [];
  }
};

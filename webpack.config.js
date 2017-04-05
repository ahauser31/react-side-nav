/*
    ./webpack.config.js
*/
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: './example/index.js',
  output: {
    path: path.resolve('example'),
    publicPath: '/js/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve('example'),
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, use: ExtractTextPlugin.extract({ use: [{ loader: 'css-loader?importLoaders=1' }, { loader: 'postcss-loader' }, { loader: 'sass-loader' }], fallback: 'style-loader' }) },
    ],
  },
  plugins: [
    new ExtractTextPlugin('main.css'),
  ],
};

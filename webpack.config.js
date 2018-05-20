/*
    ./webpack.config.js
*/
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './example/index.js',
  mode: process.env.NODE_ENV,
  output: {
    path: path.resolve('example'),
    // publicPath: '/js/',
    filename: 'bundle.js',
  },
  devServer: {
    contentBase: path.resolve('example'),
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      {
        test: /side-nav\.scss$/,
        use: [
          { loader: 'style-loader', options: { hmr: true } },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.scss$/,
        exclude: /side-nav\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({ filename: 'themes.css' }),
  ],
};

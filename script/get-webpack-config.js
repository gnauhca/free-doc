const path = require('path');
const webpack = require('webpack');
const utils = require('../utils');
const getCssLoaders = require('./css-loader');
const cssLoaders = getCssLoaders();
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const babelOptions = require(utils.resolveRoot('babel.config.js'))();

module.exports = function getWebpackConfig(docConfig) {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new HtmlWebpackPlugin({
      template: utils.resolveRoot('site/index.html'),
      filename: 'index.html'
    }),
    new CleanWebpackPlugin()
  ];

  if (process.env.NODE_ENV === 'production') {
    plugins.push(
      new webpack.optimize.ModuleConcatenationPlugin()
    );
  }

  const config = {
    mode: process.env.NODE_ENV === 'production' ? 'production' : 'development',
    devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
    entry: {
      'index': utils.resolveRoot('site/index.js')
    },
    output: {
      path: utils.resolveRoot('dist'),
      filename: '[name].js',
    },
    module: {
      rules: [
        {
          test: /\.jsx?$/,
          loader: 'babel-loader',
          options: babelOptions,
          exclude: /node_modules/
        },
        {
          test: /\.md$/,
          use: [
            {
              loader: 'babel-loader',
              options: babelOptions,
            },
            {
              loader: utils.resolveRoot('script/loaders/markdown-loader.js')
            }
          ]
        },
        {
          test: /\.(gif|jpg|png|woff|svg|eot|ttf)\??.*$/,
          loader: 'url-loader',
          options: {
            limit: 8192,
            outputPath: 'images',
            name: '[path][name].[hash].[ext]'
          }
        }
      ].concat(cssLoaders)
    },
    resolve: {
      modules: ['node_modules', path.join(__dirname, 'node_modules')],
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue', '.json', '.less'],
      alias: {
        '@': process.cwd(),
        '@dogdoc': utils.resolveRoot('./site/page/components.jsx'),
        '@components': utils.resolveRoot('./site/components-config.js')
      }
    },
    resolveLoader: {
      modules: ['node_modules', path.join(__dirname, 'node_modules'), utils.resolveRoot('./script/loaders')],
      extensions: ['.js', '.json'],
      mainFields: ['loader', 'main']
    },
    plugins
  };

  if (docConfig.customWebpackConfig) {
    return docConfig.customWebpackConfig(config);
  } else {
    return config;
  }
};

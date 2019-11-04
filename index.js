const path = require('path');
const fs = require('fs');
const lodash = require('lodash');
const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const utils = require('./utils');
const initial = require('./initial');
const getWebpackConfig = require('./script/get-webpack-config');
let docConfig;

function init(docConfigPath) {
  docConfig = require(docConfigPath)();
  initial(docConfigPath);
}

function serve() {
  const webpackConfig = getWebpackConfig(docConfig);
  const compiler = webpack(webpackConfig);
  const app = express();

  app.use(
    middleware(compiler, {
      // webpack-dev-middleware options
    })
  );

  app.listen(16666, () => console.log('Example app listening on port 16666, visit http://127.0.0.1:16666!'));
}

function build() {
  process.env.NODE_ENV = 'production';
  
  const webpackConfig = getWebpackConfig(docConfig);
  webpack(webpackConfig, (err, stats) => { // Stats Object
    if (err) {
      console.log(err.stack || err);
      if (err.details) {
        console.log(err.details);
      }
      return;
    }

    const info = stats.toJson();
    const buildInfo = stats.toString({
      colors: true,
      children: true,
      chunks: false,
      modules: false,
      chunkModules: false,
      hash: false,
      version: false
    });
    console.log(buildInfo);

    if (stats.hasErrors()) {
      done('error occured');
      return;
    }

    if (stats.hasWarnings()) {
      console.log(info.warnings);
    }
  });
}

module.exports = {
  init, serve, build
}
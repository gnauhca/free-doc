const path = require('path');
const fs = require('fs');
const lodash = require('lodash');
const express = require('express');
const webpack = require('webpack');
const middleware = require('webpack-dev-middleware');
const utils = require('./utils');
const parseConfig = require('./parse-config');
const getWebpackConfig = require('./script/get-webpack-config');
let docConfig;

function init(docConfigPath) {
  docConfig = parseConfig(docConfigPath);

  // write config file
  const filePath = utils.resolveRoot('./site/doc-config.js');

  let docStr = JSON.stringify(docConfig);
  docStr = 'module.exports=' + docStr;
  docStr = docStr.replace(/"component":\s*"(.+?)"/g, (str, compStr) => {
    return `"component": ${compStr}`
  });
  fs.writeFileSync(filePath, docStr, { encoding: 'utf-8' });
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

  app.listen(18888, () => console.log('Example app listening on port 18888, visit http://127.0.0.1:18888!'));
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
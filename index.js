const path = require('path');
const fs = require('fs');
const lodash = require('lodash');
const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
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
  process.env.NODE_ENV = 'development';

  const webpackConfig = getWebpackConfig(docConfig);
  const compiler = webpack(webpackConfig);
  const app = express();
  const port = docConfig.server ? (docConfig.server.port || 18888) : 18888

  app.use(
    webpackDevMiddleware(compiler, {
      // webpack-dev-middleware options
    })
  );
  app.use(webpackHotMiddleware(compiler));

  app.listen(port, () => console.log(`Example app listening on port ${port}, visit http://127.0.0.1:${port}`));
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
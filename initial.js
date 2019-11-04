const path = require('path');
const fs = require('fs');
const lodash = require('lodash');
const utils = require('./utils');


function parseComponents(components = [], relativePath = '') {
  const docConfigDir = path.dirname(relativePath)
  let componentsConfig = lodash.cloneDeep(components);

  function parsePath(component, parentPath = '') {
    if (Array.isArray(component)) {
      component.forEach(item => parsePath(item, parentPath));
      return;
    }

    component.fullPath = parentPath + (component.path || '');

    if (component.component) {
      let componentVal = component.component;

      if (!/^[@\\/]/.test(componentVal)) {
        // relative path
        componentVal = path.resolve(docConfigDir, componentVal);
      }
      if (typeof component.async !== 'undefined' && !component.async) {
        componentVal = `require('${componentVal}')`
      } else {
        componentVal = `() => import('${componentVal}')`
      }
      component.component = componentVal;
    }

    if (component.children) {
      parsePath(component.children, component.fullPath);
    }
  }

  parsePath(componentsConfig);

  return componentsConfig;
}

module.exports = function init(docConfigPath) {
  const filePath = utils.resolveRoot('./site/doc-config.js');
  const docConfig = require(docConfigPath)();
  let doc = lodash.cloneDeep(docConfig);
  let docStr = '';

  doc.components = parseComponents(doc.components, docConfigPath);

  delete doc.customWebpackConfig;
  delete doc.setup;
  
  docStr = JSON.stringify(doc);
  docStr = docStr.replace(/"component":\s*"(.+?)"/g, (str, compStr) => {
    return `"component": ${compStr}`
  });
  docStr = 'module.exports=' + docStr;
  fs.writeFileSync(filePath, docStr, { encoding: 'utf-8' });
}
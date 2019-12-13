const lodash = require('lodash');
const utils = require('./utils');


function parseComponents(components = [], relativePath = '') {
  let componentsConfig = lodash.cloneDeep(components);

  function parsePath(component, parentPath = '') {
    if (Array.isArray(component)) {
      component.forEach(item => parsePath(item, parentPath));
      return;
    }

    component.fullPath = parentPath + (component.path || '');

    if (component.component) {
      let componentVal = component.component;
      componentVal = utils.resolvePath(componentVal, relativePath);

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
  const docConfig = require(docConfigPath)();
  let doc = lodash.cloneDeep(docConfig);

  if (doc.setup) {
    doc.setup = utils.resolvePath(doc.setup, docConfigPath);
  }

  doc.components = parseComponents(doc.components, docConfigPath);
  return doc;
}
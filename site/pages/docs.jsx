import React from 'react';
import Doc from './doc';
import docConfig from '~doc-config';

const components = docConfig.components;

export default components.map((item, index) => {
  return () => (<Doc key={index} navData={item.children}></Doc>)
  // return (() => <div>ddd</div>)
});
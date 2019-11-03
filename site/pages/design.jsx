import React from 'react';
import SpfxDoc from './doc';
import config from '@/site/config';

class Design extends React.Component {

  constructor (props) {
    super(props);
    this.loadedCount = 0;
  }

  render() {
    
    return (
      <SpfxDoc 
        navData={config.navs.design.docs}
        layoutProps={{ title: '设计指南', name: '设计指南', log: true }}
      >
      </SpfxDoc>
    );
  }
}

export default Design;

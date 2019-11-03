import React from 'react';
import { Link } from 'react-router-dom';
import { Select } from 'ten-design-react';
import SpfxDoc from './doc';
import config from '@/site/config';

class Components extends React.Component {
  constructor(props) {
    super(props);
    this.loadedCount = 0;
  }

  render() {
    const docBar = (
      <div className="spfx-doc-title">
        <div className="spfx-doc-title__slogan">企业中后台组件库</div>
        <div className="spfx-doc-title__action">
          <Select
            className="spfx-doc-title__action-component"
            value="React"
            options={['React', 'Vue']}
            onChange={v => {
              if (v === 'Vue') {
                window.location.href = '/components-vue';
              }
            }}
            placeholder="请选择"
          />

          <a className="spfx-link spfx-doc-title__action-link" href="https://git.code.oa.com/ten-design">
            <i className="spfx-doc-title__action-link-icon spfx-doc-title__action-link-icon--git">
              {/* <img
                src={require('@/site/styles/images/git.svg')}
                alt="title icon"
              /> */}
            </i>
            工蜂
          </a>

          <Link className="spfx-link spfx-doc-title__action-link" to="/themelist">
            <i className="spfx-doc-title__action-link-icon spfx-doc-title__action-link-icon--theme">
              {/* <img
                src={require('@/site/styles/images/link-left.svg')}
                alt="title icon"
              /> */}
            </i>
            主题生成器
          </Link>
        </div>
      </div>
    );
    return (
      <SpfxDoc
        docBar={docBar}
        navData={config.navs.components.docs}
        layoutProps={{ title: '组件', name: '组件', log: true }}
      />
    );
  }
}

export default Components;

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Route, Link, withRouter } from 'react-router-dom';
import dynamic from '~/site/common/dynamic';
import { SideNav, FixedSide } from '~/site/components';

import Prism from 'prismjs';
import 'prismjs/components/prism-jsx.js';
import 'prismjs/themes/prism.css';

import '~/site/styles/index.less';
import '~/site/styles/pages/doc.less';

class Doc extends React.Component {
  static propTypes = {
    getRef: PropTypes.func,
    navData: PropTypes.array,
    match: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    docBar: PropTypes.node
  };

  constructor(props) {
    super(props);
    props.getRef && props.getRef(this);
    this.refFixedSide = React.createRef();
    this.refDocContent = React.createRef();
    this.docRoutes = [];
    this.getRoute(props.navData);
    this.routeArr = this.renderRoutes();
    this.state = {
      docContentTop: 0,
      docContentBottom: 0
    };
  }

  componentDidMount() {
    this.setDocContentTB();
  }

  /**
   * @description
   * 计算docContent的top bottom值
   */
  setDocContentTB() {
    const docContentDom = this.refDocContent.current;
    const {
      top: docContentScroll,
      height: docContentHeight
    } = docContentDom.getBoundingClientRect();
    const scrollHeight = document.body.scrollHeight;
    const { top: bodyScroll } = document.body.getBoundingClientRect();

    const docContentTop = Math.abs(bodyScroll - docContentScroll);
    const docContentBottom = scrollHeight - docContentHeight - docContentTop;

    this.setState({
      docContentTop,
      docContentBottom
    });
  }

  getRoute(arr) {
    arr.forEach(item => {
      if (item.children) {
        return this.getRoute(item.children);
      }

      return this.docRoutes.push(item);
    });
  }

  onNavClick = () => {
    window.scrollTo(0, this.state.docContentTop);
  };

  renderRoutes() {
    return this.docRoutes.map((nav, i) => (
      <Route
        key={i}
        path={nav.fullPath}
        component={dynamic(nav.component, {
          ref: 'refContainer',
          onLoaded: component => {
            const codeBlocks = component.refContainer.querySelectorAll('code');
            [...codeBlocks].forEach(codeBlock => {
              // hljs.highlightBlock(codeBlock);
              codeBlock.classList.add('language-jsx');
            });
            Prism.highlightAllUnder(component.refContainer);
          }
        })}
      />
    ));
  }

  renderComponentLink = nav => {
    const active = this.props.location.pathname.replace(/\/$/, '') === nav.fullPath;

    return (
      <Link
        className={classNames('spfx-main-link spfx-doc-link', {
          'spfx-doc-link--active': active
        })}
        to={nav.fullPath}
      >
        {nav.title}
      </Link>
    );
  };

  render() {
    const { navData } = this.props;
    const { docContentTop, docContentBottom } = this.state;
    return (
      <div className="spfx-doc spfx-page-doc" ref={this.refDocContent}>
        {docContentTop >= 0 && (
          <FixedSide
            ref={this.refFixedSide}
            top={docContentTop}
            bottom={docContentBottom}
          >
            <SideNav
              data={navData}
              renderItem={this.renderComponentLink}
              onNavClick={this.onNavClick}
            />
          </FixedSide>
        )}

        <div className="spfx-doc-content">{this.routeArr}</div>
      </div>
    );
  }
}

export default withRouter(Doc);

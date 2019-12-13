import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SpfxHeader from './header';
import SpfxFooter from './footer';

class Layout extends React.Component {
  static propTypes = {
    title: PropTypes.string,
    name: PropTypes.string,
    log: PropTypes.bool
  };

  componentDidMount() {
    const { title, log, name } = this.props;
    document.title = title ? 'Ten Design ' + title : 'Ten Design';
    
    if (log && name) {
      window._horizon.send('用户行为', '打开页面', name);
    }
  }

  render() {
    const { className: propClassName, header = true, footer = true, children } = this.props;
    const className = classNames(propClassName, 'spfx-wrapper', {
      'spfx-wrapper--noheader': !header,
      'spfx-wrapper--nofooter': !footer,
    });
  
    return (
      <div className={className}>
        {header && <SpfxHeader />}
        <div className="spfx-body">
          <div className="spfx-container">
            {children}
          </div>
        </div>
        {footer && <SpfxFooter />}
      </div>
    );
  }
}

export default Layout;

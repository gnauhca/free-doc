import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

class Sidenav extends React.Component {

  static propTypes = {
    data: PropTypes.array,
    onNavClick: PropTypes.func,
    renderItem: PropTypes.func
  }

  onNavClick(nav) {
    const { onNavClick } = this.props;
    onNavClick && onNavClick(nav);
  }

  renderNav(nav, deep = 0) {
    const { renderItem } = this.props;
    if (Array.isArray(nav)) {
      return nav.map(item => this.renderNav(item, deep));
    }

    if (nav.children) {
      return (
        <div key={nav.title} className={`spfx-sidenav-group spfx-sidenav-group--deep${deep}`}>
          <span className="spfx-sidenav-group__title">
            {nav.title}
          </span>
          <div className="spfx-sidenav-group__children">
            {this.renderNav(nav.children, deep + 1)}
          </div>
        </div>
      );
    }

    return (
      <div
        key={nav.name || nav.title}
        className="spfx-sidenav-item"
        onClick={() => {
          this.onNavClick(nav);
        }}
      >
        {
          renderItem ? renderItem(nav) : nav.title
        }
      </div>
    );
  }

  render() {
    const { data, className: propClassName } = this.props;
    const navs = this.renderNav(data);
    const className = classNames(propClassName, 'spfx-sidenav');

    return (
      <div className={className}>
        {navs}
      </div>
    );
  }
}

export default Sidenav;

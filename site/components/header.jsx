import React from 'react';
import { NavLink } from 'react-router-dom';
import docConfig from '~doc-config';

const Header = function ({ currentUser }) {
  const components = docConfig.components;

  return (
    <header className="spfx-header">
      <div className="spfx-container spfx-header-inner">
        <h1 className="spfx-logo">
          { docConfig.title || 'G-Doc' }
        </h1>
        {
          components.length > 0 && (
            <div className="spfx-nav">
              <nav className="spfx-nav__links">
              {
                components.map((item, index) => (
                  <NavLink key={index} className="spfx-link" activeClassName="spfx-link--active" exact to={item.fullPath}>{ item.title }</NavLink>
                ))
              }
              </nav>
            </div>
          )
        }

      </div>
    </header>
  );
};

export default Header

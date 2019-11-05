import React from 'react';
import { NavLink } from 'react-router-dom';
import docConfig from '~doc-config';

function getFirstChildPath(nav) {
  let firstPath = nav.path || '';
  while(nav && nav.children && nav.children[0]) {
    firstPath += nav.children[0].path || '';
    nav = nav.children[0];
  }
  return firstPath;
}

const Header = function ({ currentUser }) {
  const components = docConfig.components;

  return (
    <header className="spfx-header">
      <div className="spfx-container spfx-header-inner">
        <h1 className="spfx-logo">
          { docConfig.title || 'free-doc' }
        </h1>
        {
          components.length > 0 && (
            <div className="spfx-nav">
              <nav className="spfx-nav__links">
              {
                components.map((item, index) => {
                  let path;
                  if (item.defaultPath) {
                    path = item.defaultPath;
                  } else if (item.children && item.children[0]) {
                    path = getFirstChildPath(item);
                  }

                  return (
                    <NavLink key={index} className="spfx-link" activeClassName="spfx-link--active" exact to={path}>{ item.title }</NavLink>
                  )
                })
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

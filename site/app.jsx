import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connectGlobal } from '~/site/common/global';
import { Layout } from '~/site/components';
import docs from './pages/docs';
import docConfig from '~doc-config';

class App extends React.PureComponent {
  render() {
    const components = docConfig.components;

    return (
      <Router>
        <Layout className="spfx-page-doc">
          <Switch>
            {
              components.map((item, index) => {
                return (
                  <Route key={index} path={item.fullPath} component={docs[index]} />
                )
              })
            }
            <Redirect from="*" to={docConfig.defaultPath || '/'} />
            {/* todo: 404 */}
          </Switch>
        </Layout>
      </Router>
    );
  }
}

export default connectGlobal()(App);

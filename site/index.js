import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { GlobalProvider } from '~/site/common/global';
import './styles/index.less';

require('~setup');

const state = {};

ReactDOM.render(
  (
    <GlobalProvider store={state}>
      <App />
    </GlobalProvider>
  ),
  document.getElementById('app')
);

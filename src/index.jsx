import React from 'react';
import ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import moment from 'moment';
import * as firebase from 'firebase';

import Root from './Root.jsx';
import store from './store.js';
import firebaseConfig from './firebase_config.js';

firebase.initializeApp(firebaseConfig);
moment.locale('es');

ReactDOM.render(
  <AppContainer>
    <Root store={store} />
  </AppContainer>,
  document.getElementById('app')
);

if (module.hot) {
  module.hot.accept('./Root', () => {
    const NextApp = require('./Root').default;
    ReactDOM.render(
      <AppContainer>
        <NextApp store={ store } />
      </AppContainer>,
      document.getElementById('app')
    );
  });
}
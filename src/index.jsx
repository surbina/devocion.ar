require('./components/react-datetime/ReactDatetime.scss');
import 'react-redux-toastr/src/less/index.less'

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import moment from 'moment';
import * as firebase from 'firebase';

import firebaseConfig from './firebase_config.js';
import store from './store.js';
import Routes from './Routes.jsx';

firebase.initializeApp(firebaseConfig);
moment.locale('es');

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
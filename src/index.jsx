import React from 'react';
import ReactDOM from 'react-dom';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';

import Routes from './Routes';
import reducer from './reducers/index.js';

import { setStateAction } from './actions/action_creators.js';

const state = {
  devotional_list: {
  },
  home_section: {
  }
};

const logger = createLogger();

const store = createStore(
  reducer,
  //applyMiddleware(thunkMiddleware, logger)
  applyMiddleware(thunkMiddleware)
);

store.dispatch(setStateAction(state));

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('app')
);
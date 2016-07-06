import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers/root_reducer.js';

import { routingMiddleware } from './history.js';

const logger = createLogger();

const store = createStore(
  reducer,
  //applyMiddleware(thunkMiddleware, routingMiddleware, logger)
  compose(
    applyMiddleware(thunkMiddleware, routingMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
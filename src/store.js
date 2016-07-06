import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import createLogger from 'redux-logger';
import reducer from './reducers/root_reducer.js';

const logger = createLogger();

const store = createStore(
  reducer,
  //applyMiddleware(thunkMiddleware, logger)
  compose(
    applyMiddleware(thunkMiddleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
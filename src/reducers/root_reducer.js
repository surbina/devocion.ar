import {Map} from 'immutable';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import home_section from './home_section/reducer.js';
import devotional_list from './devotional_list/reducer.js';
import user from './user/reducer.js';

export default combineReducers({
  user: user,
  devotional_list: devotional_list,
  home_section: home_section,
  routing: routerReducer
});
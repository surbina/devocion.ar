import {Map} from 'immutable';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import home_section from './home_section/reducer.js';
import devotional_list from './devotional_list/reducer.js';
import comments from './comments/reducer.js';
import user from './user/reducer.js';
import admin from './admin/reducer.js';

export default combineReducers({
  user: user,
  devotional_list: devotional_list,
  home_section: home_section,
  comments: comments,
  routing: routerReducer,
  admin: admin
});
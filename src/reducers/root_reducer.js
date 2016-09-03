import {Map} from 'immutable';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {reducer as toastrReducer} from 'react-redux-toastr';
import devotional_view_section from './devotional_view_section/reducer.js';
import devotional_list from './devotional_list/reducer.js';
import comment_list from './comment_list/reducer.js';
import user from './user/reducer.js';
import admin_section from './admin_section/reducer.js';

export default combineReducers({
  user: user,
  devotional_list: devotional_list,
  comment_list: comment_list,
  admin_section: admin_section,
  devotional_view_section: devotional_view_section,
  routing: routerReducer,
  toastr: toastrReducer
});
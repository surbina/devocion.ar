import {Map} from 'immutable';
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import {reducer as toastrReducer} from 'react-redux-toastr';
import devotional_view_section from './devotional_view_section/reducer.js';
import devotional_list from './devotional_list/reducer.js';
import comment_list from './comment_list/reducer.js';
import user from './user/reducer.js';
import user_list from './user_list/reducer.js';
import admin_section from './admin_section/reducer.js';
import author_section from './author_section/reducer.js';

export default combineReducers({
  user: user,
  user_list: user_list,
  devotional_list: devotional_list,
  comment_list: comment_list,
  admin_section: admin_section,
  author_section: author_section,
  devotional_view_section: devotional_view_section,
  routing: routerReducer,
  toastr: toastrReducer
});
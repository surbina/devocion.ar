import {Map} from 'immutable';
import home_section from '../containers/Devotional/reducer.js';
import devotional_list from './devotional_list/reducer.js';
import user from './user/reducer.js';
import { combineReducers } from 'redux'


export default combineReducers({
  user: user,
  devotional_list: devotional_list,
  home_section: home_section
});
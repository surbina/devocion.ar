import {Map} from 'immutable';
import app from './containers/App/reducer.js';
import { SET_STATE } from './containers/App/actions.js';
import devotional from './containers/Devotional/reducer.js';
import { REQUEST_DEVOTIONAL, REQUEST_DEVOTIONAL_SUCCESS } from './containers/Devotional/actions.js';

export default function(
  state = Map({
    devotional_list: {
    },
    home_section: {
    }
  }), action) {
  switch (action.type) {
    case SET_STATE:
      return app(state, action);
    case REQUEST_DEVOTIONAL:
    case REQUEST_DEVOTIONAL_SUCCESS:
      return devotional(state, action);
    default:
      return state;
  }
}
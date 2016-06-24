import {Map} from 'immutable';
import setState from './reducer.js';
import devotional from './devotional.js';

export default function(state = Map({devotional_list: {}}), action) {
  switch (action.type) {
    case 'SET_STATE':
      return setState(state, action);
    case 'REQUEST_DEVOTIONAL':
    case 'REQUEST_DEVOTIONAL_SUCCESS':
      return devotional(state, action);
    default:
      return state;
  }
}
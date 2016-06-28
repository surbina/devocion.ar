import { Map } from 'immutable';
import { LOAD_DEVOTIONAL } from './actions.js';

function loadDevotional(state, id) {
  return state.merge({
    current_devotional_id: id.toString()
  });
}

export default function(state = Map({
  current_devotional_id: null
}), action) {
  switch (action.type) {
    case LOAD_DEVOTIONAL:
      return loadDevotional(state, action.id);
    default:
      return state;
  }
}
import { Map } from 'immutable';

import {
  EDIT_DEVOTIONAL,
  RESET_EDIT_DEVOTIONAL
} from './actions.js';

const DEFAULT_ID = '';

export default function (state = Map({
  editing_devotional: DEFAULT_ID
}), action) {
  switch (action.type) {
    case EDIT_DEVOTIONAL:
      return editDevotional(state, action.id);
    case RESET_EDIT_DEVOTIONAL:
      return resetEditDevotional(state);
    default:
      return state;
  }
}

function editDevotional(state, id) {
  return state.set('editing_devotional', id);
}

function resetEditDevotional(state) {
  return state.set('editing_devotional', DEFAULT_ID);
}
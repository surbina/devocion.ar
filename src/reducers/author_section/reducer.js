import { Map } from 'immutable';

import {
  AUTHOR_EDIT_DEVOTIONAL,
  AUTHOR_RESET_EDIT_DEVOTIONAL
} from './actions.js';

const DEFAULT_ID = '';

export default function (state = Map({
  editing_devotional: DEFAULT_ID
}), action) {
  switch (action.type) {
    case AUTHOR_EDIT_DEVOTIONAL:
      return authorEditDevotional(state, action.devotionalId);
    case AUTHOR_RESET_EDIT_DEVOTIONAL:
      return authorResetEditDevotional(state);
    default:
      return state;
  }
}

function authorEditDevotional(state, devotionalId) {
  return state.merge({
    editing_devotional: devotionalId
  });
}

function authorResetEditDevotional(state) {
  return state.set('editing_devotional', DEFAULT_ID);
}
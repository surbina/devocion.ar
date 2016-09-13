import { Map } from 'immutable';

import { EDIT_DEVOTIONAL } from './actions.js';

export default function (state = Map({
  editing_devotional: ''
}), action) {
  switch (action.type) {
    case EDIT_DEVOTIONAL:
      return editDevotional(state, action.publish_date);
    default:
      return state;
  }
}

function editDevotional(state, publish_date) {
  return state.merge({
    editing_devotional: publish_date
  });
}
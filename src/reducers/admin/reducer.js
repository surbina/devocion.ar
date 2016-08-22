import { Map } from 'immutable';

import { EDIT_DEVOTIONAL } from './actions.js';

export default function (state = Map({
  editingDevotional: ''
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
    editingDevotional: publish_date
  });
}
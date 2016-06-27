import { Map } from 'immutable';
import { REQUEST_DEVOTIONAL_LIST, REQUEST_DEVOTIONAL_LIST_SUCCESS, REQUEST_DEVOTIONAL_LIST_FAIL } from './actions.js';

function requestDevotionalList(state) {
  return state.merge({
    admin_section: {
      admin_panel: {
        fetching: true
      }
    }
  });
}

function requestDevotionalListSuccess(state, devotionalList) {
  const out = state.merge({
    devotional_list: devotionalList,
    admin_section: {
      admin_panel: {
        fetching: false
      }
    }
  });

  return out;
}

export default function(state = Map({devotional_list: {}, }), action) {
  switch (action.type) {
    case REQUEST_DEVOTIONAL_LIST:
      return requestDevotionalList(state);
    case REQUEST_DEVOTIONAL_LIST_SUCCESS:
      return requestDevotionalListSuccess(state, action.devotionalList);
    default:
      return state;
  }
}
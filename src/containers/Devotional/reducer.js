import { Map } from 'immutable';
import { REQUEST_DEVOTIONAL, REQUEST_DEVOTIONAL_SUCCESS } from './actions.js';

function requestDevotional(state, id) {
  return state.merge({
    devotional_list: {
      [id]: {
        fetching: true,
        valid: false
      }
    },
    home_section: {
      current_devotional: id.toString()
    }
  });
}

function requestDevotionalSuccess(state, devotional) {
  return state.merge({
    devotional_list: {
      [devotional.id]: {
        fetching: false,
        valid: true,
        id: devotional.id,
        title: devotional.title,
        pasagge: devotional.passagge,
        body: devotional.body,
        author: devotional.author,
        publishDate: devotional.publishDate,
      }
    }
  });
}

export default function(state = Map({devotional_list: {}}), action) {
  switch (action.type) {
    case REQUEST_DEVOTIONAL:
      return requestDevotional(state, action.id);
    case REQUEST_DEVOTIONAL_SUCCESS:
      return requestDevotionalSuccess(state, action.devotional);
    default:
      return state;
  }
}
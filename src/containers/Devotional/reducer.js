import { Map } from 'immutable';
import { REQUEST_DEVOTIONAL, REQUEST_DEVOTIONAL_SUCCESS } from './actions.js';

function requestDevotional(state, id) {
  const devotional_list = state.get('devotional_list').merge({
    [id]: {
      fetching: true,
      valid: false
    }
  });

  return state.merge({
    devotional_list: devotional_list,
    home_section: {
      current_devotional: id.toString()
    }
  });
}

function requestDevotionalSuccess(state, devotional) {
  const devotional_list = state.get('devotional_list').merge({
    [devotional.id]: {
      fetching: false,
      valid: false,
      id: devotional.id,
      title: devotional.title,
      pasagge: devotional.passagge,
      body: devotional.body,
      author: devotional.author,
      publishDate: devotional.publishDate,
    }
  });

  return state.merge({devotional_list: devotional_list});
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
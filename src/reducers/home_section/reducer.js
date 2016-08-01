import { Map } from 'immutable';
import {
  LOAD_DEVOTIONAL,
  LOAD_LAST_DEVOTIONAL, LOAD_LAST_DEVOTIONAL_SUCCESS, LOAD_LAST_DEVOTIONAL_FAIL
} from './actions.js';

export default function(state = Map({
  last_devotional_publish_date: null,
  current_devotional_publish_date: null
}), action) {
  switch (action.type) {
    case LOAD_DEVOTIONAL:
      return loadDevotional(state, action.publish_date);
    case LOAD_LAST_DEVOTIONAL:
      return loadLastDevotional(state);
    case LOAD_LAST_DEVOTIONAL_SUCCESS:
      return loadLastDevotionalSuccess(state, action.devotional);
    case LOAD_LAST_DEVOTIONAL_FAIL:
      return loadLastDevotionalFail(state, action.error);
    default:
      return state;
  }
}

function loadDevotional(state, publish_date) {
  return state.merge({
    current_devotional_publish_date: publish_date
  });
}

function loadLastDevotional(state) {
  return state;
}

function loadLastDevotionalSuccess(state, devotional) {
  return state.merge({
    last_devotional_publish_date: devotional.publish_date,
    current_devotional_publish_date: devotional.publish_date
  });
}

function loadLastDevotionalFail(state, error) {
  console.log("Error loading last devotional: ", error);
  return state;
}
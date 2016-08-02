import { Map } from 'immutable';
import {
  LOAD_DEVOTIONAL,
  LOAD_LAST_DEVOTIONAL, LOAD_LAST_DEVOTIONAL_SUCCESS, LOAD_LAST_DEVOTIONAL_FAIL,
  LOAD_NEXT_DEVOTIONAL, LOAD_NEXT_DEVOTIONAL_FAIL,
  LOAD_PREVIOUS_DEVOTIONAL, LOAD_PREVIOUS_DEVOTIONAL_FAIL
} from './actions.js';

export const INIT_STATUS = 'INIT';
export const LOADING_DEVOTIONAL_STATUS = 'LOADING_DEVOTIONAL';
export const LOADED_STATUS = 'LOADED';

export default function(state = Map({
  status: INIT_STATUS,
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
    case LOAD_NEXT_DEVOTIONAL:
      return loadNextDevotional(state);
    case LOAD_NEXT_DEVOTIONAL_FAIL:
      return loadNextDevotionalFail(state, action.error);
    case LOAD_PREVIOUS_DEVOTIONAL:
      return loadPreviousDevotional(state);
    case LOAD_PREVIOUS_DEVOTIONAL_FAIL:
      return loadPreviousDevotionalFail(state, action.error);
    default:
      return state;
  }
}

function loadDevotional(state, publish_date) {
  return state.merge({
    status: LOADED_STATUS,
    current_devotional_publish_date: publish_date
  });
}

function loadLastDevotional(state) {
  return state.merge({
    status: LOADING_DEVOTIONAL_STATUS
  });
}

function loadLastDevotionalSuccess(state, devotional) {
  return state.merge({
    status: LOADED_STATUS,
    last_devotional_publish_date: devotional.publish_date,
    current_devotional_publish_date: devotional.publish_date
  });
}

function loadLastDevotionalFail(state, error) {
  return state.merge({
    status: LOADED_STATUS
  });
}

function loadNextDevotional(state) {
  return state.merge({
    status: LOADING_DEVOTIONAL_STATUS
  });
}

function loadNextDevotionalFail(state, error) {
  console.log('Error: ', error);
  return state.merge({
    status: LOADED_STATUS
  });
}

function loadPreviousDevotional(state) {
  return state.merge({
    status: LOADING_DEVOTIONAL_STATUS
  });
}

function loadPreviousDevotionalFail(state, error) {
  console.log('Error: ', error);
  return state.merge({
    status: LOADED_STATUS
  });
}
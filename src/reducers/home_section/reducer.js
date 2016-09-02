import { Map } from 'immutable';

import {
  LOAD_DEVOTIONAL_VIEW,
  SET_CURRENT_DEVOTIONAL
} from './actions.js';

export const INIT_STATUS = 'INIT';
export const LOADING_DEVOTIONAL_STATUS = 'LOADING_DEVOTIONAL';
export const LOADED_STATUS = 'LOADED';


const current_devotional_id_default = '-1';
const current_devotional_publish_date_default = null;

export default function(state = Map({
  status: INIT_STATUS,
  current_devotional_id: current_devotional_id_default,
  current_devotional_publish_date: current_devotional_publish_date_default
}), action) {
  switch (action.type) {
    case LOAD_DEVOTIONAL_VIEW:
      return loadDevotionalView(state);
    case SET_CURRENT_DEVOTIONAL:
      return setCurrentDevotional(state, action.devotional);
    default:
      return state;
  }
}

function loadDevotionalView(state) {
  return state.merge({
    status: LOADING_DEVOTIONAL_STATUS
  });
}

function setCurrentDevotional(state, devotional) {
  return state.merge({
    status: LOADED_STATUS,
    current_devotional_id: devotional.id,
    current_devotional_publish_date: devotional.publish_date
  });
}
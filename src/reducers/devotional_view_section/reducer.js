import { Map } from 'immutable';

import {
  LOAD_DEVOTIONAL_VIEW,
  SET_CURRENT_DEVOTIONAL
} from './actions.js';

export const INIT_STATUS = 'INIT';
export const LOADING_DEVOTIONAL_STATUS = 'LOADING_DEVOTIONAL';
export const LOADED_STATUS = 'LOADED';

const STATUS_DEFAULT = INIT_STATUS;
const TARGET_DATE_DEFAULT = null;
const CURRENT_DEVOTIONAL_ID_DEFAULT = '-1';
const CURRENT_DEVOTIONAL_PUBLISH_DATE_DEFAULT = null;

export default function(state = Map({
  status: STATUS_DEFAULT,
  target_date: TARGET_DATE_DEFAULT,
  current_devotional_id: CURRENT_DEVOTIONAL_ID_DEFAULT,
  current_devotional_publish_date: CURRENT_DEVOTIONAL_PUBLISH_DATE_DEFAULT
}), action) {
  switch (action.type) {
    case LOAD_DEVOTIONAL_VIEW:
      return loadDevotionalView(state, action.devotionalPublishDate);
    case SET_CURRENT_DEVOTIONAL:
      return setCurrentDevotional(state, action.devotional);
    default:
      return state;
  }
}

function loadDevotionalView(state, devotionalPublishDate) {
  return state.merge({
    status: LOADING_DEVOTIONAL_STATUS,
    target_date: devotionalPublishDate
  });
}

function setCurrentDevotional(state, devotional) {
  return state.merge({
    status: LOADED_STATUS,
    current_devotional_id: devotional.id,
    current_devotional_publish_date: devotional.publish_date
  });
}
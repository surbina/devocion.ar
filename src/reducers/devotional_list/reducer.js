import { Map, fromJS } from 'immutable';
import {
  REQUEST_DEVOTIONAL, REQUEST_DEVOTIONAL_SUCCESS, REQUEST_DEVOTIONAL_FAIL,
  SUBMIT_DEVOTIONAL, SUBMIT_DEVOTIONAL_SUCCESS, SUBMIT_DEVOTIONAL_FAIL,
  REQUEST_DEVOTIONAL_LIST, REQUEST_DEVOTIONAL_LIST_SUCCESS, REQUEST_DEVOTIONAL_LIST_FAIL
} from './actions.js';

export const FETCHING_STATUS = 'FETCHING';
export const SUBMITTING_STATUS = 'SUBMITTING';
export const LOADED_STATUS = 'LOADED';
export const UNLOADED_STATUS = 'UNLOADED';

export default function(state = Map({fetching_list: false}), action) {
  switch (action.type) {
    case REQUEST_DEVOTIONAL:
      return requestDevotional(state, action.publish_date);
    case REQUEST_DEVOTIONAL_SUCCESS:
      return requestDevotionalSuccess(state, action.devotional);
    case REQUEST_DEVOTIONAL_FAIL:
      return requestDevotionalFail(state, action.publish_date);
    case REQUEST_DEVOTIONAL_LIST:
      return requestDevotionalList(state);
    case REQUEST_DEVOTIONAL_LIST_SUCCESS:
      return requestDevotionalListSuccess(state, action.devotionalList);
    case SUBMIT_DEVOTIONAL:
      return submitDevotional(state, action.devotional);
    case SUBMIT_DEVOTIONAL_SUCCESS:
      return submitDevotionalSuccess(state, action.devotional, action.oldId);
    default:
      return state;
  }
}

function requestDevotional(state, publish_date) {
  return state.merge({
    [publish_date]: {
      status: FETCHING_STATUS,
      valid: false
    }
  });
}

function requestDevotionalSuccess(state, devotional) {
  return state.merge({
    [devotional.publish_date]: {
      id: devotional.id,
      status: LOADED_STATUS,
      valid: true,
      title: devotional.title,
      passage: devotional.passage,
      body: devotional.body,
      author_name: devotional.author_name,
      publish_date: devotional.publish_date,
    }
  });
}

function requestDevotionalFail(state, publish_date) {
  return state.merge({
    [publish_date]: {
      status: UNLOADED_STATUS,
      valid: false
    }
  });
}

function requestDevotionalList(state) {
  return state.merge({
    fetching_list: true
  });
}

function requestDevotionalListSuccess(state, devotionalList) {
  let devsList = {};
  for (let prop in devotionalList) {
    devotionalList[prop].status = LOADED_STATUS;
    devotionalList[prop].valid = true;
    devsList[devotionalList[prop].publish_date] = devotionalList[prop];
  }

  return state
    .merge({fetching_list: false})
    .merge(devsList);
}

function submitDevotional(state, devotional) {
  return state.merge({
    [devotional.publish_date]: {
      id: devotional.id,
      status: SUBMITTING_STATUS,
      valid: true,
      title: devotional.title,
      passage: devotional.passage,
      body: devotional.body,
      author_name: devotional.author_name,
      author_id: devotional.author_id,
      publish_date: devotional.publish_date,
      creation_date: devotional.creation_date
    }
  });
}

function submitDevotionalSuccess(state, devotional, oldId) {
  return state.delete(oldId).merge({
    [devotional.publish_date]: {
      id: devotional.id,
      status: LOADED_STATUS,
      valid: true,
      title: devotional.title,
      passage: devotional.passage,
      body: devotional.body,
      author_name: devotional.author_name,
      author_id: devotional.author_id,
      publish_date: devotional.publish_date,
      creation_date: devotional.creation_date
    }
  })
}
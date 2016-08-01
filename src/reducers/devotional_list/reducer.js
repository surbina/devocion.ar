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
      return requestDevotional(state, action.id);
    case REQUEST_DEVOTIONAL_SUCCESS:
      return requestDevotionalSuccess(state, action.devotional);
    case REQUEST_DEVOTIONAL_FAIL:
      return requestDevotionalFail(state, action.id);
    case REQUEST_DEVOTIONAL_LIST:
      return requestDevotionalList(state);
    case REQUEST_DEVOTIONAL_LIST_SUCCESS:
      return requestDevotionalListSuccess(state, action.devotionalList);
    case SUBMIT_DEVOTIONAL:
      return submitDevotional(state, action.devotional);
    case SUBMIT_DEVOTIONAL_SUCCESS:
      return submitDevotionalSuccess(state, action.devotional);
    default:
      return state;
  }
}

function requestDevotional(state, id) {
  return state.merge({
    [id]: {
      status: FETCHING_STATUS,
      valid: false
    }
  });
}

function requestDevotionalSuccess(state, devotional) {
  return state.merge({
    [devotional.id]: {
      id: devotional.id,
      status: LOADED_STATUS,
      valid: true,
      title: devotional.title,
      pasagge: devotional.passagge,
      body: devotional.body,
      author_name: devotional.author_name,
      publish_date: devotional.publish_date,
    }
  });
}

function requestDevotionalFail(state, id) {
  return state.merge({
    [id]: {
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
  for (let prop in devotionalList) {
    devotionalList[prop].status = LOADED_STATUS;
    devotionalList[prop].valid = true;
  }

  return state
    .merge({fetching_list: false})
    .merge(devotionalList);
}

function submitDevotional(state, devotional) {
  return state.merge({
    [devotional.id]: {
      id: devotional.id,
      status: SUBMITTING_STATUS,
      valid: true,
      title: devotional.title,
      pasagge: devotional.passagge,
      body: devotional.body,
      author_name: devotional.author_name,
      author_id: devotional.author_id,
      publish_date: devotional.publish_date,
      creation_date: devotional.creation_date
    }
  });
}

function submitDevotionalSuccess(state, devotional) {
  return state.delete('-1').merge({
    [devotional.id]: {
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
import { Map, fromJS } from 'immutable';
import {
  REQUEST_DEVOTIONAL, REQUEST_DEVOTIONAL_SUCCESS, REQUEST_DEVOTIONAL_FAIL,
  SUBMIT_DEVOTIONAL, SUBMIT_DEVOTIONAL_SUCCESS, SUBMIT_DEVOTIONAL_FAIL,
  REQUEST_DEVOTIONAL_LIST, REQUEST_DEVOTIONAL_LIST_SUCCESS, REQUEST_DEVOTIONAL_LIST_FAIL
} from './actions.js';

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
      fetching: true,
      valid: false,
      submitting: false,
    }
  });
}

function requestDevotionalSuccess(state, devotional) {
  return state.merge({
    [devotional.id]: {
      id: devotional.id,
      fetching: false,
      valid: true,
      submitting: false,
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
      fetching: false,
      valid: false,
      submitting: false,
    }
  });
}

function requestDevotionalList(state) {
  return state.merge({
    fetching_list: true
  });
}

function requestDevotionalListSuccess(state, devotionalList) {
  return state
    .merge({fetching_list: false})
    .merge(devotionalList);
}

function submitDevotional(state, devotional) {
  return state.merge({
    [devotional.id]: {
      id: devotional.id,
      fetching: false,
      submitting: true,
      valid: true,
      title: devotional.title,
      pasagge: devotional.passagge,
      body: devotional.body,
      author_name: devotional.author_name,
      author_id: devotional.author_id,
      publish_date: devotional.publish_date,
    }
  });
}

function submitDevotionalSuccess(state, devotional) {
  return state.delete('-1').merge({
    [devotional.id]: {
      id: devotional.id,
      fetching: false,
      submitting: false,
      valid: true,
      title: devotional.title,
      pasagge: devotional.passagge,
      body: devotional.body,
      author_name: devotional.author_name,
      author_id: devotional.author_id,
      publish_date: devotional.publish_date,
    }
  });
}
import { Map, fromJS } from 'immutable';
import {
  REQUEST_PREV_DEVOTIONAL, REQUEST_PREV_DEVOTIONAL_SUCCESS, REQUEST_PREV_DEVOTIONAL_FAIL,
  REQUEST_NEXT_DEVOTIONAL, REQUEST_NEXT_DEVOTIONAL_SUCCESS, REQUEST_NEXT_DEVOTIONAL_FAIL,
  SUBMIT_DEVOTIONAL_ADD, SUBMIT_DEVOTIONAL_ADD_SUCCESS, SUBMIT_DEVOTIONAL_ADD_FAIL,
  REQUEST_DEVOTIONAL_LIST, REQUEST_DEVOTIONAL_LIST_SUCCESS, REQUEST_DEVOTIONAL_LIST_FAIL,
  SUBMIT_DEVOTIONAL_EDIT, SUBMIT_DEVOTIONAL_EDIT_SUCCESS, SUBMIT_DEVOTIONAL_EDIT_FAIL,
  SUBMIT_DEVOTIONAL_DELETE, SUBMIT_DEVOTIONAL_DELETE_SUCCESS, SUBMIT_DEVOTIONAL_DELETE_FAIL
} from './actions.js';

export const REDUCER_LOADED_STATUS = 'REDUCER_LOADED';
export const REDUCER_FETCHING_LIST_STATUS = 'REDUCER_FETCHING_LIST';
export const REDUCER_FETCHING_PREV_DEVOTIONAL_STATUS = 'REDUCER_FETCHING_PREV_DEVOTIONAL';
export const REDUCER_FETCHING_DEVOTIONAL_STATUS = 'REDUCER_FETCHING_DEVOTIONAL';
export const REDUCER_FETCHING_NEXT_DEVOTIONAL_STATUS = 'REDUCER_FETCHING_NEXT_DEVOTIONAL';
export const REDUCER_SUBMITTING_DEVOTIONAL_STATUS = 'REDUCER_SUBMITTING_DEVOTIONAL';
export const REDUCER_DELETING_DEVOTIONAL_STATUS = 'REDUCER_DELETING_DEVOTIONAL';

export const FETCHING_STATUS = 'FETCHING';
export const SUBMITTING_STATUS = 'SUBMITTING';
export const LOADED_STATUS = 'LOADED';
export const UNLOADED_STATUS = 'UNLOADED';
export const DELETING_STATUS = 'DELETING';

const STATUS_DEFAULT = REDUCER_LOADED_STATUS;
const CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT = '';

export default function(state = Map({
  status: STATUS_DEFAULT,
  currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT
}), action) {
  switch (action.type) {
    case REQUEST_PREV_DEVOTIONAL:
      return requestPrevDevotional(state, action.publish_date);
    case REQUEST_PREV_DEVOTIONAL_SUCCESS:
      return requestPrevDevotionalSuccess(state, action.devotional);
    case REQUEST_PREV_DEVOTIONAL_FAIL:
      return requestPrevDevotionalFail(state, action.publish_date);
    case REQUEST_NEXT_DEVOTIONAL:
      return requestNextDevotional(state, action.publish_date);
    case REQUEST_NEXT_DEVOTIONAL_SUCCESS:
      return requestNextDevotionalSuccess(state, action.devotional);
    case REQUEST_NEXT_DEVOTIONAL_FAIL:
      return requestNextDevotionalFail(state, action.publish_date);
    case REQUEST_DEVOTIONAL_LIST:
      return requestDevotionalList(state);
    case REQUEST_DEVOTIONAL_LIST_SUCCESS:
      return requestDevotionalListSuccess(state, action.devotionalList);
    case SUBMIT_DEVOTIONAL_ADD:
      return submitDevotionalAdd(state, action.devotional);
    case SUBMIT_DEVOTIONAL_ADD_SUCCESS:
      return submitDevotionalAddSuccess(state, action.devotional, action.oldId);
    case SUBMIT_DEVOTIONAL_ADD_FAIL:
      return submitDevotionalAddFail(state, action.error, action.oldId);
    case SUBMIT_DEVOTIONAL_EDIT:
      return submitDevotionalEdit(state, action.devotional);
    case SUBMIT_DEVOTIONAL_EDIT_SUCCESS:
      return submitDevotionalEditSuccess(state, action.devotional);
    case SUBMIT_DEVOTIONAL_EDIT_FAIL:
      return submitDevotionalEditFail(state, action.error);
    case SUBMIT_DEVOTIONAL_DELETE:
      return submitDevotionalDelete(state, action.devotionalPublishDate);
    case SUBMIT_DEVOTIONAL_DELETE_SUCCESS:
      return submitDevotionalDeleteSuccess(state, action.devotionalPublishDate);
    case SUBMIT_DEVOTIONAL_DELETE_FAIL:
      return submitDevotionalDeleteFail(state, action.devotionalPublishDate);
    default:
      return state;
  }
}

function requestPrevDevotional(state, publish_date) {
  return state.merge({
    status: REDUCER_FETCHING_DEVOTIONAL_STATUS,
    currently_devotional_working_date: publish_date
  });
}

function requestPrevDevotionalSuccess(state, devotional) {
  return state.merge({
    status: REDUCER_LOADED_STATUS,
    currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT,
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

function requestPrevDevotionalFail(state, publish_date) {
  return state.merge({
    status: REDUCER_LOADED_STATUS,
    currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT
  });
}

function requestNextDevotional(state, publish_date) {
  return state.merge({
    status: REDUCER_FETCHING_DEVOTIONAL_STATUS,
    currently_devotional_working_date: publish_date
  });
}

function requestNextDevotionalSuccess(state, devotional) {
  return state.merge({
    status: REDUCER_LOADED_STATUS,
    currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT,
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

function requestNextDevotionalFail(state, publish_date) {
  return state.merge({
    status: REDUCER_LOADED_STATUS,
    currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT
  });
}

function requestDevotionalList(state) {
  return state.merge({
    status: REDUCER_FETCHING_LIST_STATUS
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
    .merge({
      status: REDUCER_LOADED_STATUS
    })
    .merge(devsList);
}

function submitDevotionalAdd(state, devotional) {
  return state.merge({
    status: REDUCER_SUBMITTING_DEVOTIONAL_STATUS,
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

function submitDevotionalAddSuccess(state, devotional, oldId) {
  return state.delete(oldId).merge({
    status: REDUCER_LOADED_STATUS,
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
  });
}

function submitDevotionalAddFail(state, error, oldId) {
  return state
    .delete(oldId)
    .set('status', REDUCER_LOADED_STATUS);
}

function submitDevotionalEdit(state, devotional) {
  return state.merge({
    status: REDUCER_SUBMITTING_DEVOTIONAL_STATUS,
    currently_devotional_working_date: devotional.publish_date,
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

function submitDevotionalEditSuccess(state, devotional) {
  return state
    .merge({
      status: REDUCER_LOADED_STATUS,
      currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT
    })
    .setIn(
      [devotional.publish_date, 'status'],
      LOADED_STATUS
    );
}

function submitDevotionalEditFail(state, error) {
  return state
    .merge({
      status: REDUCER_LOADED_STATUS,
      currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT
    })
    .setIn(
      [devotional.publish_date, 'status'],
      LOADED_STATUS
    );
}

function submitDevotionalDelete (state, devotionalPublishDate) {
  return state
    .merge({
      status: REDUCER_DELETING_DEVOTIONAL_STATUS,
      currently_devotional_working_date: devotional.publish_date
    })
    .setIn(
      [devotionalPublishDate, 'status'],
      DELETING_STATUS
    );
}

function submitDevotionalDeleteSuccess (state, devotionalPublishDate) {
  return state
    .delete(devotionalPublishDate)
    .merge({
      status: REDUCER_LOADED_STATUS,
      currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT
    });
}

function submitDevotionalDeleteFail (state, devotionalPublishDate) {
  return state
    .merge({
      status: REDUCER_LOADED_STATUS,
      currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT
    })
    .setIn(
      [devotionalPublishDate, 'status'],
      LOADED_STATUS
    );
}

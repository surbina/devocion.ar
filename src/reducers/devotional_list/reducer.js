import { Map, fromJS } from 'immutable';
import {
  REQUEST_PREV_DEVOTIONAL, REQUEST_PREV_DEVOTIONAL_SUCCESS, REQUEST_PREV_DEVOTIONAL_FAIL,
  REQUEST_NEXT_DEVOTIONAL, REQUEST_NEXT_DEVOTIONAL_SUCCESS, REQUEST_NEXT_DEVOTIONAL_FAIL,

  REQUEST_ADMIN_DEVOTIONAL_PAGE, REQUEST_AUTHOR_DEVOTIONAL_PAGE, REQUEST_DEVOTIONAL_PAGE_SUCCESS, REQUEST_DEVOTIONAL_PAGE_FAIL,

  SUBMIT_DEVOTIONAL_ADD, SUBMIT_DEVOTIONAL_ADD_SUCCESS, SUBMIT_DEVOTIONAL_ADD_FAIL,
  SUBMIT_DEVOTIONAL_EDIT, SUBMIT_DEVOTIONAL_EDIT_SUCCESS, SUBMIT_DEVOTIONAL_EDIT_FAIL,
  SUBMIT_DEVOTIONAL_DELETE, SUBMIT_DEVOTIONAL_DELETE_SUCCESS, SUBMIT_DEVOTIONAL_DELETE_FAIL
} from './actions.js';

export const REDUCER_LOADED_STATUS = 'REDUCER_LOADED';
export const REDUCER_FETCHING_PAGE_STATUS = 'REDUCER_FETCHING_PAGE';
export const REDUCER_FETCHING_PREV_DEVOTIONAL_STATUS = 'REDUCER_FETCHING_PREV_DEVOTIONAL';
export const REDUCER_FETCHING_NEXT_DEVOTIONAL_STATUS = 'REDUCER_FETCHING_NEXT_DEVOTIONAL';
export const REDUCER_SUBMITTING_DEVOTIONAL_STATUS = 'REDUCER_SUBMITTING_DEVOTIONAL';
export const REDUCER_DELETING_DEVOTIONAL_STATUS = 'REDUCER_DELETING_DEVOTIONAL';

export const FETCHING_STATUS = 'FETCHING';
export const SUBMITTING_STATUS = 'SUBMITTING';
export const LOADED_STATUS = 'LOADED';
export const UNLOADED_STATUS = 'UNLOADED';
export const DELETING_STATUS = 'DELETING';

export const DRAFT_DEVOTIONAL_STATUS = 'DRAFT';
export const PUBLISHED_DEVOTIONAL_STATUS = 'PUBLISHED';

const STATUS_DEFAULT = REDUCER_LOADED_STATUS;
const CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT = '';
const LAST_DEVOTIONAL_PAGE_DATE_DEFAULT = null;

export default function(state = Map({
  status: STATUS_DEFAULT,
  currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT,
  last_devotional_page_date: LAST_DEVOTIONAL_PAGE_DATE_DEFAULT
}), action) {
  switch (action.type) {
    case REQUEST_PREV_DEVOTIONAL:
      return requestPrevDevotional(state, action.publish_date);
    case REQUEST_PREV_DEVOTIONAL_SUCCESS:
      return requestPrevDevotionalSuccess(state, action.devotional);
    case REQUEST_PREV_DEVOTIONAL_FAIL:
      return requestPrevDevotionalFail(state);
    case REQUEST_NEXT_DEVOTIONAL:
      return requestNextDevotional(state, action.publish_date);
    case REQUEST_NEXT_DEVOTIONAL_SUCCESS:
      return requestNextDevotionalSuccess(state, action.devotional);
    case REQUEST_NEXT_DEVOTIONAL_FAIL:
      return requestNextDevotionalFail(state);
    case REQUEST_ADMIN_DEVOTIONAL_PAGE:
      return requestDevotionalPage(state);
    case REQUEST_AUTHOR_DEVOTIONAL_PAGE:
      return requestDevotionalPage(state);
    case REQUEST_DEVOTIONAL_PAGE_SUCCESS:
      return requestDevotionalPageSuccess(state, action.devotionalPage);
    case REQUEST_DEVOTIONAL_PAGE_FAIL:
      return requestDevotionalPageFail(state);
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
    status: REDUCER_FETCHING_PREV_DEVOTIONAL_STATUS,
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
      author_id: devotional.author_id,
      author_name: devotional.author_name,
      publish_date: devotional.publish_date,
      publish_status: devotional.publish_status
    }
  });
}

function requestPrevDevotionalFail(state) {
  return state.merge({
    status: REDUCER_LOADED_STATUS,
    currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT
  });
}

function requestNextDevotional(state, publish_date) {
  return state.merge({
    status: REDUCER_FETCHING_NEXT_DEVOTIONAL_STATUS,
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
      author_id: devotional.author_id,
      author_name: devotional.author_name,
      publish_date: devotional.publish_date,
      publish_status: devotional.publish_status
    }
  });
}

function requestNextDevotionalFail(state) {
  return state.merge({
    status: REDUCER_LOADED_STATUS,
    currently_devotional_working_date: CURRENTLY_DEVOTIONAL_WORKING_DATE_DEFAULT
  });
}

function requestDevotionalPage(state) {
  return state.merge({
    status: REDUCER_FETCHING_PAGE_STATUS
  });
}

function requestDevotionalPageSuccess(state, devotionalPage) {
  let devsList = {};
  let lastDevDate = null;
  for (let prop in devotionalPage) {
    devotionalPage[prop].status = LOADED_STATUS;
    devotionalPage[prop].valid = true;
    
    if(devotionalPage[prop].publish_date) {
      devsList[devotionalPage[prop].publish_date] = devotionalPage[prop];
    } else {
      devsList[devotionalPage[prop].id] = devotionalPage[prop];
    }

    if(!lastDevDate || devotionalPage[prop].publish_date.localeCompare(lastDevDate) < 0) {
      lastDevDate = devotionalPage[prop].publish_date;
    }
  }

  return state
    .merge({
      status: REDUCER_LOADED_STATUS,
      last_devotional_page_date: lastDevDate
    })
    .merge(devsList);
}

function requestDevotionalPageFail(state) {
  return state.merge({
    status: REDUCER_LOADED_STATUS
  });
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
      currently_devotional_working_date: devotionalPublishDate
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

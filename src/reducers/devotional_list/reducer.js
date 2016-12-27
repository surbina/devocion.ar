import { Map, fromJS } from 'immutable';
import {
  REQUEST_PREV_DEVOTIONAL, REQUEST_PREV_DEVOTIONAL_FAIL,
  REQUEST_NEXT_DEVOTIONAL, REQUEST_NEXT_DEVOTIONAL_FAIL,
  REQUEST_DEVOTIONAL_BY_ID, REQUEST_DEVOTIONAL_BY_ID_FAIL,
  REQUEST_DEVOTIONAL_SUCCESS,
  REQUEST_ADMIN_DEVOTIONAL_PAGE, REQUEST_AUTHOR_DEVOTIONAL_PAGE, REQUEST_DEVOTIONAL_PAGE_SUCCESS, REQUEST_DEVOTIONAL_PAGE_FAIL,
  SUBMIT_DEVOTIONAL_ADD, SUBMIT_DEVOTIONAL_ADD_SUCCESS, SUBMIT_DEVOTIONAL_ADD_FAIL,
  SUBMIT_DEVOTIONAL_EDIT, SUBMIT_DEVOTIONAL_EDIT_SUCCESS, SUBMIT_DEVOTIONAL_EDIT_FAIL,
  SUBMIT_DEVOTIONAL_DELETE, SUBMIT_DEVOTIONAL_DELETE_SUCCESS, SUBMIT_DEVOTIONAL_DELETE_FAIL
} from './actions.js';

export const REDUCER_LOADED_STATUS = 'REDUCER_LOADED';
export const REDUCER_FETCHING_PAGE_STATUS = 'REDUCER_FETCHING_PAGE';
export const REDUCER_FETCHING_PREV_DEVOTIONAL_STATUS = 'REDUCER_FETCHING_PREV_DEVOTIONAL';
export const REDUCER_FETCHING_NEXT_DEVOTIONAL_STATUS = 'REDUCER_FETCHING_NEXT_DEVOTIONAL';
export const REDUCER_FETCHING_DEVOTIONAL_BY_ID_STATUS = 'REDUCER_FETCHING_DEVOTIONAL_BY_ID_STATUS';
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
const CURRENTLY_DEVOTIONAL_WORKING_ID_DEFAULT = '';
const LAST_DEVOTIONAL_PAGE_DATE_DEFAULT = null;

export default function(state = Map({
  status: STATUS_DEFAULT,
  currently_devotional_working_id: CURRENTLY_DEVOTIONAL_WORKING_ID_DEFAULT,
  last_devotional_page_date: LAST_DEVOTIONAL_PAGE_DATE_DEFAULT,
  devotional: Map(),
  dateIndex: Map()
}), action) {
  switch (action.type) {
    case REQUEST_PREV_DEVOTIONAL:
      return requestPrevDevotional(state, action.publish_date);
    case REQUEST_PREV_DEVOTIONAL_FAIL:
      return requestPrevDevotionalFail(state);
    case REQUEST_NEXT_DEVOTIONAL:
      return requestNextDevotional(state, action.publish_date);
    case REQUEST_NEXT_DEVOTIONAL_FAIL:
      return requestNextDevotionalFail(state);
    case REQUEST_DEVOTIONAL_BY_ID:
      return requestDevotionalById(state, action.devotionalId);
    case REQUEST_DEVOTIONAL_BY_ID_FAIL:
      return requestDevotionalByIdFail(state);
    case REQUEST_DEVOTIONAL_SUCCESS:
      return requestDevotionalSuccess(state, action.devotional);
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
      return submitDevotionalAddFail(state, action.error, action.oldId, action.publishDate);
    case SUBMIT_DEVOTIONAL_EDIT:
      return submitDevotionalEdit(state, action.devotional);
    case SUBMIT_DEVOTIONAL_EDIT_SUCCESS:
      return submitDevotionalEditSuccess(state, action.devotional);
    case SUBMIT_DEVOTIONAL_EDIT_FAIL:
      return submitDevotionalEditFail(state, action.error, action.devotionalId);
    case SUBMIT_DEVOTIONAL_DELETE:
      return submitDevotionalDelete(state, action.devotionalId);
    case SUBMIT_DEVOTIONAL_DELETE_SUCCESS:
      return submitDevotionalDeleteSuccess(state, action.devotionalId);
    case SUBMIT_DEVOTIONAL_DELETE_FAIL:
      return submitDevotionalDeleteFail(state, action.devotionalId);
    default:
      return state;
  }
}

function requestPrevDevotional(state, publish_date) {
  return state.merge({
    status: REDUCER_FETCHING_PREV_DEVOTIONAL_STATUS,
    currently_devotional_working_id: publish_date
  });
}

function requestPrevDevotionalFail(state) {
  return state.merge({
    status: REDUCER_LOADED_STATUS,
    currently_devotional_working_id: CURRENTLY_DEVOTIONAL_WORKING_ID_DEFAULT
  });
}

function requestNextDevotional(state, publish_date) {
  return state.merge({
    status: REDUCER_FETCHING_NEXT_DEVOTIONAL_STATUS,
    currently_devotional_working_id: publish_date
  });
}

function requestNextDevotionalFail(state) {
  return state.merge({
    status: REDUCER_LOADED_STATUS,
    currently_devotional_working_id: CURRENTLY_DEVOTIONAL_WORKING_ID_DEFAULT
  });
}

function requestDevotionalById(state, devotionalId) {
  return state.merge({
    status: REDUCER_FETCHING_DEVOTIONAL_BY_ID_STATUS,
    currently_devotional_working_id: devotionalId
  });
}

function requestDevotionalByIdFail(state) {
  return state.merge({
    status: REDUCER_LOADED_STATUS,
    currently_devotional_working_id: CURRENTLY_DEVOTIONAL_WORKING_ID_DEFAULT
  });
}

function requestDevotionalSuccess(state, devotional) {
  const newDev = Map({
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
    }),
    newState = state.merge({
      status: REDUCER_LOADED_STATUS,
      currently_devotional_working_id: CURRENTLY_DEVOTIONAL_WORKING_ID_DEFAULT,
    })
    .setIn(['devotional', devotional.id], newDev);

  return devotional.publish_date ?
    newState.setIn(['dateIndex', devotional.publish_date], devotional.id) :
    newState;
}

function requestDevotionalPage(state) {
  return state.merge({
    status: REDUCER_FETCHING_PAGE_STATUS
  });
}

function requestDevotionalPageSuccess(state, devotionalPage) {
  let newState = state.set('status', REDUCER_LOADED_STATUS);

  const devsList = {},
    dateIndex = {};
  let lastDevDate = null,
    currentDev = null;
  for (let dev in devotionalPage) {
    currentDev = devotionalPage[dev];
    currentDev.status = LOADED_STATUS;
    currentDev.valid = true;
    
    newState = newState.setIn(['devotional', currentDev.id], Map(currentDev));

    if(currentDev.publish_date) {
      newState = newState.setIn(['dateIndex', currentDev.publish_date], currentDev.id);
    }

    if(!lastDevDate || currentDev.publish_date.localeCompare(lastDevDate) < 0) {
      lastDevDate = currentDev.publish_date;
    }
  }

  return newState.set('last_devotional_page_date', lastDevDate);
}

function requestDevotionalPageFail(state) {
  return state.set('status', REDUCER_LOADED_STATUS);
}

function submitDevotionalAdd(state, devotional) {
  const newDev = Map({
    id: devotional.id,
    status: LOADED_STATUS,
    valid: true,
    title: devotional.title,
    passage: devotional.passage,
    body: devotional.body,
    author_id: devotional.author_id,
    author_name: devotional.author_name,
    publish_date: devotional.publish_date,
    publish_status: devotional.publish_status,
    creation_date: devotional.creation_date
  });
  const newState = state.merge({
    status: REDUCER_SUBMITTING_DEVOTIONAL_STATUS,
    currently_devotional_working_id: devotional.id,
  })
  .setIn(['devotional', devotional.id], newDev);

  return devotional.publish_date ?
    newState.setIn(['dateIndex', devotional.publish_date], devotional.id) :
    newState;
}

function submitDevotionalAddSuccess(state, devotional, oldId) {
  const newDev = Map({
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
  });
  const newState = state.merge({
    status: REDUCER_LOADED_STATUS,
    currently_devotional_working_id: CURRENTLY_DEVOTIONAL_WORKING_ID_DEFAULT,
  })
  .deleteIn(['devotional', oldId])
  .deleteIn(['dateIndex', devotional.publish_date])
  .setIn(['devotional', devotional.id], newDev);

  return devotional.publish_date ?
    newState.setIn(['dateIndex', devotional.publish_date], devotional.id) :
    newState;
}

function submitDevotionalAddFail(state, error, oldId, publishDate) {
  return state
    .deleteIn(['devotional', oldId])
    .deleteIn(['dateIndex', publishDate])
    .set('status', REDUCER_LOADED_STATUS);
}

function submitDevotionalEdit(state, devotional) {
  return state.merge({
    status: REDUCER_SUBMITTING_DEVOTIONAL_STATUS,
    currently_devotional_working_id: devotional.id,
  })
  .setIn(['devotional', devotional.id],
    Map({
        id: devotional.id,
        status: SUBMITTING_STATUS,
        valid: true,
        title: devotional.title,
        passage: devotional.passage,
        body: devotional.body,
        author_name: devotional.author_name,
        author_id: devotional.author_id,
        publish_date: devotional.publish_date,
        publish_status: devotional.publish_status,
        creation_date: devotional.creation_date
    })
  );
}

function submitDevotionalEditSuccess(state, devotional) {
  return state
    .merge({
      status: REDUCER_LOADED_STATUS,
      currently_devotional_working_id: CURRENTLY_DEVOTIONAL_WORKING_ID_DEFAULT
    })
    .setIn(
      ['devotional', devotional.id, 'status'],
      LOADED_STATUS
    );
}

function submitDevotionalEditFail(state, error, devotionalId) {
  return state
    .merge({
      status: REDUCER_LOADED_STATUS,
      currently_devotional_working_id: CURRENTLY_DEVOTIONAL_WORKING_ID_DEFAULT
    })
    .setIn(
      ['devotional', devotionalId, 'status'],
      LOADED_STATUS
    );
}

function submitDevotionalDelete (state, devotionalId) {
  return state
    .merge({
      status: REDUCER_DELETING_DEVOTIONAL_STATUS,
      currently_devotional_working_id: devotionalId
    })
    .setIn(
      ['devotional', devotionalId, 'status'],
      DELETING_STATUS
    );
}

function submitDevotionalDeleteSuccess (state, devotionalId) {
  const publishDate = state.getIn(['devotional', devotionalId, 'publish_date']);

  return state
    .deleteIn(['devotional', devotionalId])
    .deleteIn(['dateIndex', publishDate])
    .merge({
      status: REDUCER_LOADED_STATUS,
      currently_devotional_working_id: CURRENTLY_DEVOTIONAL_WORKING_ID_DEFAULT
    });
}

function submitDevotionalDeleteFail (state, devotionalId) {
  return state
    .merge({
      status: REDUCER_LOADED_STATUS,
      currently_devotional_working_id: CURRENTLY_DEVOTIONAL_WORKING_ID_DEFAULT
    })
    .setIn(
      ['devotional', devotionalId, 'status'],
      LOADED_STATUS
    );
}

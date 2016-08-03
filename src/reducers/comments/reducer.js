import { Map } from 'immutable';

import {
  REQUEST_COMMENT_LIST, REQUEST_COMMENT_LIST_SUCCESS, REQUEST_COMMENT_LIST_FAIL,
  SUBMIT_COMMENT, SUBMIT_COMMENT_SUCCESS, SUBMIT_COMMENT_FAIL
} from './actions.js'

export const FETCHING_STATUS = 'FETCHING';
export const SUBMITTING_STATUS = 'SUBMITTING';
export const LOADED_STATUS = 'LOADED_STATUS';

export default function(state = Map({
  status: LOADED_STATUS
}), action) {
  switch (action.type) {
    case REQUEST_COMMENT_LIST:
      return requestCommentList(state);
    case REQUEST_COMMENT_LIST_SUCCESS:
      return requestCommentListSuccess(state, action.devotionalId, action.commentList);
    case REQUEST_COMMENT_LIST_FAIL:
      return requestCommentListFail(state);
    case SUBMIT_COMMENT:
      return submitComment(state, action.devotionalId, action.comment);
    case SUBMIT_COMMENT_SUCCESS:
      return submitCommentSuccess(state, action.devotionalId, action.comment);
    case SUBMIT_COMMENT_FAIL:
      return submitCommentFail(state);
    default:
      return state;
  }
}

function requestCommentList(state) {
  return state.merge({
    status: FETCHING_STATUS
  });
}

function requestCommentListSuccess(state, devotionalId, commentList) {
  return state.merge({
    status: LOADED_STATUS,
    [devotionalId]: commentList
  });
}

function requestCommentListFail(state) {
  return state.merge({
    status: LOADED_STATUS
  });
}

function submitComment(state, devotionalId, comment) {
  const devotionalComments = state.get(devotionalId) || Map();
  return state.merge({
    status: SUBMITTING_STATUS,
    [devotionalId]: devotionalComments.set(comment.id, Map(comment))
  });
}

function submitCommentSuccess(state, devotionalId, comment) {
  return state
    .merge({
      status: LOADED_STATUS
    })
    .deleteIn([devotionalId, '-1'])
    .setIn([devotionalId, comment.id], Map(comment));
}

function submitCommentFail(state) {
  return state.merge({
    status: LOADED_STATUS
  });
}
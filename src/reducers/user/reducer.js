import { Map } from 'immutable';

import {
  SUBMIT_NEW_USER, SUBMIT_NEW_USER_SUCCESS, SUBMIT_NEW_USER_FAIL,
  SUBMIT_SIGN_IN, SUBMIT_SIGN_IN_SUCCESS, SUBMIT_SIGN_IN_FAIL,
  SUBMIT_SIGN_OUT, SUBMIT_SIGN_OUT_SUCCESS, SUBMIT_SIGN_OUT_FAIL
} from './actions.js';

/**
 * Constants describing current status
 */
const ANONYMOUS_USER_STATUS = 'ANONYMOUS_USER';
const SIGNED_USER_STATUS = 'SIGNED_USER';
const CREATING_USER_STATUS = 'CREATING_USER';
const SIGNING_IN_STATUS = 'SIGNING_IN';
const SIGNING_OUT_STATUS = 'SIGNING_OUT';

const ANONYMOUS_USER_ID = '-1';
const ANONYMOUS_USER_NAME = 'anonymous';
const ANONYMOUS_USER_EMAIL = '';

export default function(state = Map({
  user_id: ANONYMOUS_USER_ID,
  user_name: ANONYMOUS_USER_NAME,
  user_email: ANONYMOUS_USER_EMAIL,
  status: ANONYMOUS_USER_STATUS
}), action) {
  switch(action.type) {
    case SUBMIT_NEW_USER:
      return submitNewUser(state, action.user);
    case SUBMIT_NEW_USER_SUCCESS:
      return submitNewUserSuccess(state, action.user);
    case SUBMIT_NEW_USER_FAIL:
      return submitNewUserFail(state, action.error);
    case SUBMIT_SIGN_IN:
      return submitSignIn(state, action.user);
    case SUBMIT_SIGN_IN_SUCCESS:
      return submitSignInSuccess(state, action.user);
    case SUBMIT_SIGN_IN_FAIL:
      return submitSignInFail(state, action.error);
    case SUBMIT_SIGN_OUT:
      return submitSignOut(state);
    case SUBMIT_SIGN_OUT_SUCCESS:
      return submitSignOutSuccess(state);
    case SUBMIT_SIGN_OUT_FAIL:
      return submitSignOutFail(state);
    default:
      return state;
  }
}

function submitNewUser(state, user) {
  return state.merge({
    status: CREATING_USER_STATUS
  });
}

function submitNewUserSuccess(state, user) {
  return state.merge({
    status: SIGNED_USER_STATUS,
    user_id: user.uid,
    user_name: 'Sebastian',
    user_email: user.email,
  });
}

function submitNewUserFail(state, error) {
  return state.merge({
    status: ANONYMOUS_USER_STATUS
  });
}

function submitSignIn(state, user) {
  return state.merge({
    status: SIGNING_IN_STATUS
  });
}

function submitSignInSuccess(state, user) {
  return state.merge({
    status: SIGNED_USER_STATUS,
    user_id: user.uid,
    user_name: 'Sebastian',
    user_email: user.email,
  });
}

function submitSignInFail(state, user) {
  return state.merge({
    status: ANONYMOUS_USER_STATUS
  });
}

function submitSignOut(state) {
  return state.merge({
    status: SIGNING_OUT_STATUS
  });
}

function submitSignOutSuccess(state) {
  return state.merge({
    user_id: ANONYMOUS_USER_ID,
    user_name: ANONYMOUS_USER_NAME,
    user_email: ANONYMOUS_USER_EMAIL,
    status: ANONYMOUS_USER_STATUS
  });
}

function submitSignOutFail(state) {
  return state.merge({
    status: SIGNED_USER_STATUS
  });
}
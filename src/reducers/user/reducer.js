import { Map } from 'immutable';

import {
  SET_CURRENT_USER, UNSET_CURRENT_USER, SET_ADDITIONAL_USER_DATA,
  FETCH_ADDITIONAL_USER_DATA, FETCH_ADDITIONAL_USER_DATA_FAIL,
  SUBMIT_NEW_USER, SUBMIT_NEW_USER_FAIL,
  SUBMIT_ADDITIONAL_USER_DATA, SUBMIT_ADDITIONAL_USER_DATA_FAIL,
  SUBMIT_SIGN_IN, SUBMIT_SIGN_IN_FAIL,
  SUBMIT_SIGN_OUT, SUBMIT_SIGN_OUT_FAIL,
  SUBMIT_RESET_PASSWORD_MAIL, SUBMIT_RESET_PASSWORD_MAIL_SUCCESS, SUBMIT_RESET_PASSWORD_MAIL_FAIL
} from './actions.js';

/**
 * Constants describing current status
 */
export const ANONYMOUS_USER_STATUS = 'ANONYMOUS_USER';
export const SIGNING_IN_STATUS = 'SIGNING_IN';
export const VALID_USER_STATUS = 'VALID_USER';
export const FETCHING_USER_DATA_STATUS = 'FETCHING_USER_DATA';
export const SIGNED_USER_STATUS = 'SIGNED_USER';
export const CREATING_USER_STATUS = 'CREATING_USER';
export const UPDATING_USER_DATA_STATUS = 'UPDATING_USER_DATA';
export const SIGNING_OUT_STATUS = 'SIGNING_OUT';
export const SENDING_RESET_PASSWORD_MAIL_STATUS = 'SENDING_RESET_PASSWORD_MAIL';

const ANONYMOUS_USER_ID = '-1';
const ANONYMOUS_USER_DISPLAY_NAME = 'anonymous';
const ANONYMOUS_USER_FIRST_NAME = '';
const ANONYMOUS_USER_LAST_NAME = '';
const ANONYMOUS_USER_EMAIL = '';
const ANONYMOUS_USER_ADMIN = false;

export default function user (state = Map({
  user_id: ANONYMOUS_USER_ID,
  user_display_name: ANONYMOUS_USER_DISPLAY_NAME,
  user_first_name: ANONYMOUS_USER_FIRST_NAME,
  user_last_name: ANONYMOUS_USER_LAST_NAME,
  user_email: ANONYMOUS_USER_EMAIL,
  status: ANONYMOUS_USER_STATUS,
  is_admin: ANONYMOUS_USER_ADMIN
}), action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return setCurrentUser(state, action.user);
    case UNSET_CURRENT_USER:
      return unsetCurrentUser(state);
    case SET_ADDITIONAL_USER_DATA:
      return setAdditionalUserData(state, action.userData);
    case FETCH_ADDITIONAL_USER_DATA:
      return fetchAdditionalUserData(state, action.userId);
    case FETCH_ADDITIONAL_USER_DATA_FAIL:
      return fetchAdditionalUserDataFail(state, action.error);
    case SUBMIT_NEW_USER:
      return submitNewUser(state, action.user);
    case SUBMIT_NEW_USER_FAIL:
      return submitNewUserFail(state, action.error);
    case SUBMIT_ADDITIONAL_USER_DATA:
      return submitAdditionalUserData(state);
    case SUBMIT_ADDITIONAL_USER_DATA_FAIL:
      return submitAdditionalUserDataFail(state);
    case SUBMIT_SIGN_IN:
      return submitSignIn(state);
    case SUBMIT_SIGN_IN_FAIL:
      return submitSignInFail(state, action.error);
    case SUBMIT_SIGN_OUT:
      return submitSignOut(state);
    case SUBMIT_SIGN_OUT_FAIL:
      return submitSignOutFail(state);
    case SUBMIT_RESET_PASSWORD_MAIL:
      return submitResetPasswordMail(state);
    case SUBMIT_RESET_PASSWORD_MAIL_SUCCESS:
      return submitResetPasswordMailSuccess(state);
    case SUBMIT_RESET_PASSWORD_MAIL_FAIL:
      return submitResetPasswordMailFail(state);
    default:
      return state;
  }
}

function setCurrentUser(state, user) {
  return state.merge({
    status: VALID_USER_STATUS,
    user_id: user.uid,
    user_display_name: user.displayName,
    user_email: user.email
  });
}

function unsetCurrentUser(state) {
  return state.merge({
    user_id: ANONYMOUS_USER_ID,
    user_display_name: ANONYMOUS_USER_DISPLAY_NAME,
    user_first_name: ANONYMOUS_USER_FIRST_NAME,
    user_last_name: ANONYMOUS_USER_LAST_NAME,
    user_email: ANONYMOUS_USER_EMAIL,
    status: ANONYMOUS_USER_STATUS,
    is_admin: ANONYMOUS_USER_ADMIN
  });
}

function setAdditionalUserData(state, userData) {
  return state.merge({
    status: SIGNED_USER_STATUS,
    is_admin: userData.admin ? userData.admin : false,
    user_first_name: userData.first_name,
    user_last_name: userData.last_name
  });
}

function fetchAdditionalUserData(state, userId) {
  return state.merge({
    status: FETCHING_USER_DATA_STATUS
  });
}

function fetchAdditionalUserDataFail(state, error) {
  return state.merge({
    status: VALID_USER_STATUS,
  });
}

function submitNewUser(state, user) {
  return state.merge({
    status: CREATING_USER_STATUS
  });
}

function submitNewUserFail(state, error) {
  return state.merge({
    status: ANONYMOUS_USER_STATUS
  });
}


function submitAdditionalUserData(state) {
  return state.merge({
    status: UPDATING_USER_DATA_STATUS
  });
}

function submitAdditionalUserDataSuccess() {
  return state.merge({
    status: VALID_USER_STATUS
  });
}

function submitAdditionalUserDataFail() {
  return state.merge({
    status: VALID_USER_STATUS
  });
}

function submitSignIn(state) {
  return state.merge({
    status: SIGNING_IN_STATUS
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

function submitSignOutFail(state) {
  return state.merge({
    status: SIGNED_USER_STATUS
  });
}

function submitResetPasswordMail(state) {
  return state.merge({
    status: SENDING_RESET_PASSWORD_MAIL_STATUS
  });
}

function submitResetPasswordMailSuccess(state) {
  return state.merge({
    status: ANONYMOUS_USER_STATUS
  });
}

function submitResetPasswordMailFail(state) {
  return state.merge({
    status: ANONYMOUS_USER_STATUS
  });
}
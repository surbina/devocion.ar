import { Map } from 'immutable';

import { SUBMIT_NEW_USER, SUBMIT_NEW_USER_SUCCESS, SUBMIT_NEW_USER_FAIL } from './actions.js';

export default function(state = Map({
  user_id: '-1',
  user_name: 'anonymous',
  user_email: '',
  creating_user: false,
  signing_in: false
}), action) {
  switch(action.type) {
    case SUBMIT_NEW_USER:
      return submitNewUser(state, action.user);
    case SUBMIT_NEW_USER_SUCCESS:
      return submitNewUserSuccess(state, action.user);
    case SUBMIT_NEW_USER_FAIL:
      return submitNewUserFail(state, action.error);
    default:
      return state;
  }
}

function submitNewUser(state, user) {
  return state.merge({
    creating_user: true,
    signing_in: true,
  });
}

function submitNewUserSuccess(state, user) {
  return state.merge({
    creating_user: false,
    signing_in: false,
    user_id: user.uid,
    user_name: 'Sebastian',
    user_email: user.email,
  });
}

function submitNewUserFail(state, error) {
  console.log('Error creating user: ', error);
  return state.merge({
    creating_user: false,
    signing_in: false,
  });
}
import { Map } from 'immutable';

import {
  REQUEST_USER_LIST, REQUEST_USER_LIST_SUCCESS, REQUEST_USER_LIST_FAIL,
  UPDATE_ADMIN_PRIVILEGE, UPDATE_ADMIN_PRIVILEGE_SUCCESS, UPDATE_ADMIN_PRIVILEGE_FAIL
} from './actions.js'

export const FETCHING_STATUS = 'FETCHING';
export const SUBMITTING_STATUS = 'SUBMITTING';
export const LOADED_STATUS = 'LOADED_STATUS';

export default function(state = Map({
  status: LOADED_STATUS,
  list: Map()
}), action) {
  switch(action.type) {
    case REQUEST_USER_LIST:
      return requestUserList(state);
    case REQUEST_USER_LIST_SUCCESS:
      return requestUserListSuccess(state, action.userList);
    case REQUEST_USER_LIST_FAIL:
      return requestUserListFail(state);
    case UPDATE_ADMIN_PRIVILEGE:
      return updateAdminPrivilege(state);
    case UPDATE_ADMIN_PRIVILEGE_SUCCESS:
      return updateAdminPrivilegeSuccess(state, action.userId, action.value);
    case UPDATE_ADMIN_PRIVILEGE_FAIL:
      return updateAdminPrivilegeFail(state);
    default:
      return state;
  }
}

function requestUserList(state) {
  return state.merge({
    status: FETCHING_STATUS
  });
}

function requestUserListSuccess(state, userList) {
  return state.merge({
    status: LOADED_STATUS,
    list: userList
  });
}

function requestUserListFail(state) {
  return state.merge({
    status: LOADED_STATUS
  });
}

function updateAdminPrivilege(state) {
  return state.merge({
    status: SUBMITTING_STATUS
  });
}

function updateAdminPrivilegeSuccess(state, userId, value) {
  return state
    .merge({
      status: LOADED_STATUS
    })
    .setIn(['list', userId, 'admin'], value);
}

function updateAdminPrivilegeFail(state) {
  return state
    .merge({
      status: LOADED_STATUS
    });
}

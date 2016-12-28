import * as firebase from 'firebase';
import { toastr } from 'react-redux-toastr';

export const REQUEST_USER_LIST = 'REQUEST_USER_LIST';
export const REQUEST_USER_LIST_SUCCESS = 'REQUEST_USER_LIST_SUCCESS';
export const REQUEST_USER_LIST_FAIL = 'REQUEST_USER_LIST_FAIL';

export const UPDATE_ADMIN_PRIVILEGE = 'UPDATE_ADMIN_PRIVILEGE';
export const UPDATE_ADMIN_PRIVILEGE_SUCCESS = 'UPDATE_ADMIN_PRIVILEGE_SUCCESS';
export const UPDATE_ADMIN_PRIVILEGE_FAIL = 'UPDATE_ADMIN_PRIVILEGE_FAIL';

export const UPDATE_AUTHOR_PRIVILEGE = 'UPDATE_AUTHOR_PRIVILEGE';
export const UPDATE_AUTHOR_PRIVILEGE_SUCCESS = 'UPDATE_AUTHOR_PRIVILEGE_SUCCESS';
export const UPDATE_AUTHOR_PRIVILEGE_FAIL = 'UPDATE_AUTHOR_PRIVILEGE_FAIL';

export function fetchUserListAction() {
  return function(dispatch, getState) {
    const state = getState();
    if(shouldFecthUserList(state)) {
      dispatch(requestUserListAction());

      firebase.database().ref('users')
        .once('value')
        .then(success);
    }

    function success(snapshot) {
      dispatch(requestUserListSuccessAction(snapshot.val()));
    }

    function error(error) {
      dispatch(requestUserListFailAction({
        code: error.code,
        message: error.message
      }));
    }
  };
}

function shouldFecthUserList(state) {
  return state.user_list.get('list').size === 0;
}

export function submitUpdateAdminPrivilegeAction(userId, value) {
  return function(dispatch) {
    dispatch(updateAdminPrivilegeAction());

    firebase.database().ref('users/' + userId + '/admin')
      .set(value)
      .then(success)
      .catch(error);

    function success() {
      dispatch(updateAdminPrivilegeSuccessAction(userId, value));
      toastr.success('Exito', 'Se actualizaron los privilegios de administrador exitosamente');
    }

    function error(error) {
      dispatch(updateAdminPrivilegeFailAction({
        code: error.code,
        message: error.message
      }));
      toastr.success('Error', 'Hubo un error al actualizar los privilegios de administrador');
    }
  };
}

export function submitUpdateAuthorPrivilegeAction(userId, value) {
  return function(dispatch) {
    dispatch(updateAuthorPrivilegeAction());

    firebase.database().ref('users/' + userId + '/author')
      .set(value)
      .then(success)
      .catch(error);

    function success() {
      dispatch(updateAuthorPrivilegeSuccessAction(userId, value));
      toastr.success('Exito', 'Se actualizaron los privilegios de autor exitosamente');
    }

    function error(error) {
      dispatch(updateAuthorPrivilegeFailAction({
        code: error.code,
        message: error.message
      }));
      toastr.success('Error', 'Hubo un error al actualizar los privilegios de autor');
    }
  };
}

export function requestUserListAction() {
  return {
    type: REQUEST_USER_LIST
  };
}

export function requestUserListSuccessAction(userList) {
  return {
    type: REQUEST_USER_LIST_SUCCESS,
    userList
  };
}

export function requestUserListFailAction(error) {
  return {
    type: REQUEST_USER_LIST_FAIL,
    error
  };
}

export function updateAdminPrivilegeAction() {
  return {
    type: UPDATE_ADMIN_PRIVILEGE
  };
}

export function updateAdminPrivilegeSuccessAction(userId, value) {
  return {
    type: UPDATE_ADMIN_PRIVILEGE_SUCCESS,
    userId,
    value
  };
}

export function updateAdminPrivilegeFailAction(error) {
  return {
    type: UPDATE_ADMIN_PRIVILEGE_FAIL,
    error
  };
}

export function updateAuthorPrivilegeAction() {
  return {
    type: UPDATE_AUTHOR_PRIVILEGE
  };
}

export function updateAuthorPrivilegeSuccessAction(userId, value) {
  return {
    type: UPDATE_AUTHOR_PRIVILEGE_SUCCESS,
    userId,
    value
  };
}

export function updateAuthorPrivilegeFailAction(error) {
  return {
    type: UPDATE_AUTHOR_PRIVILEGE_FAIL,
    error
  };
}

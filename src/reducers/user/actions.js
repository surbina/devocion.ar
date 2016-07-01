export const SUBMIT_NEW_USER = 'SUBMIT_NEW_USER';
export const SUBMIT_NEW_USER_SUCCESS = 'SUBMIT_NEW_USER_SUCCESS';
export const SUBMIT_NEW_USER_FAIL = 'SUBMIT_DEVOTIONAL_FAIL';

export const SUBMIT_SIGN_IN = 'SUBMIT_SIGN_IN';
export const SUBMIT_SIGN_IN_SUCCESS = 'SUBMIT_SIGN_IN_SUCCESS';
export const SUBMIT_SIGN_IN_FAIL = 'SUBMIT_SIGN_IN_FAIL';

export const SUBMIT_SIGN_OUT = 'SUBMIT_SIGN_OUT';
export const SUBMIT_SIGN_OUT_SUCCESS = 'SUBMIT_SIGN_OUT_SUCCESS';
export const SUBMIT_SIGN_OUT_FAIL = 'SUBMIT_SIGN_OUT_FAIL';

export function createNewUserAction(user) {
  return function(dispatch) {
    dispatch(submitNewUserAction(user));

    firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(success)
      .catch(error);

    function success(user) {
      dispatch(submitNewUserSuccessAction({
        id: user.uid,
        email: user.email,        
      }));
    }

    function error(error) {
      dispatch(submitNewUserFailAction({
        code: error.code,
        message: error.message
      }));
    }
  };
}

export function signInAction(user) {
  return function(dispatch) {
    dispatch(submitSigInAction(user));

    firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success)
      .catch(error);

    function success(user) {
      dispatch(submitSignInSucessAction(user));
    }

    function error(error) {
      dispatch(submitSignInFailAction({
        code: error.code,
        message: error.message
      }));
    }
  };
}

export function signOutAction() {
  return function(dispatch) {
    dispatch(submitSignOutAction());

    firebase.auth()
      .signOut()
      .then(success, error);

    function success() {
      dispatch(submitSignOutSuccessAction());
    }

    function error(error) {
      dispatch(submitSignOutFailAction());
    }
  };
}

export function submitNewUserAction(user) {
  return {
    type: SUBMIT_NEW_USER,
    user
  };
}

export function submitNewUserSuccessAction(user) {
  return {
    type: SUBMIT_NEW_USER_SUCCESS,
    user
  };
}

export function submitNewUserFailAction(error) {
  return {
    type: SUBMIT_NEW_USER_FAIL,
    error
  };
}

export function submitSigInAction(user) {
  return {
    type: SUBMIT_SIGN_IN,
    user
  };
}

export function submitSignInSucessAction(user) {
  return {
    type: SUBMIT_SIGN_IN_SUCCESS,
    user
  };
}

export function submitSignInFailAction(error) {
  return {
    type: SUBMIT_SIGN_IN_FAIL,
    error
  };
}

export function submitSignOutAction() {
  return {
    type: SUBMIT_SIGN_OUT
  };
}

export function submitSignOutSuccessAction() {
  return {
    type: SUBMIT_SIGN_OUT_SUCCESS
  };
}

export function submitSignOutFailAction() {
  return {
    type: SUBMIT_SIGN_OUT_FAIL
  };
}
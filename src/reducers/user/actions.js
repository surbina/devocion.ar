import * as firebase from 'firebase';
import { toastr } from 'react-redux-toastr';

export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const UNSET_CURRENT_USER = 'UNSET_CURRENT_USER';
export const SET_ADDITIONAL_USER_DATA = 'SET_ADDITIONAL_USER_DATA';

export const FETCH_ADDITIONAL_USER_DATA = 'FETCH_ADDITIONAL_USER_DATA';
export const FETCH_ADDITIONAL_USER_DATA_FAIL = 'FETCH_ADDITIONAL_USER_DATA_FAIL';

export const SUBMIT_NEW_USER = 'SUBMIT_NEW_USER';
export const SUBMIT_NEW_USER_FAIL = 'SUBMIT_DEVOTIONAL_FAIL';

export const SUBMIT_ADDITIONAL_USER_DATA = 'SUBMIT_ADDITIONAL_USER_DATA';
export const SUBMIT_ADDITIONAL_USER_DATA_FAIL = 'SUBMIT_ADDITIONAL_USER_DATA_FAIL';

export const SUBMIT_SIGN_IN = 'SUBMIT_SIGN_IN';
export const SUBMIT_SIGN_IN_FAIL = 'SUBMIT_SIGN_IN_FAIL';

export const SUBMIT_SIGN_OUT = 'SUBMIT_SIGN_OUT';
export const SUBMIT_SIGN_OUT_FAIL = 'SUBMIT_SIGN_OUT_FAIL';

export const SUBMIT_RESET_PASSWORD_MAIL = 'SUBMIT_RESET_PASSWORD_MAIL';
export const SUBMIT_RESET_PASSWORD_MAIL_SUCCESS = 'SUBMIT_RESET_PASSWORD_MAIL_SUCCESS';
export const SUBMIT_RESET_PASSWORD_MAIL_FAIL = 'SUBMIT_RESET_PASSWORD_MAIL_FAIL';

export function retrieveCurrentUserAction() {
  return function(dispatch) {
    dispatch(submitSigInAction());

    const unsubscribe = firebase.auth().onAuthStateChanged(observer);

    function observer(user) {
      if (user) {
        dispatch(setCurrentUserAction(user));
        dispatch(retrieveAdditionalUserData(user.uid));
      } else {
        dispatch(unsetCurrentUserAction());
      }

      unsubscribe();
    }
  }
}

export function retrieveAdditionalUserData(userId) {
  return function(dispatch) {
    dispatch(fetchAdditionalUserDataAction(userId));

    firebase.database().ref('users/' + userId)
      .once('value', success, error);

    function success(userData) {
      dispatch(setAdditionalUserDataAction(userData.val()));
    }

    function error(error) {
      dispatch(fetchAdditionalUserDataFailAction({
        code: error.code,
        message: error.message
      }));
    }
  }
}

export function createNewUserAction(user) {
  return function(dispatch) {
    dispatch(submitNewUserAction(user));

    firebase.auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then(success)
      .catch(error);

    function success(userDB) {
      user.id = userDB.uid;
      dispatch(setCurrentUserAction(userDB));
      dispatch(updateAdditionalUserDataAction(user));
      toastr.success('Cuenta creada', 'Te has registrado correctamente');
    }

    function error(error) {
      dispatch(submitNewUserFailAction({
        code: error.code,
        message: error.message
      }));
      toastr.error('Error al crear cuenta', 'Hubo un error al crear la cuenta, inténtalo nuevamente más tarde');
    }
  };
}

export function updateAdditionalUserDataAction(user) {
  return function(dispatch) {
    dispatch(submitAdditionalUserDataAction());

    const userData = {
      id: user.id,
      email: user.email,
      first_name: user.firstName,
      last_name: user.lastName
    };
    const ref = firebase.database().ref('users/' + user.id);

    ref
      .set(userData)
      .then(success)
      .catch(error);

    function success(user) {
      dispatch(setAdditionalUserDataAction(userData));
    }

    function error(error) {
      dispatch(submitAdditionalUserDataFailAction({
        code: error.code,
        message: error.message
      }));
    }
  };
}

export function signInAction(user) {
  return function(dispatch) {
    dispatch(submitSigInAction());

    firebase.auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then(success)
      .catch(error);

    function success(user) {
      dispatch(setCurrentUserAction(user));
      dispatch(retrieveAdditionalUserData(user.uid));
      toastr.success('Ingreso exisoto', 'Bienvenido nuevamente');
    }

    function error(error) {
      dispatch(submitSignInFailAction({
        code: error.code,
        message: error.message
      }));

      switch(error.code) {
        case 'auth/invalid-email':
          toastr.error('Dirección de correo incorrecta', 'Hubo un error al ingresar, por favor verifica la dirección de correo ingresada');
          break;
        case 'auth/user-disabled':
          toastr.error('Usuario deshabilitado', 'El usuario está deshabilitado, por favor comunicate con un administrador');
          break;
        case 'auth/user-not-found':
          toastr.error('Usuario no encontrado', 'No se encontró un usuario con esa dirección de correo eletrónico, intenta crear una cuenta con la misma');
          break;
        case 'auth/wrong-password':
          toastr.warning('Contraseña incorrecta', 'Hubo un error al ingresar, por favor verifica la contraseña ingresada');
          break;
      }

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
      dispatch(unsetCurrentUserAction());
      toastr.success('Salida exitosa', 'Has salido de la aplciación, vuelve pronto');
    }

    function error(error) {
      dispatch(submitSignOutFailAction());
      toastr.error('Error al salir', 'Hubo un error al salir, inténtalo de nuevo más tarde');
    }
  };
}

export function sendResetPasswordMailAction(email) {
  return function(dispatch) {
    dispatch(submitResetPasswordMailAction(email));

    firebase.auth()
      .sendPasswordResetEmail(email)
      .then(success)
      .catch(error);

    function success() {
      dispatch(submitResetPasswordMailActionSuccess());
      toastr.success('Email enviado', 'Se envió el email a tu casilla, espera unos minutos y revisa tu carpeta de correo no deseado');
    }

    function error(error) {
      dispatch(submitResetPasswordMailActionFail({
        code: error.code,
        message: error.message
      }));
      toastr.error('Error al enviar email', 'Hubo un error al enviar el email, inténtalo de nuevo más tarde');
    }
  };
}

export function setCurrentUserAction(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function unsetCurrentUserAction() {
  return {
    type: UNSET_CURRENT_USER,
  };
}

export function setAdditionalUserDataAction(userData) {
  return {
    type: SET_ADDITIONAL_USER_DATA,
    userData: userData
  };
}

export function fetchAdditionalUserDataAction(userId) {
  return {
    type: FETCH_ADDITIONAL_USER_DATA,
    userId: userId
  };
}


export function fetchAdditionalUserDataFailAction(error) {
  return {
    type: FETCH_ADDITIONAL_USER_DATA_FAIL,
    error
  };
}

export function submitNewUserAction(user) {
  return {
    type: SUBMIT_NEW_USER,
    user
  };
}


export function submitNewUserFailAction(error) {
  return {
    type: SUBMIT_NEW_USER_FAIL,
    error
  };
}

export function submitAdditionalUserDataAction() {
  return {
    type: SUBMIT_ADDITIONAL_USER_DATA
  };
}

export function submitAdditionalUserDataFailAction(error) {
  return {
    type: SUBMIT_ADDITIONAL_USER_DATA_FAIL,
    error
  };
}

export function submitSigInAction() {
  return {
    type: SUBMIT_SIGN_IN
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

export function submitSignOutFailAction() {
  return {
    type: SUBMIT_SIGN_OUT_FAIL
  };
}

export function submitResetPasswordMailAction(email) {
  return {
    type: SUBMIT_RESET_PASSWORD_MAIL,
    email
  };
}

export function submitResetPasswordMailActionSuccess() {
  return {
    type: SUBMIT_RESET_PASSWORD_MAIL_SUCCESS
  };
}

export function submitResetPasswordMailActionFail(error) {
  return {
    type: SUBMIT_RESET_PASSWORD_MAIL_FAIL,
    error
  };
}
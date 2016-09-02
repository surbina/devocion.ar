import moment from 'moment';
import { hashHistory  } from 'react-router';
import {
  toastrSuccess,
  toastrError
} from '../toastr/actions.js';
import { deleteDevotionalCommentAction } from '../comments/actions.js';

export const REQUEST_DEVOTIONAL = 'REQUEST_DEVOTIONAL';
export const REQUEST_DEVOTIONAL_SUCCESS = 'REQUEST_DEVOTIONAL_SUCCESS';
export const REQUEST_DEVOTIONAL_FAIL = 'REQUEST_DEVOTIONAL_FAIL';

export const REQUEST_PREV_DEVOTIONAL = 'REQUEST_PREV_DEVOTIONAL';
export const REQUEST_PREV_DEVOTIONAL_SUCCESS = 'REQUEST_PREV_DEVOTIONAL_SUCCESS';
export const REQUEST_PREV_DEVOTIONAL_FAIL = 'REQUEST_PREV_DEVOTIONAL_FAIL';

export const REQUEST_NEXT_DEVOTIONAL = 'REQUEST_NEXT_DEVOTIONAL';
export const REQUEST_NEXT_DEVOTIONAL_SUCCESS = 'REQUEST_NEXT_DEVOTIONAL_SUCCESS';
export const REQUEST_NEXT_DEVOTIONAL_FAIL = 'REQUEST_NEXT_DEVOTIONAL_FAIL';

export const REQUEST_DEVOTIONAL_LIST = 'REQUEST_DEVOTIONAL_LIST';
export const REQUEST_DEVOTIONAL_LIST_SUCCESS = 'REQUEST_DEVOTIONAL_LIST_SUCCESS';
export const REQUEST_DEVOTIONAL_LIST_FAIL = 'REQUEST_DEVOTIONAL_LIST_FAIL';

export const SUBMIT_DEVOTIONAL_ADD = 'SUBMIT_DEVOTIONAL_ADD';
export const SUBMIT_DEVOTIONAL_ADD_SUCCESS = 'SUBMIT_DEVOTIONAL_ADD_SUCCESS';
export const SUBMIT_DEVOTIONAL_ADD_FAIL = 'SUBMIT_DEVOTIONAL_ADD_FAIL';

export const SUBMIT_DEVOTIONAL_EDIT = 'SUBMIT_DEVOTIONAL_EDIT';
export const SUBMIT_DEVOTIONAL_EDIT_SUCCESS = 'SUBMIT_DEVOTIONAL_EDIT_SUCCESS';
export const SUBMIT_DEVOTIONAL_EDIT_FAIL = 'SUBMIT_DEVOTIONAL_EDIT_FAIL';

export const SUBMIT_DEVOTIONAL_DELETE = 'SUBMIT_DEVOTIONAL_DELETE';
export const SUBMIT_DEVOTIONAL_DELETE_SUCCESS = 'SUBMIT_DEVOTIONAL_DELETE_SUCCESS';
export const SUBMIT_DEVOTIONAL_DELETE_FAIL = 'SUBMIT_DEVOTIONAL_DELETE_FAIL';

export function fetchDevotionalAction(publish_date, callbackAction) {
  return function (dispatch) {
    dispatch(requestDevotionalAction(publish_date));

    firebase.database()
      .ref('devotional_list/')
      .orderByChild('publish_date')
      .equalTo(publish_date)
      .limitToLast(1)
      .once('value')
      .then(success)
      .catch(error);

    function success(snapshot) {
      const key = Object.keys(snapshot.val())[0];
      const devotional = snapshot.val()[key];
      dispatch(requestDevotionalSuccessAction(devotional));

      if(!!callbackAction) {
        dispatch(callbackAction.call(null, devotional));
      }
    }

    function error(error) {
      dispatch(requestDevotionalFailAction({
        code: error.code,
        message: error.message
      }));
    }
  };
}

export function fetchPreviousDevotionalAction(publish_date, callbackAction) {
  return function(dispatch) {
    dispatch(requestPrevDevotionalAction());

    firebase.database()
      .ref('devotional_list/')
      .orderByChild('publish_date')
      .endAt(moment(publish_date).subtract(1, 'days').format('YYYY-MM-DD'))
      .limitToLast(1)
      .once('value')
      .then(success)
      .catch(error);

    function success(snapshot) {
      const key = Object.keys(snapshot.val())[0];
      const devotional = snapshot.val()[key];
      dispatch(requestPrevDevotionalSuccessAction(devotional));

      if(!!callbackAction) {
        dispatch(callbackAction.call(null, devotional));
      }
    }

    function error(error) {
      dispatch(requestPrevDevotionalSuccessAction({
        code: error.code,
        message: error.message
      }));
    }
  };
}

export function fetchDevotionalListAction() {
  return function (dispatch) {
    dispatch(requestDevotionalListAction());

    firebase.database().ref('devotional_list/')
      .orderByKey()
      .once('value')
      .then(success);

    function success(snapshot) {
      dispatch(requestDevotionalListSuccessAction(snapshot.val()));
    }
  }
}

export function postDevotionalAction(devotional, redirectRoute) {
  return function (dispatch) {
    const oldId = devotional.id;
    dispatch(submitDevotionalAddAction(devotional));

    const ref = firebase.database().ref('devotional_list/').push();
    devotional.id = ref.key;

    ref
      .set(devotional)
      .then(success)
      .catch(error);

    function success() {
      dispatch(submitDevotionalAddSuccessAction(devotional, oldId));
      if(!!redirectRoute) {
        hashHistory.push(redirectRoute);
      }
      dispatch(toastrSuccess('Devocional creado', 'Se creo el devocional'));
    }

    function error(error) {
      dispatch(submitDevotionalAddFailAction({
        code: error.code,
        message: error.message
      }, oldId));
      dispatch(toastrError('Error al crear devocional', 'Ocurrió un error al crear el devocional, inténtalo de nuevo más tarde'));
    }
  };
}

export function putDevotionalAction(devotional, redirectRoute) {
  return function (dispatch) {
    dispatch(submitDevotionalEditAction(devotional));

    firebase.database()
      .ref('devotional_list/' + devotional.id)
      .set(devotional)
      .then(success)
      .catch(error);

    function success() {
      dispatch(submitDevotionalEditSuccessAction(devotional));
      if(!!redirectRoute) {
        hashHistory.push(redirectRoute);
      }
      dispatch(toastrSuccess('Cambios guardados', 'Se guardaron los cambios del devocional'));
    }

    function error(error) {
      dispatch(submitDevotionalEditFailAction({
        code: error.code,
        message: error.message
      }));
      dispatch(toastrError('Error al guardar los cambios', 'Ocurrió un error al guardar los cambios del devocional, inténtalo de nuevo más tarde'));
    }
  };
}

export function deleteDevotionalAction(devotional) {
  return function (dispatch) {
    dispatch(submitDevotionalDeleteAction(devotional.publish_date));

    firebase.database()
      .ref('devotional_list/' + devotional.id)
      .remove()
      .then(success)
      .catch(error);

    function success() {
      dispatch(submitDevotionalDeleteSuccessAction(devotional.publish_date));
      dispatch(deleteDevotionalCommentAction(devotional.id));
      dispatch(toastrSuccess('Devocional eliminado', 'Se eliminó el devocional existosamente'));
    }

    function error(error) {
      dispatch(submitDevotionalDeleteFailAction({
        code: error.code,
        message: error.message
      }, devotional.publish_date));
      dispatch(toastrError('Error al eliminar el devocional', 'Ocurrió un error al eliminar el devocional, inténtalo de nuevo más tarde'));
    }
  };
}

export function requestDevotionalAction(publish_date) {
  return {
    type: REQUEST_DEVOTIONAL,
    publish_date
  };
}

export function requestDevotionalSuccessAction(devotional) {
  return {
    type: REQUEST_DEVOTIONAL_SUCCESS,
    devotional
  };
}

export function requestDevotionalFailAction(error) {
  return {
    type: REQUEST_DEVOTIONAL_FAIL,
    error
  };
}

export function requestPrevDevotionalAction() {
  return {
    type: REQUEST_PREV_DEVOTIONAL
  };
}

export function requestPrevDevotionalSuccessAction(devotional) {
  return {
    type: REQUEST_PREV_DEVOTIONAL_SUCCESS,
    devotional
  };
}

export function requestPrevDevotionalFailAction(error) {
  return {
    type: REQUEST_PREV_DEVOTIONAL_FAIL,
    error
  };
}

export function requestDevotionalListAction() {
  return {
    type: REQUEST_DEVOTIONAL_LIST
  };
}

export function requestDevotionalListSuccessAction(devotionalList) {
  return {
    type: REQUEST_DEVOTIONAL_LIST_SUCCESS,
    devotionalList
  };
}

export function requestDevotionalListFailAction() {
  return {
    type: REQUEST_DEVOTIONAL_LIST_FAIL
  };
}

export function submitDevotionalAddAction(devotional) {
  return {
    type: SUBMIT_DEVOTIONAL_ADD,
    devotional
  };
}

export function submitDevotionalAddSuccessAction(devotional, oldId) {
  return {
    type: SUBMIT_DEVOTIONAL_ADD_SUCCESS,
    devotional,
    oldId
  };
}

export function submitDevotionalAddFailAction(error, oldId) {
  return {
    type: SUBMIT_DEVOTIONAL_ADD_FAIL,
    error,
    oldId
  };
}

export function submitDevotionalEditAction(devotional) {
  return {
    type: SUBMIT_DEVOTIONAL_EDIT,
    devotional
  };
}

export function submitDevotionalEditSuccessAction(devotional) {
  return {
    type: SUBMIT_DEVOTIONAL_EDIT_SUCCESS,
    devotional
  };
}

export function submitDevotionalEditFailAction(error) {
  return {
    type: SUBMIT_DEVOTIONAL_EDIT_FAIL,
    error
  };
}

export function submitDevotionalDeleteAction(devotionalPublishDate) {
  return {
    type: SUBMIT_DEVOTIONAL_DELETE,
    devotionalPublishDate
  };
}

export function submitDevotionalDeleteSuccessAction(devotionalPublishDate) {
  return {
    type: SUBMIT_DEVOTIONAL_DELETE_SUCCESS,
    devotionalPublishDate
  };
}

export function submitDevotionalDeleteFailAction(error, devotionalPublishDate) {
  return {
    type: SUBMIT_DEVOTIONAL_DELETE_FAIL,
    devotionalPublishDate,
    error
  };
}
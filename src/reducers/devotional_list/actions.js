import * as firebase from 'firebase';
import moment from 'moment';
import { hashHistory  } from 'react-router';
import { toastr } from 'react-redux-toastr';
import { deleteDevotionalCommentAction } from '../comment_list/actions.js';
import { LOADED_STATUS } from './actions.js';

export const REQUEST_PREV_DEVOTIONAL = 'REQUEST_PREV_DEVOTIONAL';
export const REQUEST_PREV_DEVOTIONAL_SUCCESS = 'REQUEST_PREV_DEVOTIONAL_SUCCESS';
export const REQUEST_PREV_DEVOTIONAL_FAIL = 'REQUEST_PREV_DEVOTIONAL_FAIL';

export const REQUEST_NEXT_DEVOTIONAL = 'REQUEST_NEXT_DEVOTIONAL';
export const REQUEST_NEXT_DEVOTIONAL_SUCCESS = 'REQUEST_NEXT_DEVOTIONAL_SUCCESS';
export const REQUEST_NEXT_DEVOTIONAL_FAIL = 'REQUEST_NEXT_DEVOTIONAL_FAIL';

export const REQUEST_DEVOTIONAL_PAGE = 'REQUEST_DEVOTIONAL_PAGE';
export const REQUEST_DEVOTIONAL_PAGE_SUCCESS = 'REQUEST_DEVOTIONAL_PAGE_SUCCESS';
export const REQUEST_DEVOTIONAL_PAGE_FAIL = 'REQUEST_DEVOTIONAL_PAGE_FAIL';

export const SUBMIT_DEVOTIONAL_ADD = 'SUBMIT_DEVOTIONAL_ADD';
export const SUBMIT_DEVOTIONAL_ADD_SUCCESS = 'SUBMIT_DEVOTIONAL_ADD_SUCCESS';
export const SUBMIT_DEVOTIONAL_ADD_FAIL = 'SUBMIT_DEVOTIONAL_ADD_FAIL';

export const SUBMIT_DEVOTIONAL_EDIT = 'SUBMIT_DEVOTIONAL_EDIT';
export const SUBMIT_DEVOTIONAL_EDIT_SUCCESS = 'SUBMIT_DEVOTIONAL_EDIT_SUCCESS';
export const SUBMIT_DEVOTIONAL_EDIT_FAIL = 'SUBMIT_DEVOTIONAL_EDIT_FAIL';

export const SUBMIT_DEVOTIONAL_DELETE = 'SUBMIT_DEVOTIONAL_DELETE';
export const SUBMIT_DEVOTIONAL_DELETE_SUCCESS = 'SUBMIT_DEVOTIONAL_DELETE_SUCCESS';
export const SUBMIT_DEVOTIONAL_DELETE_FAIL = 'SUBMIT_DEVOTIONAL_DELETE_FAIL';

export function fetchPrevDevotionalAction(publish_date, successCallbackAction, emptyCallbackAction) {
  return function (dispatch, getState) {
    const state = getState();
    if(shouldFetchDevotional(state, publish_date)) {
      dispatch(requestPrevDevotionalAction(publish_date));

      firebase.database()
        .ref('devotional_list/')
        .orderByChild('publish_date')
        .endAt(publish_date)
        .limitToLast(1)
        .once('value')
        .then(success)
        .catch(error);
    }
    else {
      executeCallback(state.devotional_list.get(publish_date).toJS());
    }

    function success(snapshot) {
      if(snapshot.hasChildren()) {
        const key = Object.keys(snapshot.val())[0];
        const devotional = snapshot.val()[key];
        dispatch(requestPrevDevotionalSuccessAction(devotional));
        executeCallback(devotional);
      }
      else {
        dispatch(requestPrevDevotionalFailAction({
          code: 'MISSING_DEVOTIONAL',
          message: 'Devotional not found'
        }));

        if(!!emptyCallbackAction) {
          dispatch(emptyCallbackAction.call());
        }
      }
    }

    function executeCallback(devotional) {
      if(!!successCallbackAction) {
        dispatch(successCallbackAction.call(null, devotional));
      }
    }

    function error(error) {
      dispatch(requestPrevDevotionalFailAction({
        code: error.code,
        message: error.message
      }));
    }
  };
}

export function fetchNextDevotionalAction(publish_date, successCallbackAction, emptyCallbackAction) {
  return function (dispatch, getState) {
    const state = getState();
    if(shouldFetchDevotional(state, publish_date)) {
      dispatch(requestPrevDevotionalAction(publish_date));

      firebase.database()
        .ref('devotional_list/')
        .orderByChild('publish_date')
        .startAt(publish_date)
        .limitToFirst(1)
        .once('value')
        .then(success)
        .catch(error);
    }
    else {
      executeCallback(state.devotional_list.get(publish_date).toJS());
    }

    function success(snapshot) {
      if(snapshot.hasChildren()) {
        const key = Object.keys(snapshot.val())[0];
        const devotional = snapshot.val()[key];
        dispatch(requestNextDevotionalSuccessAction(devotional));
        executeCallback(devotional);
      }
      else {
        dispatch(requestNextDevotionalFailAction({
          code: 'MISSING_DEVOTIONAL',
          message: 'Devotional not found'
        }));

        if(!!emptyCallbackAction) {
          dispatch(emptyCallbackAction.call());
        }
      }
    }

    function executeCallback(devotional) {
      if(!!successCallbackAction) {
        dispatch(successCallbackAction.call(null, devotional));
      }
    }

    function error(error) {
      dispatch(requestNextDevotionalFailAction({
        code: error.code,
        message: error.message
      }));
    }
  };
}

function shouldFetchDevotional(state, publish_date) {
  return state.devotional_list.get(publish_date) === undefined ||
    (!state.devotional_list.getIn([publish_date, 'valid']) &&
    state.devotional_list.getIn([publish_date, 'status']) === LOADED_STATUS);
}

export function fetchDevotionalPageAction(lastDevotionalFetchedDate) {
  return function (dispatch) {
    dispatch(requestDevotionalPageAction());
    const pageSize = 10;

    if(lastDevotionalFetchedDate) {
      firebase.database()
        .ref('devotional_list/')
        .orderByChild('publish_date')
        .endAt(lastDevotionalFetchedDate)
        .limitToLast(pageSize + 1)
        .once('value')
        .then(success)
        .catch(error);
    }
    else {
      firebase.database()
        .ref('devotional_list/')
        .orderByChild('publish_date')
        .limitToLast(pageSize)
        .once('value')
        .then(success)
        .catch(error);
    }

    function success(snapshot) {
      dispatch(requestDevotionalPageSuccessAction(snapshot.val()));
    }

    function error(error) {
      dispatch(requestDevotionalPageFailAction({
        code: error.code,
        message: error.message
      }));
      toastr.error('Error al recuperar devocionales', 'Ocurrió un error al recuperar la lista de devocionales, inténtalo de nuevo más tarde');
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
      toastr.success('Devocional creado', 'Se creo el devocional');
    }

    function error(error) {
      dispatch(submitDevotionalAddFailAction({
        code: error.code,
        message: error.message
      }, oldId));
      toastr.error('Error al crear devocional', 'Ocurrió un error al crear el devocional, inténtalo de nuevo más tarde');
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
      toastr.success('Cambios guardados', 'Se guardaron los cambios del devocional');
    }

    function error(error) {
      dispatch(submitDevotionalEditFailAction({
        code: error.code,
        message: error.message
      }));
      toastr.error('Error al guardar los cambios', 'Ocurrió un error al guardar los cambios del devocional, inténtalo de nuevo más tarde');
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
      toastr.success('Devocional eliminado', 'Se eliminó el devocional existosamente');
    }

    function error(error) {
      dispatch(submitDevotionalDeleteFailAction({
        code: error.code,
        message: error.message
      }, devotional.publish_date));
      toastr.error('Error al eliminar el devocional', 'Ocurrió un error al eliminar el devocional, inténtalo de nuevo más tarde');
    }
  };
}

export function requestPrevDevotionalAction(publish_date) {
  return {
    type: REQUEST_PREV_DEVOTIONAL,
    publish_date
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

export function requestNextDevotionalAction(publish_date) {
  return {
    type: REQUEST_NEXT_DEVOTIONAL,
    publish_date
  };
}

export function requestNextDevotionalSuccessAction(devotional) {
  return {
    type: REQUEST_NEXT_DEVOTIONAL_SUCCESS,
    devotional
  };
}

export function requestNextDevotionalFailAction(error) {
  return {
    type: REQUEST_NEXT_DEVOTIONAL_FAIL,
    error
  };
}

export function requestDevotionalPageAction() {
  return {
    type: REQUEST_DEVOTIONAL_PAGE
  };
}

export function requestDevotionalPageSuccessAction(devotionalPage) {
  return {
    type: REQUEST_DEVOTIONAL_PAGE_SUCCESS,
    devotionalPage
  };
}

export function requestDevotionalPageFailAction(error) {
  return {
    type: REQUEST_DEVOTIONAL_PAGE_FAIL,
    error
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
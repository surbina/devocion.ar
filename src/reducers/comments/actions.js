import {
  toastrSuccess,
  toastrError
} from '../toastr/actions.js';

export const REQUEST_COMMENT_LIST = 'REQUEST_COMMENT_LIST';
export const REQUEST_COMMENT_LIST_SUCCESS = 'REQUEST_COMMENT_LIST_SUCCESS';
export const REQUEST_COMMENT_LIST_FAIL = 'REQUEST_COMMENT_LIST_FAIL';

export const SUBMIT_COMMENT = 'SUBMIT_COMMENT';
export const SUBMIT_COMMENT_SUCCESS = 'SUBMIT_COMMENT_SUCCESS';
export const SUBMIT_COMMENT_FAIL = 'SUBMIT_COMMENT_FAIL';

export function fetchCommentListAction(devotionalId) {
  return function (dispatch) {
    dispatch(requestCommentListAction());

    firebase.database().ref('comment_list/' + devotionalId)
      .once('value')
      .then(success);

    function success(snapshot) {
      dispatch(requestCommentListSuccessAction(devotionalId, snapshot.val()));
    }

    function error(error) {
      dispatch(requestCommentListFailAction({
        code: error.code,
        message: error.message
      }));
    }
  }
}

export function postCommentAction(devotionalId, comment) {
  return function (dispatch) {
    comment.id = '-1';
    dispatch(submitCommentAction(devotionalId, comment));

    const ref = firebase.database().ref('comment_list/' + devotionalId).push();
    comment.id = ref.key;

    ref
      .set(comment)
      .then(success)
      .catch(error);

    function success() {
      dispatch(submitCommentSuccessAction(devotionalId, comment));
      dispatch(toastrSuccess('Comentario creado', 'Se agregó el comentario al devocional'));
    }

    function error(error) {
      dispatch(submitCommentFailAction({
        code: error.code,
        message: error.message
      }));
      dispatch(toastrSuccess('Error al crear comentario', 'Se produjo un error creando el comentario, inténtalo de nuevo más tarde'));
    }
  };
}

export function requestCommentListAction() {
  return {
    type: REQUEST_COMMENT_LIST
  };
}

export function requestCommentListSuccessAction(devotionalId, commentList) {
  return {
    type: REQUEST_COMMENT_LIST_SUCCESS,
    devotionalId,
    commentList
  };
}

export function requestCommentListFailAction(error) {
  return {
    type: REQUEST_COMMENT_LIST_FAIL,
    error
  };
}

export function submitCommentAction(devotionalId, comment) {
  return {
    type: SUBMIT_COMMENT,
    devotionalId,
    comment
  };
}

export function submitCommentSuccessAction(devotionalId, comment) {
  return {
    type: SUBMIT_COMMENT_SUCCESS,
    devotionalId,
    comment
  };
}

export function submitCommentFailAction(error) {
  return {
    type: SUBMIT_COMMENT_FAIL,
    error
  };
}
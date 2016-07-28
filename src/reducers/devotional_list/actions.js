export const REQUEST_DEVOTIONAL = 'REQUEST_DEVOTIONAL';
export const REQUEST_DEVOTIONAL_SUCCESS = 'REQUEST_DEVOTIONAL_SUCCESS';
export const REQUEST_DEVOTIONAL_FAIL = 'REQUEST_DEVOTIONAL_FAIL';

export const REQUEST_DEVOTIONAL_LIST = 'REQUEST_DEVOTIONAL_LIST';
export const REQUEST_DEVOTIONAL_LIST_SUCCESS = 'REQUEST_DEVOTIONAL_LIST_SUCCESS';
export const REQUEST_DEVOTIONAL_LIST_FAIL = 'REQUEST_DEVOTIONAL_LIST_FAIL';

export const SUBMIT_DEVOTIONAL = 'SUBMIT_DEVOTIONAL';
export const SUBMIT_DEVOTIONAL_SUCCESS = 'SUBMIT_DEVOTIONAL_SUCCESS';
export const SUBMIT_DEVOTIONAL_FAIL = 'SUBMIT_DEVOTIONAL_FAIL';

export function fetchDevotionalAction(id) {
  return function (dispatch) {
    dispatch(requestDevotionalAction(id));

    firebase.database().ref('devotional_list/' + id)
      .once('value')
      .then(success);

    function success(snapshot) {
      dispatch(requestDevotionalSuccessAction(snapshot.val()));
    }
  };
}

export function requestDevotionalAction(id) {
  return {
    type: REQUEST_DEVOTIONAL,
    id
  };
}

export function requestDevotionalSuccessAction(devotional) {
  return {
    type: REQUEST_DEVOTIONAL_SUCCESS,
    devotional
  };
}

export function requestDevotionalFailAction(id) {
  return {
    type: REQUEST_DEVOTIONAL_FAIL,
    id
  };
}

export function fetchDevotionalListAction() {
  return function (dispatch) {
    dispatch(requestDevotionalListAction());

    firebase.database().ref('devotional_list/')
      .once('value')
      .then(success);

    function success(snapshot) {
      dispatch(requestDevotionalListSuccessAction(snapshot.val()));
    }
  }
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

export function postDevotionalAction(devotional) {
  return function (dispatch) {
    devotional.id = '-1';
    dispatch(submitDevotionalAction(devotional));

    const ref = firebase.database().ref('devotional_list/').push();
    devotional.id = ref.key;

    ref
      .set(devotional)
      .then(success);

    function success() {
      dispatch(submitDevotionalSuccessAction(devotional));
    }
  };
}

export function submitDevotionalAction(devotional) {
  return {
    type: SUBMIT_DEVOTIONAL,
    devotional
  };
}

export function submitDevotionalSuccessAction(devotional) {
  return {
    type: SUBMIT_DEVOTIONAL_SUCCESS,
    devotional
  };
}

export function submitDevotionalFailAction() {
  return {
    type: SUBMIT_DEVOTIONAL_FAIL
  };
}
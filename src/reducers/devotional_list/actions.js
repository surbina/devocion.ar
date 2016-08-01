export const REQUEST_DEVOTIONAL = 'REQUEST_DEVOTIONAL';
export const REQUEST_DEVOTIONAL_SUCCESS = 'REQUEST_DEVOTIONAL_SUCCESS';
export const REQUEST_DEVOTIONAL_FAIL = 'REQUEST_DEVOTIONAL_FAIL';

export const REQUEST_DEVOTIONAL_LIST = 'REQUEST_DEVOTIONAL_LIST';
export const REQUEST_DEVOTIONAL_LIST_SUCCESS = 'REQUEST_DEVOTIONAL_LIST_SUCCESS';
export const REQUEST_DEVOTIONAL_LIST_FAIL = 'REQUEST_DEVOTIONAL_LIST_FAIL';

export const SUBMIT_DEVOTIONAL = 'SUBMIT_DEVOTIONAL';
export const SUBMIT_DEVOTIONAL_SUCCESS = 'SUBMIT_DEVOTIONAL_SUCCESS';
export const SUBMIT_DEVOTIONAL_FAIL = 'SUBMIT_DEVOTIONAL_FAIL';

export function fetchDevotionalAction(publish_date) {
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
      dispatch(requestDevotionalSuccessAction(snapshot.val()));
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

export function requestDevotionalFailAction(publish_date) {
  return {
    type: REQUEST_DEVOTIONAL_FAIL,
    publish_date
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
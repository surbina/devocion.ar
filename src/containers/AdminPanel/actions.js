export const REQUEST_DEVOTIONAL_LIST = 'REQUEST_DEVOTIONAL_LIST';
export const REQUEST_DEVOTIONAL_LIST_SUCCESS = 'REQUEST_DEVOTIONAL_LIST_SUCCESS';
export const REQUEST_DEVOTIONAL_LIST_FAIL = 'REQUEST_DEVOTIONAL_LIST_FAIL';

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
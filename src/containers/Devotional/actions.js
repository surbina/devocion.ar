export const REQUEST_DEVOTIONAL = 'REQUEST_DEVOTIONAL';
export const REQUEST_DEVOTIONAL_SUCCESS = 'REQUEST_DEVOTIONAL_SUCCESS';
export const REQUEST_DEVOTIONAL_FAIL = 'REQUEST_DEVOTIONAL_FAIL';

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

export function requestDevotionalFailAction() {
  return {
    type: REQUEST_DEVOTIONAL_FAIL
  };
}
import {Map} from 'immutable';

export function setStateAction(state) {
  return {
    type: 'SET_STATE',
    state
  };
}

export function fetchDevotionalAction(id) {
  return function (dispatch) {
    dispatch(requestDevotionalAction(id));

    firebase.database().ref('devotional_list/' + id)
      .on('value', success);

    function success(snapshot) {
      dispatch(requestDevotionalSuccessAction(snapshot.val()));
    }
  }
}

export function requestDevotionalAction(id) {
  return {
    type: 'REQUEST_DEVOTIONAL',
    id
  };
}

export function requestDevotionalSuccessAction(devotional) {
  return {
    type: 'REQUEST_DEVOTIONAL_SUCCESS',
    devotional
  };
}

export function requestDevotionalFailAction() {
  return {
    type: 'REQUEST_DEVOTIONAL_FAIL'
  };
}
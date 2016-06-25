export const SUBMIT_DEVOTIONAL = 'SUBMIT_DEVOTIONAL';
export const SUBMIT_DEVOTIONAL_SUCCESS = 'SUBMIT_DEVOTIONAL_SUCCESS';
export const SUBMIT_DEVOTIONAL_FAIL = 'SUBMIT_DEVOTIONAL_FAIL';

export function postDevotionalAction(devotional) {
  return function (dispatch) {
    dispatch(submitDevotionalAction(devotional));

    firebase.database().ref('devotional_list/')
      .push(devotional.toJS())
      .then(success);

    function success(data) {
      console.log('Data: ', data);
      //dispatch(submitDevotionalSuccessAction(data));
    }
  };
}

export function submitDevotionalAction(devotional) {
  return {
    type: SUBMIT_DEVOTIONAL,
    devotional
  };
}

export function submitDevotionalSuccessAction(id) {
  return {
    type: SUBMIT_DEVOTIONAL_SUCCESS,
    id
  };
}

export function submitDevotionalFailAction() {
  return {
    type: SUBMIT_DEVOTIONAL_FAIL
  };
}
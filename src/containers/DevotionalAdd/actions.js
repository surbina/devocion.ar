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
      dispatch(submitDevotionalSuccessAction({
        id: data.key,
        devotional
      }));
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
import moment from 'moment';

import { requestDevotionalSuccessAction } from '../devotional_list/actions.js';

export const LOAD_LAST_DEVOTIONAL = 'LOAD_LAST_DEVOTIONAL';
export const LOAD_LAST_DEVOTIONAL_SUCCESS = 'LOAD_LAST_DEVOTIONAL_SUCCESS';
export const LOAD_LAST_DEVOTIONAL_FAIL = 'LOAD_LAST_DEVOTIONAL_FAIL';

export const LOAD_DEVOTIONAL = 'LOAD_DEVOTIONAL';

export function fethLastDevotionalAction() {
  return function (dispatch) {
    dispatch(loadLastDevotionalAction());

    firebase.database()
      .ref('devotional_list/')
      .orderByChild('publish_date')
      .endAt(moment().format('YYYY-MM-DD'))
      .limitToLast(1)
      .once('value')
      .then(success)
      .catch(error);

    function success(snapshot) {
      const key = Object.keys(snapshot.val())[0];
      dispatch(loadLastDevotionalSuccessAction(snapshot.val()[key]));
      dispatch(requestDevotionalSuccessAction(snapshot.val()[key]));
    }

    function error(error) {
      dispatch(loadLastDevotionalFailAction({
        code: error.code,
        message: error.message
      }));
    }
  };
}

export function loadDevotionalAction (publish_date) {
  return {
    type: LOAD_DEVOTIONAL,
    publish_date
  };
}

export function loadLastDevotionalAction() {
	return {
		type: LOAD_LAST_DEVOTIONAL
	};
}

export function loadLastDevotionalSuccessAction(devotional) {
  return {
    type: LOAD_LAST_DEVOTIONAL_SUCCESS,
    devotional
  };
}

export function loadLastDevotionalFailAction(error) {
  return {
    type: LOAD_LAST_DEVOTIONAL_FAIL,
    error
  };
}
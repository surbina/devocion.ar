import moment from 'moment';

import { requestDevotionalSuccessAction } from '../devotional_list/actions.js';

export const LOAD_LAST_DEVOTIONAL = 'LOAD_LAST_DEVOTIONAL';
export const LOAD_LAST_DEVOTIONAL_SUCCESS = 'LOAD_LAST_DEVOTIONAL_SUCCESS';
export const LOAD_LAST_DEVOTIONAL_FAIL = 'LOAD_LAST_DEVOTIONAL_FAIL';

export const LOAD_NEXT_DEVOTIONAL = 'LOAD_NEXT_DEVOTIONAL';
export const LOAD_NEXT_DEVOTIONAL_FAIL = 'LOAD_NEXT_DEVOTIONAL_FAIL';

export const LOAD_PREVIOUS_DEVOTIONAL = 'LOAD_PREVIOUS_DEVOTIONAL';
export const LOAD_PREVIOUS_DEVOTIONAL_FAIL = 'LOAD_PREVIOUS_DEVOTIONAL_FAIL';

export const LOAD_DEVOTIONAL = 'LOAD_DEVOTIONAL';

export function fetchLastDevotionalAction() {
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

export function fetchNextDevotionalAction(publish_date) {
  return function (dispatch) {
    dispatch(loadNextDevotionalAction());

    firebase.database()
      .ref('devotional_list/')
      .orderByChild('publish_date')
      .endAt(moment(publish_date).add(1, 'days').format('YYYY-MM-DD'))
      .limitToLast(1)
      .once('value')
      .then(success)
      .catch(error);

    function success(snapshot) {
      const key = Object.keys(snapshot.val())[0];
      dispatch(loadDevotionalAction(snapshot.val()[key].id, snapshot.val()[key].publish_date));
      dispatch(requestDevotionalSuccessAction(snapshot.val()[key]));
    }

    function error(error) {
      dispatch(loadNextDevotionalFailAction({
        code: error.code,
        message: error.message
      }));
    }
  };
}

export function fetchPreviousDevotionalAction(publish_date) {
  return function (dispatch) {
    dispatch(loadPreviousDevotionalAction());

    firebase.database()
      .ref('devotional_list/')
      .orderByChild('publish_date')
      .endAt(moment(publish_date).subtract(1, 'days').format('YYYY-MM-DD'))
      .limitToLast(1)
      .once('value')
      .then(success)
      .catch(error);

    function success(snapshot) {
      const key = Object.keys(snapshot.val())[0];
      dispatch(loadDevotionalAction(snapshot.val()[key].id, snapshot.val()[key].publish_date));
      dispatch(requestDevotionalSuccessAction(snapshot.val()[key]));
    }

    function error(error) {
      dispatch(loadPreviousDevotionalFailAction({
        code: error.code,
        message: error.message
      }));
    }
  };
}

export function loadDevotionalAction (id, publish_date) {
  return {
    type: LOAD_DEVOTIONAL,
    id,
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

export function loadNextDevotionalAction() {
  return {
    type: LOAD_NEXT_DEVOTIONAL
  };
}

export function loadNextDevotionalFailAction(error) {
  return {
    type: LOAD_NEXT_DEVOTIONAL_FAIL,
    error
  };
}

export function loadPreviousDevotionalAction() {
  return {
    type: LOAD_PREVIOUS_DEVOTIONAL
  };
}

export function loadPreviousDevotionalFailAction(error) {
  return {
    type: LOAD_PREVIOUS_DEVOTIONAL_FAIL,
    error
  };
}
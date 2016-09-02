import {
  fetchPrevDevotionalAction,
  fetchNextDevotionalAction
} from '../devotional_list/actions.js'

export const LOAD_DEVOTIONAL_VIEW = 'LOAD_DEVOTIONAL_VIEW';
export const SET_CURRENT_DEVOTIONAL = 'SET_CURRENT_DEVOTIONAL';

export function loadCurrentOrPreviousDevotionalAction(devotionalPublishDate) {
  return function(dispatch) {
    dispatch(loadDevotionalAction());
    dispatch(fetchPrevDevotionalAction(devotionalPublishDate, setCurrentDevotionalAction));
  };
}

export function loadCurrentOrNextDevotionalAction(devotionalPublishDate) {
  return function(dispatch) {
    dispatch(loadDevotionalAction());
    dispatch(fetchNextDevotionalAction(devotionalPublishDate, setCurrentDevotionalAction));
  };
}

export function loadDevotionalAction() {
  return {
    type: LOAD_DEVOTIONAL_VIEW
  };
}

export function setCurrentDevotionalAction(devotional) {
  return {
    type: SET_CURRENT_DEVOTIONAL,
    devotional
  };
}
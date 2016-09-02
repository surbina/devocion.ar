import { push } from 'react-router-redux';

import {
  fetchDevotionalAction,
  fetchPreviousDevotionalAction
} from '../devotional_list/actions.js'

export const LOAD_DEVOTIONAL_VIEW = 'LOAD_DEVOTIONAL_VIEW';
export const SET_CURRENT_DEVOTIONAL = 'SET_CURRENT_DEVOTIONAL';

export function loadCurrentDevotionalAction(devotionalPublishDate) {
  return function(dispatch) {
    dispatch(loadDevotionalAction());
    dispatch(fetchDevotionalAction(devotionalPublishDate, setCurrentDevotionalAction));
  };
}

export function loadPrevDevotionalAction(devotionalPublishDate) {
  return function(dispatch) {
    dispatch(loadDevotionalAction());
    dispatch(fetchPreviousDevotionalAction(devotionalPublishDate, setPrevDevotionalAction));
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

export function setPrevDevotionalAction(devotional) {
  return function(dispatch) {
    dispatch(setCurrentDevotionalAction(devotional));
    dispatch(push('/devotional/' + devotional.publish_date));
  };
}
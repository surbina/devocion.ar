import { push } from 'react-router-redux'
import {
  fetchPrevDevotionalAction,
  fetchNextDevotionalAction
} from '../devotional_list/actions.js'

export const LOAD_DEVOTIONAL_VIEW = 'LOAD_DEVOTIONAL_VIEW';
export const SET_CURRENT_DEVOTIONAL = 'SET_CURRENT_DEVOTIONAL';

export function loadCurrentOrPreviousDevotionalAction(devotionalPublishDate) {
  return function(dispatch) {
    dispatch(loadDevotionalAction(devotionalPublishDate));
    dispatch(fetchPrevDevotionalAction(devotionalPublishDate, updateCurrentDevotional));
  };
}

export function loadCurrentOrNextDevotionalAction(devotionalPublishDate) {
  return function(dispatch) {
    dispatch(loadDevotionalAction(devotionalPublishDate));
    dispatch(fetchNextDevotionalAction(devotionalPublishDate, updateCurrentDevotional));
  };
}

export function updateCurrentDevotional(devotional) {
  return function(dispatch, getState) {
    const state = getState();
    dispatch(setCurrentDevotionalAction(devotional));
    if(state.home_section.get('target_date') !== devotional.publish_date) {
      dispatch(push('/devotional/' + devotional.publish_date));
    }
  };
}

export function loadDevotionalAction(devotionalPublishDate) {
  return {
    type: LOAD_DEVOTIONAL_VIEW,
    devotionalPublishDate
  };
}

export function setCurrentDevotionalAction(devotional) {
  return {
    type: SET_CURRENT_DEVOTIONAL,
    devotional
  };
}
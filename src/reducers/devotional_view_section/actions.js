import { push } from 'react-router-redux';
import { toastr } from 'react-redux-toastr';
import {
  fetchPrevDevotionalAction,
  fetchNextDevotionalAction
} from '../devotional_list/actions.js';

export const LOAD_DEVOTIONAL_VIEW = 'LOAD_DEVOTIONAL_VIEW';
export const SET_CURRENT_DEVOTIONAL = 'SET_CURRENT_DEVOTIONAL';

export function loadCurrentOrPreviousDevotionalAction(devotionalPublishDate) {
  return function(dispatch) {
    dispatch(loadDevotionalAction(devotionalPublishDate));
    dispatch(fetchPrevDevotionalAction(devotionalPublishDate, updateCurrentDevotional, redirectoToDevotionalNotFound));
  };
}

export function loadCurrentOrNextDevotionalAction(devotionalPublishDate) {
  return function(dispatch) {
    dispatch(loadDevotionalAction(devotionalPublishDate));
    dispatch(fetchNextDevotionalAction(devotionalPublishDate, updateCurrentDevotional, redirectoToDevotionalNotFound));
  };
}

export function updateCurrentDevotional(devotional) {
  return function(dispatch, getState) {
    const state = getState();
    dispatch(setCurrentDevotionalAction(devotional));
    if(state.devotional_view_section.get('target_date') !== devotional.publish_date) {
      dispatch(push('/devotional/' + devotional.publish_date));
      toastr.info('Devocional no encontrado', 'No encontramos un devocional para esta fecha, así que navegamos hacia el más próximo');
    }
  };
}

export function redirectoToDevotionalNotFound() {
  return function(dispatch) {
    dispatch(push('/devotional-not-found'));
  }
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
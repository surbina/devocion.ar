import {Map} from 'immutable';
import { SET_STATE } from './actions.js';

function setState(state, newState) {
  return state.merge(newState);
}

export default function(state = Map({devotional_list: {}}), action) {
  switch (action.type) {
    case SET_STATE:
      return setState(state, action.state);
    default:
      return state;
  }
}
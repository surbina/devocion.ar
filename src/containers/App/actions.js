export const SET_STATE = 'SET_STATE';

export function setStateAction(state) {
  return {
    type: 'SET_STATE',
    state
  };
}
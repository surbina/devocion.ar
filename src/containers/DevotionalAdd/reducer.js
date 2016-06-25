import { SUBMIT_DEVOTIONAL, SUBMIT_DEVOTIONAL_SUCCESS, SUBMIT_DEVOTIONAL_FAIL } from '.actions.js';

function submitDevotional(state, devotional) {
  return state.merge({
    admin_section: {
      add_devotional: {
        submitting: true
      }
    }
  });
}

function submitDevotionalSuccess(state, devotional) {
  console.log('Reduce devotionaladd.success: ', devotional);
  return state.merge({
    admin_section: {
      add_devotional: {
        submitting: false
      }
    }
  });
}

export default function(state, action) {
  switch(action.type) {
    case SUBMIT_DEVOTIONAL:
      return submitDevotional(state, action.devotional);
    case SUBMIT_DEVOTIONAL_SUCCESS:
      return submitDevotionalSuccess(state, action.devotional);
    default:
      return state;
  }
}
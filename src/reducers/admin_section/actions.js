export const EDIT_DEVOTIONAL = 'EDIT_DEVOTIONAL';
export const RESET_EDIT_DEVOTIONAL = 'RESET_EDIT_DEVOTIONAL';

export function editDevotional(id) {
  return {
    type: EDIT_DEVOTIONAL,
    id
  };
}

export function resetEditDevotional() {
  return {
    type: RESET_EDIT_DEVOTIONAL
  };
}
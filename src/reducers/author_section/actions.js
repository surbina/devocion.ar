export const AUTHOR_EDIT_DEVOTIONAL = 'AUTHOR_EDIT_DEVOTIONAL';
export const AUTHOR_RESET_EDIT_DEVOTIONAL = 'AUTHOR_RESET_EDIT_DEVOTIONAL';

export function authorEditDevotional(devotionalId) {
  return {
    type: AUTHOR_EDIT_DEVOTIONAL,
    devotionalId
  };
}

export function authorResetEditDevotional() {
  return {
    type: AUTHOR_RESET_EDIT_DEVOTIONAL
  };
}
export const EDIT_DEVOTIONAL = 'EDIT_DEVOTIONAL';

export function editDevotional(publish_date) {
  return {
    type: EDIT_DEVOTIONAL,
    publish_date
  };
}
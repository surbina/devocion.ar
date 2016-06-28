export const LOAD_DEVOTIONAL = 'LOAD_DEVOTIONAL';

export function loadDevotionalAction (id) {
  return {
    type: LOAD_DEVOTIONAL,
    id
  };
}
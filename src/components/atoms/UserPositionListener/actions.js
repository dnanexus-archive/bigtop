export function updateUserPosition(x, y, z) {
  return {
    type: 'UPDATE_USER_POSITION',
    coords: [x, y, z]
  };
}

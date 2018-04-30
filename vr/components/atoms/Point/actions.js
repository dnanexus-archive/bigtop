export function setSelectedPoint(id, cartesianCoords) {
  return {
    type: 'SET_SELECTED_POINT',
    id,
    cartesianCoords
  }
}

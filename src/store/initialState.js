export default {
  user: {
    selectedPoint: null,
    worldPosition: [0, -3, 0],
    inVR: false,
    rightHanded: true
  },
  room: {
    height: 10,
    radius: 10
  },
  pCutoff: 1e-7,
  pointCount: null,
  currentDataset: 0,
  datasets: [
    {
      data: null,
      chromosomes: [],
      cytobands: []    
    }
  ]
};

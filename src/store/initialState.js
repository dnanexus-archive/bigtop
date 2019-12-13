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
  gene: null,
  rsID: null,
  pointCount: null,
  currentDataset: 0,
  highlightColor: "#00ff00",
  datasets: [
    {
      data: null,
      chromosomes: [],
      cytobands: []    
    }
  ]
};

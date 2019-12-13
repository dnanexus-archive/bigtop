import {combineReducers} from 'redux';
import initialState from './initialState';

export default combineReducers({
  user: (state = initialState.user, action) => {
    switch (action && action.type) {
      case 'SET_SELECTED_POINT':
        return {...state,
          selectedPoint: action.id
        }

      case 'UPDATE_USER_POSITION':
        return {...state,
          worldPosition: action.coords
        };

      default:
        return state;
    }
  },

  room: (state = initialState.room) => state,

  pCutoff: (state = initialState.pCutoff) => state,

  pointCount: (state = initialState.pointCount) => state,

  rsID: (state = initialState.rsID) => state,

  gene: (state = initialState.gene) => state,

  highlightColor: (state = initialState.highlightColor) => state,

  currentDataset: (state = initialState.currentDataset, action) => {
    switch (action && action.type) {
      case "SWITCH_DATASET":
        return action.index;

      default:
        return state;
    }
  },

  datasets: (state = initialState.datasets, action) => {
    switch (action && action.type) {
      case "RECEIVED_DATASETS":
        return action.data;

      case "RECEIVED_CHR": {
        let datasets = [...state];
        datasets[0] = {...datasets[0], chromosomes: action.data};
        return datasets;
      }

      case "RECEIVED_CYTO": {
        let datasets = [...state];
        datasets[0] = {...datasets[0], cytobands: action.data};
        return datasets;
      }

      case "RECEIVED_DATA": {
        let datasets = [...state];
        datasets[0] = {...datasets[0], data: action.data};
        return datasets;
      }

      default:
        return state;
    }
  }
});

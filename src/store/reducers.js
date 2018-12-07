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

  chromosomes: (state = initialState.chromosomes, action) => {
    switch (action && action.type) {
      case "RECEIVED_CHR":
        return action.data;

      default:
        return state;
    }
  },

  data: (state = initialState.data, action) => {
    switch (action && action.type) {
      case "RECEIVED_DATA":
        return action.data;

      default:
        return state;
    }
  },

  cytobands: (state = initialState.cytobands, action) => {
    switch (action && action.type) {
      case "RECEIVED_CYTO":
        return action.data;

      default:
        return state;
    }
  }
});

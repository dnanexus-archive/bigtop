import {combineReducers} from 'redux';
import initialState from './initialState';

export default combineReducers({
  user: (state = initialState.user, action) => {
    switch (action && action.type) {
      case 'SET_SELECTED_POINT':
        return {...state,
          selectedPoint: action.id
        }

      default:
        return state;
    }
  }
});

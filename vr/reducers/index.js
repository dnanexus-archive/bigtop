import {combineReducers} from 'redux';
import initialState from '../initialState';

export default combineReducers({
  world: (state = initialState.world, action) => {
    return state;
  },
  user: (state = initialState.user, action) => {
    return state;
  }
});

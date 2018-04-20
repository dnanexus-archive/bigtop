import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../reducers';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

const logger = store => next => action => {
  return next(action);
};

export default function configureStore(initialState = {}) {
  const myStore = createStore(rootReducer, initialState, applyMiddleware(thunk, logger, sagaMiddleware));
//  forEachObjIndexed((saga) => {sagaMiddleware.run(saga);}, sagas);

  return myStore;
}

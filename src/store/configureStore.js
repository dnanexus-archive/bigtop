import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import * as sagas from './sagas';
import {forEachObjIndexed} from 'ramda';

const sagaMiddleware = createSagaMiddleware();

const logger = store => next => action => {
  return next(action);
};

export default function configureStore(initialState = {}) {
  const composeEnhancers = (window || {}).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ?
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;

  const myStore = createStore(rootReducer, initialState, composeEnhancers(applyMiddleware(thunk, logger, sagaMiddleware)));
  forEachObjIndexed((saga) => {sagaMiddleware.run(saga);}, sagas);

  return myStore;
}
